import type { BlogPost } from "@/sanity/types";
import type { PortableTextBlock } from "next-sanity";
import type { BlogPostPageProps } from "@/src/pages/blog/[slug]";

import BlogPostHeader from "./BlogPostHeader";
import BlogPostMain from "./BlogPostMain";
import BlogPostFooter from "./BlogPostFooter";
import BlogPostTags from "./BlogPostTags";
import BlogPostExcerpt from "./BlogPostExcerpt";

export default function BlogPost({ post }: BlogPostPageProps) {
  return (
    <>
      <BlogPostHeader
        title={post.title!}
        mainImage={post.mainImage!}
        createdAt={post._createdAt}
        updatedAt={post._updatedAt}
      />
      <section className="flex flex-col gap-2">
        <BlogPostTags tags={post.tags} />
        <BlogPostExcerpt excerpt={post.excerpt} />
      </section>
      <BlogPostMain body={post.body as PortableTextBlock[]} toc={post.toc} />
      <BlogPostFooter />
    </>
  );
}
