import WebSocket_2 from "vite";
import {UserType} from "./user";

/**
 * 队伍参数
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    userId: number;
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoinNum?: number;
    hasJoin?: boolean;
}