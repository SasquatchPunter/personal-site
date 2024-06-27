import type { BlogPost, PostFromSlugQueryResult } from "@/sanity/types";
import type { PortableTextBlock } from "next-sanity";

import BlogPostHeader from "./BlogPostHeader";
import BlogPostMain from "./BlogPostMain";
import BlogPostFooter from "./BlogPostFooter";
import BlogPostTags from "./BlogPostTags";
import BlogPostExcerpt from "./BlogPostExcerpt";

interface Props {
  post: NonNullable<PostFromSlugQueryResult>;
}
export default function BlogPost({ post }: Props) {
  return (
    <article className="flex flex-col gap-8">
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
      <BlogPostMain
        tags={post.tags}
        excerpt={post.excerpt}
        body={post.body! as PortableTextBlock[]}
      />
      <BlogPostFooter />
    </article>
  );
}
