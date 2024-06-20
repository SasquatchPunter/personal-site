import type { PortableTextBlock } from "next-sanity";

import { PortableText } from "next-sanity";
import block from "@/src/components/portable/default/block";
import list from "@/src/components/portable/default/list";
import marks from "../portable/default/marks";
import types from "../portable/default/types";

interface Props {
  body: PortableTextBlock[];
}
export default function BlogBody({ body }: Props) {
  return (
    <main className="m-4 p-4 border-gray-500 border flex flex-col gap-8">
      <PortableText value={body} components={{ block, list, marks, types }} />
    </main>
  );
}
