import dynamic from 'next/dynamic';
const SurveyComponent = dynamic(() => import("@/components/Survey"), { ssr: false });
import Image from 'next/image';

export default function Homepage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-black">
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
