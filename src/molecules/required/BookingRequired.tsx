const BookingRequired = ({ data }) => {
  return (
    <p className="required">
      Booking required for{" "}
      <strong>
        {data.title} {data.subtitle}
      </strong>{" "}
      create an appointment on our booking page
    </p>
  );
};
export default BookingRequired;
