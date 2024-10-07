export type AuthType = {
    token?: string,
    role?:string,
}
export type AuthContextType = {
    auth: AuthType[],
    setAuth: React.Dispatch<React.SetStateAction<AuthType[]>>
}

export type userData = {
    username:string,
    password:string,
    _id?:string
}