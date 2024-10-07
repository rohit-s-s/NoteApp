import { useQueryClient } from "@tanstack/react-query"
import AuthForm from "../../components/AuthForm"
import { userData } from "../../types/util"
import { useUpdate } from "../../hooks/useUser"

const EditProfile = () => {
    const queryClinet = useQueryClient()
    const data:userData = queryClinet.getQueryData(['user']) as userData
    const {mutate,isError,error} = useUpdate()
    return (
            <>
                <AuthForm logic="Edit" userData={data} error={error} isError={isError} mutate={mutate}/>
            </>
          )
    }
 

export default EditProfile