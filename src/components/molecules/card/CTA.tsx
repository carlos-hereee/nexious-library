import type { CTAProps } from "nxs-card";
import { IconButton } from "@nxs-molecules";
import { capFirstCharacter } from "@nxs-utils/data/text";
import { Icon } from "@nxs-atoms";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, viewAsPreview, onClick } = props;
  const icon = cta.icon || "";
  const label = cta.label || "";
  const theme = cta.theme || "";
  // console.log("onClick :>> ", onClick);
  if (viewAsPreview) {
    // prevent nesting buttons
    return (
      <div className={theme ? `btn ${theme}` : "btn-main btn-cta"}>
        {icon && <Icon icon={icon} />}
        {label && label}
      </div>
    );
  }
  return icon ? (
    <IconButton
      icon={{ icon, label }}
      theme={theme ? `btn ${theme}` : "btn-main btn-cta"}
      onClick={onClick}
    />
  ) : (
    label && (
      <button
        type="button"
        className={theme ? `btn ${theme}` : "btn-main btn-cta"}
        onClick={onClick}
      >
        {capFirstCharacter(label)}
      </button>
    )
  );
};
export default CTA;
