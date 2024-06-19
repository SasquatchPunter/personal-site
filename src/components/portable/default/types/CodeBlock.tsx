import type { PortableTextTypeComponentProps } from "@portabletext/react";
import type { CodeInputProps } from "@sanity/code-input";
import { Light } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function CodeBlock(
  props: CodeInputProps & PortableTextTypeComponentProps<CodeInputProps>
) {
  const { code, language, filename } = props.value;

  return (
    <div className="rounded-xl overflow-hidden bg-stone-200">
      <div className="flex justify-between text-sm p-2">
        <span>{filename}</span>
      </div>
      {/* <Light language={language} style={gruvboxDark} showLineNumbers>
        {code}
      </Light> */}
      <span className="ml-auto">{language}</span>
    </div>
  );
}
