import { defineType } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";
import { Highlight } from "@/src/components/studio/block/marks/decorators";

export default defineType({
  title: "Blog Body",
  name: "blogBody",
  type: "array",
  of: [
    {
      title: "Content",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Quote", value: "blockquote" },
        { title: "Heading", value: "h2" },
        { title: "Sub Heading 1", value: "h3" },
        { title: "Sub Heading 2", value: "h4" },
        { title: "Sub Heading 3", value: "h5" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Inline Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike Through", value: "strike-through" },
          {
            title: "Highlight",
            value: "highlight",
            component: Highlight,
            icon: BulbOutlineIcon,
          },
        ],
        annotations: [
          {
            title: "Link",
            type: "object",
            name: "link",
            fields: [{ title: "Url", type: "string", name: "url" }],
          },
        ],
      },
    },
    { type: "sectionRule" },
    { title: "Image", type: "defaultImage" },
    { title: "Code", type: "code", options: { withFilename: true } },
    { title: "Youtube", type: "youtube" },
  ],
});
