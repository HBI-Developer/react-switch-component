import {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
  type ReactNode,
  type ReactElement,
} from "react";

interface SwitchRootProps {
  children: ReactNode;
  delay?: number | Record<number, number>;
}

interface SwitchCaseProps {
  condition: boolean;
  children: ReactNode;
}

interface SwitchDefaultProps {
  children: ReactNode;
}

interface SwitchLayoutProps {
  children: ReactElement;
  withDefault?: boolean;
}

const SwitchCase = ({ children }: SwitchCaseProps) => {
  return <>{children}</>;
};

const SwitchDefault = ({ children }: SwitchDefaultProps) => {
  return <>{children}</>;
};

const SwitchLayout = ({ children }: SwitchLayoutProps) => {
  return <>{children}</>;
};

const SwitchRoot = ({ children, delay = 0 }: SwitchRootProps) => {
  let defaultCase: ReactElement | null = null;
  let matchedCase: ReactElement | null = null;
  let layoutComponent: ReactElement | null = null;

  let targetIndex = -1;
  let caseCount = 0;
  let hasMatched = false;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (child.type === SwitchCase) {
      caseCount++;
      if (!hasMatched) {
        const { condition } = child.props as SwitchCaseProps;
        if (condition) {
          matchedCase = child;
          targetIndex = caseCount;
          hasMatched = true;
        }
      }
    } else if (child.type === SwitchDefault) {
      defaultCase = child;
    } else if (child.type === SwitchLayout) {
      layoutComponent = child;
    }
  });

  if (!hasMatched && defaultCase) {
    targetIndex = 0;
  }

  if (typeof delay === "object" && delay !== null) {
    Object.keys(delay).forEach((key) => {
      const numKey = Number(key);
      if (isNaN(numKey) || numKey < 0 || numKey > caseCount) {
        throw new Error(
          `Invalid delay key: ${key}. Expected a number between 0 and ${caseCount}.`,
        );
      }
    });
  }

  const [activeIndex, setActiveIndex] = useState(targetIndex);

  useEffect(() => {
    if (activeIndex !== targetIndex) {
      let delayMs = 0;
      if (typeof delay === "number") {
        delayMs = delay;
      } else if (typeof delay === "object" && delay !== null) {
        delayMs = targetIndex >= 0 ? delay[targetIndex] || 0 : 0;
      }

      if (delayMs > 0) {
        const timer = setTimeout(() => {
          setActiveIndex(targetIndex);
        }, delayMs);
        return () => clearTimeout(timer);
      } else {
        setActiveIndex(targetIndex);
      }
    }
  }, [targetIndex, activeIndex, delay]);

  let contentToRender: ReactElement | null = null;
  let isDefaultContent = false;

  if (activeIndex === 0 && defaultCase) {
    contentToRender = cloneElement(defaultCase, { key: "default-case" });
    isDefaultContent = true;
  } else if (activeIndex > 0) {
    let currentIdx = 0;
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      if (child.type === SwitchCase) {
        currentIdx++;
        if (currentIdx === activeIndex) {
          contentToRender = cloneElement(child, { key: "matched-case" });
        }
      }
    });

    if (!contentToRender && matchedCase) {
      contentToRender = cloneElement(matchedCase, { key: "matched-case" });
    } else if (!contentToRender && defaultCase) {
      contentToRender = cloneElement(defaultCase, { key: "default-case" });
      isDefaultContent = true;
    }
  }

  if (!contentToRender) return null;

  if (layoutComponent) {
    const { children: wrapper, withDefault = false } = (
      layoutComponent as ReactElement
    ).props as SwitchLayoutProps;
    const shouldWrap = !isDefaultContent || (isDefaultContent && withDefault);

    if (shouldWrap && isValidElement(wrapper)) {
      // @ts-expect-error Unclear error
      return cloneElement(wrapper, { children: contentToRender });
    }
  }

  return <>{contentToRender}</>;
};

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  Case: SwitchCase,
  Default: SwitchDefault,
  Layout: SwitchLayout,
});

export {
  Switch,
  type SwitchRootProps,
  type SwitchCaseProps,
  type SwitchDefaultProps,
  type SwitchLayoutProps,
};
