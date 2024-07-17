import type { ReactNode } from "react";

import Head from "next/head";
import MainNav from "@/src/components/layout/shared/MainNav";

interface Props {
  title?: string;
  children?: ReactNode;
}
export default function PageLayout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>Jeremy Elliott | {title || "Page"}</title>

        <link rel="icon" href="/icons/favicon-32.png" sizes="48x48" />
        <link
          rel="icon"
          href="/icons/favicon.min.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <MainNav />
      {children}
    </>
  );
}
