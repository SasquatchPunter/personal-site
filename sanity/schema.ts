import { type SchemaTypeDefinition } from "sanity";

import blog_body from "./schemaTypes/blog_body";
import blog_post from "./schemaTypes/blog_post";
import blog_tag from "./schemaTypes/blog_tag";

import extended_image from "./schemaTypes/shared/extended_image";
import youtube from "./schemaTypes/shared/youtube";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog_body, blog_post, blog_tag, extended_image, youtube],
};
