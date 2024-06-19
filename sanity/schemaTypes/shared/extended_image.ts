import { defineType } from "sanity";

export default defineType({
  title: "Extended Image",
  name: "extended_image",
  type: "object",
  description: "Image extended with added options.",
  fields: [
    {
      title: "Image",
      name: "image",
      type: "image",
      validation(rule) {
        return rule.required();
      },
    },
    {
      title: "Caption",
      name: "caption",
      type: "string",
      description:
        "Displays as a caption beneath image components that support it.",
      validation(rule) {
        return rule.optional().min(8).max(200);
      },
    },
    {
      title: "Alt",
      name: "alt",
      type: "string",
      description: "Accessibility metadata attribute describing the image.",
      validation(rule) {
        return rule.optional().min(8).max(96);
      },
    },
    {
      title: "Title",
      name: "title",
      type: "string",
      description:
        "Accessibility metadata for generating tooltip text in certain browsers.",
      validation(rule) {
        return rule.optional().min(8).max(96);
      },
    },
  ],
});
