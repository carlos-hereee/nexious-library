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
          {user.name && <p className="p-stretch">Name: {user.name}</p>}
          {user.email && <p className="p-stretch">Email: {user.email}</p>}
          {user.phone && <p className="p-stretch">Phone: {user.phone}</p>}
        </div>
      )}
    </div>
  );
};
export default UserCard;
