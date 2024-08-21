import type { InferGetStaticPropsType } from "next";

import { getSiteSettings, getMinPosts } from "@/sanity/lib/fetch";
import { extractTags } from "@/sanity/utils/blog";

import PageLayout from "@/src/components/layout/shared/PageLayout";
import BlogList from "@/src/components/blog/BlogList";
import Footer from "@/src/components/layout/shared/Footer";

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
      <h1>Main Blog Route</h1>
      <BlogList posts={posts} tags={tags} />
      <Footer socialLinks={siteSettings?.socialLinks || null} />
    </PageLayout>
  );
}
