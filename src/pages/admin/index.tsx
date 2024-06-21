import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import Head from "next/head";

export default function StudioPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="same-origin" />
        <meta name="robots" content="noindex" />
      </Head>
      <NextStudio config={config} />
    </>
  );
}
