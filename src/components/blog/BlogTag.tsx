interface Props {
  tag: string;
}
export default function BlogTag({ tag }: Props) {
  return (
    <span className="inline-block text-base-1 bg-base-2 rounded-md border-2px border-green-200 border-opacity-50 px-2 py-1 before:content-['#'] font-normal select-none">
      {tag}
    </span>
  );
}
