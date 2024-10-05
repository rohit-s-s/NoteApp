// import {data} from '../components/data'
import { MdDelete,MdEdit,MdInfo  } from "react-icons/md";
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';
import { useGetNotes } from '../hooks/useNotes';
import { Link } from "react-router-dom";
import { useDelete } from "../hooks/useNotes";
import { IoMdAddCircle } from "react-icons/io";

const Dasboard = () => {
    const [search,setSearch] = useState<string>('')
    const {data,isSuccess,isLoading,isError,error} = useGetNotes()
    const {mutate} = useDelete()
    if(isLoading) return <div>loading...</div>
    if(isError) return <div>{error.message}</div>
    if (isSuccess) {
        return (
        <>
        <div className="flex flex-col justify-between" style={{height:"100vh"}}>
            <header>
                <div className='flex justify-between items-center p-4'>
                    <h1 className='font-bold text-xl'>Note App</h1>
                    <SearchBar setSearch={setSearch}/>
                    <Dropdown/>
                </div>
            </header>
            <main>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center'>
                {data.filter((element:{title:string,text:string,id:string})=>{
                    return search?.toLowerCase() === ''? element: element.title.includes(search as string)
                }).map((element:{title:string,text:string,id:string},i:number)=>(
                    <div key={i} className='shadow-md border w-80 rounded-md px-2 py-1 h-36 hover:scale-105'>
                        <h1 className='text-lg font-semibold'>{element.title}</h1>
                        <p className='h-20 overflow-hidden text-sm'>{element.text}</p>
                        <div className='flex pt-2'><MdInfo/> <MdDelete onClick={()=>mutate(element.id)}/> <Link to={`/editnotes/${element.id}`}><MdEdit/></Link></div>
                    </div>
                ))}
                </div>
                <div className="bottom-0 right-0 h-16 w-16 fixed"><Link to={'addnotes'}><IoMdAddCircle className="text-3xl"/></Link></div>
            </main>
            <footer>
                <p className="p-4">Copyright 2022</p>
            </footer>  
        </div>
        
        </>
       
    )
    }
}


export default Dasboard