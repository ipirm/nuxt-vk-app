import {API_URI, SECRET_KEY} from "../config/types"
import {setToken} from "../config/setTokken"
import axios from 'axios'

function headers() {
    return {
        headers: {
            'Content-Type': 'application/json',
        }
    }
}
function headersFormData() {
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }
}
// Generate Token
const SIGN = setToken(SECRET_KEY);

const request = (callback) => {
    return new Promise((resolve, reject) => {
        callback
            .then(data => resolve(data))
            .catch(e => reject(handleError(e)));
    })
}

const handleError = (e) => {
    if (!e.response) return {_e: 'Unknown Error'};
    if (e.response.status !== 400) return {_e: e.response.statusText}
    const edata = e.response.data
    return typeof edata !== 'object' || Object.values(edata).filter(v => !Array.isArray(v)).length > 0
        ? {_e: 'Unknown server response'}
        : e.response.data
}

export default class apiRequest {

    static get(path) {
        return request(axios.get(`${API_URI}/${path}&sign=${SIGN}`,headers()));
    }
    static getPublic(path) {
        return request(axios.get(`${API_URI}/${path}`));
    }

    static post(path, data) {
        return request(axios.post(`${API_URI}/${path}&sign=${SIGN}`, data, headers()));
    }

    static patch(path, data) {
        return request(axios.patch(`${API_URI}/${path}&sign=${SIGN}`, data, headers()));
    }

    static delete(path) {
        return request(axios.delete(`${API_URI}/${path}&sign=${SIGN}`, headers()));
    }

    static deleteWdata(path, data) {
        return request(axios.delete(`${API_URI}/${path}&sign=${SIGN}`, {data}));
    }

    static put(path,data) {
        return request(axios.put(`${API_URI}/${path}&sign=${SIGN}`,data));
    }
    static postFormData(path,data) {
        return request(axios.post(`${API_URI}/${path}&sign=${SIGN}`,data));
    }
    static putJson(path,data) {
        return request(axios.put(`${API_URI}/${path}&sign=${SIGN}`,data,headers()));
    }
}
