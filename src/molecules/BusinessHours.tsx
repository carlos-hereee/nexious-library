// import { useContext } from "react";
// import CardHeader from "./card/CardHeader";

const BusinessHours = () => {
  // const { schedule } = useContext(AppContext);
  return (
    <div>
      {/* <CardHeader data={schedule} /> */}
      <table className="responsive-table">
        <thead>
          <tr className="table-header">
            <th className="right-header">Days</th>
            <th className="right-header">Hours</th>
          </tr>
        </thead>
        <tbody>
          {/* {schedule.hours.map((b) => (
            <tr className="responsive-table-item" key={b.key}>
              <th className="left-header">{b.day}</th>
              <td className="responsive-table-cell">
                <strong>{b.hours}</strong>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

// Monday: Closed Tuesday: 9:30 am - 6:30 pm Wednesday: 9:30 am - 6:30 pm
// Thursday: 9:30 am - 6:30 pm Friday: 9:30 am - 6:30 pm Saturday: 9:00 am -
// 5:30 pm Sunday: Closed

export default BusinessHours;
