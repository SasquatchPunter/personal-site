import { groq } from "next-sanity";

// Blog
export const postPathsQuery = groq`*[ _type == "blog_post" ] { slug }`;
export const postFromSlugQuery = groq`*[ _type == "blog_post" && slug.current == $slug ]`;
