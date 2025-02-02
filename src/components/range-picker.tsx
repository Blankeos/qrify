import { FlowProps, JSX } from "solid-js";
import { Popover } from "./popover";
import { Slider } from "./slider";
import { Tippy } from "./solid-tippy";

type RangePickerProps = {
  name: string;
  max: number;
  min: number;
  value: number;
  children: JSX.Element;
  setValue: (value: number) => any;
};
export function RangePicker(props: FlowProps<RangePickerProps>) {
  return (
    <Tippy props={{ content: props.name, trigger: "mouseenter" }}>
      <Popover
        contentClass="min-w-[300px]"
        content={() => {
          return (
            <div class="flex flex-col gap-y-3 px-5 py-5 text-gray-800">
              <p class="font-medium text-gray-600">
                {props.name}: {props.value}
              </p>
              <Slider
                min={props.min}
                max={props.max}
                value={props.value}
                onValueChange={(details) => {
                  const val = details.value.at(0);
                  if (val !== undefined) {
                    props.setValue(val);
                  }
                }}
              />
            </div>
          );
        }}
      >
        <div class="grid h-16 w-16 cursor-pointer place-items-center rounded-md border bg-white">
          {props.children}
        </div>
      </Popover>
    </Tippy>
  );
}

export default RangePicker;
