import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useUpdate } from "../hooks/useNotes";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

type FieldValues = {
  title: string;
  text: string;
};
type NoteData = {
    noteData:{title:string,text:string,_id:string}
}

const NoteForm = ({noteData}:NoteData) => {
    const { mutate: UpdateFn,isError,error} = useUpdate();
    const method = useForm<FieldValues>({
        defaultValues: {
            title: noteData?.title,
            text: noteData?.text,
        }
      });
      const {handleSubmit } = method;
      const onSubmit: SubmitHandler<FieldValues> = (data) =>UpdateFn({ data: data, id: noteData?._id });
        return (
          <>
          <FormProvider {...method}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
                <Input label="Enter note Title" type="text" name="title"/>
                <br />
                <Input label="Enter note content" type="textarea" name="text"/>
                <br />
                <SubmitButton logic="Edit"/>
                <div className="absolute h-14 w-14 -left-4 -top-6"><Link to={'/'}><IoIosCloseCircle className="text-base"/></Link></div>
              </form>
            </FormProvider>
             {isError && <div className="text-red-700">{error.message}</div>}
          </>
          );
}

export default NoteForm