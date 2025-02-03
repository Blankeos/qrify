import { createSignal, createUniqueId, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Tippy } from "./solid-tippy";

type ColorPickerProps = {
  hoverContent: string;
  color: string;
  setColor: (color: string) => any;
  enableAlpha?: boolean;
};

// import "vanilla-colorful";

export function ColorPicker(props: ColorPickerProps) {
  // const [color, setColor] = createSignal(parseColor("hsl(0, 100%, 50%)"));

  let colorPicker!: HTMLDivElement;

  onMount(async () => {
    await import("vanilla-colorful");

    colorPicker.addEventListener("color-changed", (event) => {
      // @ts-ignore
      const newColor = event.detail.value;
      props.setColor(newColor);
    });
  });

  const [expanded, setExpanded] = createSignal(false);

  const id = createUniqueId();

  return (
    <>
      <div id={id}>
        <Tippy content={props.hoverContent}>
          <Tippy
            props={{
              theme: "transparent",
              trigger: "click",
              interactive: true,
              placement: "bottom",
              onShown: () => setExpanded(true),
              appendTo: "parent",
            }}
            content={
              <div>
                <Dynamic component="hex-color-picker" ref={colorPicker} color="#1e88e5" />
              </div>
            }
          >
            <div
              class="h-16 w-16 cursor-pointer rounded-md border"
              aria-expanded={expanded()}
              style={{ "background-color": props.color }}
            />
          </Tippy>
        </Tippy>
      </div>
    </>
  );
}
