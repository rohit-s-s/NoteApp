import AuthForm from "../components/AuthForm"
import { useGetUser } from "../hooks/useUpdate"

const EditProfile = () => {
    const {data,isSuccess,isLoading} = useGetUser()
    if(isLoading) <div>Loading....</div>
    if(isSuccess){
        console.log(data)
        return (
            <>
                <AuthForm logic="Edit" userData={data}/>
            </>
          )
    }
 
}

export default EditProfile