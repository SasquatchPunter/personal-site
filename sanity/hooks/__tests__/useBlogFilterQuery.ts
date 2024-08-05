/**
 * @jest-environment jsdom
 */
import type { BlogFilterState } from "../useBlogFilter";

import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";

import useBlogFilterQuery from "../useBlogFilterQuery";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("useBlogFilterQuery()", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} });
  });

  test("Should handle undefined query parameters.", () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} });
    const filterState = renderHook(() => useBlogFilterQuery()).result
      .current[0];
    expect(filterState).toMatchObject({});
  });

  test("Should return parsed query params as BlogFilterState.", () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        includeTags: "a,b",
        excludeTags: "c,d",
        createdBefore: "2021",
        createdAfter: "2020",
        updatedBefore: "2022",
        updatedAfter: "2021",
      },
    });
    const filterState = renderHook(() => useBlogFilterQuery()).result
      .current[0];
    expect(filterState).toMatchObject<BlogFilterState>({
      includeTags: ["a", "b"],
      excludeTags: ["c", "d"],
      createdBefore: "2021",
      createdAfter: "2020",
      updatedBefore: "2022",
      updatedAfter: "2021",
    });
  });
});
