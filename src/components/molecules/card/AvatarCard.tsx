import Hero from "@nxs-molecules/assets/Hero";

interface AvatarCardProps {
  user: {
    avatar: string;
    name: string;
  };
  className?: string;
  children?: React.ReactNode;
}

const AvatarCard = ({ user, className, children }: AvatarCardProps) => {
  return (
    <div className={className || "user-avatar-container"}>
      <Hero hero={{ url: user.avatar, alt: "user-avatar" }} className="avatar-sm" />
      {user.name && <p> {user.name}</p>}
      {children}
    </div>
  );
};
export default AvatarCard;
