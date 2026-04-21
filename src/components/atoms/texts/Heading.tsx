import type { HeadingProps } from "nxs-typography";

/**
 * Heading component that renders a semantic heading tag (h1 through h6).
 *
 * Supports two APIs:
 *   Modern:  <Heading size="h3">My Title</Heading>
 *   Legacy:  <Heading data="My Title" scale={3} />
 *
 * If both children and data are provided, children takes priority.
 * If both size and scale are provided, size takes priority.
 * Defaults to h1 when no level is specified.
 */
const Heading: React.FC<HeadingProps> = ({ children, data, size, scale, theme }) => {
  const content = children ?? data;
  const className = theme ? `heading ${theme}` : "heading";

  // resolve heading level: size string takes priority over numeric scale
  const sizeMap: Record<string, number> = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };
  const level = size ? sizeMap[size] ?? 1 : scale ?? 1;

  if (level === 2) return <h2 className={className}>{content}</h2>;
  if (level === 3) return <h3 className={className}>{content}</h3>;
  if (level === 4) return <h4 className={className}>{content}</h4>;
  if (level === 5) return <h5 className={className}>{content}</h5>;
  if (level === 6) return <h6 className={className}>{content}</h6>;
  return <h1 className={className}>{content}</h1>;
};

export default Heading;
