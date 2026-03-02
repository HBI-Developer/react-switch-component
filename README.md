# @hbi-developer/react-switch-component

A **zero-dependency**, simple, and native-like Switch component for React. It works like the JavaScript `switch` statement but uses declarative React components, allowing for cleaner and more readable conditional rendering.

## Features

- 🚀 **Zero Dependencies**: Lightweight and fast.
- 🧩 **Declarative API**: Read your logic as if it were code.
- 🛠 **Flexible Layouts**: Wrap matched cases in a custom container with `Switch.Layout`.
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

const MyComponent = ({ status }: { status: 'loading' | 'success' | 'error' }) => {
  return (
    <Switch>
      <Switch.Case condition={status === 'loading'}>
        <p>Loading...</p>
      </Switch.Case>
      
      <Switch.Case condition={status === 'success'}>
        <p>Data loaded successfully!</p>
      </Switch.Case>
      
      <Switch.Default>  {/* Optional Component */}
        <p>Something went wrong.</p>
      </Switch.Default>
    </Switch>
  );
};
```

## Advanced Usage: Custom Layouts

You can use `Switch.Layout` to wrap the matched content in a specific component (like a `Motion` div or a styled container).

```tsx
<Switch>
  <Switch.Layout withDefault={true}>
    <div className="card-container" />
  </Switch.Layout>

  <Switch.Case condition={isAdmin}>
    <AdminPanel />
  </Switch.Case>

  <Switch.Default>
    <UserPanel />
  </Switch.Default>
</Switch>
```

> [!NOTE]
> The `children` of `Switch.Layout` should be a single React element that will receive the matched case content as its own `children`.

## API Reference

### `Switch` (or `Switch.Root`)
The main container for your switch logic.

| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `ReactNode` | Should contain `Switch.Case`, `Switch.Default`, and optionally `Switch.Layout`. |

### `Switch.Case`
Defines a specific condition and the content to render if it's met.

| Prop | Type | Description |
| :--- | :--- | :--- |
| `condition` | `boolean` | If `true`, this case is rendered (unless a previous case already matched). |
| `children` | `ReactNode` | The content to render. |

### `Switch.Default`
The fallback content if no `Switch.Case` matches.

| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `ReactNode` | The fallback content. |

### `Switch.Layout`
A special component to define a wrapper for the matched case.

| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `ReactElement` | The wrapper element. |
| `withDefault` | `boolean` | (Optional) If `true`, the layout will also wrap the `Switch.Default` content. Defaults to `false`. |

## License

MIT © [HBI Developer](https://github.com/HBI-Developer)
