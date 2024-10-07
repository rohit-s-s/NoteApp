import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { useLogin, useRegister, useUpdate } from "../hooks/useUser";
import SubmitButton from "./SubmitButton";
import { useEffect } from "react";

type FormValues = {
  username: string;
  password: string;
};

const AuthForm = ({logic,userData}:{logic:string,userData?:{_id:string,username:string,password:string}}) => {

  const {mutate:Login,isError,error} = useLogin()
  const {mutate:Register} = useRegister()
  const {mutate:Update} = useUpdate()
  
const method = useForm<FormValues>({
  defaultValues:{
    username:userData?.username
  }
});
  const {handleSubmit,setError} = method;
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if(logic==='Register'){
       Register(data)
    }else if(logic==='Edit'){
      Update({data:data,id:userData?._id as string})
    }
    else{
        Login(data)
    }
  }

  const formError = { type: 'server', message: error?.message };
  useEffect(() => {
    if (isError) {
      setError('root', formError); // Set the error only when `isError` becomes true
    }
  }, [isError, error, setError]); // Dependency array

  return (
    <>
    <h3 className="text-xl font-bold">{logic}</h3>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)} className="block" noValidate>
          <Input label="Enter username" type="text" name="username"/>
          <Input label="Enter password" type="password" name="password"/>
          <SubmitButton logic={logic}/>
        </form>
      </FormProvider>
        {/* <p style={{ color: "red" }}>{error && error.message}</p> */}
    </>
  )
}

export default AuthForm