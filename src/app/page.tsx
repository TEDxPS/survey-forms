import dynamic from 'next/dynamic';
const SurveyComponent = dynamic(() => import("@/components/Survey"), { ssr: false });
import Image from 'next/image';
import type { Metadata } from 'next'

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

export const metadata: Metadata = {
  title: "TEDxPetalingStreet Volunteer Application | Ideas Change Everything",
  description: "Join us in our journey of sharing inspiring Malaysian stories to showcase our brilliance to the world!",
  applicationName: 'TEDxPetalingStreet Volunteer Application',
  referrer: 'origin-when-cross-origin',
  keywords: keywords,
  authors: authors,
  openGraph: {
    title: 'TEDxPetalingStreet Volunteer Application | Ideas Change Everything',
    description: "Join us in our journey of sharing inspiring Malaysian stories to showcase our brilliance to the world!",
    url: 'https://recruitment.tedxpetalingstreet.com',
    siteName: 'TEDxPetalingStreet Volunteer Application | Ideas Change Everything',
    images: [
      {
        url: 'https://www.tedxpetalingstreet.com/tedxps_log.png',
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
    canonical: 'https://recruitment.tedxpetalingstreet.com/'
  },
  icons: {
    icon: '/icons/favicon.ico'
  },
};

export default function Homepage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1c1c1c]">
    {/* Hero Section */}
    <div className="w-full relative h-[400px]">
      <Image
        src="/tedx-hero.png"
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
