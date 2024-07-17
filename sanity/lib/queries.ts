import { groq } from "next-sanity";

// Blog
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
