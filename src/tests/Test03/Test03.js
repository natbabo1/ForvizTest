import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import bookingDemo from "../../utils/demo-booking-data.json";
import BookingSide from "./BookingSide";
import DaySection from "./DaySection";

function Test03() {
  const { period } = useParams();
  const [searchParams] = useSearchParams();

  const [booking] = useState(bookingDemo);
  const [today] = useState(new Date("2019-09-28"));
  const [bookingToday, setBookingToday] = useState([]);
  // const [thisWeekBooking, setThisWeekBooking] = useState([]);
  // const [nextWeekBooking, setNextWeekBooking] = useState([]);
  // const [wholeMonthBooking, setWholeMonthBooking] = useState([]);

  const roomId = useMemo(() => searchParams.get("roomId"), [searchParams]);

  const checkAvailability = useCallback(
    (roomId, startTime, endTime) => {
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

      return roomBookingConflict;
    },
    [booking]
  );

  // const seperateBookingByPeriod = () => {
  //   const checkPeriod = (startEdge, endEdge, start, end) => {
  //     const isStartBetween = start >= startEdge && start < endEdge;

  //     const isEndBetween = end > startEdge && end <= endEdge;

  //     const isStartAndEndCover = start <= startEdge && end >= endEdge;

  //     return isStartBetween || isEndBetween || isStartAndEndCover;
  //   };

  //   const endThisWeek = new Date(today.getTime());
  //   const startNextWeek = new Date(today.getTime());

  //   endThisWeek.setDate(today.getDate + (6 - today.getDay()));
  //   endThisWeek.setHours(23, 59, 59);
  //   startNextWeek.setDate(today.getDate + (7 - today.getDay()));

  //   const endNextWeek = new Date(startNextWeek.getTime());
  //   endNextWeek.setDate(startNextWeek.getDate + 6);
  //   endNextWeek.setHours(23, 59, 59);

  //   const endMonth = new Date(today.getTime());
  //   endMonth.setMonth(today.getMonth + 1);
  //   endMonth.setDate(-1);
  //   endMonth.setHours(23, 59, 59);

  //   const result = {
  //     thisWeek: [],
  //     nextWeek: [],
  //     wholemonth: []
  //   };

  //   booking.forEach((item) => {
  //     if (item.roomId !== roomId) {
  //       return;
  //     }

  //     const start = new Date(item.startTime);
  //     const end = new Date(item.endTime);

  //     if (checkPeriod(today, endThisWeek, start, end)) {
  //       result.thisWeek.push(item);
  //     }
  //     if (checkPeriod(today, endNextWeek, start, end)) {
  //       result.nextWeek.push(item);
  //     }
  //     if (checkPeriod(today, endMonth, start, end)) {
  //       result.wholemonth.push(item);
  //     }
  //   });

  //   setThisWeekBooking(result.thisWeek);
  //   setNextWeekBooking(result.nextWeek);
  //   setWholeMonthBooking(result.wholemonth);
  // };

  useEffect(() => {
    if (roomId) {
      const tmr = new Date(today.getTime());
      tmr.setHours(23, 59, 59);

      const bookToday = checkAvailability(roomId, today, tmr);
      setBookingToday(bookToday);

      // seperateBookingByPeriod();
    }
  }, [checkAvailability, roomId, today]);

  return (
    <>
      <div className="remark">
        <h1>
          <span>Remark</span>: This is incomplete. Need to filter by period of
          time from parameter and grouping Bookings by date for array rendering
        </h1>
      </div>
      <div className="test-03">
        <div className="side-detail">
          <div className="roomId">
            <h2>{roomId}</h2>
          </div>
          <div className="decora"></div>
          <div className="detail">
            Upcomming
            <h1>
              {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                today
              )}
            </h1>
            <h2 style={{ display: "flex", gap: "16px" }}>
              <div>{today.getDate()}</div>
              <div>
                {new Intl.DateTimeFormat("en-US", { month: "short" }).format(
                  today
                )}
              </div>
            </h2>
          </div>
          <div className="today-booking">
            {bookingToday.length > 0
              ? bookingToday.map((item) => (
                  <BookingSide key={item.id} book={item} />
                ))
              : ""}
          </div>
        </div>
        <div className="time-period">
          <div className="time-header">
            <Link to={`/test-03/bookings/thisweek?roomId=${roomId}`}>
              THIS WEEK
              <div
                className={`${period === "thisweek" ? "header-selected" : ""}`}
              ></div>
            </Link>
            <Link to={`/test-03/bookings/nextweek?roomId=${roomId}`}>
              NEXT WEEK
              <div
                className={`${period === "nextweek" ? "header-selected" : ""}`}
              ></div>
            </Link>
            <Link to={`/test-03/bookings/wholemonth?roomId=${roomId}`}>
              WHOLE MONTH
              <div
                className={`${
                  period === "wholemonth" ? "header-selected" : ""
                }`}
              ></div>
            </Link>
          </div>
          <div className="timeline">
            <div className="line"></div>
            <DaySection />
            <DaySection />
            <DaySection />
            <DaySection />
            <DaySection />
            <DaySection />
          </div>
        </div>
      </div>
    </>
  );
}

export default Test03;
