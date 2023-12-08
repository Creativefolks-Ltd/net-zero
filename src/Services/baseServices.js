import axios from "axios";
import {extractToken} from "./helpers/utilities"

export const headers = (authentified = true, acceptJson = true) => {
    let apiHeader = acceptJson
        ? { Accept: "application/json", "Content-Type": "application/json" }
        : {};
    if (authentified) apiHeader.Authorization = `Bearer ${extractToken()}`;
    return apiHeader;
};



export const BASE_URL = "http://aceapi.digital4design.in/api/" //server api


// export const upload = async (route, data, method, authentified = false) => {
//     try {
//         const response = await axios(`${BASE_URL}${route}`, {
//             method: method,
//             headers: headers(authentified, false),
//             body: data,
//         });

//         return response;
//     } catch (error) {
//         return console.error(error);
//     }
// };

export const get = async (route, authentified = true) => {
    try {
        const response = await axios.get(`${BASE_URL}${route}`, {
            // method: "GET",
            headers: headers(authentified),
        });
      
        return response;
    } catch (error) {
        return console.error(error);
    }
};

export const post = async (route, data, authentified = true) => {
    try {
        const response = await axios.post(`${BASE_URL}${route}`, {
            // method: "POST",
            headers: headers(authentified),
            body: JSON.stringify(data),
        });
       
        return response;
    } catch (error) {
        return console.error(error);
    }
};



export const put = async (route, data, authentified = true) => {
    try {
        const response = await axios.put(`${BASE_URL}${route}`, {
            // method: "PUT",
            headers: headers(authentified),
            body: data !== "" ? JSON.stringify(data) : data,
        });
    
        return response;
    } catch (error) {
        return console.error(error);
    }
};


export const destroy = async (route, data, authentified = true) => {
    try {
        const response = await axios.delete(`${BASE_URL}${route}`, {
            // method: "DELETE",
            headers: headers(authentified),
            body: data !== "" ? JSON.stringify(data) : data,
        });
        
        return response;
    } catch (error) {
        return console.error(error);
    }
};



