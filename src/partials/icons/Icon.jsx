import {  memo, useMemo } from "react";

const _Icon = ({
  children,
  name,
  size,
  fontSize: _fontSize,
  crop,
  className,
  ...other
}) => {
  const fontSize = useMemo(() => ({ fontSize: _fontSize }), [_fontSize]);

  return (
    <i
      className={`Icon name__${name || ""} size__${size || "inherit"} ${
        className || ""
      } ${crop ? "overlow-clip" : ""}`.trim()}
      role="img"
      aria-label={`${name || ""} icon`}
      style={other.style ? { ...other.style, ...fontSize } : fontSize}
    >
      {children}
    </i>
  );
};

export const Icon = memo(_Icon);
