import type { Anchor, Anchors, TocLeaf, TocTree } from "../blog";

import { tocTreeFromAnchors } from "../blog";

describe("tocTreeFromAnchors()", () => {
  /** Mock tree nodes with no set children. */
  const mockNodes: { [key: number]: TocLeaf } = {
    1: { label: "Level 1", id: "level-1" },
    2: { label: "Level 2", id: "level-2" },
    3: { label: "Level 3", id: "level-3" },
    4: { label: "Level 4", id: "level-4" },
  };

  /** Mock anchors that would be passed to the tree function. */
  const mockAnchors: { [key: number]: Anchor } = {
    1: { ...mockNodes[1], level: 1 },
    2: { ...mockNodes[2], level: 2 },
    3: { ...mockNodes[3], level: 3 },
    4: { ...mockNodes[4], level: 4 },
  };

  test("Returns undefined if anchors is empty.", () => {
    const anchors: Anchors = [];
    const tree = tocTreeFromAnchors(anchors);
    const expected = undefined;
    expect(tree).toEqual(expected);
  });

  test("Returns a tree with a degree of 1", () => {
    const anchors: Anchors = [
      mockAnchors[1],
      mockAnchors[2],
      mockAnchors[3],
      mockAnchors[4],
    ];
    const tree = tocTreeFromAnchors(anchors);
    const expected: TocTree = [
      {
        ...mockNodes[1],
        children: [
          {
            ...mockNodes[2],
            children: [
              {
                ...mockNodes[3],
                children: [mockNodes[4]],
              },
            ],
          },
        ],
      },
    ];
    expect(tree).toEqual(expected);
  });

  test("Returns a tree with nested levels.", () => {
    const anchors: Anchors = [
      mockAnchors[1],
      mockAnchors[2],
      mockAnchors[3],
      mockAnchors[4],
      mockAnchors[2],
      mockAnchors[3],
      mockAnchors[1],
      mockAnchors[4],
    ];

    const tree = tocTreeFromAnchors(anchors);
    const expected: TocTree = [
      {
        ...mockNodes[1],
        children: [
          {
            ...mockNodes[2],
            children: [{ ...mockNodes[3], children: [{ ...mockNodes[4] }] }],
          },
          { ...mockNodes[2], children: [{ ...mockNodes[3] }] },
        ],
      },
      { ...mockNodes[1], children: [{ ...mockNodes[4] }] },
    ];
    expect(tree).toEqual(expected);
  });

  test("Returns a tree up to maximum depth.", () => {
    const depth = 2;
    const anchors: Anchors = [
      mockAnchors[1],
      mockAnchors[2],
      mockAnchors[3],
      mockAnchors[4],
      mockAnchors[2],
      mockAnchors[4],
    ];
    const tree = tocTreeFromAnchors(anchors, depth);
    const expected: TocTree = [
      { ...mockNodes[1], children: [mockNodes[2], mockNodes[2]] },
    ];
    expect(tree).toEqual(expected);
  });

  test("Returns undefined when all nodes are at a deeper level than max depth.", () => {
    const depth = 1;
    const anchors: Anchors = [
      mockAnchors[2],
      mockAnchors[3],
      mockAnchors[3],
      mockAnchors[2],
      mockAnchors[3],
      mockAnchors[4],
    ];
    const tree = tocTreeFromAnchors(anchors, depth);
    const expected = undefined;
    expect(tree).toEqual(expected);
  });

  test("Returns nodes that are within maximum depth.", () => {
    const depth = 3;
    const anchors: Anchors = [
      mockAnchors[2],
      mockAnchors[3],
      mockAnchors[4],
      mockAnchors[3],
      mockAnchors[2],
    ];
    const tree = tocTreeFromAnchors(anchors, depth);
    const expected: TocTree = [
      { ...mockNodes[2], children: [mockNodes[3], mockNodes[3]] },
      mockNodes[2],
    ];
    expect(tree).toEqual(expected);
  });

  test("Returns only first level if depth is 1.", () => {
    const depth = 1;
    const anchors: Anchors = [
      mockAnchors[2],
      mockAnchors[4],
      mockAnchors[2],
      mockAnchors[4],
      mockAnchors[1],
      mockAnchors[2],
      mockAnchors[1],
    ];
    const tree = tocTreeFromAnchors(anchors, depth);
    const expected: TocTree = [mockNodes[1], mockNodes[1]];
    expect(tree).toEqual(expected);
  });
});
