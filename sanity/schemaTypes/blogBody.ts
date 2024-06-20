import { defineType } from "sanity";

export default defineType({
  title: "Blog Body",
  name: "blogBody",
  type: "array",
  of: [
    { type: "block" },
    { title: "Simple Image", type: "image" },
    { title: "Extended Image", type: "extendedImage" },
    { type: "code", options: { withFilename: true } },
    { title: "Youtube Embed", type: "youtube" },
  ],
});
