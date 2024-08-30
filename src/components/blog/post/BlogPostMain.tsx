import type { PortableTextBlock } from "next-sanity";
import type { TocTree } from "@/sanity/utils/blog";

import BlogPostBody from "./BlogPostBody";
import BlogPostToc from "./BlogPostToc";

interface Props {
  body: PortableTextBlock[];
  toc: TocTree | null;
}
export default function BlogPostMain({ body, toc }: Props) {
  return (
    <main className="m-4 p-4 md:w-3/4 md:m-auto lg:w-2/3 xl:w-1/2 border-gray-500 border flex flex-col gap-8">
      <BlogPostToc toc={toc} />
      <BlogPostBody body={body} />
    </main>
  );
}
