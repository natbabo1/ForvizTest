import { useRef, useState } from "react";
import bookingDemo from "../utils/demo-booking-data.json";

function Test02B() {
  const [todayBookings, setTodayBookings] = useState([]);
  const [thisWeekBookings, setThisWeekBookings] = useState([]);
  const [nextWeekBookings, setNextWeekBookings] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const roomInput = useRef();
  const weekInput = useRef();

  const getBookingsForWeek = (roomId, weekNo) => {
    const calStartDateOfWeekNo = (weekNoInput) => {
      const weekInput = weekNoInput.split("-");
      const year = +weekInput[0];
      const week = +weekInput[1].slice(1);

      const simpleWeekCal = new Date(year, 0, 1 + (week - 1) * 7);
      const dayOfWeek = simpleWeekCal.getDay();
      const weekStart = simpleWeekCal;

      if (dayOfWeek <= 4) {
        weekStart.setDate(simpleWeekCal.getDate() - simpleWeekCal.getDay() + 1);
      } else {
        weekStart.setDate(simpleWeekCal.getDate() + 8 - simpleWeekCal.getDay());
      }

      return weekStart;
    };
    const checkInWeek = (startWeek, start, end) => {
      const endWeek = new Date(startWeek.getTime());
      endWeek.setDate(endWeek.getDate() + 6);

      const isStartBetween = start >= startWeek && start < endWeek;

      const isEndBetween = end > startWeek && end <= endWeek;

      const isStartAndEndCover = start <= startWeek && end >= endWeek;

      return isStartBetween || isEndBetween || isStartAndEndCover;
    };

    const result = {
      today: [],
      thisWeek: [],
      nextWeek: []
    };
    const today = new Date().getDate();
    const startDateThisWeek = calStartDateOfWeekNo(weekNo);
    const startDateNextWeek = new Date(startDateThisWeek.getTime());
    startDateNextWeek.setDate(startDateThisWeek.getDate() + 7);

    bookingDemo.forEach((item) => {
      if (item.roomId !== roomId) {
        return;
      }

      const start = new Date(item.startTime);
      const end = new Date(item.endTime);

      console.log(start, end);
      if (today === start.getDate() || today === end.getDate()) {
        result.today.push(item);
      }
      if (checkInWeek(startDateThisWeek, start, end)) {
        result.thisWeek.push(item);
        console.log(item);
      }
      if (checkInWeek(startDateNextWeek, start, end)) {
        result.nextWeek.push(item);
      }
    });

    return result;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { today, thisWeek, nextWeek } = getBookingsForWeek(
      roomInput.current.value,
      weekInput.current.value
    );

    setTodayBookings(today);
    setThisWeekBookings(thisWeek);
    setNextWeekBookings(nextWeek);
    setIsSubmit(true);
  };

  return (
    <>
      <form onSubmit={handleSubmitForm} className="week-booking-box">
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
        <label>
          <span>Week No.:</span>
          <input ref={weekInput} type="week" />
        </label>
        <button type="submit">Check</button>
      </form>
      {isSubmit ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "32px"
          }}
        >
          <div className="result">
            <h3>Today Booking List: </h3>
            {todayBookings.length !== 0
              ? todayBookings.map((item) => (
                  <div key={item.id} style={{ marginTop: "14px" }}>
                    <h4 style={{ marginBottom: "2px" }}>Title: {item.title}</h4>
                    <h4>Start time: {item.startTime}</h4>
                    <h4>End time: {item.endTime}</h4>
                  </div>
                ))
              : "None"}
          </div>
          <div className="result">
            <h3>This Week Booking List: </h3>
            {thisWeekBookings.length !== 0
              ? thisWeekBookings.map((item) => (
                  <div key={item.id} style={{ marginTop: "14px" }}>
                    <h4 style={{ marginBottom: "2px" }}>Title: {item.title}</h4>
                    <h4>Start time: {item.startTime}</h4>
                    <h4>End time: {item.endTime}</h4>
                  </div>
                ))
              : "None"}
          </div>

          <div className="result">
            <h3>Next Week Booking List: </h3>
            {nextWeekBookings.length !== 0
              ? nextWeekBookings.map((item) => (
                  <div key={item.id} style={{ marginTop: "14px" }}>
                    <h4 style={{ marginBottom: "2px" }}>Title: {item.title}</h4>
                    <h4>Start time: {item.startTime}</h4>
                    <h4>End time: {item.endTime}</h4>
                  </div>
                ))
              : "None"}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Test02B;
