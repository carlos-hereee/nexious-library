import { useTips } from "@nxs-utils/hooks/useTips";
import { Icon } from "@nxs-atoms";
import Button from "@nxs-atoms/buttons/Button";
import type { ButtonProps } from "nxs-button";

const ShowAuthTips: React.FC<ButtonProps> = (props) => {
  const { onSubmit } = props;
  const { tips } = useTips();
  return (
    <div className="form-field password-checker">
      <h3>Your password difficulty to guess is at {tips.ease}</h3>
      <p>Increase your password security by:</p>
      <ol>
        {tips.tips.map((t) => (
          <li key={t} className="text-max">
            {t}{" "}
          </li>
        ))}
      </ol>
      <div className="flex-center m-tb">
        {/* The secondary nxs-btn (2026-11 item 337); the legacy classes stay beside it until item 339. */}
        <Button variant="secondary" className="btn-main btn-cancel" onClick={() => onSubmit && onSubmit()}>
          <Icon icon="submit" />
          Continue anyway
        </Button>
      </div>
    </div>
  );
};
export default ShowAuthTips;
