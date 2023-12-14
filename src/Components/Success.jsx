import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStar } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Success = () => {
  const [selectedTrip, setselectedTrip] = useState(
    localStorage.getItem("trip") ? JSON.parse(localStorage.getItem("trip")) : {}
  );
  const [personalInfo, setpersonalInfo] = useState(
    localStorage.getItem("personalInfo")
      ? JSON.parse(localStorage.getItem("personalInfo"))
      : {}
  );
  const navigate = useNavigate();
  if (Object.keys(selectedTrip).length === 0) {
    navigate("/");
  }else{
    var startHour = new Date(Number(selectedTrip.trip.startTime)).getHours();
    var startMin = new Date(Number(selectedTrip.trip.startTime)).getMinutes();
    var endHour = new Date(Number(selectedTrip.trip.endTime)).getHours();
    var endMin = new Date(Number(selectedTrip.trip.endTime)).getMinutes();
    var fromDist = selectedTrip.trip.fromDist[0].districts.name;
    var toDist = selectedTrip.trip.toDist[0].districts.name;
  }
  // console.log(selectedTrip);

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const confirmTicket = async () => {
    try {
      const response = await fetch(
        "https://reserve-be.onrender.com/tickets/book_ticket",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            // transactionId: String,
            // session_id: String,
            fullname: personalInfo.fullname,
            trip: selectedTrip.trip._id,
            bus: selectedTrip.trip.busInfo[0]._id,
            busFare: selectedTrip.trip.busFare,
            paymentStatus: true,
            // mobile_no: "String",
            seat_no: selectedTrip.selectedSeat,
          }),
        }
      );
      const data = await response.json();
      localStorage.removeItem("trip");
      localStorage.removeItem("personalInfo");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const redirectFunction = () => {
    navigate("/");
  };
  console.log(Object.keys(selectedTrip).length);
  useEffect(() => {
    if (Object.keys(selectedTrip).length > 0 && selectedTrip?.trip) {
      confirmTicket(); // Confirm the ticket on initial render
    } else {
      redirectFunction();
    }
  }, []);


  return (
    <div>
      {Object.keys(selectedTrip).length > 0 && selectedTrip?.trip ? (
        <div className="container mt-5 text-center border border-1 rounded-2 shadow-sm">
          <div className="text-success text-center fs-1 m-2">
            <FontAwesomeIcon icon={faCheckCircle} bounce />
          </div>
          <div className="text-muted m-2">
            <h2>
              <b>Booking has been Confirmed.</b>
            </h2>
            <p className="mb-2">
              <b>Ticket id : </b>
            </p>
            <p className="mb-2">
              <b>Transaction id : </b>
            </p>
            <p className="mb-2">
              <b>
                Passenger Details : {personalInfo.fullname},
                {personalInfo.gender},{personalInfo.age}
              </b>
            </p>
            <p className="mb-2">
              <b>Contact Details : {personalInfo.mobile}</b>
            </p>
          </div>
          <div className="border border-1 rounded shadow-sm mb-3 py-2 px-1 mx-5">
            {/* Bus Information  */}
            <div className="d-flex flex-wrap pt-2 px-2">
              <p className="text-warning mb-0">
                <b>{selectedTrip.trip.busInfo[0].name}</b>
              </p>
              <p className="bg-success rounded-2 text-white mx-3 px-1 mb-0">
                <i>
                  <FontAwesomeIcon icon={faStar} />
                </i>
                {selectedTrip.trip.busInfo[0].rating}
              </p>
              <span className="text-muted">Ratings</span>
            </div>

            {/* Additional Information  */}
            <div className="d-flex flex-wrap px-2 text-muted pb-1 gap-2 mt-1">
              <small>
                {selectedTrip.trip.busInfo[0].category}
                {"  "} |
              </small>
              <small>
                {" "}
                {selectedTrip.trip.busInfo[0].totalSeats -
                  selectedTrip.trip.seatBooked.length}{" "}
                seats available{"  "} |
              </small>
              <small>
                {" "}
                {selectedTrip.trip.busInfo[0].totalWindowSeatsAvailable} window
                seats available
              </small>
            </div>

            {/* Time and Date part */}
            <div className="d-flex flex-wrap px-2 text-muted pb-1 gap-2">
              <p className="fs-4 mb-0">
                {startHour < 10 ? "0" + startHour : startHour}:
                {startMin < 10 ? "0" + startMin : startMin},
              </p>
              <p className="fs-4 mb-0">
                {new Date(Number(selectedTrip.trip.startTime)).getDate()}{" "}
                {months[new Date(Number(selectedTrip.trip.startTime)).getMonth()]} 
              </p>
              <div className="text-center text-muted align-self-center mx-1">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p className="align align-self-center mb-0">
                01 hours 00 minutes
              </p>
              <div className="text-center text-muted align-self-center mx-1">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <p className="fs-4 mb-0">
                 {endHour < 10 ? "0" + endHour : endHour}:
                {endMin < 10 ? "0" + endMin : endMin},
              </p>
              <p className="fs-4 mb-0">
                {new Date(Number(selectedTrip.trip.endTime)).getDate()}{" "}
                {months[new Date(Number(selectedTrip.trip.endTime)).getMonth()]}
              </p>
            </div>
            <div className="text-start d-flex">
              <p className="mx-3">{fromDist}</p>
              {"---------"}
              <p className="mx-3">{toDist}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p>Redirecting to home...</p>
        </>
      )}
    </div>
  );
};
export default Success;
