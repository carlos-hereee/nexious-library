import { Button, Icon } from "@nxs-atoms";

type PasswordCheckerProps = {
  ease: string;
  tips: string[];
  submit?: (a: unknown) => void;
};
const PasswordChecker: React.FC<PasswordCheckerProps> = (props) => {
  const { ease, tips, submit } = props;
  return (
    <div className="form-field password-checker">
      <h3>Your password difficulty to guess is at {ease}</h3>
      <p>Increase your password security by:</p>
      <ol>
        {tips.map((t) => (
          <li key={t} className="text-max">
            {t}{" "}
          </li>
        ))}
      </ol>
      <div className="flex-center m-tb">
        {/* Continue anyway is the way past the advice (secondary) and Try again resubmits (primary), on
            the nxs-btn family (2026-11 item 337); the legacy classes stay beside them until item 339. */}
        <Button variant="secondary" className="btn-main btn-cancel" onClick={() => submit && submit(undefined)}>
          <Icon icon="submit" />
          Continue anyway
        </Button>
        <Button type="submit" variant="primary" className="btn-main">
          <Icon icon="submit" />
          Try again
        </Button>
      </div>
    </div>
  );
};
export default PasswordChecker;
