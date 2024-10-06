import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAddNote, useEditNote } from "../hooks/useNotes";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

type FieldValues = {
  title: string;
  text: string;
};


const NoteForm = ({logic,noteData}:{logic:string,noteData?:{title:string,text:string,_id:string}}) => {
    const { mutate: UpdateFn} = useEditNote();
    const {mutate:Addfn} = useAddNote()
    const method = useForm<FieldValues>({
        defaultValues: {
            title: noteData?.title,
            text: noteData?.text,
        }
      });
      const {handleSubmit } = method;
      const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if(logic==='Edit'){ UpdateFn({ data: data, id: noteData?._id as string });}
        else{Addfn(data)}
       
      }
        return (
          <>
          <FormProvider {...method}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input label="Enter note Title" type="text" name="title"/>
                <br />
                <Input label="Enter note content" type="textarea" name="text"/>
                <br />
                <SubmitButton logic={logic}/>
              </form>
            </FormProvider>
             {/* {isError && <div className="text-red-700">{error.message}</div>} */}
          </>
          );
}

export default NoteForm