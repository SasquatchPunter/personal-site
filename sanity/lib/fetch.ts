import { client } from "./client";
import { postsPathsQuery, postFromSlugQuery, minPostsQuery } from "./queries";
import type {
  PostsPathsQueryResult,
  PostFromSlugQueryResult,
  MinPostsQueryResult,
} from "../types";

export const getPostsPaths = async (): Promise<PostsPathsQueryResult> => {
  return await client.fetch(postsPathsQuery);
};

export const getPostBySlug = async (
  slug: string
): Promise<PostFromSlugQueryResult> => {
  return client.fetch(postFromSlugQuery, { slug });
};

export const getMinPosts = (): Promise<MinPostsQueryResult> => {
  return client.fetch(minPostsQuery);
};
