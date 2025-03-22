import Link from "next/link";
import Image from "next/image";
import website from "../../../public/icons/website.svg";
import facebook from "../../../public/icons/facebook.png";
import instagram from "../../../public/icons/instagram.png";
import youtube from "../../../public/icons/youtube.png";
import linkedin from "../../../public/icons/linkedin.png";
import tiktok from "../../../public/icons/tiktok.png";

export default function Header() {
  return (
    <header className="max-w-screen-xl flex flex-wrap items-center justify-center md:justify-between mx-auto p-4">
      <Link
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert h-8"
          src="/tedxps_logo.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </Link>
      <nav className="font-medium flex flex-row p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:mt-0 items-center">
        <a
          className="rounded bg-transparent md:bg-white flex flex-row justify-center items-center space-x-2 py-2 px-3 md:p-1"
          key={1}
          href={"https://www.tedxpetalingstreet.com/en"}
        >
          <Image src={website} alt="official-website" width={25} className="invert md:invert-0" />
          <p className="hidden md:block">Official Website</p>
        </a>
        <a
          className="block py-2 px-3 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
          key={2}
          href={"https://www.facebook.com/TEDxPetalingStreet"}
        >
          <Image src={facebook} alt="facebook" width={25} />
        </a>
        <a
          className="block py-2 px-3 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
          key={3}
          href={"https://www.instagram.com/tedxpetalingstreet/"}
        >
          <Image src={instagram} alt="instagram" width={25} />
        </a>
        <a
          className="block py-2 px-3 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
          key={4}
          href={"https://www.youtube.com/@TedxPetalingStreet"}
        >
          <Image src={youtube} alt="youtube" width={25} />
        </a>
        <a
          className="block py-2 px-3 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
          key={5}
          href={"https://my.linkedin.com/company/tedxpetalingstreet"}
        >
          <Image src={linkedin} alt="linkedin" width={25} />
        </a>
        <a
          className="block py-2 px-3 text-white rounded md:bg-transparent  md:p-0 dark:text-white"
          key={6}
          href={"https://www.tiktok.com/@tedxpetalingstreet"}
        >
          <Image src={tiktok} alt="tiktok" width={25} />
        </a>
      </nav>
    </header>
  );
}
