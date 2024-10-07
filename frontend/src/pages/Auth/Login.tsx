import { NavLink } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { useLogin } from "../../hooks/useUser";



const Login = () => {
  const {mutate,isError,error} = useLogin()
  return (
    <>
      <AuthForm logic="Login" error={error} isError={isError} mutate={mutate}/>
      <p className="text-sm mt-2">Don't have an account?<span><NavLink className="text-violet-800" to={'/register'}>Register</NavLink></span></p>
    </>
  );
};

export default Login;
