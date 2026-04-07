import Hero from "@nxs-molecules/assets/Hero";

interface AvatarCardProps {
  user: {
    avatar: string;
    name: string;
  };
  theme?: string;
  children?: React.ReactNode;
}

const AvatarCard = ({ user, theme, children }: AvatarCardProps) => {
  return (
    <div className={theme || "user-avatar-container"}>
      <Hero hero={{ url: user.avatar, alt: "user-avatar" }} theme="avatar-sm" />
      {user.name && <p> {user.name}</p>}
      {children}
    </div>
  );
};
export default AvatarCard;
