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
    <li key={tag}>
      <button onClick={onClick}>
        <BlogTag tag={tag} />
      </button>
    </li>
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
    <li key={post._id} className="border border-gray-200 p-4">
      <article>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-2xl hover:text-green-300">{post.title}</h3>
        </Link>
        <p>
          <code>{createdAt}</code>
        </p>
        <p>
          <code>Updated {updatedAt}</code>
        </p>
        {post.tags && (
          <ul className="flex gap-2">
            {post.tags
              .filter((tag) => tag != null)
              .map((tag) => (
                <CardTag
                  tag={tag}
                  addIncludedTagFn={addIncludedTagFn}
                  addExcludedTagFn={addExcludedTagFn}
                />
              ))}
          </ul>
        )}
      </article>
    </li>
  );
}
