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
    <div className="rounded-xl overflow-hidden bg-stone-200 relative">
      {/* <div className="flex justify-between text-sm p-2">
        <span>{filename}</span>
      </div> */}
      <Light language={language} style={gruvboxDark} showLineNumbers>
        {code}
      </Light>
      <button className="absolute right-0 top-0 m-2" onClick={onClick}>
        Copy
      </button>
      {/* <span className="">{language}</span> */}
    </div>
  );
}
