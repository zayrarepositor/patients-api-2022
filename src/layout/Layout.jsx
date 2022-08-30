//======LIBRARIES & DEPENDENCIES
import { Outlet, Link, useLocation } from "react-router-dom";

//======OUR COMPONENTS

//======OUR FUNCTIONS

//======STYLE & IMAGES

const Layout = () => {
  const location = useLocation();
  const thisUrl = location.pathname;
  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-indigo-800 px-8 py-10">
        <h2 className="text-4xl font-black text-center text-white">Patients</h2>
        <nav className="mt-10">
          <Link
            className={`${
              thisUrl === "/patients" ? "text-indigo-300" : "text-white"
            } text-2xl block mt-2 hover:text-indigo-300`}
            to="/patients">
            Patients
          </Link>
          <Link
            className={`${
              thisUrl === "/patients/adding" ? "text-indigo-300" : "text-white"
            } text-2xl block mt-2 hover:text-indigo-300`}
            to="/patients/add">
            New Patient
          </Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-8 md:h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
