import type { MinPostsQueryResult } from "../types";
import type { Dispatch } from "react";

import { useMemo, useReducer } from "react";
import { filterPosts } from "@/sanity/utils/blog";

enum ActionType {
  ADD_INCLUDED_TAGS,
  ADD_EXCLUDED_TAGS,
  REMOVE_INCLUDED_TAGS,
  REMOVE_EXCLUDED_TAGS,
  UNSET_INCLUDED_TAGS,
  UNSET_EXCLUDED_TAGS,
  SET_CREATED_BEFORE,
  SET_CREATED_AFTER,
  SET_UPDATED_BEFORE,
  SET_UPDATED_AFTER,
  UNSET_CREATED_BEFORE,
  UNSET_CREATED_AFTER,
  UNSET_UPDATED_BEFORE,
  UNSET_UPDATED_AFTER,
}

type Action =
  | {
      type:
        | ActionType.ADD_INCLUDED_TAGS
        | ActionType.ADD_EXCLUDED_TAGS
        | ActionType.REMOVE_INCLUDED_TAGS
        | ActionType.REMOVE_EXCLUDED_TAGS;
      payload: string[];
    }
  | {
      type: ActionType.UNSET_INCLUDED_TAGS | ActionType.UNSET_EXCLUDED_TAGS;
      payload?: any;
    }
  | {
      type:
        | ActionType.SET_CREATED_BEFORE
        | ActionType.SET_CREATED_AFTER
        | ActionType.SET_UPDATED_BEFORE
        | ActionType.SET_UPDATED_AFTER;
      payload: string;
    }
  | {
      type:
        | ActionType.UNSET_CREATED_BEFORE
        | ActionType.UNSET_CREATED_AFTER
        | ActionType.UNSET_UPDATED_BEFORE
        | ActionType.UNSET_UPDATED_AFTER;
      payload?: any;
    };

function filterDispatchers(dispatch: Dispatch<Action>) {
  return {
    includeTags: {
      add(...tags: string[]) {
        dispatch({ type: ActionType.ADD_INCLUDED_TAGS, payload: tags });
      },
      remove(...tags: string[]) {
        dispatch({ type: ActionType.REMOVE_INCLUDED_TAGS, payload: tags });
      },
      unset() {
        dispatch({ type: ActionType.UNSET_INCLUDED_TAGS });
      },
    },
    excludeTags: {
      add(...tags: string[]) {
        dispatch({ type: ActionType.ADD_EXCLUDED_TAGS, payload: tags });
      },
      remove(...tags: string[]) {
        dispatch({ type: ActionType.REMOVE_EXCLUDED_TAGS, payload: tags });
      },
      unset() {
        dispatch({ type: ActionType.UNSET_EXCLUDED_TAGS });
      },
    },
    createdBefore: {
      set(date: string) {
        dispatch({ type: ActionType.SET_CREATED_BEFORE, payload: date });
      },
      unset() {
        dispatch({ type: ActionType.UNSET_CREATED_BEFORE });
      },
    },
    createdAfter: {
      set(date: string) {
        dispatch({ type: ActionType.SET_CREATED_AFTER, payload: date });
      },
      unset() {
        dispatch({ type: ActionType.UNSET_CREATED_AFTER });
      },
    },
    updatedBefore: {
      set(date: string) {
        dispatch({ type: ActionType.SET_UPDATED_BEFORE, payload: date });
      },
      unset() {
        dispatch({ type: ActionType.UNSET_UPDATED_BEFORE });
      },
    },
    updatedAfter: {
      set(date: string) {
        dispatch({ type: ActionType.SET_UPDATED_AFTER, payload: date });
      },
      unset() {
        dispatch({ type: ActionType.UNSET_UPDATED_AFTER });
      },
    },
  };
}

function filterReducer(
  filter: BlogFilterState,
  action: Action
): BlogFilterState {
  const { type, payload } = action;

  let includeTags: string[] = filter.includeTags ? [...filter.includeTags] : [];
  let excludeTags: string[] = filter.excludeTags ? [...filter.excludeTags] : [];

  switch (type) {
    case ActionType.ADD_INCLUDED_TAGS:
      for (const tag of payload) {
        if (!includeTags.includes(tag)) {
          includeTags.push(tag);
        }
      }
      return { ...filter, includeTags: includeTags.sort() };

    case ActionType.ADD_EXCLUDED_TAGS:
      for (const tag of payload) {
        if (!excludeTags.includes(tag)) {
          excludeTags.push(tag);
        }
      }
      return { ...filter, excludeTags: excludeTags.sort() };

    case ActionType.REMOVE_INCLUDED_TAGS:
      includeTags = includeTags.filter((tag) => !payload.includes(tag));
      return { ...filter, includeTags };

    case ActionType.REMOVE_EXCLUDED_TAGS:
      excludeTags = excludeTags.filter((tag) => !payload.includes(tag));
      return { ...filter, excludeTags };

    case ActionType.UNSET_INCLUDED_TAGS:
      delete filter.includeTags;
      return { ...filter };

    case ActionType.UNSET_EXCLUDED_TAGS:
      delete filter.excludeTags;
      return { ...filter };

    case ActionType.SET_CREATED_BEFORE:
      return { ...filter, createdBefore: payload };

    case ActionType.SET_CREATED_AFTER:
      return { ...filter, createdAfter: payload };

    case ActionType.SET_UPDATED_BEFORE:
      return { ...filter, updatedBefore: payload };

    case ActionType.SET_UPDATED_AFTER:
      return { ...filter, updatedAfter: payload };

    case ActionType.UNSET_CREATED_BEFORE:
      delete filter.createdBefore;
      return { ...filter };

    case ActionType.UNSET_CREATED_AFTER:
      delete filter.createdAfter;
      return { ...filter };

    case ActionType.UNSET_UPDATED_BEFORE:
      delete filter.updatedBefore;
      return { ...filter };

    case ActionType.UNSET_UPDATED_AFTER:
      delete filter.updatedAfter;
      return { ...filter };

    default:
      throw new Error(ACTION_TYPE_UNSUPPORTED_ERROR);
  }
}

export type BlogFilterOutput = MinPostsQueryResult;
export type BlogFilterState = {
  /** Tags to include when filtering. An empty array allows only posts that are tagged. */
  includeTags?: string[];
  /** Tags to exclude when filtering. */
  excludeTags?: string[];
  /** Posts created after this date are filtered out. */
  createdBefore?: string;
  /** Posts created before this date are filtered out. */
  createdAfter?: string;
  /** Posts updated after this date are filterd out. */
  updatedBefore?: string;
  /** Posts updated before this date are filtered out. */
  updatedAfter?: string;
};
export type BlogFilterActions = ReturnType<typeof filterDispatchers>;

export const ACTION_TYPE_UNSUPPORTED_ERROR =
  "An unsupported filter action was used!";

/**
 *
 * @param posts Pass in original unfiltered posts
 * @param initialFilter Optional filter object to initialize to
 * @returns An array containing the filtered posts, filter actions, and the filter state object.
 */
export default function useBlogFilter(
  posts: MinPostsQueryResult,
  initialFilter: BlogFilterState = {}
): [BlogFilterOutput, BlogFilterActions, BlogFilterState] {
  const [filterState, dispatch] = useReducer(filterReducer, initialFilter);

  const filteredPosts = useMemo(() => {
    return filterPosts(posts, filterState);
  }, [posts, filterState]);

  const filterActions = useMemo(() => filterDispatchers(dispatch), []);

  return [filteredPosts, filterActions, filterState];
}
