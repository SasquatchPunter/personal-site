import type { BlogFilterState } from "./useBlogFilter";
import type { PickUnion } from "@/src/utils/types";

import { useMemo } from "react";
import { useRouter } from "next/router";

function coerceTags(
  input: string | string[] | undefined
): PickUnion<BlogFilterState, "includeTags" | "excludeTags"> {
  return typeof input === "string" ? input.split(",") : input;
}

function coerceDate(
  input: string | string[] | undefined
): PickUnion<
  BlogFilterState,
  "createdBefore" | "createdAfter" | "updatedBefore" | "updatedAfter"
> {
  return typeof input === "object" || input?.length === 0 ? undefined : input;
}

/**
 * Hook that parses the query params with Next's own useRouter hook into a BlogFilterState object.
 * @returns An array containing the parsed query object,
 */
export default function useBlogFilterQuery(): [BlogFilterState, boolean] {
  const { query, isReady } = useRouter();

  const filterQuery = useMemo(
    () => ({
      includeTags: coerceTags(query.includeTags),
      excludeTags: coerceTags(query.excludeTags),
      createdBefore: coerceDate(query.createdBefore),
      createdAfter: coerceDate(query.createdAfter),
      updatedBefore: coerceDate(query.updatedBefore),
      updatedAfter: coerceDate(query.updatedAfter),
    }),
    [query]
  );

  return [filterQuery, isReady];
}
