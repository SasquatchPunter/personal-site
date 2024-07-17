import Link from "next/link";

interface BlogPostTagProps {
  tag: string;
}
function BlogPostTag({ tag }: BlogPostTagProps) {
  return (
    <li>
      <Link
        className="inline-block text-stone-200 bg-stone-500 bg-opacity-50 rounded-full border-2 border-stone-400 border-opacity-50 px-2"
        href={`/blog?tags=${tag}`}
      >
        #{tag}
      </Link>
    </li>
  );
}

interface Props {
  tags: (string | null)[] | null;
}
export default function BlogPostTags({ tags }: Props) {
  return (
    <ul className="flex gap-2 justify-center">
      {tags &&
        tags.map((tag) =>
          tag ? <BlogPostTag tag={tag} key={tag} /> : undefined
        )}
    </ul>
  );
}
