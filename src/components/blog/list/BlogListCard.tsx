import type { MinPostsQueryResult } from "@/sanity/types";
import type { MouseEventHandler } from "react";

import { formatDateString } from "@/src/utils/date";

import Link from "next/link";
import BlogTag from "@/src/components/blog/BlogTag";

interface CardTagProps {
  tag: string;
  addIncludedTagFn: (arg: string) => void;
  addExcludedTagFn: (arg: string) => void;
}
function CardTag({ tag, addIncludedTagFn, addExcludedTagFn }: CardTagProps) {
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event.shiftKey) {
      addExcludedTagFn(tag);
    } else {
      addIncludedTagFn(tag);
    }
  };

  return (
    <button onClick={onClick}>
      <BlogTag tag={tag} />
    </button>
  );
}

interface BlogListCardProps {
  post: MinPostsQueryResult[0];
  addIncludedTagFn: (arg: string) => void;
  addExcludedTagFn: (arg: string) => void;
}
export default function BlogListCard({
  post,
  addIncludedTagFn,
  addExcludedTagFn,
}: BlogListCardProps) {
  const createdAt = formatDateString(post._createdAt);
  const updatedAt = formatDateString(post._updatedAt);

  return (
    <li key={post._id}>
      <article className="bg-base-2/75 p-4 rounded-xl border-x-2px border-base-2">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="size-fit text-3xl text-base-1 font-bold">
            {post.title}
          </h3>
        </Link>

        <p className="text-xs font-light text-base-1 mt-4">
          {createdAt} • Updated {updatedAt}
        </p>

        {post.tags && (
          <ul className="flex flex-wrap gap-2 mt-8">
            {post.tags
              .filter((tag) => tag !== null)
              .map((tag) => (
                <li key={tag}>
                  <CardTag
                    tag={tag as string}
                    addIncludedTagFn={addIncludedTagFn}
                    addExcludedTagFn={addExcludedTagFn}
                  />
                </li>
              ))}
          </ul>
        )}
      </article>
    </li>
  );
}
