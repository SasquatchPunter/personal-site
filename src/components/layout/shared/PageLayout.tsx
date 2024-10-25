import type { ReactNode } from "react";

import Head from "next/head";
import MainNav from "@/src/components/layout/shared/MainNav";
import Cursor from "@/src/components/Cursor";

interface Props {
  /** Page title. */
  title?: string | null;
  /** Page subtitle. */
  subtitle?: string | null;
  children?: ReactNode;
  /** Disabling this disables the main site nav. */
  hasNav?: boolean;
  /** Disabling this disables the custom cursor element. */
  hasCustomCursor?: boolean;
}
export default function PageLayout({
  title = "jelliott.dev",
  subtitle,
  children,
  //TODO: change hasNav to noNav so it can be opted out without passing explicit false via prop
  hasNav = true,
  //TODO: change hasCustomCursor to noCustomCursor so it can be opted out without passing explicit false via prop
  hasCustomCursor = true,
}: Props) {
  return (
    <div
      className={[
        hasCustomCursor ? "cursor-none" : undefined,
        "min-h-screen relative z-0",
      ].join(" ")}
    >
      <Head>
        <title>{`${title}${subtitle ? " | " + subtitle : ""}`}</title>
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
    </div>
  );
}
