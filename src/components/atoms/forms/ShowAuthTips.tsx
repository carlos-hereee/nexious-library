import { useTips } from "@nxs-utils/hooks/useTips";
import { Icon } from "..";

type ClickProp = {
  onSubmit: () => void;
};

const ShowAuthTips: React.FC<ClickProp> = (props) => {
  const { onSubmit } = props;
  const { tips, setTips } = useTips();
  return (
    <div className="form-field password-checker">
      <h3>Your password difficulty to guess is at {tips.ease}</h3>
      <p>Increase your password's security by:</p>
      <ol>
        {tips.tips.map((t) => (
          <li key={t} className="p-stretch">
            {t}{" "}
          </li>
        ))}
      </ol>
      <div className="flex-center m-tb">
        <button
          type="button"
          className="btn-main btn-cancel"
          onClick={onSubmit}
        >
          <Icon icon="submit" />
          Continue anyway
        </button>
      </div>
    </div>
  );
};
export default ShowAuthTips;
