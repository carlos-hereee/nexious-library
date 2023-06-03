import { useContext } from "react";
import { CalendarContext } from "../../../utils/context/CalendarContext";
import { ServicesContext } from "../../../utils/context/ServicesContext";
import { UserContext } from "../../../utils/context/UserContext";
import { scrollToCartItem } from "../../../utils/functions/calendar";
import {
  minDate,
  getMeetingList,
  minTime,
} from "../../../utils/functions/moment";

const OpenAppButton = ({ service }) => {
  const { events, setDay, selectedDay, setMeeting, bookNow } =
    useContext(CalendarContext);
  const { setActive, setIsUserReq } = useContext(ServicesContext);
  const { user } = useContext(UserContext);
  const handleClick = () => {
    if (service.uid) {
      setActive(service);
    }
    if (selectedDay.hasList && selectedDay.list.length > 0) {
      const meeting = minDate(selectedDay.list);
      setMeeting(meeting);
      if (user.uid) {
        bookNow(user, meeting);
      } else {
        setIsUserReq(true);
        scrollToCartItem({ uid: "contact-user-form" });
      }
    } else {
      const meetingList = getMeetingList(events.sections);
      const meetingDay = minDate(meetingList);
      const meetingTime = minTime(meetingDay.list);
      setDay(meetingDay);
      setMeeting(meetingTime);
    }
  };
  return (
    <button
      type="button"
      className="btn btn-link"
      onClick={() => handleClick(service)}
    >
      Find Open Appointment
    </button>
  );
};
export default OpenAppButton;
