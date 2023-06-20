import { HeroProps } from "@nexious-helpers/types";

type Props = { data: HeroProps };

const Logo: React.FC<Props> = ({ data }) => {
  return (
    <img
      className={`hero hero-logo ${data.name}`}
      src={data.link}
      alt={data.name}
    />
  );
};

export default Logo;
