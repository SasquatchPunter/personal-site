import type { GetSiteSettings } from "@/sanity/lib/fetch";

import SocialLinks from "@/src/components/SocialLinks";

interface Props {
  socialLinks: NonNullable<Awaited<GetSiteSettings>>["socialLinks"];
}
export default function Footer({ socialLinks }: Props) {
  return (
    <footer className="p-4">
      <section className="text-center">
        <p>Check out my socials!</p>
        <SocialLinks socialLinks={socialLinks} />
      </section>
    </footer>
  );
}
