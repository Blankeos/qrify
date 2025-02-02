import { toPng } from "html-to-image";
import { nanoid } from "nanoid";
import { createSignal } from "solid-js";
import { QRCodeSVG as QrCode } from "solid-qr-code";
// import { addNote, notes } from "../store";
// import { useStore } from "@nanostores/react";
import { ColorPicker } from "./color-picker";

import RangePicker from "./range-picker";

// Icon
import { IconBorderRadius, IconLoading, IconMargin } from "@/assets";

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
      <p class="text-center mb-1.5 text-gray-600 font-normal">
        Enter a link and see the QR Code Change
      </p>
      <input
        class="border w-full p-2 mb-5"
        type="text"
        name="qrValue"
        id="qrValue"
        placeholder="https://carlo.vercel.app/"
        onChange={(e) => setQRValue(e.target.value)}
      />
      <div class="flex flex-col items-center gap-y-5">
        <div class="flex gap-2 justify-between w-full flex-col sm:flex-row">
          <div class="flex justify-center gap-3 sm:flex-col sm:items-start sm:justify-start">
            {/* Color Picker */}
            <ColorPicker
              hoverContent="Foreground"
              color={fgColor()}
              setColor={setFgColor}
              enableAlpha={true}
            />
            <ColorPicker
              hoverContent="Background"
              color={bgColor()}
              setColor={setBgColor}
            />
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
              <QrCode
                value={qrValue()}
                backgroundColor={bgColor()}
                backgroundAlpha={0}
                foregroundAlpha={0}
                foregroundColor={fgColor()}
                height={20}
                level={"low"}
                width={20}
              />
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
              <IconMargin class="text-gray-600 w-[2.5rem]" />
            </RangePicker>
            <RangePicker
              name="Border Radius"
              value={borderRadiusValue()}
              setValue={setBorderRadiusValue}
              max={25}
              min={0}
            >
              <IconBorderRadius class="text-gray-600 w-[2.5rem]" />
            </RangePicker>
          </div>
        </div>
        <button
          disabled={isLoading()}
          onClick={handleDownloadClick}
          class="grid place-items-center bg-gray-900 text-white py-2 px-20 rounded-md disabled:opacity-50"
        >
          <span class={`${isLoading() ? "opacity-0" : "opacity-100"}`}>
            Download
          </span>
          <IconLoading
            class={`animate-spin absolute w-[1.3rem] ${
              isLoading() ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default StringToQRCode;
