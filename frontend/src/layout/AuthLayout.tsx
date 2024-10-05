import { Outlet} from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
         <div className="flex flex-col justify-center items-center" style={{height:'100vh'}}>
            <div className="border border-gray-500 rounded-sm py-8 px-6">
              <Outlet/>
            </div>
         </div>
    </>
  )
}

export default AuthLayout