import type { GetSiteSettings } from "@/sanity/lib/fetch";

import Email from "@/src/assets/icons/socialLinks/email.svg";
import LinkedIn from "@/src/assets/icons/socialLinks/linkedin.svg";
import Github from "@/src/assets/icons/socialLinks/github.svg";
import Default from "@/src/assets/icons/socialLinks/default.svg";

interface SocialLinkProps {
  type: string;
  address: string;
}
function SocialLink({ type, address }: SocialLinkProps) {
  const href = ["email"].includes(type) ? `mailto:${address}` : address;

  const Icon = () => {
    switch (type) {
      case "email":
        return <Email className="*:stroke-base-1" />;
      case "linkedin":
        return <LinkedIn className="*:fill-base-1" />;
      case "github":
        return <Github className="*:fill-base-1" />;
      default:
        return <Default className="*:stroke-base-1" />;
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      className="*:hover:translate-y-0.5 *:w-6 *:h-6 *:shadow-transparent *:hover:shadow-base-1 *:drop-shadow-lg-t *:hover:drop-shadow-lg-b *:duration-300"
    >
      <Icon />
    </a>
  );
}

interface Props {
  socialLinks: NonNullable<Awaited<GetSiteSettings>>["socialLinks"];
}
export default function SocialLinks({ socialLinks }: Props) {
  return (
    <ul className="flex gap-8 justify-center mt-4">
      {socialLinks
        ? Object.entries(socialLinks).map(([type, address]) => (
            <li key={type}>
              <SocialLink type={type} address={address} />
            </li>
          ))
        : null}
    </ul>
  );
}
