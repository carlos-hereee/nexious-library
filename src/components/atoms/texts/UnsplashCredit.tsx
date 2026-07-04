import type { UnsplashProps } from "nxs-assets";
import { safeUrl } from "@nxs-utils/data/safeUrl";

const UnsplashCredit: React.FC<UnsplashProps> = ({ creditTo }) => {
  const { artistUrl, artistName, assetUrl } = creditTo;

  return (
    <p className="credit-to">
      Photo by{" "}
      <a href={safeUrl(artistUrl)} rel="noopener noreferrer" target="_blank">
        {artistName}
      </a>{" "}
      on{" "}
      <a href={safeUrl(assetUrl)} rel="noopener noreferrer" target="_blank">
        Unsplash
      </a>
    </p>
  );
};

export default UnsplashCredit;
