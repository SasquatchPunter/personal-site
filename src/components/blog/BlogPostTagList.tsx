import Link from "next/link";
import BlogTag from "./BlogTag";

interface BlogPostTagProps {
  tag: string;
}
function BlogPostTag({ tag }: BlogPostTagProps) {
  return (
    <li>
      <Link href={`/blog?includeTags=${tag}`}>
        <BlogTag tag={tag} />
      </Link>
    </li>
  );
}

interface Props {
  tags: (string | null)[] | null;
}
export default function BlogPostTagList({ tags }: Props) {
  return tags ? (
    <ul className="flex gap-2 justify-center">
      {tags
        .filter((tag) => tag !== null)
        .map((tag) => (
          <BlogPostTag tag={tag} key={tag} />
        ))}
    </ul>
  ) : null;
}
