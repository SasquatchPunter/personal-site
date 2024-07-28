import type { InferGetStaticPropsType } from "next";
import type { Anchors } from "@/sanity/utils/blog";

import { getPostsPaths, getPostBySlug } from "@/sanity/lib/fetch";
import { tocTreeFromAnchors } from "@/sanity/utils/blog";

import BlogPost from "@/src/components/blog/BlogPost";
import PageLayout from "@/src/components/layout/shared/PageLayout";

export async function getStaticProps({ params }: { params: any }) {
  const post = await getPostBySlug(params.slug);

  if (!post) return { notFound: true };

  const toc = tocTreeFromAnchors(post.anchors as Anchors) || null;

  return {
    props: {
      post: {
        ...post,
        toc,
      },
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

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <PageLayout title={post.title}>
      <BlogPost post={post} />
    </PageLayout>
  );
}
