//@ts-ignore
import myAxios from "../plugins/myAxios.js";
import {getCurrentUserStatus, setCurrentUserStatus} from "../status/user";
// @ts-ignore
import {UserType} from "../moduls/user.d.ts";

export const getCurrentUser = async () : UserType =>{
    const currentUser = getCurrentUserStatus();
    //这里有问题，如果更新currentUser，不会自动刷新，还是得在远程获取
    // if (currentUser){
    //     return currentUser;
    // }
    //不存在则在远程获取
    const res =  await myAxios.get('/user/current');
    if (res.data.code === 0){
        setCurrentUserStatus(res.data.data);
        return res.data.data;
    }

    //未登录可以重定向到登录页面
    return null;
}
