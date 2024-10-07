import { useState } from "react";
import { useFormContext } from "react-hook-form"
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Input = ({label,type,name}:{label:string,type:'text'|'textarea'|'password',name:string}) => {
  const [visible,setVisible] = useState<boolean>(false)
    const {register,formState:{errors}} = useFormContext()
  return (
    <div className="flex flex-col">
    <label htmlFor={name} className="text-base">
            {label}
          </label>
         {
          type === 'textarea'?(
            <textarea className="outline-none text-sm px-2 py-1 rounded-md border border-gray-500 w-60" id={name} rows={4} {...register(name,{required: {
              value:true,
              message:`${name} cannot be empty`
            },})}/>
          ):(
            name === 'password'?(
              <>
            <input
            className="outline-none px-2 py-1 rounded-md border border-gray-500 w-60 relative"
            type={visible?'text':'password'}
            id={name}
            {...register(name, {
              required: {
                value:true,
                message:`${name} cannot be empty`
              },
              minLength:{
                value:6,
                message:'Cannot be less than 6 characters'
              }
            })}
            />
            <button className="absolute right-10 mt-8">
            {visible?(<FiEye onClick={()=>setVisible(prev=>!prev)}/>):(<FiEyeOff onClick={()=>setVisible(prev=>!prev)}/>)}
            </button>
              </>
            ):(
              <input
            className="outline-none px-2 py-1 rounded-md border border-gray-500 w-60"
            type={type}
            id={name}
            {...register(name, {
              required:  {
                value:true,
                message:`${name} cannot be empty`
              },
            })}
            />
            )
          )
         }
          {errors[name] && <p className="text-sm text-red-700 m-0">{errors[name]?.message?.toString()}</p>}
          {errors.root && <p className="text-sm text-red-700 m-0">{errors.root?.message?.toString()}</p>}
    </div>
  )
}


export default Input