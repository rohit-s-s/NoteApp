import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


export const useGetNotes = ()=>{
    const {auth} = useAuth()
    const token = auth.token
    return useQuery({
        queryKey:['notes'],
        queryFn: async()=>{
            const response = await axios('http://localhost:3000/notes/getnotes',{
                headers: { Authorization: `Bearer ${token}` },
                withCredentials:true
            })
            console.log(response.data)
            return response.data
        },
        refetchOnWindowFocus:false
    })
}

export const useFetch= () => {
    const navigate = useNavigate()
    const {auth} = useAuth()
  const token = auth.token
    const queryClinet = useQueryClient()
  return useMutation({
    mutationFn: async (data: { title: string; text: string }) => {
      const response = await axios.post(
        "http://localhost:3000/notes/create",
        data,
        {  headers: { Authorization: `Bearer ${token}` },
            withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess:()=>{
        queryClinet.invalidateQueries({queryKey:['notes']})
        navigate('/')
    }
    
  });
};

export const useUpdate = () => {
  type Data = {
    data: { title: string; text: string };
    id: string;
  };
  const {auth} = useAuth()
  const token = auth.token
  const queryClinet = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async ({ data, id }: Data) => {
        console.log(id)
      const response = await axios.put(
        "http://localhost:3000/notes/update",
        { id, ...data },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess:()=>{
        queryClinet.invalidateQueries({queryKey:['notes']})
        navigate('/')

    }
    
  });
};

export const useDelete = () => {
    const queryClinet = useQueryClient()
    const {auth} = useAuth()
  const token = auth.token
  return useMutation({
    mutationFn: async (data: string) => {
      const response = await axios.delete(
        "http://localhost:3000/notes/delete",
        {
        headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          data: { id: data },
        }
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess:()=>{
        queryClinet.invalidateQueries({queryKey:['notes']})
    }
    
  });
};
export const useShowById = (id:string)=>{
    const {auth} = useAuth()
    const token = auth.token
    return useQuery({
        queryKey:['note',id],
        queryFn: async () => {
            const response = await axios(`http://localhost:3000/notes/getnote/${id}`,{
                headers: { Authorization: `Bearer ${token}` },
                withCredentials:true
            })
            console.log(response.data)
            return response.data
            
        },
        refetchOnWindowFocus:false
    })
}