import type { GetSiteSettings } from "@/sanity/lib/fetch";

import Email from "@/src/assets/icons/socialLinks/email.svg";
import LinkedIn from "@/src/assets/icons/socialLinks/linkedin.svg";
import Github from "@/src/assets/icons/socialLinks/github.svg";
import Codepen from "@/src/assets/icons/socialLinks/codepen.svg";
import Default from "@/src/assets/icons/socialLinks/default.svg";

import CursorHover from "@/src/components/CursorHover";

type SocialLinks = NonNullable<Awaited<GetSiteSettings>>["socialLinks"];
type SocialLinkKey = keyof NonNullable<SocialLinks>;

interface SocialLinkAnchorProps {
  children: React.ReactNode;
  href: string;
  title?: string;
}
function SocialLinkAnchor({ children, href, title }: SocialLinkAnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      className="*:w-6 *:h-6 opacity-75 hover:opacity-100 duration-300 *:shadow-transparent *:hover:translate-y-0.5 *:hover:shadow-base-1 *:drop-shadow-lg-c *:hover:drop-shadow-lg-b *:duration-300"
      title={title}
    >
      {children}
    </a>
  );
}

interface SocialLinkProps {
  type: SocialLinkKey;
  address: string;
}
function SocialLink({ type, address }: SocialLinkProps) {
  const href = ["email"].includes(type) ? `mailto:${address}` : address;

  switch (type) {
    case "email":
      return (
        <SocialLinkAnchor href={href} title="Email">
          <Email className="*:stroke-base-1" />
        </SocialLinkAnchor>
      );
    case "linkedin":
      return (
        <SocialLinkAnchor href={href} title="LinkedIn">
          <LinkedIn className="*:fill-base-1" />
        </SocialLinkAnchor>
      );
    case "github":
      return (
        <SocialLinkAnchor href={href} title="Github">
          <Github className="*:fill-base-1" />
        </SocialLinkAnchor>
      );
    case "codepen":
      return (
        <SocialLinkAnchor href={href} title="Codepen">
          <Codepen className="*:fill-base-1" />
        </SocialLinkAnchor>
      );
    default:
      return (
        <SocialLinkAnchor href={href}>
          <Default className="*:stroke-base-1" />
        </SocialLinkAnchor>
      );
  }
}

interface Props {
  socialLinks: SocialLinks;
}
export default function SocialLinks({ socialLinks }: Props) {
  return (
    <ul className="flex gap-8 justify-center">
      {socialLinks
        ? (Object.entries(socialLinks) as [SocialLinkKey, string][]).map(
            ([type, address]) => (
              <li key={type}>
                <CursorHover enterEffect="activate" leaveEffect="deactivate">
                  <SocialLink type={type} address={address} />
                </CursorHover>
              </li>
            )
          )
        : null}
    </ul>
  );
}
