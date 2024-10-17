import type { SchemaTypeDefinition } from "sanity";

import siteSettings from "./schemaTypes/siteSettings";

import blogBody from "./schemaTypes/blogBody";
import blogPost from "./schemaTypes/blogPost";
import blogTag from "./schemaTypes/blogTag";

import defaultImage from "./schemaTypes/shared/defaultImage";
import youtube from "./schemaTypes/shared/youtube";
import sectionRule from "./schemaTypes/shared/sectionRule";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    blogBody,
    blogPost,
    blogTag,
    defaultImage,
    youtube,
    sectionRule,
  ],
};
