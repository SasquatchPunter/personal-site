import Icon from "@/src/assets/icons/favicon.svg";
import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="sticky top-0 flex flex-row gap-4 items-center p-2 backdrop-blur-sm text-base-1 font-black">
      <Link href="/">
        <Icon className="h-12 w-auto aspect-square hover:scale-110 duration-100" />
      </Link>
      <Link href="/blog" className="h-fit">
        Blog
      </Link>
    </nav>
  );
}
