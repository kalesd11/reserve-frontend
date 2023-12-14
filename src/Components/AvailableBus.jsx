import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BusStructure from "./BusStructure";
import Calendar from "./Calender";

const AvailableBus = () => {
  const body = useSelector((state) => state.getStates);
  // console.log(Date.parse(body.date));
  const [date, setDate] = useState(Date.parse(body.date));
  console.log(date);
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  // console.log(search)
  const search = async (date) => {
    try {
      let response = await fetch(
        `https://reserve-be.onrender.com/trips/getTripsByFilter/?from=${body.from.districts._id}&to=${body.to.districts._id}&date=${date}`,
        {
          method: "GET",
          // headers: headersList,
        }
      );

      let data = await response.json();
      setTrips(data);
    } catch (error) {
      navigate("/");
    }
  };
  useEffect(() => {
    search(date);
  }, [date]);
  // console.log(trips)
  return (
    <div className="text-center mt-3 container">
       {/* <button
          className="btn btn-warning my-2 d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".sidebar"
          aria-expanded="false"
          aria-controls="sidebar"
        >
          <b className="text-white">Show Filters</b>
        </button> */}
      <div className="row justify-content-center">
        {/* Sidebar */}
       
        <div className="col-3 border border-1 p-2 rounded-2 sidebar">
          <div className="row text-start px-2">
            <div className="col-12 d-flex justify-content-between flex-wrap">
              <p className="btn">
                <b>Filter</b>
              </p>
              <p className="btn">
                <b>Clear All</b>
              </p>
            </div>
            <hr />
            {/* Departure Time  */}
            <div className="col-12 pb-2">
              <p>
                <b>Departure Time</b>
              </p>
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="morningdeparture"
              />
              <label htmlFor="morningdeparture" className="px-3">
                Morning Session
              </label>
            </div>
            <div className="col-12 pb-2">
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="afternoondeparture"
              />
              <label htmlFor="afternoondeparture" className="px-3">
                Afternoon Session
              </label>
            </div>
            <div className="col-12 pb-2">
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="eveningdeparture"
              />
              <label htmlFor="eveningdeparture" className="px-3">
                Evening Session
              </label>
            </div>
            <hr />
            {/* Arrival Time */}
            <div className="col-12 pb-2">
              <p>
                <b>Arrival Time</b>
              </p>
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="morning"
              />
              <label htmlFor="morning" className="px-3">
                Morning Session
              </label>
            </div>
            <div className="col-12 pb-2">
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="afternoon"
              />
              <label htmlFor="afternoon" className="px-3">
                Afternoon Session
              </label>
            </div>
            <div className="col-12 pb-2">
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="evening"
              />
              <label htmlFor="evening" className="px-3">
                Evening Session
              </label>
            </div>
            <hr />

            {/* Pickup Point  */}
            <div className="col-12 pb-2">
              <p>
                <b>Pickup Point</b>
              </p>
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="morningd"
              />
              <label htmlFor="morningd" className="px-3">
                Morning Session
              </label>
            </div>
            <div className="col-12 pb-2">
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="afternoond"
              />
              <label htmlFor="afternoond" className="px-3">
                Afternoon Session
              </label>
            </div>
            <div className="col-12 pb-2">
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="eveningd"
              />
              <label htmlFor="eveningd" className="px-3">
                Evening Session
              </label>
            </div>
            <hr />

            {/* Ratings  */}
            <div className="col-12 pb-2">
              <p>
                <b>Ratings</b>
              </p>
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="fivestar"
              />
              <label htmlFor="fivestar" className="px-3">
                5-Star
              </label>
            </div>
            <div className="col-12 pb-2">
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="fourstar"
              />
              <label htmlFor="fourstar" className="px-3">
                4-Star
              </label>
            </div>
            <div className="col-12 pb-2">
              <input
                type="checkbox"
                className="form-check-input px-3"
                id="belowthree"
              />
              <label htmlFor="belowthree" className="px-3">
                0-3 Star
              </label>
            </div>
          </div>
        </div>
        {/* SideBar END */}

        {/* Buses Available */}
        <div className="col-9 border border-1 p-2 rounded-2">
          <div className="row text-start px-2">
            <div className="col-12 d-flex justify-content-center flex-wrap w-100">
              <Calendar setDate={setDate} />
            </div>
            <hr />
            {trips.length ? (
              trips.map((trip) => {
                return (
                  <div
                    className="col-12 justify-content-between mb-3"
                    key={Math.random()}
                  >
                    <BusStructure trip={trip} />
                  </div>
                );
              })
            ) : (
              <div className="text-center fs-3 text-warning mt-5">
                <p>
                  <b>Opps..! Sorry, No trip Available !!!</b>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableBus;
