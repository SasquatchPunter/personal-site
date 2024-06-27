import SectionRule from "@/src/components/studio/block/SectionRule";
import { defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export default defineType({
  title: "Section Rule",
  type: "object",
  name: "sectionRule",
  description:
    "A rule that wraps content into sections. Content must be nested between rules to be wrapped. Rules can optionally be set to render on the frontend.",
  icon: BlockElementIcon,
  fields: [
    {
      title: "Visible",
      type: "boolean",
      name: "visible",
      initialValue: false,
      description: "Sets whether this rule will be rendered on the frontend.",
    },
  ],
  preview: { select: { visible: "visible" } },
  components: { preview: SectionRule },
});
