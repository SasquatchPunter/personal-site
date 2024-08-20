import type {
  PostsPathsQueryResult,
  PostFromSlugQueryResult,
  MinPostsQueryResult,
  SiteSettingsQueryResult,
} from "../types";

import { client } from "./client";
import {
  postsPathsQuery,
  postFromSlugQuery,
  minPostsQuery,
  siteSettingsQuery,
} from "./queries";

export function getPostsPaths() {
  return client.fetch<PostsPathsQueryResult>(postsPathsQuery);
}
export function getPostBySlug(slug: string) {
  return client.fetch<PostFromSlugQueryResult>(postFromSlugQuery, { slug });
}
export function getMinPosts() {
  return client.fetch<MinPostsQueryResult>(minPostsQuery);
}
export function getSiteSettings() {
  return client.fetch<SiteSettingsQueryResult>(siteSettingsQuery);
}

export type GetPostsPaths = ReturnType<typeof getPostsPaths>;
export type GetPostBySlug = ReturnType<typeof getPostBySlug>;
export type GetMinPosts = ReturnType<typeof getMinPosts>;
export type GetSiteSettings = ReturnType<typeof getSiteSettings>;
