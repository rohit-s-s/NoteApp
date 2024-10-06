import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useFetch } from "../../hooks/useNotes"
import Input from "../../components/Input"
import SubmitButton from "../../components/SubmitButton"

type FieldValues ={
    title:string,
    text:string
}

const AddNotes = () => {
    const {mutate,isError,error} = useFetch()
    const method = useForm<FieldValues>()
    const {handleSubmit} = method
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{mutate(data);console.log(data)}
  return (
    <>
     <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Enter title" name="title" type="text"/>
        <br/>
        <Input label="Enter note content" name="text" type="textarea"/>
        <br/>
        <SubmitButton logic="Add"/>
      
    </form>
    
    </FormProvider>
    {isError && <div className="text-red-700">{error.message}</div>}
    </>
   

  )
}

export default AddNotes