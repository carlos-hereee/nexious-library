import { HeroProps } from "src/types/types";

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <img className={`hero ${data.name}`} src={data.link} alt={data.name} />
  );
};

export default Hero;
