import { useMemo, useRef, useState } from "react";
import bookingDemo from "../../utils/demo-booking-data.json";
import timeArray from "../../utils/timeArray.json";

function Test02A() {
  const [booking] = useState(bookingDemo);
  const [checked, setChecked] = useState(null);
  const [conflictBookings, setConflictBookings] = useState([]);

  const roomInput = useRef();
  const startDateInput = useRef();
  const startTimeInput = useRef();
  const endDateInput = useRef();
  const endTimeInput = useRef();

  const timeOptions = useMemo(
    () =>
      timeArray.map((item, idx) => (
        <option key={idx} value={item}>
          {item}
        </option>
      )),
    []
  );

  // ==== Test 02A Function ====
  const checkAvailability = (roomId, startTime, endTime) => {
    const checkingStartTime = new Date(startTime).getTime();
    const checkingEndTime = new Date(endTime).getTime();

    const roomBookingConflict = booking.filter((item) => {
      if (item.roomId !== roomId) {
        return false;
      }

      const itemStartTime = new Date(item.startTime).getTime();
      const itemEndTime = new Date(item.endTime).getTime();

      const isStartBetween =
        itemStartTime >= checkingStartTime && itemStartTime < checkingEndTime;

      const isEndBetween =
        itemEndTime > checkingStartTime && itemEndTime <= checkingEndTime;

      const isStartAndEndCover =
        itemStartTime <= checkingStartTime && itemEndTime >= checkingEndTime;

      return isStartBetween || isEndBetween || isStartAndEndCover;
    });

    setConflictBookings(roomBookingConflict);

    return roomBookingConflict.length === 0;
  };
  // ==== End of Test 02A Function ====

  const handleSubmit = (e) => {
    e.preventDefault();
    const room = roomInput.current.value;
    const start =
      startDateInput.current.value + "T" + startTimeInput.current.value;
    const end = endDateInput.current.value + "T" + endTimeInput.current.value;

    const checkAvailable = checkAvailability(room, start, end);
    setChecked(checkAvailable);
  };

  return (
    <>
      <form className="room-checker" onSubmit={handleSubmit}>
        <h2>Check room available</h2>
        <label>
          <span>Room: </span>
          <select ref={roomInput} defaultValue="-">
            <option disabled value="-">
              Select room...
            </option>
            <option value="A101">A101</option>
            <option value="A102">A102</option>
            <option value="Auditorium">Auditorium</option>
          </select>
        </label>
        <div className="input-time-box">
          <h3>Start Time: </h3>
          <input ref={startDateInput} type="date" min="2019-09-01" />
          <select ref={startTimeInput}>{timeOptions}</select>
        </div>
        <div className="input-time-box">
          <h3>End Time: </h3>
          <input ref={endDateInput} type="date" min="2019-09-01" />
          <select ref={endTimeInput}>{timeOptions}</select>
        </div>
        <button type="submit">Check Now</button>
      </form>
      {checked !== null ? (
        <h3 style={{ margin: "24px 0" }}>
          Result:{" "}
          <span style={{ color: checked ? "green" : "red" }}>
            {checked ? "Available" : "Unavailable"}
          </span>
        </h3>
      ) : (
        ""
      )}
      {conflictBookings.length !== 0 ? (
        <>
          <h3 style={{ color: "#ff9797" }}>Conflict Booking List: </h3>
          {conflictBookings.map((item) => (
            <div key={item.id} style={{ marginTop: "14px" }}>
              <h4 style={{ marginBottom: "2px" }}>Title: {item.title}</h4>
              <h4>Start time: {item.startTime}</h4>
              <h4>End time: {item.endTime}</h4>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Test02A;
