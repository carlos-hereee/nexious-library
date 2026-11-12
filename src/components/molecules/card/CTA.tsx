import type { CTAProps } from "nxs-card";
import { IconButton } from "@nxs-molecules";
import { capFirstCharacter } from "@nxs-utils/data/text";
import { Button, Icon } from "@nxs-atoms";
import { buildControlClass } from "../../../@types/Variant";

// A call to action is the primary large nxs-btn (2026-11 item 337). A caller's cta.className still
// REPLACES the legacy btn-main btn-cta default, as it always has, so MerchCard's and Cart's own
// classes keep their place; the nxs classes ride on top of whichever is in play. The preview
// branch renders a div (it sits inside another control), so it takes the class string directly.
const CTA_VARIANT = { variant: "primary", size: "large" } as const;
const LEGACY_CTA_CLASS = "btn-main btn-cta";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, viewAsPreview, onClick } = props;
  const icon = cta.icon || "";
  const label = cta.label || "";
  const className = cta.className || "";
  // console.log("onClick :>> ", onClick);
  const ctaClass = className || LEGACY_CTA_CLASS;
  if (viewAsPreview) {
    // prevent nesting buttons
    return (
      <div className={buildControlClass({ ...CTA_VARIANT, className: ctaClass })}>
        {icon && <Icon icon={icon} />}
        {label && label}
      </div>
    );
  }
  return icon ? (
    <IconButton
      icon={{ icon, label }}
      className={buildControlClass({ ...CTA_VARIANT, className: ctaClass })}
      onClick={onClick}
    />
  ) : (
    label && (
      <Button {...CTA_VARIANT} className={ctaClass} onClick={() => onClick && onClick(cta)}>
        {capFirstCharacter(label)}
      </Button>
    )
  );
};
export default CTA;
