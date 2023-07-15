import { Hero } from "@nxs-atoms/index";

type UserCardProps = {
  user: {
    name: string;
    hero: {
      url: string;
      alt: string;
      name: string;
    };
  };
};
const UserCard: React.FC<UserCardProps> = (props) => {
  const { user } = props;
  return (
    <div className="user-card">
      <h3 className="user-name">{user.name}</h3>
      <Hero hero={user.hero} name={user.name} />
    </div>
  );
};
export default UserCard;
