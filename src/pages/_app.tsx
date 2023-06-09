import "@/styles/globals.css";
import "tippy.js/dist/tippy.css"; // optional

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
