import { groq } from "next-sanity";

// Social Links
export const siteSettingsQuery = groq`
    *[_type == "siteSettings" && _id == "siteSettings"][0]{
        siteTitle,
        socialLinks
    }
`;

// Blog
export const minPostsQuery = groq`
    *[_type == "blogPost"]{
        _id,
        _createdAt,
        _updatedAt,
        title,
        "tags": tags[]->key,
        "slug": slug.current
    }   
`;
export const postsPathsQuery = groq`
    *[ _type == "blogPost" && defined(slug.current) ][] { slug }
`;
export const postFromSlugQuery = groq`
    *[ _type == "blogPost" && slug.current == $slug ][0] {
        ...,
        "tags": tags[]->key,
        "anchors": body[_type == "block" && style in ["ah2", "ah3", "ah4", "ah5"]] {
            "level": select(
                style == "ah2" => 1,
                style == "ah3" => 2,
                style == "ah4" => 3,
                style == "ah5" => 4
            ),
            "label": children[0].text,
            "id": array::join([...string::split(lower(children[0].text), " "), _key], "-")
        },
        body[] {
            _type == "block" && style in ["ah2", "ah3", "ah4", "ah5"] => {
                ...,
                "id": array::join([...string::split(lower(children[0].text), " "), _key], "-")
            },
            ...
        }
    }
`;
