import { NavLink } from "react-router-dom";
import AuthForm from "../../components/AuthForm";



const Login = () => {
  return (
    <>
      <AuthForm logic="Login"/>
      <p className="text-sm mt-2">Don't have an account?<span><NavLink className="text-violet-800" to={'/register'}>Register</NavLink></span></p>
    </>
  );
};

export default Login;
