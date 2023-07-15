import { Hero } from "@nxs-atoms/index";

type UserCardProps = {
  hideLabels: boolean;
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
  const { user, hideLabels } = props;
  return (
    <div className="user-card">
      {!hideLabels && <h3 className="user-name">{user.name}</h3>}
      <Hero hero={user.hero} name={user.name} />
    </div>
  );
};
export default UserCard;
