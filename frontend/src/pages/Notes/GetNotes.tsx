import { useParams } from "react-router-dom"
import { useGetNoteById } from "../../hooks/useNotes"

const GetNotes = () => {
    const {id} = useParams()
    console.log(id)
    const {data,isSuccess,isLoading} = useGetNoteById(id)
    console.log(data)
 if(isLoading) return <div>loading....</div>
 if(isSuccess){
  return (
    <div className="mt-10 px-4">
      <h1 className="text-gray-500 text-sm">TITLE</h1>
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <h1 className="text-gray-500 text-sm">CONTENT</h1>
      <p>{data.text}</p>
    </div>
  )
 }
}

export default GetNotes