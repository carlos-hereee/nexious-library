import { CTAProps } from "nxs-card";
import { IconButton } from "@nxs-molecules";
import { capFirstCharacter } from "@nxs-utils/data/text";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, onClick } = props;

  return (
    <div className="cta-container">
      {cta.map((data) => {
        const icon = data.icon || "";
        const uid = data.uid || data.heroId || "";
        return icon ? (
          <IconButton icon={{ icon }} theme="btn-cta" onClick={onClick} key={uid} />
        ) : (
          <button type="button" className="btn-main btn-cta" onClick={onClick} key={uid}>
            {capFirstCharacter(data.label)}
          </button>
        );
      })}
    </div>
  );
};
export default CTA;
