import { Hero } from "@nxs-molecules";
import type { UserCardProps } from "nxs-card";

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
