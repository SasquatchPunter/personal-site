interface Props {
  excerpt?: string;
}
export default function BlogPostExcerpt({ excerpt }: Props) {
  return (
    excerpt && (
      <section className="text-center">
        <p>{excerpt}</p>
      </section>
    )
  );
}
