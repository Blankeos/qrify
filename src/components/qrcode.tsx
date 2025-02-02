import * as QRCodeLib from "qrcode";
import { createEffect, VoidProps } from "solid-js";

type QRCodeProps = {
  value: string;
  fg?: string;
  bg?: string;
};

export function QRCode(props: VoidProps<QRCodeProps>) {
  let qrCanvasRef!: HTMLCanvasElement;

  createEffect(() => {
    QRCodeLib.toCanvas(
      qrCanvasRef,
      props.value,
      {
        color: {
          dark: props.fg, // fg
          light: props.bg, // bg
        },
        margin: 0,
        scale: 10,
      },
      function (error: any) {
        if (error) console.error(error);
      }
    );
  });
  return <canvas class="" ref={qrCanvasRef} />;
}
