import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import { FlowProps, JSX } from "solid-js";
import { Portal } from "solid-js/web";

export type TooltipProps = {
  content: string | JSX.Element;
};

export function Tooltip(props: FlowProps<TooltipProps>) {
  return (
    <ArkTooltip.Root>
      <ArkTooltip.Trigger>{props.children}</ArkTooltip.Trigger>
      <Portal>
        <ArkTooltip.Positioner>
          <ArkTooltip.Content>{props.content}</ArkTooltip.Content>
        </ArkTooltip.Positioner>
      </Portal>
    </ArkTooltip.Root>
  );
}
