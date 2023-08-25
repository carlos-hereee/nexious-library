import { Hero } from "@nxs-molecules";
import { HeroProp } from "@nxs-utils/helpers/types";

export type UserCardProps = {
  hideLabels?: boolean;
  hideHero?: boolean;
  isRow?: boolean;
  user: {
    name: string;
    email?: string;
    phone?: string;
    hero: HeroProp;
  };
};
const UserCard: React.FC<UserCardProps> = (props) => {
  const { user, hideLabels, isRow, hideHero } = props;
  return (
    <div className={isRow ? "user-card user-card-row" : "user-card"}>
      {!hideHero && user.hero && <Hero hero={user.hero} name="hero-user" />}
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
