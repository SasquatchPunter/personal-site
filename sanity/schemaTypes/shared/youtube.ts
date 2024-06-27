import { defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";
import YoutubePreview from "@/src/components/studio/block/YoutubePreview";

export default defineType({
  title: "Youtube",
  name: "youtube",
  type: "object",
  icon: PlayIcon,
  fields: [
    {
      title: "Url",
      name: "url",
      type: "url",
      validation(rule) {
        return rule.required().uri();
      },
    },
  ],
  preview: { select: { title: "url" } },
  components: {
    preview: YoutubePreview,
  },
});
