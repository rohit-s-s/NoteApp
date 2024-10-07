import AuthForm from "../../components/AuthForm"
import { useUpdate } from "../../hooks/useUser"

const EditProfile = () => {
    const {mutate,isError,error} = useUpdate()
    return (
            <>
                <AuthForm logic="Edit" error={error} isError={isError} mutate={mutate}/>
            </>
          )
    }
 

export default EditProfile