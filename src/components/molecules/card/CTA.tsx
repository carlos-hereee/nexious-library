import { CTAProps } from "nxs-card";
import { IconButton } from "@nxs-molecules";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, onClick } = props;
  return (
    <div className="flex-center">
      {cta &&
        cta.map((b) =>
          b.icon ? (
            <IconButton
              icon={{ icon: b.icon }}
              theme="btn-cta"
              onClick={onClick}
              key={b.uid || b.heroId}
            />
          ) : (
            <button
              type="button"
              className="btn-main"
              onClick={onClick}
              key={b.uid || b.heroId}
            >
              {b.label}
            </button>
          )
        )}
    </div>
  );
};
export default CTA;
