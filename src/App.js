import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-svg-core"
import "@fortawesome/react-fontawesome"
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import {Provider} from "react-redux"
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import store from "./States/store";
import AvailableBus from "./Components/AvailableBus";
import PassengerInfo from "./Components/PassengerInfo";
import Success from "./Components/Success";
import Cancle from "./Components/Cancle";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";

function App() {
  return (
    <Provider store = {store}>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/available_buses" Component={AvailableBus}/>
        <Route path="/passenger_info" Component={PassengerInfo}/>
        <Route path="/success" Component={Success}/>
        <Route path="/cancel" Component={Cancle}/>
        <Route path="/login" Component={LoginPage}/>
        <Route path="/register" Component={RegisterPage}/>
      </Routes>
      <Footer/>
    </Provider>
  );
}

export default App;
