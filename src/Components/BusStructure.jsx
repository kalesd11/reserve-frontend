import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import {
  faArrowRight,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../States/Actions/index";

const BusStructure = (props) => {
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
  const row1 = ["L1", "L2", "L3", "L4", "L5", "L6", "L7"];
  const row2 = ["L8", "L9", "L10", "L11", "L12", "L13", "L14"];
  const row3 = ["R1", "R2", "R3", "R4", "R5"];

  const [viewSeats, setViewSeats] = useState(false);
  const [selected, setselected] = useState([]);
  // console.log(new Date(props.trip.startTime).getMonth());
  // console.log(props.trip);
  // console.log(selected.length);
  const dispatch = useDispatch();
  const startHour = new Date(Number(props.trip.startTime)).getHours();
  const startMin = new Date(Number(props.trip.startTime)).getMinutes();
  const endHour = new Date(Number(props.trip.endTime)).getHours();
  const endMin = new Date(Number(props.trip.endTime)).getMinutes();

  const selectedSeat = (i) => {
    if (selected.includes(i)) {
      let index = selected.indexOf(i);
      let newArr = [...selected];
      newArr.splice(index, 1);
      setselected([...newArr]);
    } else {
      setselected([...selected, i]);
    }
  };

  return (
    <div className="border border-1 rounded-3">
      <div
        className="border border-1 rounded-3 gap-1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="d-flex flex-column flex-grow-1 rounded shadow-sm">
          {/* Bus Information  */}
          <div className="d-flex flex-wrap pt-2 px-2">
            <p className="text-warning mb-0">
              <b>{props.trip.busInfo[0].name}</b>
            </p>
            <p className="bg-success rounded-2 text-white mx-3 px-1 mb-0">
              <i>
                <FontAwesomeIcon icon={faStar} />
              </i>
              {props.trip.busInfo[0].rating}
            </p>
            <span className="text-muted">Ratings</span>
          </div>

          {/* Additional Information  */}
          <div className="d-flex flex-wrap px-2 text-muted pb-1 gap-2 mt-1">
            <small>
              {props.trip.busInfo[0].category}
              {"  "} |
            </small>
            <small>
              {" "}
              {props.trip.busInfo[0].totalSeats -
                props.trip.seatBooked.length}{" "}
              seats available{"  "}|
            </small>
            <small>
              {" "}
              {props.trip.busInfo[0].totalWindowSeatsAvailable} window seats
              available
            </small>
          </div>

          {/* Time and Date part */}
          <div className="d-flex flex-wrap px-2 text-muted pb-1 gap-2 align-items-center">
            <p className="fs-4 mb-0">
              {startHour < 10 ? "0" + startHour : startHour}:
              {startMin < 10 ? "0" + startMin : startMin},
            </p>
            <p className="fs-4 mb-0">
              {new Date(Number(props.trip.startTime)).getDate()}{" "}
              {months[new Date(Number(props.trip.startTime)).getMonth()]}
            </p>
            <div className="text-center text-muted align-self-center mx-1">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <p className="align align-self-center mb-0 text-decoration-underline">
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
              {new Date(Number(props.trip.endTime)).getDate()}{" "}
              {months[new Date(Number(props.trip.endTime)).getMonth()]}
            </p>
          </div>

          {/* Dropdown created */}
          <Dropdown>
            <Dropdown.Toggle
              variant="inherit"
              id="dropdown-basic"
              className="text-primary"
            >
              Amineties
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {props.trip.amenitiesList.map((elem, index) => (
                <Dropdown.Item key={index}>{elem}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Bus Cost And Price */}
        <div
          style={{ justifySelf: "flex-end", marginRight: "0", width: "250px" }}
          className="text-center shadow-sm rounded w-auto flex-grow-1"
        >
          <div className="d-flex flex-column">
            <small className="text-muted mt-1 fs-6">
              <b>Bus Cost</b>
            </small>
            <small className="text-muted mb-0">starting from</small>
            <p className="fs-4 mb-0">
              <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
              <b>{props.trip.busFare}</b>
            </p>
            <button
              className="btn btn-warning mb-2 mx-2 text-white"
              onClick={() => setViewSeats(!viewSeats)}
            >
              <b>{!viewSeats ? "View Seats" : "Hide Seats"}</b>
            </button>
          </div>
        </div>
      </div>

      {/* View Seat Page */}
      <div hidden={!viewSeats}>
        <div className="d-flex">
          <div
            className="mx-2 border border-1 rounded-2 w-50"
            style={{ height: "150px" }}
          >
            <div className="d-flex justify-content-evenly">
              {row1.map((seat) => {
                return (
                  <button
                    key={Math.random()}
                    className={`col-1 border btn border-1 m-1 text-center flex-grow-1 flex-shrink-1 
                ${selected.includes(seat) ? "btn-warning" : ""}${
                      props.trip.seatBooked.includes(seat) ? "btn-danger" : ""
                    }`}
                    style={{ height: "25px" }}
                    onClick={() => selectedSeat(seat)}
                    disabled={
                      props.trip.seatBooked.includes(seat)
                      // ||(selected.length === 1 && index !== selected[0])
                    }
                  ></button>
                );
              })}
            </div>
            <div className="d-flex justify-content-evenly">
              {row2.map((seat) => {
                return (
                  <button
                    key={Math.random()}
                    className={`col-1 border btn border-1 m-1 text-center flex-grow-1 flex-shrink-1 
                ${selected.includes(seat) ? "btn-warning" : ""}${
                      props.trip.seatBooked.includes(seat) ? "btn-danger" : ""
                    }`}
                    style={{ height: "25px" }}
                    onClick={() => selectedSeat(seat)}
                    disabled={
                      props.trip.seatBooked.includes(seat)
                      // ||(selected.length === 1 && index !== selected[0])
                    }
                  ></button>
                );
              })}
            </div>
            <div className="d-flex justify-content-end w-75 mt-5">
              {row3.map((seat) => {
                return (
                  <button
                    key={Math.random()}
                    className={`col-1 border btn border-1 m-1 text-center flex-grow-1 flex-shrink-1 
                ${selected.includes(seat) ? "btn-warning" : ""}${
                      props.trip.seatBooked.includes(seat) ? "btn-danger" : ""
                    }`}
                    style={{ height: "25px" }}
                    onClick={() => selectedSeat(seat)}
                    disabled={
                      props.trip.seatBooked.includes(seat)
                      // ||(selected.length === 1 && index !== selected[0])
                    }
                  ></button>
                );
              })}
            </div>
          </div>
          <div className="border border-1 rounded-1 shadow p-2 m-2 w-50 flex-shrink-1">
            <p className="py-1 px-2">
              <b>Boarding and Dropping</b>
            </p>
            <div className="px-3 d-flex justify-content-between">
              <p className="mb-2">{props.trip.fromDist[0].districts.name}</p>
              <p className="mb-2">
                {startHour < 10 ? "0" + startHour : startHour}:
                {startMin < 10 ? "0" + startMin : startMin}
              </p>
            </div>
            <div className="px-3 d-flex justify-content-between">
              <p className="mb-2">{props.trip.toDist[0].districts.name}</p>
              <p className="mb-2">
                {endHour < 10 ? "0" + endHour : endHour}:
                {endMin < 10 ? "0" + endMin : endMin}
              </p>
            </div>
            <hr className="my-1" />
            <div className="d-flex justify-content-between mx-2">
              <p className="mb-0 px-2">
                <b>Seat No</b>
              </p>
              <p className="mb-0 px-2">
                {selected.map((seat, index) => {
                  return index === selected.length - 1 ? (
                    <b key={Math.random()}>{seat < 10 ? "0" + seat : seat}</b>
                  ) : (
                    <b key={Math.random()}>{seat < 10 ? "0" + seat : seat},</b>
                  );
                })}
              </p>
            </div>
            <hr className="my-1" />
            <div className="d-flex justify-content-between mx-2">
              <p className="mb-0 px-2">
                <b>Fare Details</b>
              </p>
              <p className="mb-0 px-2">
                <b>INR - {selected.length * props.trip.busFare} rupees</b>
              </p>
            </div>
            <hr className="my-1" />
            <div className="text-center">
              {selected.length ? (
                <Link
                  onClick={() => {
                    dispatch(
                      actions.selectedTrip({
                        trip: props.trip,
                        selectedSeat: selected,
                      })
                    );
                  }}
                  to="/passenger_info"
                  className="btn btn-warning text-white"
                >
                  <b>Proceed to Book</b>
                </Link>
              ) : (
                <button className="btn btn-warning text-white" disabled>
                  <b>Proceed to Book</b>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusStructure;
