import { Slider as ArkSlider, SliderValueChangeDetails } from "@ark-ui/solid/slider";
import { VoidProps } from "solid-js";

export type SliderProps = {
  min?: number;
  max?: number;
  value?: number;
  onValueChange?: (value: SliderValueChangeDetails) => void;
};
export function Slider(props: VoidProps<SliderProps>) {
  return (
    <ArkSlider.Root
      class="w-full"
      min={props.min}
      max={props.max}
      onValueChange={props.onValueChange}
    >
      {/* <ArkSlider.Label class="text-sm font-medium text-gray-700">Label</ArkSlider.Label> */}
      {/* <ArkSlider.ValueText class="text-sm text-gray-600" /> */}
      <ArkSlider.Control class="mt-2 flex items-center">
        <ArkSlider.Track class="h-2 w-full rounded-full bg-gray-200">
          <ArkSlider.Range class="h-full rounded-full bg-blue-500" />
        </ArkSlider.Track>
        <ArkSlider.Thumb
          index={0}
          class="h-4 w-4 rounded-full border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </ArkSlider.Root>
  );
}
