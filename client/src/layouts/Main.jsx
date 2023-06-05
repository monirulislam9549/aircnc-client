import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Home from "../pages/Home/Home";
import Footer from "../components/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-28 pb-20">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
