import { groq } from "next-sanity";

// Blog
export const postsPathsQuery = groq`
*[ _type == "blogPost" && defined(slug.current) ][] { slug }
`;
export const postFromSlugQuery = groq`
*[ _type == "blogPost" && slug.current == $slug ][0] {
    ...,
    'tags': tags[]->key
}
`;
