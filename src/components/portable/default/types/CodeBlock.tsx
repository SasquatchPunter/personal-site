import type { PortableTextTypeComponentProps } from "@portabletext/react";
import { useCallback } from "react";
import { Light } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function CodeBlock(props: PortableTextTypeComponentProps<any>) {
  const { code, language, filename } = props.value;

  const onClick = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <div className="rounded-xl overflow-hidden bg-stone-200">
      {/* <div className="flex justify-between text-sm p-2">
        <span>{filename}</span>
      </div> */}
      <Light language={language} style={gruvboxDark} showLineNumbers>
        {code}
      </Light>
      {/* <span className="">{language}</span> */}
    </div>
  );
}
