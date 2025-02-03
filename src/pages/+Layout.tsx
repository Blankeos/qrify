import getTitle from "@/utils/get-title";
import { type FlowProps } from "solid-js";
import { useMetadata } from "vike-metadata-solid";

import "@/styles/app.css";
import "tippy.js/dist/tippy.css";

useMetadata.setGlobalDefaults({
  title: getTitle("Home"),
  description: "Dead-simple String to QR Code.",
  otherJSX: () => (
    <>
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
});

export default function RootLayout(props: FlowProps) {
  return <div>{props.children}</div>;
}
