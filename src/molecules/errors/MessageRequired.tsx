import { RequiredProps } from "@/helpers/interface";
import { KeyValue } from "@/atoms";

const MessageRequired: React.FC<RequiredProps> = ({ data, message }) => {
  return (
    <div className="required">
      {/* Booking required for{" "}
      <strong>
        {data.title} {data.subtitle}
      </strong>{" "}
      create an appointment on our booking page */}
      <KeyValue key={data.title} value={data.value} />
      {message && <p>{message}</p>}
    </div>
  );
};
export default MessageRequired;
