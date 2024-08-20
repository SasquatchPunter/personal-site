import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import Head from "next/head";
import PageLayout from "@/src/components/layout/shared/PageLayout";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { InferGetStaticPropsType } from "next";

export async function getStaticProps() {
  const siteSettings = await getSiteSettings();

  return { props: { siteSettings } };
}

export type StudioPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function StudioPage({ siteSettings }: StudioPageProps) {
  return (
    <PageLayout hasNav={false}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="same-origin" />
        <meta name="robots" content="noindex" />
      </Head>
      <NextStudio
        config={{ ...config, title: siteSettings?.siteTitle || config.title }}
      />
    </PageLayout>
  );
}
