import type { BannerProps } from "nxs-card";

const Banner: React.FC<BannerProps> = ({ message, className, children }) => {
  return (
    <div className={className ? `banner ${className}` : "banner"}>
      {message && <h2 className="heading">{message}</h2>}
      {children}
    </div>
  );
};
export default Banner;
