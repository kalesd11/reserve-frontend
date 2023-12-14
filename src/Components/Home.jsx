import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { actions } from "../States/Actions/index";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const mybackgroundImage = "https://images7.alphacoders.com/317/317196.jpg";
  const [suggest, setSuggest] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [op, setOp] = useState("");
  const [hideFrom, sethideFrom] = useState(true);
  const [hideTo, sethideTo] = useState(true);
  const [fromObj, setFromObj] = useState({});
  const [toObj, setToObj] = useState({});
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let customer = {
    name:"Suresh Kale",
    role:"Fullstack Web Developer",
    feedback:"Good platform to plan your Trip"
  }
  // const StateData = useSelector((state) => state.getStates);
  // console.log(date)
  // Function to get States and Districts
  const search = async () => {
    try{
      if (op === "from") {
        const response = await fetch(
          `https://reserve-be.onrender.com/dists/suggestions/?query=${from}`
        );
        const dist = await response.json();
        setSuggest(dist);
      }
      if (op === "to") {
        const response = await fetch(
          `https://reserve-be.onrender.com/dists/suggestions/?query=${to}`
        );
        const dist = await response.json();
        setSuggest(dist);
      }
    }catch(error){
      alert(error.message)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sethideFrom(true);
    sethideTo(true);
    const data = {
      from: fromObj,
      to: toObj,
      date: date,
    };
    // console.log(data);
    dispatch(actions.initialSearch(data));
    navigate("/available_buses");
  };
  useEffect(() => {
    search();
    // console.log(suggest);
  }, [from, to]);
  // console.log(new Date(date));
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${mybackgroundImage})`,
          height: "80vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <h5 className="text-center pt-5 text-danger text-"><b>Search Your Trip Here...</b></h5> */}
        <form id="search" onSubmit={(e) => handleSubmit(e)}>
          <div className="d-flex flex-wrap justify-content-center container pt-5">
            <div className="d-flex flex-column my-1">
              {/* <label htmlFor="from">From</label> */}
              <input
                type="text"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => {
                  setOp("from");
                  sethideFrom(false);
                  sethideTo(true);
                }}
                // onBlur={() => sethideFrom(true)}
                className="form-control form-select"
                style={{ height: "80px", width: "250px" }}
                placeholder="Travel From..."
              />
              <div
                hidden={hideFrom}
                className="rounded-2"
                style={{
                  backgroundColor: "white",
                  height: "350px",
                  width: "250px",
                  overflow: "auto",
                  scrollbarColor: "inherit",
                  position: "absolute",
                  bottom: "100px",
                }}
              >
                {suggest.suggestions ? (
                  suggest.suggestions.map((elem) => {
                    // console.log(elem)
                    return (
                      <div
                        key={Math.random()}
                        className="px-2 btn py-0 w-100"
                        onClick={() => {
                          setFrom(elem.districts.name + ", " + elem.state);
                          setFromObj(elem);
                          setSuggest([]);
                          sethideFrom(true);
                        }}
                      >
                        <p>
                          {elem.districts.name}, {elem.state}
                        </p>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-grow" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex flex-column my-1">
              <input
                type="text"
                className="form-control form-select"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => {
                  setOp("to");
                  sethideTo(false);
                  sethideFrom(true);
                }}
                // onBlur={() => sethideTo(true)}
                style={{ height: "80px", width: "250px" }}
                placeholder="Travel To..."
              />
              <div
                hidden={hideTo}
                className="rounded-2"
                style={{
                  backgroundColor: "white",
                  height: "350px",
                  width: "250px",
                  overflow: "auto",
                  scrollbarColor: "inherit",
                  position: "absolute",
                  bottom: "100px",
                }}
              >
                {suggest.suggestions ? (
                  suggest.suggestions.map((elem) => {
                    // console.log(elem)
                    return (
                      <div
                        key={Math.random()}
                        className="px-2 btn py-0 w-100"
                        onClick={() => {
                          setTo(elem.districts.name + ", " + elem.state);
                          setToObj(elem);
                          setSuggest([]);
                          sethideTo(true);
                        }}
                      >
                        <p>
                          {elem.districts.name}, {elem.state}
                        </p>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-grow" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex flex-column my-1">
              <input
                type="date"
                placeholder="Travel Date"
                className="form-control"
                style={{ height: "80px", width: "250px" }}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-warning text-white"
              type="submit"
              form="search"
              style={{ width: 150, height: "50px" }}
            >
              <b>Search</b>
            </button>
          </div>
        </form>
      </div>

      {/* Advertising part */}
      <div className="mt-4">
        <h5 className="text-center">
          <b>Travel with World's largest Community...</b>
        </h5>
        <div className="d-flex justify-content-center gap-4 my-3 flex-wrap">
          <div
            className="shadow rounded-3 text-center d-flex flex-column justify-content-center bg-warning"
            style={{
              height: "200px",
              width: "200px",
            }}
          ><p className="text-white fs-4"><b>5000+ </b></p>
          <p className="text-white"><b>Bus Collection</b></p>
          </div>
          <div
            className="shadow rounded-3 text-center d-flex flex-column justify-content-center bg-warning"
            style={{
              height: "200px",
              width: "200px",
            }}
          ><p className="text-warning fs-4 text-white"><b>20 Millions </b></p>
          <p className="text-warning text-white"><b>Happy Costomers</b></p>
          </div>
          <div
            className="shadow rounded-3 text-center d-flex flex-column justify-content-center bg-warning"
            style={{
              height: "200px",
              width: "200px",
            }}
          ><p className="text-warning fs-4 text-white"><b>5000+ </b></p>
          <p className="text-warning text-white"><b>Tickets book everyday</b></p>
          </div>
        </div>
      </div>

      {/* Review Part */}
      <div className="mt-5">
        <h5 className="text-center mb-1">
          <b>
            Here is what our customers has to say about{" "}
            <span className="text-warning">
              <b>RESERVE</b>
            </span>
          </b>
        </h5>
        <div className="d-flex justify-content-center gap-4 my-3 flex-wrap">
          <div
            className="shadow rounded-3 bg-warning"
            style={{
              height: "150px",
              width: "250px",
            }}
          >
            <div className="d-flex mb-2">
            <div className="w-25 text-dark mx-2 my-2 bg-secondary text-center rounded-5">
              <p className="fs-2 text-warning mb-0 "><b>S</b></p>
            </div>
            <div>
            <p className="fs-5 text-white mx-2 mt-1 mb-0"><b>{customer.name}</b></p>
            <p className="text-white mx-2">{customer.role.substr(0,12)}...</p>
            </div>
            </div>
            <p className="mb-1 mx-2">{customer.feedback}</p>
          </div>
          <div
            className="shadow rounded-3 bg-warning"
            style={{
              height: "150px",
              width: "250px",
            }}
          >
            <div className="d-flex mb-2">
            <div className="w-25 text-dark mx-2 my-2 bg-secondary text-center rounded-5">
              <p className="fs-2 text-warning mb-0 "><b>S</b></p>
            </div>
            <div>
            <p className="fs-5 text-white mx-2 mt-1 mb-0"><b>{customer.name}</b></p>
            <p className="text-white mx-2">{customer.role.substr(0,12)}...</p>
            </div>
            </div>
            <p className="mb-1 mx-2">{customer.feedback}</p>
          </div>
          <div
            className="shadow rounded-3 bg-warning"
            style={{
              height: "150px",
              width: "250px",
            }}
          >
            <div className="d-flex mb-2">
            <div className="w-25 text-dark mx-2 my-2 bg-secondary text-center rounded-5">
              <p className="fs-2 text-warning mb-0 "><b>S</b></p>
            </div>
            <div>
            <p className="fs-5 text-white mx-2 mt-1 mb-0"><b>{customer.name}</b></p>
            <p className="text-white mx-2">{customer.role.substr(0,12)}...</p>
            </div>
            </div>
            <p className="mb-1 mx-2">{customer.feedback}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
