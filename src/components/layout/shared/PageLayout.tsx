import type { ReactNode } from "react";

import Head from "next/head";
import MainNav from "@/src/components/layout/shared/MainNav";

interface Props {
  siteTitle?: string;
  title?: string;
  children?: ReactNode;
  hasNav?: boolean;
}
export default function PageLayout({
  siteTitle = "jelliott.dev",
  title = "Page",
  children,
  hasNav = true,
}: Props) {
  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${title}`}</title>

        <link rel="icon" href="/icons/favicon-32.png" sizes="48x48" />
        <link
          rel="icon"
          href="/icons/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {hasNav ? <MainNav /> : null}
      {children}
    </>
  );
}
