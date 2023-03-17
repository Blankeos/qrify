// import { useStore } from "@nanostores/react";
import React, { useState } from "react";
// import { addNote, notes } from "../store";
import QRCode from "react-qr-code";
import { domToPng } from "modern-screenshot";
// import reactColorPkg from "react-color";
import { ChromePicker } from "react-color";
import Tippy from "@tippyjs/react";

const StringToQRCode = () => {
  const [fgColor, setFgColor] = useState<string>("#0073F5");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  // const [userNote, setUserNote] = useState("");
  const [qrValue, setQRValue] = useState("https://carlo.vercel.app");
  // const $notes = useStore(notes);

  async function handleDownloadClick() {
    const element = document.getElementById("qr-code");
    if (!element) return;

    const dataUrl = await domToPng(element, {
      scale: 3,
    });
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = dataUrl;
    link.click();
  }

  return (
    <>
      <input
        className="border w-full p-2 mb-5"
        type="text"
        name="qrValue"
        id="qrValue"
        placeholder="https://carlo.vercel.app/"
        onChange={(e) => setQRValue(e.target.value)}
      />
      <div className="flex flex-col items-center gap-y-10">
        <div className="grid grid-cols-[5rem,1fr,5rem] gap-x-2">
          <div className="flex flex-col items-center gap-y-3">
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
          <div
            className="p-5 rounded-xl"
            id="qr-code"
            style={{
              backgroundColor: bgColor,
            }}
          >
            <QRCode value={qrValue} fgColor={fgColor} bgColor={bgColor} />
          </div>
          <div className=""></div>
        </div>
        <button
          onClick={handleDownloadClick}
          className="bg-gray-900 text-white py-2 px-20 rounded-md"
        >
          Download
        </button>
      </div>
      {/* <ul>
        {$notes.map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul> */}
    </>
  );
};

export default StringToQRCode;

interface IColorPickerProps {
  hoverContent: string;
  color: string;
  setColor: (color: string) => any;
}
const ColorPicker: React.FC<IColorPickerProps> = ({
  color,
  setColor,
  hoverContent,
}) => {
  return (
    <div className="relative h-16 w-16">
      <Tippy content={hoverContent} hideOnClick={true}>
        <div>
          <Tippy
            theme="transparent"
            interactive={true}
            trigger="click"
            arrow={false}
            content={
              <div className="">
                <ChromePicker
                  disableAlpha={true}
                  color={color}
                  onChange={(v) => setColor(v.hex)}
                />
              </div>
            }
          >
            <div
              className="absolute h-16 w-16 rounded-md border cursor-pointer"
              style={{ backgroundColor: color }}
            ></div>
          </Tippy>
        </div>
      </Tippy>
    </div>
  );
};
