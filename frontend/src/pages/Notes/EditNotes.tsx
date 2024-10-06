import { useShowById} from "../../hooks/useNotes";
import { useParams } from "react-router-dom";
import NoteForm from "../../components/NoteForm";

const EditNotes = () => {
  const { id } = useParams();
  const { data: noteData, isSuccess, isLoading,isError,error } = useShowById(id as string);
  
  if (isLoading) return <div>Loading...</div>;
  if(isError) return <div className="text-red-800">{error.message}</div>
  if (isSuccess) {
    return(
        <NoteForm logic="Edit" noteData={noteData}/>
    )

  }
};

export default EditNotes;
