import {v4 as uuidv4} from 'uuid'
//生成一个随机的字符串，且每次执行不能发生变化，游客身份永久存储
export const getUUID=()=>{
    // 先从本地存储获取uuid(看本地存储里是否有uuid)
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    //如果没有 自己生成
    if(!uuid_token){
        //生成游客临时身份
        uuid_token=uuidv4();
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token;
}