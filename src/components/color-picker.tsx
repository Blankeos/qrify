
// interface IColorPickerProps {
//   hoverContent: string;
//   color: string;
//   setColor: (color: string) => any;
//   enableAlpha?: boolean;
// }
// export const ColorPicker: React.FC<IColorPickerProps> = ({
//   color,
//   setColor,
//   hoverContent,
//   enableAlpha = false,
// }) => {
//   return (
//     <div className="relative h-16 w-16">
//       <Tippy content={hoverContent}>
//         <Tippy
//           theme="transparent"
//           interactive={true}
//           trigger="click"
//           arrow={false}
//           content={
//             <div className="flex flex-col gap-y-2">
//               {enableAlpha ? (
//                 <HexAlphaColorPicker color={color} onChange={setColor} />
//               ) : (
//                 <HexColorPicker color={color} onChange={setColor} />
//               )}
//               <div className="flex overflow-hidden rounded-md">
//                 <div className="bg-gray-500 h-8 w-8 grid place-items-center flex-shrink-0">
//                   #
//                 </div>
//                 <HexColorInput
//                   className="border text-gray-800 px-2 py-1 w-full outline-none"
//                   color={color}
//                   onChange={setColor}
//                 />
//               </div>
//             </div>
//           }
//         >
//           <div
//             className="absolute h-16 w-16 rounded-md border cursor-pointer"
//             style={{ backgroundColor: color }}
//           ></div>
//         </Tippy>
//       </Tippy>
//     </div>
//   );
};

import { createSignal } from 'solid-js'
import { ColorPicker as ArkColorPicker, parseColor } from '@ark-ui/solid/dist/components/color-picker';

type ColorPickerProps = {
  hoverContent: string;
  color: string;
  setColor: (color: string) => any;
  enableAlpha?: boolean;
}

export function ColorPickasd(props: ColorPickerProps) {
  const [color, setColor] = createSignal(parseColor('hsl(0, 100%, 50%)'))

  return (
    <ArkColorPicker.Root
      value={color()}
      onValueChange={(e: any) => setColor(e.value)}
      onValueChangeEnd={(e: any) => console.log(e.valueAsString)}
    >
      <ArkColorPicker.Label>Color</ArkColorPicker.Label>
      <ArkColorPicker.Control>
        <ArkColorPicker.ChannelInput channel="hex" />
        <ArkColorPicker.ChannelInput channel="alpha" />
        <ArkColorPicker.ValueText />
        <ArkColorPicker.Trigger>
          <ArkColorPicker.TransparencyGrid />
          <ArkColorPicker.ValueSwatch />
        </ArkColorPicker.Trigger>
      </ArkColorPicker.Control>
      <ArkColorPicker.Positioner>
        <ArkColorPicker.Content>
          <ArkColorPicker.Area>
            <ArkColorPicker.AreaBackground />
            <ArkColorPicker.AreaThumb />
          </ArkColorPicker.Area>
          <ArkColorPicker.ChannelSlider channel="hue">
            <ArkColorPicker.ChannelSliderTrack />
            <ArkColorPicker.ChannelSliderThumb />
          </ArkColorPicker.ChannelSlider>
          <ArkColorPicker.ChannelSlider channel="alpha">
            <ArkColorPicker.TransparencyGrid />
            <ArkColorPicker.ChannelSliderTrack />
            <ArkColorPicker.ChannelSliderThumb />
          </ArkColorPicker.ChannelSlider>
          <ArkColorPicker.SwatchGroup>
            <ArkColorPicker.SwatchTrigger value="red">
              <ArkColorPicker.Swatch value="red">
                <ArkColorPicker.SwatchIndicator>✓</ArkColorPicker.SwatchIndicator>
              </ArkColorPicker.Swatch>
            </ArkColorPicker.SwatchTrigger>
            <ArkColorPicker.SwatchTrigger value="blue">
              <ArkColorPicker.Swatch value="blue">
                <ArkColorPicker.SwatchIndicator>✓</ArkColorPicker.SwatchIndicator>
              </ArkColorPicker.Swatch>
            </ArkColorPicker.SwatchTrigger>
            <ArkColorPicker.SwatchTrigger value="green">
              <ArkColorPicker.Swatch value="green">
                <ArkColorPicker.SwatchIndicator>✓</ArkColorPicker.SwatchIndicator>
              </ArkColorPicker.Swatch>
            </ArkColorPicker.SwatchTrigger>
          </ArkColorPicker.SwatchGroup>
          <ArkColorPicker.View format="rgba">
            <ArkColorPicker.ChannelInput channel="hex" />
            <ArkColorPicker.ChannelInput channel="alpha" />
          </ArkColorPicker.View>
          <ArkColorPicker.View format="hsla">
            <ArkColorPicker.ChannelInput channel="hue" />
            <ArkColorPicker.ChannelInput channel="saturation" />
            <ArkColorPicker.ChannelInput channel="lightness" />
          </ArkColorPicker.View>
          <ArkColorPicker.EyeDropperTrigger>Pick color</ArkColorPicker.EyeDropperTrigger>
        </ArkColorPicker.Content>
      </ArkColorPicker.Positioner>
      <ArkColorPicker.HiddenInput />
    </ArkColorPicker.Root>
  )
}
