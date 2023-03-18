import { ChromePicker } from "@hello-pangea/color-picker";
import Tippy from "@tippyjs/react";

interface IColorPickerProps {
  hoverContent: string;
  color: string;
  setColor: (color: string) => any;
}
export const ColorPicker: React.FC<IColorPickerProps> = ({
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
