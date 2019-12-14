import axios from 'axios';

export default function apiCall(method, url, data, headers={}){
    return axios({
        method,
        url: `http://localhost:3030/api/v1/${url}`,
        data,
        headers
    });
}