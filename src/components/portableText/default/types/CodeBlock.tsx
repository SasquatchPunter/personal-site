import type { PortableTextTypeComponentProps } from "@portabletext/react";
import { useCallback } from "react";
import { Light } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function CodeBlock(props: PortableTextTypeComponentProps<any>) {
  const { code, language, filename } = props.value;

  const onClick = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <figure className="border-t-4 border-stone-600 overflow-hidden bg-stone-200 relative">
      <Light language={language} style={dracula} showLineNumbers>
        {`/* ${language} */\n${code}`}
      </Light>
      <button
        className="absolute right-0 top-0 m-3 p-1 bg-black opacity-50 hover:opacity-80 border border-white cursor-default"
        onClick={onClick}
      >
        Copy
      </button>
    </figure>
  );
}
