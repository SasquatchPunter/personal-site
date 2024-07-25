import type { MinPostsQueryResult } from "@/sanity/types";
import type { Anchor, Anchors, TocLeaf, TocTree } from "../blog";

import { tocTreeFromAnchors, filterPosts } from "../blog";

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

describe("filterPosts()", () => {
  const template: MinPostsQueryResult[0] = {
    _id: "",
    _createdAt: "",
    _updatedAt: "",
    title: "",
    slug: "",
    tags: [],
  };

  describe("Filters by tags.", () => {
    const posts: MinPostsQueryResult = [
      { ...template, tags: ["programming"] },
      { ...template, tags: [] },
      { ...template, tags: ["programming", "cms"] },
      { ...template, tags: ["beginner"] },
    ];

    test("Returns all when filters aren't set", () => {
      expect(filterPosts(posts, {})).toEqual(posts);
    });

    test("Filters by included tags.", () => {
      expect(filterPosts(posts, { includeTags: ["programming"] })).toEqual([
        posts[0],
        posts[2],
      ]);
      expect(filterPosts(posts, { includeTags: ["cms", "beginner"] })).toEqual([
        posts[2],
        posts[3],
      ]);
      expect(filterPosts(posts, { includeTags: [] })).toEqual([]);
      expect(filterPosts(posts, { includeTags: ["fake tag"] })).toEqual([]);
    });

    test("Filters by excluded tags.", () => {
      expect(filterPosts(posts, { excludeTags: ["programming"] })).toEqual([
        posts[1],
        posts[3],
      ]);
      expect(filterPosts(posts, { excludeTags: ["cms", "beginner"] })).toEqual([
        posts[0],
        posts[1],
      ]);
      expect(filterPosts(posts, { excludeTags: [] })).toEqual(posts);
      expect(filterPosts(posts, { excludeTags: ["fake tag"] })).toEqual(posts);
    });
  });

  describe("Filters by _createdAt.", () => {
    const posts: MinPostsQueryResult = [
      { ...template, _id: "1", _createdAt: "2000-01-01T00:00:00Z" },
      { ...template, _id: "2", _createdAt: "2000-01-02T00:00:00Z" },
      { ...template, _id: "3", _createdAt: "2000-01-03T00:00:00Z" },
      { ...template, _id: "4", _createdAt: "2000-01-04T00:00:00Z" },
    ];

    test("Filters by createdBefore.", () => {
      expect(
        filterPosts(posts, { createdBefore: "1999-12-31T23:59:59Z" })
      ).toEqual([]);
      expect(
        filterPosts(posts, { createdBefore: "2010-01-01T00:00:00Z" })
      ).toEqual(posts);
      expect(
        filterPosts(posts, { createdBefore: "2000-01-03T00:00:00Z" })
      ).toEqual([posts[0], posts[1]]);
    });

    test("Filters by createdAfter.", () => {
      expect(
        filterPosts(posts, { createdAfter: "2000-01-01T00:00:00Z" })
      ).toEqual([posts[1], posts[2], posts[3]]);
      expect(
        filterPosts(posts, { createdAfter: "2010-01-01T00:00:00Z" })
      ).toEqual([]);
      expect(
        filterPosts(posts, { createdAfter: "1999-12-31T23:59:59Z" })
      ).toEqual(posts);
    });
  });

  describe("Filters by _updatedAt.", () => {
    const posts: MinPostsQueryResult = [
      { ...template, _id: "1", _updatedAt: "2000-01-01T00:00:00Z" },
      { ...template, _id: "2", _updatedAt: "2000-01-02T00:00:00Z" },
      { ...template, _id: "3", _updatedAt: "2000-01-03T00:00:00Z" },
      { ...template, _id: "4", _updatedAt: "2000-01-04T00:00:00Z" },
    ];

    test("Filters by updatedBefore.", () => {
      expect(
        filterPosts(posts, { updatedBefore: "1999-12-31T23:59:59Z" })
      ).toEqual([]);
      expect(
        filterPosts(posts, { updatedBefore: "2010-01-01T00:00:00Z" })
      ).toEqual(posts);
      expect(
        filterPosts(posts, { updatedBefore: "2000-01-03T00:00:00Z" })
      ).toEqual([posts[0], posts[1]]);
    });

    test("Filters by updatedAfter.", () => {
      expect(
        filterPosts(posts, { updatedAfter: "2000-01-01T00:00:00Z" })
      ).toEqual([posts[1], posts[2], posts[3]]);
      expect(
        filterPosts(posts, { updatedAfter: "2010-01-01T00:00:00Z" })
      ).toEqual([]);
      expect(
        filterPosts(posts, { updatedAfter: "1999-12-31T23:59:59Z" })
      ).toEqual(posts);
    });
  });
});
