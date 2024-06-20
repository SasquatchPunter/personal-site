import { type SchemaTypeDefinition } from "sanity";

import blogBody from "./schemaTypes/blogBody";
import blogPost from "./schemaTypes/blogPost";
import blogTag from "./schemaTypes/blogTag";

import extendedImage from "./schemaTypes/shared/extendedImage";
import youtube from "./schemaTypes/shared/youtube";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogBody, blogPost, blogTag, extendedImage, youtube],
};
