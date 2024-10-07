import { useQueryClient } from "@tanstack/react-query"
import AuthForm from "../../components/AuthForm"
import { userData } from "../../types/util"
import { useUpdate } from "../../hooks/useUser"

const EditProfile = () => {
    const queryClinet = useQueryClient()
    const data:userData = queryClinet.getQueryData(['user']) as userData
    const {mutate,isError,error} = useUpdate()
    console.log(data._id)
    return (
            <>
                <AuthForm logic="Edit" error={error} isError={isError} mutate={mutate}/>
            </>
          )
    }
 

export default EditProfile