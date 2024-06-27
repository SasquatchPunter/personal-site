import type { PortableTextBlock } from "next-sanity";

import BlogPostExcerpt from "./BlogPostExcerpt";
import BlogPostTags from "./BlogPostTags";
import BlogPostBody from "./BlogPostBody";

interface Props {
  excerpt?: string;
  body: PortableTextBlock[];
  tags: (string | null)[] | null;
}
export default function BlogPostMain({ body, excerpt, tags }: Props) {
  return (
    <main className="m-4 p-4 md:w-3/4 md:m-auto lg:w-2/3 xl:w-1/2 border-gray-500 border flex flex-col gap-8">
      <BlogPostBody body={body} />
    </main>
  );
}
