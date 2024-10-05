import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type AuthType = {
    token: string
}

const AuthContext = createContext({
    auth:{} as Partial<AuthType>,
    setAuth: {} as Dispatch<SetStateAction<Partial<AuthType>>>

})

export const AuthProvider = ({children,value = {} as AuthType}:{children:ReactNode;value?:Partial<AuthType>}) =>{
    const [auth,setAuth] = useState(value)
    return (
        <AuthContext.Provider value = {{auth,setAuth}}>
        {children}
        </AuthContext.Provider>
    )
}
export default AuthContext