export interface UserType {
    _id?:string
    email: string,
    name: string,
    password?: string,
    googleVerified: boolean,
    profileImage?: string
}