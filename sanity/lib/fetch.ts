import { client } from "./client";
import { postsPathsQuery, postFromSlugQuery } from "./queries";
import type { PostsPathsQueryResult, PostFromSlugQueryResult } from "../types";

export const getPostsPaths = async (): Promise<PostsPathsQueryResult> => {
  return await client.fetch(postsPathsQuery);
};

export const getPostBySlug = async (
  slug: string
): Promise<PostFromSlugQueryResult> => {
  return await client.fetch(postFromSlugQuery, { slug });
};
