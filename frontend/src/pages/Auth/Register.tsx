import { NavLink} from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { useRegister } from "../../hooks/useUser";

const Register = () => {
  const {mutate,isError,error} = useRegister()
    return (
      <>
      <AuthForm logic="Register" error={error} isError={isError} mutate={mutate}/>
      <p className="text-sm mt-2">Already have an account?<span><NavLink className="text-violet-800" to={'/login'}>Login</NavLink></span></p>
      </>
    );
  }

export default Register