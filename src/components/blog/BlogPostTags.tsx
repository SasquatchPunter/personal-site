import Link from "next/link";

interface BlogPostTagProps {
  tag: string;
}
function BlogPostTag({ tag }: BlogPostTagProps) {
  return (
    <li>
      <Link
        className="inline-block bg-blue-500 bg-opacity-50 rounded-full border-2 border-blue-400 border-opacity-50 px-2"
        href={`/blog?tags=${tag}`}
      >
        #{tag}
      </Link>
    </li>
  );
}

interface Props {
  tags: { key: string | null }[] | null;
}
export default function BlogPostTags({ tags }: Props) {
  return (
    <ul className="flex gap-2">
      {tags &&
        tags.map((tag) =>
          tag && tag.key ? (
            <BlogPostTag tag={tag.key} key={tag.key} />
          ) : undefined
        )}
    </ul>
  );
}
