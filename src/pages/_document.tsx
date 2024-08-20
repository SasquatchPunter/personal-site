import { Html, Head, Main, NextScript } from "next/document";
import Body from "@/src/components/layout/shared/Body";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <Body>
        <Main />
        <NextScript />
      </Body>
    </Html>
  );
}
