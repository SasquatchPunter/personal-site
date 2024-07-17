import Icon from "@/src/assets/icons/favicon.min.svg";
import Link from "next/link";

export default function MainNav(props: any) {
  return (
    <nav className="sticky top-0 flex flex-row gap-4">
      <Link href="/">
        <Icon />
      </Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
