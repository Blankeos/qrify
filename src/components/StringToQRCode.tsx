import React, { useState, useCallback, useRef } from "react";
import { nanoid } from "nanoid";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
// import { addNote, notes } from "../store";
// import { useStore } from "@nanostores/react";
import { VscLoading as LoadingIcon } from "react-icons/vsc";
import { ColorPicker } from "./ColorPicker";

import MarginPicker from "./MarginPicker";

// Icon
import {
  TbBoxMargin as PaddingIcon,
  TbBorderRadius as BorderRadiusIcon,
} from "react-icons/tb";

const StringToQRCode = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Settings
  const [fgColor, setFgColor] = useState<string>("#0073F5");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [qrValue, setQRValue] = useState("https://carlo.vercel.app");
  const [paddingValue, setPaddingValue] = useState<number>(20);
  const [borderRadiusValue, setBorderRadiusValue] = useState<number>(12);

  // const [userNote, setUserNote] = useState("");
  // const $notes = useStore(notes);

  const handleDownloadClick = useCallback(() => {
    if (qrRef.current === null) {
      return;
    }

    setIsLoading(true);

    toPng(qrRef.current, { cacheBust: true })
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrRef]);

  return (
    <>
      <p className="text-center mb-1.5 text-gray-600 font-normal">
        Enter a link and see the QR Code Change
      </p>
      <input
        className="border w-full p-2 mb-5"
        type="text"
        name="qrValue"
        id="qrValue"
        placeholder="https://carlo.vercel.app/"
        onChange={(e) => setQRValue(e.target.value)}
      />
      <div className="flex flex-col items-center gap-y-5">
        <div className="flex gap-2 justify-between w-full flex-col sm:flex-row">
          <div className="flex justify-center gap-3 sm:flex-col sm:items-start sm:justify-start">
            {/* Color Picker */}
            <ColorPicker
              hoverContent="Foreground"
              color={fgColor}
              setColor={setFgColor}
            />
            <ColorPicker
              hoverContent="Background"
              color={bgColor}
              setColor={setBgColor}
            />
          </div>
          {/* START: QR CODE */}
          <div className="grid place-items-center">
            <div
              ref={qrRef}
              className="rounded-xl"
              style={{
                backgroundColor: bgColor,
                padding: `${paddingValue}px`,
                borderRadius: `${borderRadiusValue}px`,
              }}
            >
              <QRCode
                value={qrValue}
                fgColor={fgColor}
                bgColor={bgColor}
                bbox="2rem"
                // ascent={}
              />
            </div>
          </div>
          {/* END: QR CODE */}
          <div className="flex justify-center gap-3 sm:flex-col sm:items-start sm:justify-start">
            <MarginPicker
              name="Padding"
              value={paddingValue}
              setValue={setPaddingValue}
              max={50}
              min={0}
            >
              <PaddingIcon size="2.5rem" className="text-gray-600" />
            </MarginPicker>
            <MarginPicker
              name="Border Radius"
              value={borderRadiusValue}
              setValue={setBorderRadiusValue}
              max={25}
              min={0}
            >
              <BorderRadiusIcon size="2.5rem" className="text-gray-600" />
            </MarginPicker>
          </div>
        </div>
        <button
          disabled={isLoading}
          onClick={handleDownloadClick}
          className="grid place-items-center bg-gray-900 text-white py-2 px-20 rounded-md disabled:opacity-50"
        >
          <span className={`${isLoading ? "opacity-0" : "opacity-100"}`}>
            Download
          </span>
          <LoadingIcon
            className={`animate-spin absolute ${
              isLoading ? "opacity-100" : "opacity-0"
            }`}
            size="1.3rem"
          />
        </button>
      </div>
    </>
  );
};

export default StringToQRCode;
