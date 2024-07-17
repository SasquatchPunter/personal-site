import type { TocTree } from "@/sanity/utils/blog";

function Tree({ toc }: { toc: TocTree }) {
  return (
    <ul className="list-disc list-inside">
      {toc.map((item) =>
        "children" in item ? (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
            {item.children && <Tree toc={item.children} />}
          </li>
        ) : (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        )
      )}
    </ul>
  );
}

interface Props {
  toc: TocTree | null | undefined;
}
export default function BlogPostToc({ toc }: Props) {
  return (
    toc && (
      <aside>
        <details>
          <summary>
            <label className="pointer-events-none">Table Of Contents</label>
          </summary>
          <Tree toc={toc} />
        </details>
      </aside>
    )
  );
}
