import { defineType } from "sanity";

export default defineType({
  title: "Blog Body",
  name: "blog_body",
  type: "array",
  of: [
    { type: "block" },
    { title: "Simple Image", type: "image" },
    { title: "Extended Image", type: "extended_image" },
    { type: "code", options: { withFilename: true } },
    { title: "Youtube Embed", type: "youtube" },
  ],
});
