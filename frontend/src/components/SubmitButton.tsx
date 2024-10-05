const SubmitButton = ({logic}:{logic:string}) => {
  return (
    <button
            className="bg-blue-700 text-white mt-2 px-2 py-1 rounded-md text-sm w-60"
            type="submit"
          >
           {logic}
          </button>
  )
}

export default SubmitButton