import {
  HexColorPicker,
  HexAlphaColorPicker,
  HexColorInput,
} from "react-colorful";
import Tippy from "@tippyjs/react";

interface IColorPickerProps {
  hoverContent: string;
  color: string;
  setColor: (color: string) => any;
  enableAlpha?: boolean;
}
export const ColorPicker: React.FC<IColorPickerProps> = ({
  color,
  setColor,
  hoverContent,
  enableAlpha = false,
}) => {
  return (
    <div className="relative h-16 w-16">
      <Tippy content={hoverContent}>
        <Tippy
          theme="transparent"
          interactive={true}
          trigger="click"
          arrow={false}
          content={
            <div className="flex flex-col gap-y-2">
              {enableAlpha ? (
                <HexAlphaColorPicker color={color} onChange={setColor} />
              ) : (
                <HexColorPicker color={color} onChange={setColor} />
              )}
              <div className="flex overflow-hidden rounded-md">
                <div className="bg-gray-500 h-8 w-8 grid place-items-center flex-shrink-0">
                  #
                </div>
                <HexColorInput
                  className="border text-gray-800 px-2 py-1 w-full outline-none"
                  color={color}
                  onChange={setColor}
                />
              </div>
            </div>
          }
        >
          <div
            className="absolute h-16 w-16 rounded-md border cursor-pointer"
            style={{ backgroundColor: color }}
          ></div>
        </Tippy>
      </Tippy>
    </div>
  );
};
