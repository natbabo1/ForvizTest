import Booking from "./Booking";

function DaySection() {
  return (
    <div>
      <div className="dateline ">{"Today (Mon, 28 Sep)"}</div>
      <Booking />
      <Booking />
      <Booking />
    </div>
  );
}

export default DaySection;
