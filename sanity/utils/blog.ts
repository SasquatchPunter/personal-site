export type TocNode = {
  label: string;
  id: string;
  children: Array<TocNode | TocLeaf>;
};
export type TocLeaf = Omit<TocNode, "children">;
export type TocTree = Array<TocNode | TocLeaf>;

export type Anchor = { level: 1 | 2 | 3 | 4; label: string; id: string };
export type Anchors = Anchor[];

/**
 * Generates an abstract tree for rendering a table of contents from a flat array of anchors.
 * @param anchors Flat anchor array.
 * @param depth Maximum depth of tree
 * @returns Abstract tree representing a table of contents structure, or undefined
 */
export function tocTreeFromAnchors(
  anchors: Anchors,
  depth?: Anchor["level"]
): TocTree | undefined {
  function generate(
    anchors: Anchors,
    depth: Anchor["level"],
    level: Anchor["level"]
  ) {
    if (anchors.length === 0) return undefined;

    const tree: TocTree = [];

    while (anchors.length > 0) {
      const anchor = anchors.shift();

      if (!anchor) break;

      if (anchor.level > depth) continue;

      if (anchor.level > level) {
        anchors.unshift(anchor);
        const lastNode = tree[tree.length - 1];
        const children = generate(anchors, depth, anchor.level);
        tree[tree.length - 1] = { ...lastNode, children };
      } else if (anchor.level < level) {
        anchors.unshift(anchor);
        break;
      } else {
        tree.push({ label: anchor.label, id: anchor.id });
      }
    }

    return tree.length > 0 ? tree : undefined;
  }

  const levels = anchors.map(({ level }) => level);
  const maxLevel = Math.max(...levels) as Anchor["level"];
  const minLevel = Math.min(...levels) as Anchor["level"];

  return generate([...anchors], depth || maxLevel, minLevel);
}