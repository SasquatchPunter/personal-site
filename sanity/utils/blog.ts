import type { MinPostsQueryResult } from "@/sanity/types";
import type { BlogFilterState } from "@/sanity/hooks/useBlogFilter";

import { compareDateStrings } from "@/src/utils/date";

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

/**
 * Filters a list of minified posts using a filter object.
 * @param posts List of posts to filter
 * @param filter Filter object
 */
export function filterPosts(
  posts: MinPostsQueryResult,
  filter: BlogFilterState
): MinPostsQueryResult {
  return posts.filter((post) => {
    if (filter.includeTags !== undefined) {
      if (
        filter.includeTags.length === 0 ||
        post.tags === null ||
        post.tags.length === 0 ||
        !filter.includeTags.some((tag) => post.tags!.includes(tag))
      ) {
        return false;
      }
    }

    if (filter.excludeTags !== undefined) {
      if (
        post.tags !== null &&
        filter.excludeTags.some((tag) => post.tags!.includes(tag))
      ) {
        return false;
      }
    }

    if (
      filter.createdBefore != undefined &&
      !(compareDateStrings(post._createdAt, filter.createdBefore) < 0)
    ) {
      return false;
    }

    if (
      filter.createdAfter != undefined &&
      !(compareDateStrings(post._createdAt, filter.createdAfter) > 0)
    ) {
      return false;
    }

    if (
      filter.updatedBefore != undefined &&
      !(compareDateStrings(post._updatedAt, filter.updatedBefore) < 0)
    ) {
      return false;
    }

    if (
      filter.updatedAfter != undefined &&
      !(compareDateStrings(post._updatedAt, filter.updatedAfter) > 0)
    ) {
      return false;
    }

    return true;
  });
}
