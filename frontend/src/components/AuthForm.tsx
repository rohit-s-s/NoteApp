import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { useLogin, useRegister } from "../hooks/useUpdate";
import SubmitButton from "./SubmitButton";

type FormValues = {
  username: string;
  password: string;
};

const AuthForm = ({logic}:{logic:string}) => {

  const {mutate:Login} = useLogin()
  const {mutate:Register} = useRegister()

const method = useForm<FormValues>();
  const {handleSubmit } = method;
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if(logic==='Register'){
       Register(data)
    }else{
        Login(data)
    }
  }

  return (
    <>
    <h3 className="text-xl font-bold">{logic}</h3>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Enter username" type="text" name="username"/>
          <br />
          <Input label="Enter password" type="password" name="password"/>
          <br />
          <SubmitButton logic={logic}/>
        </form>
      </FormProvider>
        {/* <p style={{ color: "red" }}>{error && error.message}</p> */}
    </>
  )
}

export default AuthForm