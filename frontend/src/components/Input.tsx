import { useFormContext } from "react-hook-form"

const Input = ({label,type,name}:{label:string,type:'text'|'textarea'|'password',name:string}) => {
    const {register} = useFormContext()
  return (
    <>
    <label htmlFor={name} className="text-base">
            {label}
          </label>
          <br />
         {
          type === 'textarea'?(
            <textarea className="outline-none px-2 py-1 rounded-md border border-gray-500 w-60" id={name} rows={10} {...register(name,{required:true})}/>
         
          ):(
            <input
            className="outline-none px-2 py-1 rounded-md border border-gray-500 w-60"
            type={type}
            id={name}
            {...register(name, {
              required: true,
            })}
            />
          )
         }
    </>
  )
}

export default Input