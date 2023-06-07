const UserCard = ({ data }) => {
  return (
    <div>
      <p>
        Name: {data.firstName} {data.lastName}
      </p>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
    </div>
  );
};

export default UserCard;
