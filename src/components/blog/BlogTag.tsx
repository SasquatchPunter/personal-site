interface Props {
  tag: string;
}
export default function BlogTag({ tag }: Props) {
  return (
    <span className="inline-block text-green-50 bg-green-950 bg-opacity-100 rounded-md border-2px border-green-200 border-opacity-50 px-2 py-1 before:content-['#']">
      {tag}
    </span>
  );
}
