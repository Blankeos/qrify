import { cn } from "@/utils/cn";
import { Popover as ArkPopover } from "@ark-ui/solid";
import { FlowProps, JSX } from "solid-js";

type PopoverProps = {
  children: JSX.Element;
  contentClass?: string;
  content: ({
    PopoverTitle,
    PopoverDescription,
  }: {
    PopoverTitle: typeof ArkPopover.Title;
    PopoverDescription: typeof ArkPopover.Description;
  }) => JSX.Element;
};
export function Popover(props: FlowProps<PopoverProps>) {
  return (
    <ArkPopover.Root>
      <ArkPopover.Trigger>{props.children}</ArkPopover.Trigger>
      <ArkPopover.Positioner>
        <ArkPopover.Content
          class={cn("rounded-md border border-gray-300 bg-white p-2", props.contentClass)}
        >
          {props.content({
            PopoverTitle: ArkPopover.Title,
            PopoverDescription: ArkPopover.Description,
          })}
        </ArkPopover.Content>
      </ArkPopover.Positioner>
    </ArkPopover.Root>
  );
}
