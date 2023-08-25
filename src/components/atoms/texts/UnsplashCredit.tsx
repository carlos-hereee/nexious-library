type Prop = {
  creditTo: {
    artistUrl: string;
    artistName: string;
    assetUrl: string;
  };
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
