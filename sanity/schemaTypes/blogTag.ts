import { defineType } from "sanity";
import { TagsIcon } from "@sanity/icons";

export default defineType({
  title: "Blog Tag",
  name: "blogTag",
  type: "document",
  icon: TagsIcon,
  fields: [
    {
      title: "Key",
      name: "key",
      type: "string",
      description: "[REQUIRED] Tag key. This is how the tag gets referenced.",
      validation(rule) {
        return rule.required().min(2).max(64).lowercase();
      },
    },
  ],
});
