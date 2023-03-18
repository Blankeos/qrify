import Tippy from "@tippyjs/react";
import React from "react";
import ReactSlider from "react-slider";

interface IRangePicker {
  name: string;
  max: number;
  min: number;
  value: number;
  children: React.ReactNode;
  setValue: (value: number) => any;
}
const MarginPicker: React.FC<IRangePicker> = ({
  name,
  max,
  min,
  value,
  children,
  setValue,
}) => {
  return (
    <Tippy content={name}>
      <Tippy
        theme="transparent"
        interactive={true}
        trigger="click"
        arrow={false}
        content={
          <div className="bg-gray-50 rounded px-5 py-5 text-gray-800 flex flex-col gap-y-3 border">
            <p className="font-medium text-gray-600">
              {name}: {value}
            </p>
            <ReactSlider
              min={min}
              max={max}
              value={value}
              onChange={setValue}
              className="flex items-center bg-white h-2 w-52 border rounded-full"
              thumbClassName="bg-white w-5 h-5 rounded-full grid place-items-center border-2 border-gray-500 cursor-grab active:cursor-grabbing"
            />
          </div>
        }
      >
        <div className="h-16 w-16 border rounded-md grid place-items-center cursor-pointer bg-white">
          {children}
        </div>
      </Tippy>
    </Tippy>
  );
};

export default MarginPicker;

// TbBorderRadius
