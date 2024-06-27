import { PortableText } from "next-sanity";

import block from "@/src/components/portableText/default/block";
import list from "@/src/components/portableText/default/list";
import marks from "@/src/components/portableText/default/marks";
import types from "@/src/components/portableText/default/types";

export default function Section(props: any) {
  return (
    <section className="flex flex-col gap-8">
      <PortableText
        value={props.value.children}
        components={{ block, list, marks, types }}
      />
    </section>
  );
}
