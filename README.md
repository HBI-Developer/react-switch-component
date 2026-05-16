# @hbi-developer/react-switch-component

A **zero-dependency**, simple, and native-like Switch component for React. It works like the JavaScript `switch` statement but uses declarative React components, allowing for cleaner and more readable conditional rendering.

## Features

- 🚀 **Zero Dependencies**: Lightweight and fast.
- 🧩 **Declarative API**: Read your logic as if it were code.
- 🛠 **Flexible Layouts**: Wrap matched cases in a custom container with `Switch.Layout`.
- ⏱️ **Delayed Switches**: Add delays before changing the rendered component to handle transitions seamlessly.
- ⌨️ **TypeScript Support**: Full type definitions included.
- 📦 **Modern**: Works with React 16.8+ (including React 19).

## Installation

```bash
# Using pnpm (Recommended)
pnpm add @hbi-developer/react-switch-component

# Using npm
npm install @hbi-developer/react-switch-component

# Using yarn
yarn add @hbi-developer/react-switch-component
```

## Quick Start

```tsx
import { Switch } from "@hbi-developer/react-switch-component";

const MyComponent = ({
  status,
}: {
  status: "loading" | "success" | "error";
}) => {
  return (
    <Switch.Root>
      <Switch.Case condition={status === "loading"}>
        <p>Loading...</p>
      </Switch.Case>

      <Switch.Case condition={status === "success"}>
        <p>Data loaded successfully!</p>
      </Switch.Case>

      <Switch.Default>
        {" "}
        {/* Optional Component */}
        <p>Something went wrong.</p>
      </Switch.Default>
    </Switch.Root>
  );
};
```

## Advanced Usage: Custom Layouts

You can use `Switch.Layout` to wrap the matched content in a specific component (like a `Motion` div or a styled container).

```tsx
<Switch.Root>
  <Switch.Layout withDefault={true}>
    <div className="card-container" />
  </Switch.Layout>

  <Switch.Case condition={isAdmin}>
    <AdminPanel />
  </Switch.Case>

  <Switch.Default>
    <UserPanel />
  </Switch.Default>
</Switch.Root>
```

> [!NOTE]
> The `children` of `Switch.Layout` should be a single React element that will receive the matched case content as its own `children`.

## Advanced Usage: Delaying Switches

You can add a `delay` prop to `Switch` to delay the rendering of components when conditions change. This is especially useful for coordinating exit and enter animations.

```tsx
<Switch.Root delay={300}>
  {" "}
  {/* 300ms delay before switching to any matched case */}
  <Switch.Case condition={status === "loading"}>
    <LoadingSpinner />
  </Switch.Case>
  <Switch.Case condition={status === "success"}>
    <DataView />
  </Switch.Case>
</Switch.Root>
```

You can also pass an object to define specific delays for each case, where `0` targets the `Switch.Default` and `1`, `2`, etc., target the `Switch.Case` components based on their order.

```tsx
<Switch.Root delay={{ 0: 0, 1: 200, 2: 500 }}>
  <Switch.Case condition={status === "success"}>
    {" "}
    {/* index 1 */}
    <SuccessMessage />
  </Switch.Case>

  <Switch.Case condition={status === "error"}>
    {" "}
    {/* index 2 */}
    <ErrorMessage />
  </Switch.Case>

  <Switch.Default>
    {" "}
    {/* index 0 */}
    <IdleState />
  </Switch.Default>
</Switch.Root>
```

## API Reference

### `Switch` (or `Switch.Root`)

The main container for your switch logic.

| Prop       | Type                               | Description                                                                           |
| :--------- | :--------------------------------- | :------------------------------------------------------------------------------------ |
| `children` | `ReactNode`                        | Should contain `Switch.Case`, `Switch.Default`, and optionally `Switch.Layout`.       |
| `delay`    | `number \| Record<number, number>` | (Optional) Adds a delay (in ms) before switching between components. Defaults to `0`. |

### `Switch.Case`

Defines a specific condition and the content to render if it's met.

| Prop        | Type        | Description                                                                |
| :---------- | :---------- | :------------------------------------------------------------------------- |
| `condition` | `boolean`   | If `true`, this case is rendered (unless a previous case already matched). |
| `children`  | `ReactNode` | The content to render.                                                     |

### `Switch.Default`

The fallback content if no `Switch.Case` matches.

| Prop       | Type        | Description           |
| :--------- | :---------- | :-------------------- |
| `children` | `ReactNode` | The fallback content. |

### `Switch.Layout`

A special component to define a wrapper for the matched case.

| Prop          | Type           | Description                                                                                        |
| :------------ | :------------- | :------------------------------------------------------------------------------------------------- |
| `children`    | `ReactElement` | The wrapper element.                                                                               |
| `withDefault` | `boolean`      | (Optional) If `true`, the layout will also wrap the `Switch.Default` content. Defaults to `false`. |

## License

MIT © [HBI Developer](https://github.com/HBI-Developer)
