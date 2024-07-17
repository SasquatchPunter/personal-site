import type { InferGetStaticPropsType } from "next";
import type { Anchors } from "@/sanity/utils/blog";

import { getPostsPaths, getPostBySlug } from "@/sanity/lib/fetch";
import { tocTreeFromAnchors } from "@/sanity/utils/blog";
import BlogPost from "@/src/components/blog/BlogPost";

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

export default function BlogPostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogPost post={post} />;
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
