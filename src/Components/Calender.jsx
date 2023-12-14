import React, { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
// import './Calendar.css'; // Add your CSS file for additional styling

const Calendar = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const renderDates = (start) => {
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(start, i);
      const formattedDate = format(currentDate, "yyyy-MM-dd");

      dates.push(
        <div
          key={formattedDate}
          className={`calendar-date btn rounded-5 ${
            selectedDate === formattedDate ? "btn-warning" : "btn-light"
          }`}
          onClick={() => handleDateClick(formattedDate)}
        >
          {format(currentDate, "MMM d")}
        </div>
      );
    }

    return dates;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // You can perform additional actions on date selection
    props.setDate(Date.parse(date));
  };

  const handlePrevClick = () => {
    setStartDate(subDays(startDate, 7));
  };

  const handleNextClick = () => {
    setStartDate(addDays(startDate, 7));
  };

  return (
    <div className="calendar">
      <button
        className="btn btn-link fs-2 text-warning"
        data-toggle="tooltip"
        data-placement="top"
        title="Prev"
        onClick={handlePrevClick}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <div className="btn-group">{renderDates(startDate)}</div>
      <button
        className="btn btn-link fs-2 text-warning"
        data-toggle="tooltip"
        data-placement="top"
        title="Next"
        onClick={handleNextClick}
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
};

export default Calendar;
