import Icon from "@/src/assets/icons/favicon.svg";
import MenuIcon from "@/src/assets/icons/menu.svg";
import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="font-anton sticky top-0 flex flex-row justify-between text-xl p-4 backdrop-blur-sm text-base-1 font-black">
      <Link href="/">
        <Icon className="h-12 opacity-75 hover:opacity-100 w-auto aspect-square hover:scale-110 duration-200" />
      </Link>
      <details className="relative">
        <summary className="block opacity-75 hover:opacity-100 cursor-pointer">
          <MenuIcon className="stroke-base-1 h-12 w-auto" />
        </summary>
        <section className="absolute flex flex-col right-0">
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </section>
      </details>
    </nav>
  );
}
