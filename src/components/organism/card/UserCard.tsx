import { Hero } from "@nxs-molecules";
import { HeroProp } from "@nxs-utils/helpers/types";

export type UserCardProps = {
  hideLabels?: boolean;
  hideHero?: boolean;
  theme?: boolean;
  user: {
    hero: HeroProp;
    name?: string;
    email?: string;
    phone?: string;
  };
};
const UserCard: React.FC<UserCardProps> = (props) => {
  const { user, hideLabels, theme, hideHero } = props;
  return (
    <div className={theme ? `user-card ${theme}` : "user-card"}>
      {!hideHero && <Hero hero={user.hero} theme="hero-user" />}
      {!hideLabels && (
        <div className="flex-d-column">
          {user.name && <p className="text-max">Name: {user.name}</p>}
          {user.email && <p className="text-max">Email: {user.email}</p>}
          {user.phone && <p className="text-max">Phone: {user.phone}</p>}
        </div>
      )}
    </div>
  );
};
export default UserCard;
