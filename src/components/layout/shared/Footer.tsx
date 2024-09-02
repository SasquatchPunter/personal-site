import type { GetSiteSettings } from "@/sanity/lib/fetch";

import SocialLinks from "@/src/components/SocialLinks";
import Copyright from "@/src/components/Copyright";

interface Props {
  socialLinks: NonNullable<Awaited<GetSiteSettings>>["socialLinks"];
}
export default function Footer({ socialLinks }: Props) {
  return (
    <footer className="flex flex-col gap-12 px-4 py-20 mt-8 bg-gradient-to-t from-base-2/40 to-black border-base-2 border-t-2px text-base-1 bottom-0">
      <section className="text-center font-semibold flex flex-col gap-2">
        <SocialLinks socialLinks={socialLinks} />
      </section>
      <Copyright />
    </footer>
  );
}
