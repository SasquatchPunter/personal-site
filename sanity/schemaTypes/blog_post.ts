import { defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  title: "Blog Post",
  name: "blog_post",
  type: "document",
  icon: BookIcon,
  fields: [
    { title: "Title", name: "title", type: "string" },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation(rule) {
        return rule.required();
      },
    },
    { title: "Main Image", name: "mainImage", type: "image" },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          title: "Tag",
          name: "tag",
          type: "reference",
          to: [{ type: "blog_tag" }],
        },
      ],
    },
    {
      title: "Excerpt",
      name: "excerpt",
      type: "text",
      rows: 4,
      validation(rule) {
        return rule.min(20).max(200);
      },
    },
    { title: "Body", name: "body", type: "blog_body" },
  ],
});
