import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

//Hook for updating user data
export const useUpdate = () => {
  const navigate = useNavigate()
  const { auth } = useAuth();
  const token = auth.token;
  const queryClinet = useQueryClient();
  return useMutation({
    mutationFn: async ({data, id}: { data:{username:string,password?:string },id:string}) => {
      const response = await axios.put(
        "http://localhost:3000/auth/edit",
        {...data,id},
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
export const useDelete = () => {
  const { auth } = useAuth();
  const token = auth.token;
  const queryClinet = useQueryClient();
  return useMutation({
    mutationFn: async (data: string) => {
      const response = await axios.delete("http://localhost:3000/auth/delete", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
        data: { id: data },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

//hook for Registering new user
export const useRegister = ()=>{
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data:{username:string,password:string}) => {
      await axios.post('http://localhost:3000/auth/register', data)
    },
    onSuccess:(data)=>{
      console.log(data)
      alert("User registered")
      navigate('/login')
    }
  })
}

//Hook for logging in user
export const useLogin = ()=>{
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  return useMutation({
    mutationFn: async (data:{username:string,password:string}) => {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data,{withCredentials:true}
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth((prev) => ({ ...prev, ...data }));
      navigate(from, { replace: true });
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

export const useGetUser = ()=>{
  const {auth} = useAuth()
  const token = auth.token
  return useQuery({
      queryKey:['note'],
      queryFn: async()=>{
          const response = await axios('http://localhost:3000/auth/getuser',{
              headers: { Authorization: `Bearer ${token}` },
              withCredentials:true
          })
          console.log(response.data)
          return response.data
      },
      refetchOnWindowFocus:false
  })
}