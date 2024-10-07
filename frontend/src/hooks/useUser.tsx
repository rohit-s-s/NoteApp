import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { userData } from "../types/util";

//Hook for updating user data
export const useUpdate = () => {
  const navigate = useNavigate()
  const { auth } = useAuth();
  const token = auth.token;
  const queryClinet = useQueryClient();
  return useMutation({
    mutationFn: async (data:userData) => {
      const response = await axios.put(
        "http://localhost:3000/auth/edit",
        {...data},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["user"] });
      navigate('/')
    },
  });
};

//hook for deleting user data
export const useDeleteUser = () => {
  const { auth,setAuth } = useAuth();
  const token = auth.token;
  const queryClinet = useQueryClient();
  return useMutation({
    mutationFn: async (id:string) => {
      console.log(id)
      const response = await axios.delete("http://localhost:3000/auth/delete", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["user"] });
      console.log('User deleted')
      setAuth({})
    },
  });
};

//hook for Registering new user
export const useRegister = ()=>{
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data:userData) => {
      await axios.post('http://localhost:3000/auth/register', data)
    },
    onSuccess:()=>{
      alert("User registered")
      navigate('/login')
    }
  })
}

//Hook for logging in user
export const useLogin = ()=>{
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data:userData) => {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data,{withCredentials:true}
      );
      return response.data;
    },
    onSuccess: (data) => {
      setAuth((prev) => ({ ...prev, ...data }));
      navigate('/');
    },
  });
}

//hook for user logout
export const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      const respose = await axios("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      return respose.data;
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

//get specific user data
export const useGetUser = ()=>{
  const {auth} = useAuth()
  const token = auth.token
  return useQuery({
      queryKey:['user'],
      queryFn: async()=>{
          const response = await axios('http://localhost:3000/auth/getuser',{
              headers: { Authorization: `Bearer ${token}` },
              withCredentials:true
          })
          return response.data
      },
      refetchOnWindowFocus:false
  })
}