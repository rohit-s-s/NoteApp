import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({setSearch}:{setSearch:React.Dispatch<React.SetStateAction<string>>}) => {
   
  return (
    <form className="max-w-md mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 ">
        
        </div>
        <input type="text" id="default-search" onChange={(e)=>setSearch(e.target.value)} className="shadow-md border outline-none md:w-80 p-3 text-sm text-gray-900 rounded-full" placeholder="Search" required />
        <button type="submit" className="absolute end-2.5 bottom-3.5"><FaMagnifyingGlass className="text-gray-400 mr-4"/></button>
    </div>
</form>
  )
}

export default SearchBar