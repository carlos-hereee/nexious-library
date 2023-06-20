import { HeroProps } from "@nexious-helpers/types";

type Props = { data: HeroProps };

const Hero: React.FC<Props> = ({ data }) => {
  return (
    <img className={`hero ${data.name}`} src={data.link} alt={data.name} />
  );
};

export default Hero;
