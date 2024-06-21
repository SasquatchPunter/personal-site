interface Props {
  excerpt?: string;
}
export default function BlogPostExcerpt({ excerpt }: Props) {
  return excerpt && <p>{excerpt}</p>;
}
