import axios from "axios";
import qs from "qs";
import {ref} from "vue";

// Set config defaults when creating the instance
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: false
});
//允许前端携带cookie
myAxios.defaults.withCredentials = true;
// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("我接收请求啦");
    // if (config.method === 'get'){
        //如果是get请求，且params是数组类型如arr = [1,2],则转换成arr=1&arr=2,不转换会显示为arr[]=1&arr[]=2
        // config.paramsSerializer = function(params) {
        //     // return qs.stringify(params, {arrayFormat: 'repeat'})
        //     return qs.stringify(params, { indices: false})
        // }
    // }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log("我收到响应啦");
    //未登录则跳转到登录页面
    if (response?.data?.code === 40100 ){
        //先记录跳转前的页面
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;