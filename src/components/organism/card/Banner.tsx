import type { BannerProps } from "nxs-card";

const Banner: React.FC<BannerProps> = ({ message, theme, children }) => {
  return (
    <div className={theme ? `banner ${theme}` : "banner"}>
      {message && <h2 className="heading">{message}</h2>}
      {children}
    </div>
  );
};
export default Banner;
