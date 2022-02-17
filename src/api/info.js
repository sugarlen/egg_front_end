import axios from 'axios';

export function getInfo(){
    return axios({
        url:'server-eggs/test01',
        method:'get',
    })
}
export function login(){
    return axios({
        url:'server-eggs/login',
        method:'post'
    })
}