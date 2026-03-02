import dynamic from 'next/dynamic';
const SurveyComponent = dynamic(() => import("@/components/Survey"), { ssr: false });
import Image from 'next/image';
import type { Metadata } from 'next';
import dbConnect from "@/libs/mongodb";
import Form from "@/models/Form";

const keywords = [
  'TEDx',
  'TED',
  'TED Talk',
  'TEDxPetalingStreet',
  'TEDxPS',
  'Ideas Change Everything',
  'Innovation',
  'Inspiration',
  'Community event',
  'Thought leadership',
  'Knowledge sharing',
  'Local voices',
  'Global ideas',
  'Petaling Street',
  'Kuala Lumpur',
  'Malaysia',
  'Conferences',
  'Speaker series',
  'Chinese',
  'Multilingual events',
  'Cultural exchange',
  'Transformative ideas'
]

const authors = [
  { name: 'TEDxPetalingStreet Info Tech Team' }
]

const baseMetadata: Metadata = {
  title: "TEDxPetalingStreet Volunteer Application | Ideas Change Everything",
  description: "Join us in our journey of sharing inspiring Malaysian stories to showcase our brilliance to the world!",
  applicationName: 'TEDxPetalingStreet Volunteer Application',
  referrer: 'origin-when-cross-origin',
  keywords: keywords,
  authors: authors,
  openGraph: {
    title: 'TEDxPetalingStreet Volunteer Application | Ideas Change Everything',
    description: "Join us in our journey of sharing inspiring Malaysian stories to showcase our brilliance to the world!",
    url: 'https://forms.tedxpetalingstreet.com/recruitment-2026',
    siteName: 'TEDxPetalingStreet Volunteer Application | Ideas Change Everything',
    images: [
      {
        url: 'https://forms.tedxpetalingstreet.com/tedx-hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'TEDxPetalingStreet Main Image',
      },
    ],
    locale: 'en',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://forms.tedxpetalingstreet.com/recruitment-2026'
  },
  icons: {
    icon: '/icons/favicon.ico'
  },
};

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
  let heroImage = '/tedx-hero.jpeg';
  let title = baseMetadata.title;
  let description = baseMetadata.description;
  const slug = params?.slug?.[0] || '';

  try {
    await dbConnect();
    const form = await Form.findOne({ slug });

    if (form) {
      if (form.heroImage) heroImage = form.heroImage;
      if (form.title) title = form.title;
      if (form.description) description = form.description;
    }
  } catch (e) {
    console.error("Error fetching metadata:", e);
  }

  const currentUrl = `https://forms.tedxpetalingstreet.com${slug ? `/${slug}` : ''}`;

  return {
    ...baseMetadata,
    title: title || undefined,
    description: description || undefined,
    alternates: {
      canonical: currentUrl
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: title || undefined,
      description: description || undefined,
      url: currentUrl,
      images: [
        {
          url: heroImage.startsWith('http') ? heroImage : `https://forms.tedxpetalingstreet.com${heroImage}`,
          width: 1200,
          height: 630,
          alt: (title as string) || 'TEDxPetalingStreet Main Image',
        },
      ],
    }
  };
}

export default async function Homepage({ params }: { params: { slug?: string[] } }) {
  let heroImage = '/tedx-hero.jpeg';
  const slug = params?.slug?.[0] || '';

  try {
    await dbConnect();
    const form = await Form.findOne({ slug });
    if (form && form.heroImage) {
      heroImage = form.heroImage;
    }
  } catch (e) {
    console.error("Error fetching form:", e);
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1c1c1c]">
      {/* Hero Section */}
      <div className="w-full relative h-[400px]">
        <Image
          src={heroImage}
          alt="TEDx Event Group Photo"
          fill
          className="object-cover"
          priority
        />
      </div>

      <SurveyComponent />
    </div>
  );
}
