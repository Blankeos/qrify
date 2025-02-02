import { FlowProps, JSX } from "solid-js";
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
    <Tippy props={{ content: props.name }}>
      <Tippy
        props={{
          theme: "transparent",

          interactive: true,
          trigger: "click",
          arrow: false,
          content: (
            <div class="bg-gray-50 rounded px-5 py-5 text-gray-800 flex flex-col gap-y-3 border">
              <p class="font-medium text-gray-600">
                {props.name}: {props.value}
              </p>
              {/* <ReactSlider
                min={min}
                max={max}
                value={value}
                onChange={setValue}
                class="flex items-center bg-white h-2 w-52 border rounded-full"
                thumbClassName="bg-white w-5 h-5 rounded-full grid place-items-center border-2 border-gray-500 cursor-grab active:cursor-grabbing"
              /> */}
            </div>
          ),
        }}
      >
        <div class="h-16 w-16 border rounded-md grid place-items-center cursor-pointer bg-white">
          {props.children}
        </div>
      </Tippy>
    </Tippy>
  );
}

export default RangePicker;
