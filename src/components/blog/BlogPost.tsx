import type { BlogPost, PostFromSlugQueryResult } from "@/sanity/types";
import type { PortableTextBlock } from "next-sanity";

import BlogPostHeader from "./BlogPostHeader";
import BlogPostBody from "./BlogPostBody";
import BlogPostFooter from "./BlogPostFooter";

interface Props {
  post: NonNullable<PostFromSlugQueryResult>;
}
export default function BlogPost({ post }: Props) {
  return (
    <article>
      <BlogPostHeader
        title={post.title!}
        mainImage={post.mainImage}
        createdAt={post._createdAt}
      />
      <BlogPostBody
        tags={post.tags}
        excerpt={post.excerpt}
        body={post.body! as PortableTextBlock[]}
      />
      <BlogPostFooter />
    </article>
  );
}
