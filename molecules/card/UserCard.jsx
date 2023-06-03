import { useContext } from "react";
import { UserContext } from "../../../utils/context/UserContext";

const UserCard = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="card-body">
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default UserCard;
