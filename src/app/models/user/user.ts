export interface User {
    _id:any,
    ac_Type:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    listing: String[];
    exp: number;
    iat: number;
    token:string
}
