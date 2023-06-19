import {
  Link,
  Route,
  Routes,
} from "react-router-dom";

import './routes.css';

import NavBar from "./components/common/NavBar";
import ReservationPage from "./components/reservation/ReservationPage";
import Footer from "./components/common/Footer";
import MyReservations from "./components/myReservations/myReservations";

export default function Root() {
  return (
    <div>
        <NavBar />
        <div className="App" style={{backgroundColor:'#F7F7F7'}}>
            <Routes>
                <Route path="/" element={<ReservationPage />}/>
                <Route path="/reservation" element={<ReservationPage />} />
                <Route path="/myreservations" element={<MyReservations />} />
            </Routes>
        </div>
    </div>
  );
}

