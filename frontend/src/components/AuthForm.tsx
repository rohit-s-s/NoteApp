import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { useEffect } from "react";
import { ErrorMessage } from '@hookform/error-message';
import { UseMutateFunction } from "@tanstack/react-query";
import { userData } from "../types/util";

type FormValues = {
  username: string;
  password: string;
  id?:string,
  root?: string;
};

type FormType ={
  logic:string,
  userData?:userData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: UseMutateFunction<any,Error, userData,unknown>,
    error:Error|null,
    isError:boolean
}

const AuthForm = ({logic,userData,mutate,error,isError}:FormType) => {
  
const method = useForm<FormValues>({
  defaultValues:{
    username:userData?.username
  }
});
  const {handleSubmit,formState:{errors} ,setError} = method;
  const onSubmit: SubmitHandler<FormValues> = (data) => mutate(data)

  
  useEffect(() => {
    if (isError) {
      const formError = { type: 'server', message: error?.message };
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
          <div className='text-sm text-red-700' >
            <ErrorMessage errors={errors} name="root" />
          </div>
          <SubmitButton logic={logic}/>
        </form>
      </FormProvider>
    </>
  )
}

export default AuthForm