// @ts-ignore
import {UserType} from "../moduls/user.d.ts";
let currentUser:UserType;

const setCurrentUserStatus =  (user: UserType) => {
    currentUser = user;

}
const getCurrentUserStatus =  () :UserType => {
    return currentUser;

}

export {
    setCurrentUserStatus,
    getCurrentUserStatus,
}