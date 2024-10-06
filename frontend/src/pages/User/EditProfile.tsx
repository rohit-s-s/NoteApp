import { useQueryClient } from "@tanstack/react-query"
import AuthForm from "../../components/AuthForm"
import { userData } from "../../types/util"

const EditProfile = () => {
    const queryClinet = useQueryClient()
    const data:userData = queryClinet.getQueryData(['user']) as userData
    return (
            <>
                <AuthForm logic="Edit" userData={data}/>
            </>
          )
    }
 

export default EditProfile