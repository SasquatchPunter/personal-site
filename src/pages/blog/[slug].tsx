import type { InferGetStaticPropsType } from "next";
import type { Anchors } from "@/sanity/utils/blog";

import {
  getPostsPaths,
  getPostBySlug,
  getSiteSettings,
} from "@/sanity/lib/fetch";
import { tocTreeFromAnchors } from "@/sanity/utils/blog";

import BlogPost from "@/src/components/blog/BlogPost";
import PageLayout from "@/src/components/layout/shared/PageLayout";
import Footer from "@/src/components/Footer";

export async function getStaticProps({ params }: { params: any }) {
  const post = await getPostBySlug(params.slug);

  if (!post) return { notFound: true };

  const siteSettings = await getSiteSettings();

  const toc = tocTreeFromAnchors(post.anchors as Anchors) || null;

  return {
    props: {
      post: {
        ...post,
        toc,
      },
      siteSettings,
    },
  };
}

export async function getStaticPaths() {
  const data = await getPostsPaths();
  const paths = data.map(({ slug }) => ({
    params: {
      slug: slug!.current,
    },
  }));
  return {
    // this circumvents a regression that causes Next to resolve empty path arrays to all dynamic routes
    paths: [...paths, { params: { slug: "404" } }],
    fallback: false,
  };
}

export type BlogPostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function BlogPostPage({
  post,
  siteSettings,
}: BlogPostPageProps) {
  return (
    <PageLayout
      siteTitle={siteSettings?.siteTitle || undefined}
      title={post.title}
    >
      <BlogPost post={post} />
      <Footer socialLinks={siteSettings?.socialLinks || null} />
    </PageLayout>
  );
}
