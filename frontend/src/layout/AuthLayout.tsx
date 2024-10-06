import { IoIosCloseCircle } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate()
  return (
    <>
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="border border-gray-500 rounded-sm py-8 px-6 relative">
          <Outlet />
          {location.pathname === "/login" ||
          location.pathname === "/register" ? null : (
            <div className="absolute left-3 top-3 h-16 w-16 hover:cursor-pointer">
                <IoIosCloseCircle className="text-lg" onClick={()=>navigate(-1)}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
