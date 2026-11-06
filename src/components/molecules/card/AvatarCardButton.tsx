import Button from "@nxs-atoms/buttons/Button";
import Hero from "@nxs-molecules/assets/Hero";

interface AvatarCardButtonProps {
  user: { avatar: string; name: string };
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const AvatarCardButton = ({ user, className, onClick, children }: AvatarCardButtonProps) => {
  return (
    <Button className={className} onClick={onClick}>
      {user.avatar ? (
        <Hero hero={{ url: user.avatar, alt: `${user.name || "no-name"}-avatar"` }} className="avatar-sm" />
      ) : (
        <strong>{user.name || "No name"}</strong>
      )}
      {children}
    </Button>
  );
};
export default AvatarCardButton;
