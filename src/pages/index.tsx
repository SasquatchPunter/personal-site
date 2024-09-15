import type { InferGetStaticPropsType } from "next";

import { getSiteSettings } from "@/sanity/lib/fetch";

import PageLayout from "@/src/components/layout/shared/PageLayout";
import Footer from "@/src/components/layout/shared/Footer";
import MainHeading from "../components/MainHeading";

export async function getStaticProps() {
  const siteSettings = await getSiteSettings();

  return { props: { siteSettings } };
}

export type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function HomePage({ siteSettings }: HomePageProps) {
  return (
    <PageLayout title={siteSettings?.siteTitle} subtitle="Home">
      <MainHeading>Home</MainHeading>
      <Footer socialLinks={siteSettings?.socialLinks || null} />
    </PageLayout>
  );
}
