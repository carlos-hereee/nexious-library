import type { CTAProps } from "nxs-card";
import { IconButton } from "@nxs-molecules";
import { capFirstCharacter } from "@nxs-utils/data/text";
import { Icon } from "@nxs-atoms";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, viewAsPreview } = props;

  return (
    <div className="call-to-action">
      {cta.map((data) => {
        const icon = data.icon || "";
        const uid = data.uid || data.heroId || data.sharedKey || "";
        const label = data.label || "";
        if (viewAsPreview) {
          // prevent nesting buttons
          return (
            <div key={uid} className={data.theme ? `btn ${data.theme}` : "btn-main btn-cta"}>
              {icon && <Icon icon={icon} />}
              {label && label}
            </div>
          );
        }
        return icon ? (
          <IconButton
            icon={{ icon, label }}
            theme={data.theme ? `btn ${data.theme}` : "btn-main btn-cta"}
            onClick={() => data.onClick && data.onClick(data)}
            key={uid}
          />
        ) : (
          label && (
            <button
              type="button"
              className={data.theme ? `btn ${data.theme}` : "btn-main btn-cta"}
              onClick={() => data.onClick && data.onClick(data)}
              key={uid}
            >
              {capFirstCharacter(label)}
            </button>
          )
        );
      })}
    </div>
  );
};
export default CTA;
