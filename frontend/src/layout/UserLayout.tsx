import { Outlet, useNavigate } from "react-router-dom"
import { MdBackspace } from "react-icons/md";
const UserLayout = () => {
    const navigate = useNavigate()
  return (
    <div>
        <Outlet/>
        <div className="absolute left-3 top-3 h-16 w-16 hover:cursor-pointer">
                <MdBackspace className="text-lg" onClick={()=>navigate(-1)}/>
        </div>
    </div>
  )
}

export default UserLayout