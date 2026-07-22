import dynamic from 'next/dynamic';
const SurveyComponent = dynamic(() => import("@/components/Survey"), { ssr: false });
import Image from 'next/image';
import type { Metadata } from 'next';
import dbConnect from "@/libs/mongodb";
import Form, { IForm } from "@/models/Form";
import { getSiteConfig } from "@/libs/siteConfig";

const authors = [
  { name: 'TEDxPetalingStreet Info Tech Team' }
]

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
  const site = await getSiteConfig();
  let heroImage = site.defaultHeroImage;
  let title = site.title;
  let description = site.description;
  const slug = params?.slug?.[0] || '';

  try {
    await dbConnect();
    const form = await Form.findOne({ slug }) as IForm | null;

    if (form) {
      if (form.heroImage) heroImage = form.heroImage;
      if (form.title) title = form.title;
      if ((form as any).description) description = (form as any).description;
    }
  } catch (e) {
    console.error("Error fetching metadata:", e);
  }

  const currentUrl = `${site.domain}${slug ? `/${slug}` : ''}`;

  return {
    title,
    description,
    applicationName: site.siteName,
    referrer: 'origin-when-cross-origin',
    keywords: site.keywords,
    authors: authors,
    alternates: {
      canonical: currentUrl
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: site.siteName,
      images: [
        {
          url: heroImage.startsWith('http') ? heroImage : `${site.domain}${heroImage}`,
          width: 1200,
          height: 630,
          alt: title || `${site.siteName} Main Image`,
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
    icons: {
      icon: site.favicon
    },
  };
}

export default async function Homepage({ params }: { params: { slug?: string[] } }) {
  const site = await getSiteConfig();
  let heroImage = site.defaultHeroImage;
  const slug = params?.slug?.[0] || '';

  try {
    await dbConnect();
    const form = await Form.findOne({ slug }) as IForm | null;
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
