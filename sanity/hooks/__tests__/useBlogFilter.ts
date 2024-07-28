/**
 * @jest-environment jsdom
 */
import type { BlogFilterState } from "../useBlogFilter";
import type { MinPostsQueryResult } from "@/sanity/types";

import { act, renderHook } from "@testing-library/react";
import useBlogFilter from "../useBlogFilter";

describe("useBlogFilter()", () => {
  let hook = renderHook(() => useBlogFilter([]));
  const posts = () => hook.result.current[0];
  const actions = () => hook.result.current[1];
  const filter = () => hook.result.current[2];

  test("Should initialize with correct default.", () => {
    const { result } = renderHook(() => useBlogFilter([]));
    const filterState = result.current[2];
    expect(filterState).toEqual({});
  });

  test("Should initialize with initial filter object.", () => {
    const initialFilter: BlogFilterState = {
      includeTags: [],
      excludeTags: ["a", "b"],
      createdAfter: "2020",
      createdBefore: "2024",
      updatedAfter: "2021",
      updatedBefore: "2025",
    };
    const { result } = renderHook(() => useBlogFilter([], initialFilter));
    const filterState = result.current[2];
    expect(filterState).toEqual(initialFilter);
  });

  describe("Can call filter actions.", () => {
    describe.each(["includeTags", "excludeTags"] as (
      | "includeTags"
      | "excludeTags"
    )[])("actions.%s", (f) => {
      beforeEach(() => {
        hook = renderHook(() => useBlogFilter([]));
      });

      describe("add", () => {
        beforeEach(() => {
          hook = renderHook(() => useBlogFilter([]));
        });

        test("Can add single tag", () => {
          act(() => {
            actions()[f].add("a");
          });
          expect(filter()[f]).toEqual(["a"]);
        });

        test("Can add multiple tags", () => {
          act(() => {
            actions()[f].add("a", "b", "c");
          });
          expect(filter()[f]).toEqual(["a", "b", "c"]);
        });

        test("Duplicate tags are filtered", () => {
          act(() => {
            actions()[f].add("a", "b");
            actions()[f].add("b");
          });
          expect(filter()[f]).toEqual(["a", "b"]);
        });
      });

      describe("remove", () => {
        beforeEach(() => {
          hook = renderHook(() => useBlogFilter([]));
        });

        test("Can remove single tag", () => {
          act(() => {
            actions()[f].add("a");
            actions()[f].remove("a");
          });
          expect(filter()[f]).toEqual([]);
        });

        test("Can add multiple tags", () => {
          act(() => {
            actions()[f].add("a", "b", "c");
            actions()[f].remove("a", "b");
          });
          expect(filter()[f]).toEqual(["c"]);
        });
      });

      describe("unset", () => {
        beforeEach(() => {
          hook = renderHook(() => useBlogFilter([]));
        });

        test("Can be called on uninitialized filter", () => {
          act(() => {
            actions()[f].unset();
          });
          expect(filter()[f]).toBeUndefined();
        });

        test("Can be called on array with elements", () => {
          act(() => {
            actions()[f].add("a", "b");
            actions()[f].unset();
          });
          expect(filter()[f]).toBeUndefined();
        });

        test("Can be called on empty array", () => {
          act(() => {
            actions()[f].add("a");
            actions()[f].remove("a");
            actions()[f].unset();
          });
          expect(filter()[f]).toBeUndefined();
        });
      });
    });

    describe.each([
      "createdBefore",
      "createdAfter",
      "updatedBefore",
      "updatedAfter",
    ] as (
      | "createdBefore"
      | "createdAfter"
      | "updatedBefore"
      | "updatedAfter"
    )[])("actions.%s", (f) => {
      beforeEach(() => {
        hook = renderHook(() => useBlogFilter([]));
      });

      test("set", () => {
        act(() => {
          actions()[f].set("2020");
        });
        expect(filter()[f]).toBe("2020");
      });

      test("unset", () => {
        act(() => {
          actions()[f].set("2020");
          actions()[f].unset();
        });
        expect(filter()[f]).toBe(undefined);
      });
    });
  });

  describe("Filters posts", () => {
    const template: MinPostsQueryResult[0] = {
      _id: "",
      _createdAt: "",
      _updatedAt: "",
      title: "",
      slug: "",
      tags: null,
    };

    const mockPosts: MinPostsQueryResult = [
      {
        ...template,
        _id: "1",
        _createdAt: "2020-01-01",
        _updatedAt: "2020-02-01",
        tags: ["a", "b", "c"],
      },
      {
        ...template,
        _id: "2",
        _createdAt: "2019-01-01",
        _updatedAt: "2021-01-01",
        tags: ["d"],
      },
      {
        ...template,
        _id: "3",
        _createdAt: "2022-01-01",
        _updatedAt: "2024-06-01",
      },
      {
        ...template,
        _id: "4",
        _createdAt: "2020-06-01",
        _updatedAt: "2022-06-01",
        tags: ["a", "b"],
      },
    ];

    test.each(["includeTags", "excludeTags"] as Array<
      "includeTags" | "excludeTags"
    >)("Filters by `filter.%s`", (f) => {
      hook = renderHook(() =>
        useBlogFilter([...mockPosts], { [f]: ["a", "d"] })
      );

      if (f === "includeTags") {
        expect(posts()).toEqual([mockPosts[0], mockPosts[1], mockPosts[3]]);
      } else if (f === "excludeTags") {
        expect(posts()).toEqual([mockPosts[2]]);
      }
    });

    test.each([
      "createdBefore",
      "createdAfter",
      "updatedBefore",
      "updatedAfter",
    ] as Array<
      "createdBefore" | "createdAfter" | "updatedBefore" | "updatedAfter"
    >)("Filters by `filter.%s`", (f) => {
      hook = renderHook(() =>
        useBlogFilter([...mockPosts], { [f]: "2021-06-01" })
      );

      if (f === "createdBefore") {
        expect(posts()).toEqual([mockPosts[0], mockPosts[1], mockPosts[3]]);
      } else if (f === "createdAfter") {
        expect(posts()).toEqual([mockPosts[2]]);
      } else if (f === "updatedBefore") {
        expect(posts()).toEqual([mockPosts[0], mockPosts[1]]);
      } else if (f === "updatedAfter") {
        expect(posts()).toEqual([mockPosts[2], mockPosts[3]]);
      }
    });
  });
});
