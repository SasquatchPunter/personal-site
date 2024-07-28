interface Props {
  tag: string;
}
export default function BlogTag({ tag }: Props) {
  return (
    <span className="inline-block text-stone-200 bg-stone-500 bg-opacity-50 rounded-full border-2 border-stone-400 border-opacity-50 px-2 py-1 before:content-['#']">
      {tag}
    </span>
  );
}
