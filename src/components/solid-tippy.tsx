import {
    children,
    createComputed,
    createEffect,
    createSignal,
    JSX,
    onCleanup,
    splitProps,
    untrack,
} from "solid-js";
import makeTippy, { Instance, Props } from "tippy.js";
import makeHeadlessTippy from "tippy.js/headless";

export interface TippyOptions {
  disabled?: boolean;
  hidden?: boolean;
  props?: Partial<Props>;
}

export function tippy<T extends Element>(target: T, opts: () => TippyOptions | undefined): void {
  createEffect(() => {
    const options = opts();
    const instance = makeTippy(
      target,
      untrack(() => options?.props)
    );

    createComputed(() => {
      if (options?.disabled) {
        instance.disable();
      } else {
        instance.enable();
      }
    });

    createComputed(() => {
      if (options?.hidden) {
        instance.hide();
      } else {
        instance.show();
      }
    });

    createComputed(() => {
      instance.setProps({
        ...(options?.props ?? {}),
      });
    });

    onCleanup(() => {
      instance.destroy();
    });
  });
}

export function tippyHeadless<T extends Element>(
  target: T,
  opts: () => TippyOptions | undefined
): void {
  createEffect(() => {
    const options = opts();
    const instance = makeHeadlessTippy(
      target,
      untrack(() => options?.props)
    );

    createComputed(() => {
      if (options?.disabled) {
        instance.disable();
      } else {
        instance.enable();
      }
    });

    createComputed(() => {
      if (options?.hidden) {
        instance.hide();
      } else {
        instance.show();
      }
    });

    createComputed(() => {
      instance.setProps({
        ...(options?.props ?? {}),
      });
    });

    onCleanup(() => {
      instance.destroy();
    });
  });
}

export function useTippy<T extends Element>(
  target: () => T | undefined | null,
  options?: TippyOptions
): () => Instance | undefined {
  const [current, setCurrent] = createSignal<Instance>();

  createEffect(() => {
    const currentTarget = target();
    if (currentTarget) {
      const instance = makeTippy(
        currentTarget,
        untrack(() => options?.props)
      );

      setCurrent(instance);

      createComputed(() => {
        if (options?.disabled) {
          instance.disable();
        } else {
          instance.enable();
        }
      });

      createComputed(() => {
        if (options?.hidden) {
          instance.hide();
        } else {
          instance.show();
        }
      });

      createComputed(() => {
        instance.setProps({
          ...(options?.props ?? {}),
        });
      });

      onCleanup(() => {
        instance.destroy();
      });
    }
  });

  return () => current();
}

// ===========================================================================
// Derived
// ===========================================================================

export function useTippyHeadless<T extends Element>(
  target: () => T | undefined | null,
  options?: TippyOptions
): () => Instance | undefined {
  const [current, setCurrent] = createSignal<Instance>();

  createEffect(() => {
    const currentTarget = target();
    if (currentTarget) {
      const instance = makeHeadlessTippy(
        currentTarget,
        untrack(() => options?.props)
      );

      setCurrent(instance);

      createComputed(() => {
        if (options?.disabled) {
          instance.disable();
        } else {
          instance.enable();
        }
      });

      createComputed(() => {
        if (options?.hidden) {
          instance.hide();
        } else {
          instance.show();
        }
      });

      createComputed(() => {
        instance.setProps({
          ...(options?.props ?? {}),
        });
      });

      onCleanup(() => {
        instance.destroy();
      });
    }
  });

  return () => current();
}

type CustomTippyOptions = {
  disabled?: boolean;
  hidden?: boolean;
  content?: string | JSX.Element;
  props?: Omit<Partial<Props>, "content">;
};

export function Tippy(props: CustomTippyOptions & { children: JSX.Element }) {
  const [_props, tippyOptions] = splitProps(props, ["children", "props", "content"]);
  const [_, tippyProps] = splitProps(_props, ["content", "children"]);

  const _children = children(() => props.children);
  const _content = children(() => props.content);

  const [ref, setRef] = createSignal<HTMLSpanElement>();

  useTippy(ref, {
    hidden: true,
    ...tippyOptions,
    props: {
      // eslint-disable-next-line solid/reactivity
      ...tippyProps.props,
      content: _content as unknown as Element,
    },
  });

  createEffect(() => {
    const child = _children.toArray()[0];
    setRef(child as HTMLElement);
  });

  return (
    <>
      {_children()}
      {/* This element here is only to avoid hydration errors.
        It mimics what is being rendered by `content: _content as unknown as Element`.
        Idk what weird hack I figured out here, but it works!
        It doesn't get rendered actually.
        */}
      <span aria-hidden style={{ display: "none" }}>
        {_content()}
      </span>
    </>
  );
}
