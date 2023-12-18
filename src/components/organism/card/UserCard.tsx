import { Hero } from "@nxs-molecules";
import type { UserCardProps } from "nxs-card";

const UserCard: React.FC<UserCardProps> = (props) => {
  const { user, hideLabels, theme, hideHero } = props;
  return (
    <div className={theme ? `user-card ${theme}` : "user-card"}>
      {!hideHero && (
        <Hero
          hero={{ url: user.hero, alt: `avatar ${user.name || user.username}` }}
          theme="hero-user"
        />
      )}
      {!hideLabels && (
        <div className="flex-d-column">
          {user.name ||
            (user.username && (
              <p className="text-max">
                <strong> Name:</strong> {user.name || user.username}
              </p>
            ))}
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
        </div>
      )}
    </div>
  );
};
export default UserCard;
