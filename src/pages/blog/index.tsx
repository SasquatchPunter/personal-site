import type { InferGetStaticPropsType } from "next";

import { getSiteSettings, getMinPosts } from "@/sanity/lib/fetch";
import { extractTags } from "@/sanity/utils/blog";

import PageLayout from "@/src/components/layout/shared/PageLayout";
import BlogList from "@/src/components/blog/list/BlogList";
import Footer from "@/src/components/layout/shared/Footer";
import MainHeading from "@/src/components/MainHeading";

export async function getStaticProps() {
  const siteSettings = await getSiteSettings();
  const posts = await getMinPosts();

  const tags = extractTags(posts);

  return { props: { posts, tags, siteSettings } };
}

export type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function BlogPage({ posts, tags, siteSettings }: BlogPageProps) {
  return (
    <PageLayout siteTitle={siteSettings?.siteTitle || undefined} title="Blog">
      <MainHeading>See my blog posts...</MainHeading>
      <BlogList posts={posts} tags={tags} />
      <Footer socialLinks={siteSettings?.socialLinks || null} />
    </PageLayout>
  );
}
