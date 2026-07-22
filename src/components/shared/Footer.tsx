import Image from "next/image";
import { getSiteConfig } from "@/libs/siteConfig";

export default async function Footer() {
  const { repoUrl } = await getSiteConfig();

  return (
    <footer className="bg-[#1c1c1c]">
      <div className="max-w-screen-xl mx-auto p-4 border-t border-gray-700">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
          <span>Built with ❤️ by TEDxPetalingStreet</span>
        </a>
      </div>
    </footer>
  );
}
