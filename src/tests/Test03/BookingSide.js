import React from "react";

function BookingSide({ book }) {
  return (
    <div className="booking-s">
      <h4 className="booking-s-time">
        {book.startTime.split(" ")[1].slice(0, 5)} -
        {" " + book.endTime.split(" ")[1].slice(0, 5)}
      </h4>
      <h3 className="booking-s-title">{book.title}</h3>
    </div>
  );
}

export default BookingSide;
