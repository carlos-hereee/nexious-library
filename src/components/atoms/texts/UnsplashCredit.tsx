import type { UnsplashProps } from "nxs-assets";

const UnsplashCredit: React.FC<UnsplashProps> = ({ creditTo }) => {
  const { artistUrl, artistName, assetUrl } = creditTo;

  return (
    <p className="credit-to">
      Photo by <a href={artistUrl}>{artistName}</a> on <a href={assetUrl}>Unsplash</a>
    </p>
  );
};

export default UnsplashCredit;
