// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/card/README.md
// The one card. Its nxs-card recipe is ported from nexious-client's cu-card (primitives.css,
// 2026-11 item 337). It does NOT make itself interactive: a clickable card is a card holding a
// real link or button (see nxs-card-link), never role="button" on the container.
import { CardBody, CardHeader, CTA } from "@nxs-molecules";
import { HEADING_TAGS } from "@nxs-utils/helpers/headingTag";
import type { CardContentProps, CardHeadingLevel, CardProps } from "nxs-card";

const DEFAULT_HEADING_LEVEL: CardHeadingLevel = 3;

/**
 * The 4.x markup, kept byte for byte: a `div.card` with CardHeader, CardBody and one CTA per
 * `data.cta`. nexious-client's AppPage renders it with `data` until 2026-11 item 332 moves the
 * client onto the props API, and its CSS targets `.card`, `.card-header` and `.card-body`, which
 * is why the legacy branch gains no nxs-card class (the compatibility rule of item 337).
 */
const LegacyCard: React.FC<CardProps> = (props) => {
  const { onClick, className, data, hero } = props;

  return (
    <div className={`card ${className || ""}`}>
      <CardHeader data={data} hero={hero} />
      <CardBody data={data} />
      {data.cta && onClick && data.cta.map((c) => <CTA key={c.uid} cta={c} onClick={() => onClick(c)} />)}
    </div>
  );
};

// A `data` prop is what selects the legacy branch; CardContentProps types it as never present.
const isLegacyCardProps = (props: CardProps | CardContentProps): props is CardProps => props.data !== undefined;

/**
 * Component: Card
 *
 * With `data` it renders the 4.x legacy markup above. Without it, the nxs-card recipe: media,
 * a header of the title (a heading at `headingLevel`) and the subtitle, the children as the body,
 * and the footer. Every part is left out when it is not given, so an empty wrapper never adds a
 * gap to the flex column.
 */
const Card: React.FC<CardProps | CardContentProps> = (props) => {
  if (isLegacyCardProps(props)) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <LegacyCard {...props} />;
  }

  const { title, subtitle, media, footer, isSelected, className, children } = props;
  const { as: Root = "div", headingLevel = DEFAULT_HEADING_LEVEL } = props;
  const Heading = HEADING_TAGS[headingLevel];
  const rootClass = ["nxs-card", isSelected ? "nxs-card-selected" : "", className ?? ""].filter(Boolean).join(" ");
  const hasHeader = Boolean(title) || Boolean(subtitle);

  return (
    <Root className={rootClass}>
      {media ? <div className="nxs-card-media">{media}</div> : null}
      {hasHeader ? (
        <div className="nxs-card-header">
          {title ? <Heading className="nxs-card-title">{title}</Heading> : null}
          {subtitle ? <p className="nxs-card-subtitle">{subtitle}</p> : null}
        </div>
      ) : null}
      {children ? <div className="nxs-card-body">{children}</div> : null}
      {footer ? <div className="nxs-card-footer">{footer}</div> : null}
    </Root>
  );
};

export default Card;
