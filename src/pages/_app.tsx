import "@/src/styles/globals.css";

import type { AppProps } from "next/app";

import CursorProvider from "@/src/contexts/CursorContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CursorProvider>
      <Component {...pageProps} />
    </CursorProvider>
  );
}
