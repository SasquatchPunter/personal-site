import type { SocialLinks, SocialLinkKey } from "@/sanity/types";
import CursorHover from "./CursorHover";
import SocialLink from "./SocialLink";

interface Props {
  socialLinks: SocialLinks;
}
export default function SocialLinks({ socialLinks }: Props) {
  return (
    <ul className="flex gap-10 justify-center">
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
