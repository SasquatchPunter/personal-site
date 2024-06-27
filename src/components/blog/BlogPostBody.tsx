import { PortableText, type PortableTextBlock } from "next-sanity";

import block from "@/src/components/portableText/default/block";
import list from "@/src/components/portableText/default/list";
import marks from "@/src/components/portableText/default/marks";
import types from "@/src/components/portableText/default/types";

import { wrapSections, getSectionRanges } from "@/src/utils/portableText";

interface Props {
  body: PortableTextBlock[];
}
export default function BlogPostBody({ body }: Props) {
  const processedBody = wrapSections(body, getSectionRanges(body));
  return (
    <PortableText
      value={processedBody}
      components={{ block, list, marks, types }}
    />
  );
}
