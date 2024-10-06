import { NavLink} from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const Register = () => {
  
    return (
      <>
      <AuthForm logic="Register"/>
      <p className="text-sm mt-2">Already have an account?<span><NavLink className="text-violet-800" to={'/login'}>Login</NavLink></span></p>
      </>
    );
  }

export default Register