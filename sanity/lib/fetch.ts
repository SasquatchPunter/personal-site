import { client } from "./client";
import { postsPathsQuery, postFromSlugQuery, minPostsQuery } from "./queries";
import type {
  PostsPathsQueryResult,
  PostFromSlugQueryResult,
  MinPostsQueryResult,
} from "../types";

export const getPostsPaths = (): Promise<PostsPathsQueryResult> => {
  return client.fetch(postsPathsQuery);
};

export const getPostBySlug = (
  slug: string
): Promise<PostFromSlugQueryResult> => {
  return client.fetch(postFromSlugQuery, { slug });
};

export const getMinPosts = (): Promise<MinPostsQueryResult> => {
  return client.fetch(minPostsQuery);
};
