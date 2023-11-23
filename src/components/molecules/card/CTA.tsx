import type { CTAProps } from "nxs-card";
import { IconButton } from "@nxs-molecules";
import { capFirstCharacter } from "@nxs-utils/data/text";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, onClick } = props;

  return (
    <div className="call-to-action">
      {cta.map((data) => {
        const icon = data.icon || "";
        const uid = data.uid || data.heroId || data.sharedKey || "";
        const label = data.label || "";
        return icon ? (
          <IconButton
            icon={{ icon, label }}
            theme="btn-cta"
            onClick={() => onClick && onClick(data)}
            key={uid}
          />
        ) : (
          label && (
            <button
              type="button"
              className="btn-main btn-cta"
              onClick={() => onClick && data}
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
