import { IoIosCloseCircle } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  return (
    <>
      <div
        className="flex flex-col justify-center items-center relative"
        style={{ height: "100vh" }}
      >
        <div className="border border-gray-500 rounded-sm py-8 px-6">
          <Outlet />
          {location.pathname === "/login" ||
          location.pathname === "/register" ? null : (
            <div className="absolute left-5 top-3 h-16 w-16">
              <Link to={"/"}>
                <IoIosCloseCircle className="text-lg" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
