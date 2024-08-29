import type { ReactNode } from "react";

import Head from "next/head";
import MainNav from "@/src/components/layout/shared/MainNav";
import Cursor from "@/src/components/Cursor";

interface Props {
  siteTitle?: string;
  title?: string;
  children?: ReactNode;
  hasNav?: boolean;
  hasCustomCursor?: boolean;
}
export default function PageLayout({
  siteTitle = "jelliott.dev",
  title = "Page",
  children,
  hasNav = true,
  hasCustomCursor = true,
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
      {hasCustomCursor ? <Cursor /> : null}
      {hasNav ? <MainNav /> : null}
      {children}
    </>
  );
}
