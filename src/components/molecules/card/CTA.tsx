import type { CTAProps } from "nxs-card";
import { IconButton } from "@nxs-molecules";
import { capFirstCharacter } from "@nxs-utils/data/text";
import { Icon } from "@nxs-atoms";
import { buildNxsButtonClass } from "../../../@types/Variant";

// A call to action is the primary large nxs-btn (2026-11 item 337). A caller's cta.className still
// REPLACES the legacy btn-main btn-cta default, as it always has, so MerchCard's and Cart's own
// classes keep their place; the nxs classes ride beside whichever is in play. The preview branch
// renders a div (it sits inside another control), so it takes the class string directly.
const CTA_VARIANT = { variant: "primary", size: "large" } as const;
const LEGACY_CTA_CLASS = "btn-main btn-cta";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, viewAsPreview, onClick } = props;
  const icon = cta.icon || "";
  const label = cta.label || "";
  const ctaClass = buildNxsButtonClass({ ...CTA_VARIANT, className: cta.className || LEGACY_CTA_CLASS });
  if (viewAsPreview) {
    // prevent nesting buttons
    return (
      <div className={ctaClass}>
        {icon && <Icon icon={icon} />}
        {label && label}
      </div>
    );
  }
  // Both branches hand onClick the native click event, exactly as 4.x did. The label branch stays a
  // native <button> rather than the library Button because Button calls onClick with no argument,
  // which would change what an existing CTA caller receives.
  return icon ? (
    <IconButton icon={{ icon, label }} className={ctaClass} onClick={onClick} />
  ) : (
    label && (
      <button type="button" className={ctaClass} onClick={onClick}>
        {capFirstCharacter(label)}
      </button>
    )
  );
};
export default CTA;
