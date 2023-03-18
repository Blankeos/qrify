import React, { useState, useCallback, useRef } from "react";
import { nanoid } from "nanoid";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
// import { addNote, notes } from "../store";
// import { useStore } from "@nanostores/react";
import { VscLoading as LoadingIcon } from "react-icons/vsc";
import { ColorPicker } from "./ColorPicker";

const StringToQRCode = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [fgColor, setFgColor] = useState<string>("#0073F5");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [qrValue, setQRValue] = useState("https://carlo.vercel.app");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      })
      .catch((err) => {
        console.error(err);
      });

    setIsLoading(false);
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
          {/* QR CODE */}
          <div className="grid place-items-center">
            <div
              ref={qrRef}
              className="p-5 rounded-xl"
              style={{
                backgroundColor: bgColor,
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
          {/* QR CODE */}
          <div className="flex justify-center gap-3 sm:flex-col sm:items-start sm:justify-start">
            <ColorPicker
              hoverContent="nothing"
              color="#000066"
              setColor={() => null}
            />
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
