import type { GetSiteSettings } from "@/sanity/lib/fetch";

import SocialLinks from "@/src/components/SocialLinks";
import Copyright from "@/src/components/Copyright";

interface Props {
  socialLinks: NonNullable<Awaited<GetSiteSettings>>["socialLinks"];
}
export default function Footer({ socialLinks }: Props) {
  return (
    <footer className="flex flex-col gap-4 p-4 pb-8 mt-8 bg-base-2/50 border-base-2 border-t-2px text-base-1">
      <section className="text-center font-semibold flex flex-col gap-2">
        <p>Check out my socials!</p>
        <SocialLinks socialLinks={socialLinks} />
      </section>
      <Copyright />
    </footer>
  );
}
