import type { BlogPost, PostFromSlugQueryResult } from "@/sanity/types";
import type { ImageAsset } from "sanity";
import type { PortableTextBlock } from "next-sanity";

import BlogHeader from "./BlogHeader";
import BlogBody from "./BlogBody";
import BlogFooter from "./BlogFooter";

interface Props {
  post: NonNullable<PostFromSlugQueryResult>;
}
export default function BlogPost({ post }: Props) {
  return (
    <article>
      <BlogHeader
        title={post.title!}
        image={post.mainImage!.asset! as ImageAsset}
      />
      <BlogBody body={post.body! as PortableTextBlock[]} />
      <BlogFooter />
    </article>
  );
}
