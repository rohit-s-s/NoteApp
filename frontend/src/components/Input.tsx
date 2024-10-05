import { useFormContext } from "react-hook-form"

const Input = ({label,type,name}:{label:string,type:string,name:string}) => {
    const {register} = useFormContext()
  return (
    <>
    <label htmlFor="username" className="text-base">
            {label}
          </label>
          <br />
          <input
            className="outline-none px-2 py-1 rounded-md border border-gray-500 w-60"
            type={type}
            id="username"
            {...register(name, {
              required: true,
            })}
          />
    </>
  )
}

export default Input