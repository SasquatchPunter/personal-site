import type { PortableTextBlock } from "next-sanity";

import { PortableText } from "next-sanity";
import BlogPostExcerpt from "./BlogPostExcerpt";

import block from "@/src/components/portable/default/block";
import list from "@/src/components/portable/default/list";
import marks from "@/src/components/portable/default/marks";
import types from "@/src/components/portable/default/types";
import BlogPostTags from "./BlogPostTags";

interface Props {
  excerpt?: string;
  body: PortableTextBlock[];
  tags: { key: string | null }[] | null;
}
export default function BlogBody({ body, excerpt, tags }: Props) {
  return (
    <main className="m-4 p-4 md:w-3/4 md:m-auto lg:w-2/3 xl:w-1/2 border-gray-500 border flex flex-col gap-8">
      <BlogPostTags tags={tags} />
      <BlogPostExcerpt excerpt={excerpt} />
      <hr />
      <PortableText value={body} components={{ block, list, marks, types }} />
    </main>
  );
}
