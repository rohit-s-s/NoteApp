import { Link } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { userData } from "../../types/util"
import { useDeleteUser } from "../../hooks/useUser"


const UserProfile = () => {
    const queryClinet = useQueryClient()
    const data:userData = queryClinet.getQueryData(['user']) as userData
    console.log(data)
    const {mutate} = useDeleteUser()
        return (
            <>
            <div className="flex sm:flex-row flex-col">
            <img src="src\assets\account.svg" alt="account" className="sm:h-60 h-40 text-black"/>
            <div className="flex flex-col justify-center">
            <h1 className="text-3xl text-center sm:text-start font-bold">{data.username}</h1>
                {/*Created at  */}
                {/*Profile updated at */}
                <div className="flex justify-center">
                <Link to={'/edituser'}><button className="bg-blue-600 text-sm px-2 py-1 text-white rounded-sm mr-2">Edit Profile</button></Link><br/>
                <button className="bg-red-600 px-2 py-1 text-sm text-white rounded-sm mr-2" onClick={()=>mutate(data._id)}>Delete Account</button>
                </div>
            </div>
            </div>
            
                
            </>
          )
    }

export default UserProfile