import { memo } from 'react';

const _SVG = ({
  children,
  ...props
}) => {
  return <svg {...props}>{children}</svg>;
};

export const SVG = memo(_SVG);
