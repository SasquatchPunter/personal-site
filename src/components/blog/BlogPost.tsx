import type { BlogPost } from "@/sanity/types";
import type { PortableTextBlock } from "next-sanity";
import type { BlogPostPageProps } from "@/src/pages/blog/[slug]";

import BlogPostHeader from "./BlogPostHeader";
import BlogPostMain from "./BlogPostMain";
import BlogPostExcerpt from "./BlogPostExcerpt";
import BlogPostTagList from "./BlogPostTagList";

interface Props {
  post: BlogPostPageProps["post"];
}
export default function BlogPost({ post }: Props) {
  return (
    <>
      <BlogPostHeader
        title={post.title!}
        mainImage={post.mainImage!}
        createdAt={post._createdAt}
        updatedAt={post._updatedAt}
      />
      <section className="flex flex-col gap-2">
        <BlogPostTagList tags={post.tags} />
        <BlogPostExcerpt excerpt={post.excerpt} />
      </section>
      <BlogPostMain body={post.body as PortableTextBlock[]} toc={post.toc} />
    </>
  );
}
