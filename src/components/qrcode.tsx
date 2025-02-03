import { generateSVGString } from "@intosoft/qrcode";
import { createEffect, VoidProps } from "solid-js";

type QRCodeProps = {
  value: string;
  fg?: string;
  bg?: string;
};

export function QRCode(props: VoidProps<QRCodeProps>) {
  let qrCanvasRef!: SVGSVGElement;

  createEffect(() => {
    const svgString = generateSVGString({
      value: props.value,
      colors: {
        background: props.bg ?? "black",
        body: props.fg ?? "black",
        eyeFrame: {
          bottomLeft: props.fg ?? "black",
          topLeft: props.fg ?? "black",
          topRight: props.fg ?? "black",
        },
        eyeball: {
          bottomLeft: props.fg ?? "black",
          topLeft: props.fg ?? "black",
          topRight: props.fg ?? "black",
        },
      },
      length: 24,
      padding: 0,
      shapes: {
        body: "square",
        eyeFrame: "body",
        eyeball: "body",
      },
      errorCorrectionLevel: "medium",
    });

    qrCanvasRef.innerHTML = svgString.toString();
  });

  return (
    <svg ref={qrCanvasRef} viewBox="0 0 24 24" width="32" height="32" class="h-[250px] w-[250px]" />
  );
}
