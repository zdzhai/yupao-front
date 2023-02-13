import WebSocket_2 from "vite";
import Data = WebSocket_2.Data;

export type UserType = {
    id:number;
    username:string;
    userAccount:string;
    avatarUrl ? : string;
    gender:number;
    phone:string;
    email:string;
    userStatus:number;
    userRole:number;
    planetCode:string;
    createTime:string;
    profile:string;
}