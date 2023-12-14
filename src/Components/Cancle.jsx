import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


const Cancle = () => {
  const [selectedTrip, setselectedTrip] = useState(
    localStorage.getItem("trip") ? JSON.parse(localStorage.getItem("trip")) : {}
  );
  const [personalInfo, setpersonalInfo] = useState(
    localStorage.getItem("personalInfo")
      ? JSON.parse(localStorage.getItem("personalInfo"))
      : {}
  );
  const cancelTicket = async () => {
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
            paymentStatus: false,
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
const navigate = useNavigate()
  const redirectFunction = () => {
    navigate("/");
  };
  console.log(Object.keys(selectedTrip).length);
  useEffect(() => {
    if (Object.keys(selectedTrip).length > 0 && selectedTrip?.trip) {
      cancelTicket(); // Confirm the ticket on initial render
    } else {
      redirectFunction();
    }
  }, []);

  return (
    <div className="container mt-5 text-center border border-1 rounded-2 shadow-sm">
      <div className="text-danger text-center fs-1 m-2">
        <FontAwesomeIcon icon={faSquareXmark} bounce />
      </div>
      <div className="text-muted m-2">
        <h2>
          <b>Booking has not been Confirmed.</b>
        </h2>
        <p className="mb-2">
          <b>Transaction id : </b>
        </p>
      </div>
    </div>
  )
}

export default Cancle