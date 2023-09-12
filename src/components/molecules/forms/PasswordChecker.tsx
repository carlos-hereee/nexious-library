import { Icon } from "@nxs-atoms";

type PasswordCheckerProps = {
  ease: string;
  tips: string[];
  submit?: (a: any) => void;
};
const PasswordChecker: React.FC<PasswordCheckerProps> = (props) => {
  const { ease, tips, submit } = props;
  return (
    <div className="form-field password-checker">
      <h3>Your password difficulty to guess is at {ease}</h3>
      <p>Increase your password's security by:</p>
      <ol>
        {tips.map((t) => (
          <li key={t} className="text-max">
            {t}{" "}
          </li>
        ))}
      </ol>
      <div className="flex-center m-tb">
        <button type="button" className="btn-main btn-cancel" onClick={submit}>
          <Icon icon="submit" />
          Continue anyway
        </button>
        <button type="submit" className="btn-main">
          <Icon icon="submit" />
          Try again
        </button>
      </div>
    </div>
  );
};
export default PasswordChecker;
