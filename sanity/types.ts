import type { GetSiteSettings } from "@/sanity/lib/fetch";
export type { GetSiteSettings } from "@/sanity/lib/fetch";
export type {
  PostsPathsQueryResult,
  PostFromSlugQueryResult,
  MinPostsQueryResult,
  SiteSettingsQueryResult,
  BlogPost,
  BlogBody,
  BlogTag,
} from "@/sanity/typegen";

export type SocialLinks = NonNullable<Awaited<GetSiteSettings>>["socialLinks"];
export type SocialLinkKey = keyof NonNullable<SocialLinks>;
