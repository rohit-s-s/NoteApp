import { useState } from "react"
import { FaUserCircle } from "react-icons/fa";
import { useLogout } from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Dropdown = () => {
    const [click,setClick] = useState(false);
    const {setAuth} = useAuth()
    const logout = useLogout();
    const signOut = async()=>{
        setAuth({})
        await logout()
    }

  return (
    <div className="relative text-center">
  <div>
  <button  onClick={()=>setClick(prev=>!prev)}><FaUserCircle className='text-2xl'/></button>
  </div>
    {
        click && (
            <div className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
            <div className="py-1" role="none">
              <Link to={'/user'}><button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">Profile</button></Link>
                <button onClick={()=>signOut()}  className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-3">Sign out</button>
            </div>
          </div>
        )
    }
</div>
  )
}

export default Dropdown