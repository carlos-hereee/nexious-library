import type { CTAProps } from "nxs-card";
import { IconButton } from "@nxs-molecules";
import { capFirstCharacter } from "@nxs-utils/data/text";
import { Icon } from "@nxs-atoms";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, viewAsPreview, onClick } = props;

  const icon = cta.icon || "";
  const uid = cta.uid || cta.heroId || cta.sharedKey || "";
  const label = cta.label || "";
  const theme = cta.theme || "";
  if (viewAsPreview) {
    // prevent nesting buttons
    return (
      <div key={uid} className={theme ? `btn ${theme}` : "btn-main btn-cta"}>
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
      key={uid}
    />
  ) : (
    label && (
      <button
        type="button"
        className={theme ? `btn ${theme}` : "btn-main btn-cta"}
        onClick={onClick}
        key={uid}
      >
        {capFirstCharacter(label)}
      </button>
    )
  );
};
export default CTA;
