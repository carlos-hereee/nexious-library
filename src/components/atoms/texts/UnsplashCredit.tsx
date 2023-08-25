import { UnsplashProps } from "@nxs-utils/helpers/types";

type Prop = {
  creditTo: UnsplashProps;
};

const UnsplashCredit: React.FC<Prop> = ({ creditTo }) => {
  const { artistUrl, artistName, assetUrl } = creditTo;

  return (
    <p className="credit-to">
      Photo by <a href={artistUrl}>{artistName}</a> on{" "}
      <a href={assetUrl}>Unsplash</a>
    </p>
  );
};

export default UnsplashCredit;
