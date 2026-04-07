import Button from "@nxs-atoms/buttons/Button";
import Hero from "@nxs-molecules/assets/Hero";

interface AvatarCardButtonProps {
  user: { avatar: string; name: string };
  theme?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const AvatarCardButton = ({ user, theme, onClick, children }: AvatarCardButtonProps) => {
  return (
    <Button theme={theme} onClick={onClick}>
      {user.avatar ? (
        <Hero hero={{ url: user.avatar, alt: `${user.name || "no-name"}-avatar"` }} theme="avatar-sm" />
      ) : (
        <strong>{user.name || "No name"}</strong>
      )}
      {children}
    </Button>
  );
};
export default AvatarCardButton;
