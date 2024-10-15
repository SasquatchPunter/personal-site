import type { BlogFilterState } from "@/sanity/hooks/useBlogFilter";

import Cancel from "@/src/assets/icons/cancel.svg";
import BlogTag from "@/src/components/blog/BlogTag";

interface FilterTagProps {
  tag: string;
  removeTagFn: (tag: string) => void;
}
function FilterTag({ tag, removeTagFn }: FilterTagProps) {
  const onClick = () => removeTagFn(tag);
  return (
    <li key={tag}>
      <button onClick={onClick}>
        <BlogTag tag={tag} />
      </button>
    </li>
  );
}

interface Props {
  label: string;
  state: BlogFilterState["includeTags" | "excludeTags"];
  removeFn: (tag: string) => void;
  resetFn: () => void;
}
export default function BlogListTagFilter({
  label,
  state,
  removeFn,
  resetFn,
}: Props) {
  return (
    <div>
      <div className="flex items-stretch justify-between">
        <label>{label}</label>
        <button
          onClick={resetFn}
          disabled={!(state && state.length > 0)}
          className="duration-300 opacity-50 hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
        >
          <Cancel className="h-full *:fill-base-1 *:duration-300" />
        </button>
      </div>

      {state ? (
        <ul className="flex flex-row flex-wrap gap-2">
          {state.map((tag) => (
            <FilterTag key={tag} tag={tag} removeTagFn={removeFn} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
