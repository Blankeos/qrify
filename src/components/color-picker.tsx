import { IconColorPicker } from "@/assets";
import { ColorPicker as ArkColorPicker, parseColor } from "@ark-ui/solid/color-picker";
import { Show } from "solid-js";
import { Tippy } from "./solid-tippy";

type ColorPickerProps = {
  hoverContent: string;
  color: string;
  setColor: (color: string) => any;
  enableAlpha?: boolean;
};

export function ColorPicker(props: ColorPickerProps) {
  // const [color, setColor] = createSignal(parseColor("hsl(0, 100%, 50%)"));

  return (
    <>
      <Tippy props={{ content: props.hoverContent }}>
        <ArkColorPicker.Root
          value={parseColor(props.color)}
          onValueChange={(e) => {
            props.setColor(e.value.toString("hex"));
          }}
          onValueChangeEnd={(e: any) => console.log(e.valueAsString)}
          class="flex flex-col gap-4"
        >
          <ArkColorPicker.Control class="flex items-center gap-2">
            {/* <ArkColorPicker.ValueText class="text-sm" /> */}
            <ArkColorPicker.Trigger class="h-16 w-16 cursor-pointer rounded border">
              <ArkColorPicker.TransparencyGrid class="h-full w-full rounded" />
              <ArkColorPicker.ValueSwatch class="h-full w-full rounded" />
            </ArkColorPicker.Trigger>
          </ArkColorPicker.Control>
          <ArkColorPicker.Positioner class="">
            <ArkColorPicker.Content class="z-10 rounded-lg border bg-white p-4 shadow-lg">
              <ArkColorPicker.Area class="h-40 w-40 rounded-lg">
                <ArkColorPicker.AreaBackground class="h-full w-full rounded-lg" />
                <ArkColorPicker.AreaThumb class="h-4 w-4 rounded-full border-2 border-white" />
              </ArkColorPicker.Area>
              <ArkColorPicker.ChannelSlider channel="hue" class="mt-4 h-4 rounded">
                <ArkColorPicker.ChannelSliderTrack class="h-full w-full rounded" />
                <ArkColorPicker.ChannelSliderThumb class="h-4 w-2 rounded border" />
              </ArkColorPicker.ChannelSlider>
              <Show when={props.enableAlpha}>
                <ArkColorPicker.ChannelSlider channel="alpha" class="mt-2 h-4 rounded">
                  <ArkColorPicker.TransparencyGrid class="h-full w-full rounded" />
                  <ArkColorPicker.ChannelSliderTrack class="h-full w-full rounded" />
                  <ArkColorPicker.ChannelSliderThumb class="h-4 w-2 rounded border" />
                </ArkColorPicker.ChannelSlider>
              </Show>
              <ArkColorPicker.SwatchGroup class="mt-4 flex gap-2">
                <ArkColorPicker.SwatchTrigger value="red" class="rounded-full">
                  <ArkColorPicker.Swatch value="red" class="h-6 w-6 rounded-full">
                    <ArkColorPicker.SwatchIndicator class="text-xs text-white">
                      ✓
                    </ArkColorPicker.SwatchIndicator>
                  </ArkColorPicker.Swatch>
                </ArkColorPicker.SwatchTrigger>
                <ArkColorPicker.SwatchTrigger value="blue" class="rounded-full">
                  <ArkColorPicker.Swatch value="blue" class="h-6 w-6 rounded-full">
                    <ArkColorPicker.SwatchIndicator class="text-xs text-white">
                      ✓
                    </ArkColorPicker.SwatchIndicator>
                  </ArkColorPicker.Swatch>
                </ArkColorPicker.SwatchTrigger>
                <ArkColorPicker.SwatchTrigger value="green" class="rounded-full">
                  <ArkColorPicker.Swatch value="green" class="h-6 w-6 rounded-full">
                    <ArkColorPicker.SwatchIndicator class="text-xs text-white">
                      ✓
                    </ArkColorPicker.SwatchIndicator>
                  </ArkColorPicker.Swatch>
                </ArkColorPicker.SwatchTrigger>
              </ArkColorPicker.SwatchGroup>
              <ArkColorPicker.View format="rgba" class="mt-4 flex gap-2">
                <ArkColorPicker.ChannelInput channel="hex" class="w-24 rounded border px-2 py-1" />
                <Show when={props.enableAlpha}>
                  <ArkColorPicker.ChannelInput
                    channel="alpha"
                    class="w-16 rounded border px-2 py-1"
                  />
                </Show>
              </ArkColorPicker.View>
              <ArkColorPicker.View format="hsla" class="mt-2 flex gap-2">
                <ArkColorPicker.ChannelInput channel="hue" class="w-16 rounded border px-2 py-1" />
                <ArkColorPicker.ChannelInput
                  channel="saturation"
                  class="w-16 rounded border px-2 py-1"
                />
                <ArkColorPicker.ChannelInput
                  channel="lightness"
                  class="w-16 rounded border px-2 py-1"
                />
              </ArkColorPicker.View>
              <ArkColorPicker.EyeDropperTrigger class="mt-4 grid h-7 w-7 place-items-center rounded bg-gray-100 text-sm hover:bg-gray-200">
                <IconColorPicker class="h-4 w-4" />
              </ArkColorPicker.EyeDropperTrigger>
            </ArkColorPicker.Content>
          </ArkColorPicker.Positioner>
          <ArkColorPicker.HiddenInput />
        </ArkColorPicker.Root>
      </Tippy>
      {/* </Tooltip> */}
    </>
  );
}

// <Popover
//   contentClass="min-w-[300px]"
//   content={() => {
//     return (
//       <div class="flex flex-col gap-y-2">
//         {/* {enableAlpha ? (
//           <HexAlphaColorPicker color={color} onChange={setColor} />
//         ) : (
//           <HexColorPicker color={color} onChange={setColor} />
//         )} */}
//         {/* <div class="flex overflow-hidden rounded-md">
//           <div class="grid h-8 w-8 flex-shrink-0 place-items-center bg-gray-500">#</div>
//           <HexColorInput
//             class="w-full border px-2 py-1 text-gray-800 outline-none"
//             color={color}
//             onChange={setColor}
//           />
//         </div> */}
//       </div>
//     );
//   }}
// >
//   {/* <Tooltip
//     content=""
//     // props={{
//     //   theme: "transparent",
//     //   interactive: true,
//     //   trigger: "click",
//     //   arrow: false,
//     //   content: "Hi",
//     //   // content: (
//     //   //   // <div class="flex flex-col gap-y-2">
//     //   //   //   {enableAlpha ? (
//     //   //   //     <HexAlphaColorPicker color={color} onChange={setColor} />
//     //   //   //   ) : (
//     //   //   //     <HexColorPicker color={color} onChange={setColor} />
//     //   //   //   )}
//     //   //   //   <div class="flex overflow-hidden rounded-md">
//     //   //   //     <div class="grid h-8 w-8 flex-shrink-0 place-items-center bg-gray-500">#</div>
//     //   //   //     <HexColorInput
//     //   //   //       class="w-full border px-2 py-1 text-gray-800 outline-none"
//     //   //   //       color={color}
//     //   //   //       onChange={setColor}
//     //   //   //     />
//     //   //   //   </div>
//     //   //   // </div>
//     //   // ),
//     // }}
//   > */}
//   <div
//     class="absolute h-16 w-16 cursor-pointer rounded-md border"
//     style={{ "background-color": props.color }}
//   />
//   {/* </Tooltip> */}
// </Popover>
