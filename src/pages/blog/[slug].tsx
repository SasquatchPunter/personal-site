import type { InferGetStaticPropsType } from "next";
import type { Anchors } from "@/sanity/utils/blog";

import {
  getPostsPaths,
  getPostBySlug,
  getSiteSettings,
} from "@/sanity/lib/fetch";
import { tocTreeFromAnchors } from "@/sanity/utils/blog";

import PageLayout from "@/src/components/layout/shared/PageLayout";
import BlogPost from "@/src/components/blog/post/BlogPost";
import Footer from "@/src/components/layout/shared/Footer";
import AntonFont from "@/src/components/layout/fonts/AntonFont";

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
    <AntonFont>
      <PageLayout
        title={siteSettings?.siteTitle || undefined}
        subtitle={post.title}
      >
        <BlogPost post={post} />
        <Footer socialLinks={siteSettings?.socialLinks || null} />
      </PageLayout>
    </AntonFont>
  );
}
