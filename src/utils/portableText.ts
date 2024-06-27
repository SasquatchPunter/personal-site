import { PortableTextBlock } from "next-sanity";

/**
 * Wraps multiple ranges of a block array with pseudo blocks.
 * @param blocks Input block array
 * @param ranges An array of inclusive index tuples
 * @param properties The pseudo block that wraps each range
 * @returns Processed block array
 */
function wrapBlocks(
  blocks: PortableTextBlock[],
  ranges: [number, number][],
  properties: { _type: string; _key?: string }
): PortableTextBlock[] {
  const result = [];
  let marker = 0;

  for (const [from, to] of ranges) {
    result.push(...blocks.slice(marker, from));
    result.push({ ...properties, children: blocks.slice(from, to + 1) });
    marker = to + 1;
  }

  result.push(...blocks.slice(marker));
  return result;
}

/**
 * Wraps groups of block array elements in a section block.
 * @param blocks Input block array
 * @param ranges An array of inclusive index tuples
 * @returns Processed block array
 */
export function wrapSections(
  blocks: PortableTextBlock[],
  ranges: [number, number][]
): PortableTextBlock[] {
  return wrapBlocks(blocks, ranges, { _type: "section" });
}

/**
 * Checks a block array for blocks that pass a predicate function
 * @param blocks Input block array
 * @param predicate A function that tests each block
 * @returns An array of indexes of passing blocks
 */
function getBlockIndexes(
  blocks: PortableTextBlock[],
  predicate: (block: PortableTextBlock) => boolean
): number[] {
  const indexes: number[] = [];
  blocks.forEach((block, index) => {
    if (predicate(block)) indexes.push(index);
  });
  return indexes;
}

/**
 * Extract ranges of blocks to wrap in section tags
 * @param blocks
 * @returns
 */
export function getSectionRanges(
  blocks: PortableTextBlock[]
): [number, number][] {
  const indexes = getBlockIndexes(
    blocks,
    (block) => block._type === "sectionRule"
  );
  const ranges: [number, number][] = [];

  if (indexes.length === 0) {
    return ranges;
  }

  let marker = indexes[0];

  for (let i = 1; i < indexes.length; i++) {
    ranges.push([marker + 1, indexes[i] - 1]);
    marker = indexes[i];
  }

  return ranges;
}
