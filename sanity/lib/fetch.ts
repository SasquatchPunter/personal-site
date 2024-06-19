import { client } from "./client";
import { postPathsQuery, postFromSlugQuery } from "./queries";

export const getPostPaths = async (slug: string) => {
  return await client.fetch(postPathsQuery, { slug });
};
export const getPostBySlug = async (slug: string) => {
  return await client.fetch(postFromSlugQuery, { slug });
};
