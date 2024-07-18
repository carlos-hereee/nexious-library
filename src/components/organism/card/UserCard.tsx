import { Hero } from "@nxs-molecules";
import type { UserCardProps } from "nxs-card";

const UserCard: React.FC<UserCardProps> = ({ user, hideLabels, theme, hideHero }) => {
  const name = user.nickname || user.name || user.username || "";
  return (
    <div className={theme ? `user-card ${theme}` : "user-card"}>
      {!hideHero && user.hero && (
        <Hero hero={{ url: user.hero, alt: `avatar ${user.name || user.username}` }} theme="hero-user" />
      )}
      {!hideLabels && (
        <>
          {name && (
            <p className="text-max">
              <strong> Name:</strong> {user.name || user.nickname || user.username}
            </p>
          )}
          {user.email && (
            <p className="text-max">
              <strong>Email:</strong> {user.email}
            </p>
          )}
          {user.phone && (
            <p className="text-max">
              <strong>Phone:</strong> {user.phone}
            </p>
          )}
          {user.address && (
            <p className="text-max">
              <strong>Address:</strong> {user.address}
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default UserCard;
