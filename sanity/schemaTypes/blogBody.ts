import { defineType } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";
import { Highlight } from "@/src/components/studio/block/marks/decorators";
import {
  AnchoredHeading1,
  AnchoredHeading2,
  AnchoredHeading3,
  AnchoredHeading4,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "@/src/components/studio/block/styles";

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
        { title: "Heading 1", value: "h2", component: Heading1 },
        { title: "Heading 2", value: "h3", component: Heading2 },
        { title: "Heading 3", value: "h4", component: Heading3 },
        { title: "Heading 4", value: "h5", component: Heading4 },
        {
          title: "Anchored Heading 1",
          value: "ah2",
          component: AnchoredHeading1,
        },
        {
          title: "Anchored Heading 2",
          value: "ah3",
          component: AnchoredHeading2,
        },
        {
          title: "Anchored Heading 3",
          value: "ah4",
          component: AnchoredHeading3,
        },
        {
          title: "Anchored Heading 4",
          value: "ah5",
          component: AnchoredHeading4,
        },
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
