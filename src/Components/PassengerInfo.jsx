import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { loadStripe } from "@stripe/stripe-js";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PassengerInfo = () => {
  const selectedTrip = useSelector((state) => state.selectedTrip);
  console.log(selectedTrip);
  const startHour = new Date(Number(selectedTrip.trip.startTime)).getHours();
  const startMin = new Date(Number(selectedTrip.trip.startTime)).getMinutes();
  const endHour = new Date(Number(selectedTrip.trip.endTime)).getHours();
  const endMin = new Date(Number(selectedTrip.trip.endTime)).getMinutes();
  const fromDist = selectedTrip.trip.fromDist[0].districts.name;
  const toDist = selectedTrip.trip.toDist[0].districts.name;

  const [fullname, setFullname] = useState("");
  const [gender, setgender] = useState("");
  const [age, setage] = useState(0);
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  let personalInfo = {
    fullname,
    gender,
    age,
    mobile,
    email,
  };
  const payFare = async (e) => {
    e.preventDefault();
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
    const stripe = await loadStripe(
      "pk_test_51OGcQXSHZSct4ug9eu44GpCEVyhRkYEKU7LhRqfFKAkA7OsL9I3Ct6VFE8o2AFwE0fOcboqK7ronYc8UPk37akXc00R2qdAKpo"
    );
    console.log(personalInfo);
    const body = {
      seats: selectedTrip.selectedSeat,
      trip: selectedTrip.trip,
      personalInfo: personalInfo,
      metadata: {
        seats: selectedTrip.selectedSeat,
        trip: selectedTrip.trip,
        personalInfo: personalInfo,
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "https://reserve-be.onrender.com/tickets/payment",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    // localStorage.setItem("transactionId", JSON.stringify(session));
    if (result.error) {
      console.log(result.error);
    }
  };
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
  localStorage.setItem("trip", JSON.stringify(selectedTrip));
  return (
    <div className="container d-flex justify-content-between my-5">
      <div className="flex-grow-1 mx-2">
        {/* Trip Details block */}
        <p className="fs-5 text-warning">
          <b>Trip Details :</b>
        </p>
        <div className="d-flex flex-column border border-1 rounded shadow-sm mb-3 py-2 px-1">
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
            <div className="text-center text-muted align-self-center">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <p className="align align-self-center mb-0 text-decoration-underline">
              01 hours 00 minutes
            </p>
            <div className="text-center text-muted align-self-center">
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
            <div className="text-center text-muted">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <p className="mx-3">{toDist}</p>
          </div>
        </div>

        {/* Personal Info Form */}
        <div className="my-5">
          <p className="fs-5 text-warning">
            <b>Personal Info :</b>
          </p>
          <form
            className="px-2 py-4 border border-1 rounded-2"
            id="personalInfo"
            onSubmit={(e) => {
              payFare(e);
            }}
          >
            <div className="d-flex">
              <div className="mx-1 w-50 flex-shrink-1">
                <label htmlFor="name" className="px-2">
                  <b>FullName :</b>
                </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="form-control"
                  placeholder="Enter Full Name"
                  id="name"
                  required
                />
              </div>
              <div className=" mx-1 w-25">
                <label htmlFor="gender" className="px-2">
                  <b>Gender :</b>
                </label>
                <select
                  className="form-control form-select"
                  id="gender"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  required
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className=" mx-1 w-25">
                <label htmlFor="age" className="px-2">
                  <b>Age :</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                  placeholder="Age"
                  id="age"
                  required
                />
              </div>
            </div>
            <div className="d-flex mt-3">
              <div className="w-50 mx-1">
                <label htmlFor="email" className="px-2">
                  <b>Email :</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  id="email"
                  required
                />
              </div>
              <div className="w-25 mx-1">
                <label htmlFor="mobile" className="px-2">
                  <b>Mobile :</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setmobile(e.target.value)}
                  value={mobile}
                  id="mobile"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        style={{ width: "350px" }}
        className="border border-1 my-5 mx-1 rounded-2 h-100"
      >
        <div className="mx-4 mt-3 mb-5 text-warning">
          <h5>
            <b>Fare Details</b>
            <hr className="mb-0" />
          </h5>
        </div>
        <div className="mx-4 my-3 d-flex justify-content-between">
          <p>
            <b>Base Fair</b>
          </p>
          <div className="text-center text-muted">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <p>
            <b>
              {selectedTrip.trip.busFare * selectedTrip.selectedSeat.length} INR
            </b>
          </p>
        </div>
        <div className="mx-4 my-3 d-flex justify-content-between">
          <p>
            <b>Tax</b>
          </p>
          <div className="text-center text-muted mx-1">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <p>
            <b>108 INR</b>
          </p>
        </div>
        <div className="mx-4 my-3 d-flex justify-content-between">
          <p>
            <b>Other Applied</b>
          </p>
          <div className="text-center text-muted mx-1">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <p>
            <b>50 INR</b>
          </p>
        </div>
        <hr />
        <div className="text-center py-2">
          <button
            type="submit"
            form="personalInfo"
            className="btn btn-warning text-white"
            disabled={!fullname || !age || !gender || !mobile || !email}
          >
            <b>Confirm Booking</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
