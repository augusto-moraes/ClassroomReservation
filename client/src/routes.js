import {
  Link,
  Route,
  Routes,
} from "react-router-dom";

import './routes.css';

import NavBar from "./components/common/NavBar";
import ExampleMUI from "./components/Example/ExampleMUI";
import ReservationPage from "./components/reservation/ReservationPage";

export default function Root() {
  return (
    <div>
        <NavBar />
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/reservation" element={<ReservationPage />} />
                <Route path="/schedule" element={<UserApp />} />
            </Routes>
        </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>
        Check out the <Link to="/blog">blog</Link> or the{" "}
        <Link to="users">users</Link> section
      </p>
      <ExampleMUI/>
    </>
  );
}

function UserApp() {
  return (
    <Routes>
      <Route index element={<h1>Users Index</h1>} />
    </Routes>
  );
}