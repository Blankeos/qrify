import { toPng } from "html-to-image";
import { nanoid } from "nanoid";
import { createSignal } from "solid-js";
// import { addNote, notes } from "../store";
// import { useStore } from "@nanostores/react";
import { ColorPicker } from "./color-picker";

import RangePicker from "./range-picker";

// Icon
import { IconBorderRadius, IconLoading, IconMargin } from "@/assets";
import { QRCode } from "./qrcode";

const StringToQRCode = () => {
  let qrRef!: HTMLDivElement;
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  // Settings
  const [fgColor, setFgColor] = createSignal<string>("#0073F5");
  const [bgColor, setBgColor] = createSignal<string>("#ffffff");
  const [qrValue, setQRValue] = createSignal("https://carlo.vercel.app");
  const [paddingValue, setPaddingValue] = createSignal<number>(20);
  const [borderRadiusValue, setBorderRadiusValue] = createSignal<number>(12);

  // const [userNote, setUserNote] = createSignal("");
  // const $notes = useStore(notes);

  const handleDownloadClick = () => {
    if (qrRef === null) {
      return;
    }

    setIsLoading(true);

    toPng(qrRef, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${nanoid(5)}.png`;
        link.href = dataUrl;
        link.click();
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <>
      <p class="mb-1.5 text-center font-normal text-gray-600">
        Enter a link and see the QR Code Change
      </p>
      <input
        class="mb-5 w-full rounded-md border border-gray-300 bg-white p-2"
        type="text"
        name="qrValue"
        id="qrValue"
        placeholder="https://carlo.vercel.app/"
        onInput={(e) => setQRValue(e.target.value)}
      />
      <div class="flex flex-col items-center gap-y-5">
        <div class="flex w-full flex-col justify-between gap-2 sm:flex-row">
          <div class="flex justify-center gap-3 sm:flex-col sm:items-start sm:justify-start">
            {/* Color Picker */}
            <ColorPicker
              hoverContent="Foreground"
              color={fgColor()}
              setColor={setFgColor}
              enableAlpha={true}
            />
            <ColorPicker hoverContent="Background" color={bgColor()} setColor={setBgColor} />
          </div>
          {/* START: QR CODE */}
          <div class="grid place-items-center">
            <div
              ref={qrRef}
              class="rounded-xl"
              style={{
                "background-color": bgColor(),
                padding: `${paddingValue()}px`,
                "border-radius": `${borderRadiusValue()}px`,
              }}
            >
              <QRCode value={qrValue()} bg={bgColor()} fg={fgColor()} />
            </div>
          </div>
          {/* END: QR CODE */}
          <div class="flex justify-center gap-3 sm:flex-col sm:items-start sm:justify-start">
            <RangePicker
              name="Padding"
              value={paddingValue()}
              setValue={setPaddingValue}
              max={50}
              min={0}
            >
              <IconMargin class="w-[2.5rem] text-gray-600" />
            </RangePicker>
            <RangePicker
              name="Border Radius"
              value={borderRadiusValue()}
              setValue={setBorderRadiusValue}
              max={25}
              min={0}
            >
              <IconBorderRadius class="w-[2.5rem] text-gray-600" />
            </RangePicker>
          </div>
        </div>

        <div class="flex gap-x-2">
          <button
            disabled={isLoading()}
            onClick={handleDownloadClick}
            class="grid place-items-center rounded-md bg-gray-900 px-20 py-2 text-white disabled:opacity-50"
          >
            <span class={`${isLoading() ? "opacity-0" : "opacity-100"}`}>Download</span>
            <IconLoading
              class={`absolute w-[1.3rem] animate-spin ${isLoading() ? "opacity-100" : "opacity-0"}`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default StringToQRCode;
