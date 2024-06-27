import { defineType } from "sanity";
import DefaultImage from "@/src/components/studio/block/DefaultImage";

export default defineType({
  title: "Image",
  name: "defaultImage",
  type: "image",
  validation(rule) {
    return rule.required().assetRequired();
  },
  preview: { select: { caption: "caption", media: "asset", title: "title" } },
  components: { preview: DefaultImage },
  fieldsets: [
    {
      title: "Image Data",
      name: "data",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      title: "Caption",
      type: "text",
      name: "caption",
      description:
        "[OPTIONAL] Caption for this image that is displayed with the image.",
      validation(rule) {
        return rule.optional().min(8).max(200);
      },
      rows: 1,
      fieldset: "data",
    },
    {
      title: "Title",
      type: "text",
      name: "title",
      description:
        "[OPTIONAL] Title for accessibility. Used by screen readers to announce an image.",
      validation(rule) {
        return rule.optional().min(8).max(96);
      },
      rows: 1,
      fieldset: "data",
    },
    {
      title: "Alt",
      type: "text",
      name: "alt",
      description:
        "[OPTIONAL] Alt image text for accessibility. Used by screen readers to describe an image.",
      validation(rule) {
        return rule.optional().min(8).max(200);
      },
      rows: 1,
      fieldset: "data",
    },
  ],
});
