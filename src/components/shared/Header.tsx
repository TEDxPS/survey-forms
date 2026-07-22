import Link from "next/link";
import Image from "next/image";
import { getSiteConfig } from "@/libs/siteConfig";

export default async function Header() {
  const { logo, siteName, socialLinks } = await getSiteConfig();

  return (
    <header className="max-w-screen-xl flex flex-wrap items-center justify-center md:justify-between mx-auto p-4">
      <Link
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <Image
          className="relative h-8 w-auto"
          src={logo}
          alt={siteName}
          width={180}
          height={37}
          priority
        />
      </Link>
      <nav className="font-medium flex flex-row p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:mt-0 items-center">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            className={
              link.label
                ? "rounded bg-transparent md:bg-white flex flex-row justify-center items-center space-x-2 py-2 px-3 md:p-1"
                : "block py-2 px-3 text-white rounded md:bg-transparent md:p-0 dark:text-white"
            }
            href={link.url}
          >
            <Image
              src={link.icon}
              alt={link.platform}
              width={25}
              height={25}
              className={link.label ? "invert md:invert-0" : undefined}
            />
            {link.label && <p className="hidden md:block text-black">{link.label}</p>}
          </a>
        ))}
      </nav>
    </header>
  );
}
