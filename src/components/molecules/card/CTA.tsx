import { IconButton } from "@nxs-molecules";
import { CTAProps } from "nxs-card-cta";

const CTA: React.FC<CTAProps> = (props) => {
  const { cta, onClick } = props;
  return (
    <div className="flex-center">
      {cta &&
        cta.map((b) => (
          <IconButton icon={b} theme="btn-cta" onClick={onClick} key={b.uid} />
        ))}
    </div>
  );
};
export default CTA;
