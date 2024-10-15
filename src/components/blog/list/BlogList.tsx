"use client";

import type { MinPostsQueryResult } from "@/sanity/types";

import useBlogFilter from "@/sanity/hooks/useBlogFilter";
import useBlogFilterQuery from "@/sanity/hooks/useBlogFilterQuery";
import { useEffect } from "react";

import BlogListCard from "./BlogListCard";
import BlogListFilter from "./BlogListFilter";

interface Props {
  posts: MinPostsQueryResult;
  tags: string[];
}
export default function BlogList({ posts, tags }: Props) {
  const [filteredPosts, filterActions, filterState] = useBlogFilter(posts, {});
  const [filterQuery, filterQueryReady] = useBlogFilterQuery();

  useEffect(() => {
    filterActions.all.set(filterQuery);
  }, [filterQuery, filterActions]);

  return (
    <div className="mx-8">
      <BlogListFilter filterState={filterState} filterActions={filterActions} />
      {filterQueryReady ? (
        <ul className="flex flex-col m-auto w-full my-12 gap-12">
          {filteredPosts.map((post) => (
            <BlogListCard
              post={post}
              key={post._id}
              addIncludedTagFn={filterActions.includeTags.add}
              addExcludedTagFn={filterActions.excludeTags.add}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
