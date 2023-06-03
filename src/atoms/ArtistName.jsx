const ArtistName = ({ name }) => {
  let artist = name.split(" ");
  return (
    <p>
      Photo by:{" "}
      <strong className="artist">
        {artist
          .map((a) =>
            a === "unsplash"
              ? " | Unsplash"
              : a.charAt(0).toUpperCase() + a.substring(1)
          )
          .join(" ")}
      </strong>
    </p>
  );
};
export default ArtistName;
