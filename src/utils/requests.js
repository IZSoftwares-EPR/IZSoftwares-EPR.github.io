import { authState } from "../context/auth-context";
import axios from 'axios';
async function APIFetch(url, params = {}){
    let headers = {
        accept: 'application/json',
    }
    if (authState.userJWT != null) {
       headers.Authorization = `Bearer ${authState.userJWT}`
    }
    try {
        let response = await axios.request({
            url,
            headers,
            method: params.method,
            baseUrl: "https://api.izsoftwares.com",
            data: params.body
        });
        return response.data;
    } catch(e){
        if (e.response.data){
            let { apiError } = e.response.data
            let error = new Error(apiError.errorMessage);
            error.code = apiError.errorCode;
            throw error;
        }
        throw e;
    }
}
export async function getUsers() {
    return APIFetch("/epr/user-service/api/v1/users/reviews")
}
export async function authUser(email, password){
    const body = {
        "email": email,
        "pwd": btoa(password)
    };
    return APIFetch("/epr/user-service/api/v1/auth", {
        method: "POST",
        body
    })
}

export async function verificationCode(email, code){
    return APIFetch(`/epr/user-service/api/v1/auth/verification/${email}/${code}`);
}
export async function createReview(email, pqs, comment){
    const body = {
        user: email,
        pqs,
        comment
    };
    return APIFetch("/epr/user-service/api/v1/users/reviews", {
        method: "POST",
        body
    })
}

export async function updatePassword(password){
    const body = {
        "pwd": btoa(password)
    };
    return APIFetch("/epr/user-service/api/v1/auth/update-password", {
        method: "POST",
        body
    });
}
export async function updatePasswordDefault(email, defaultPassword, password){
    const body = {
        "email": email,
        "defaultPwd":  btoa(defaultPassword),
        "pwd": btoa(password)
    };
    return APIFetch("/epr/user-service/api/v1/auth/update-password", {
        method: "POST",
        body
    });
}

export async function getPerformanceQuestions() {
    return APIFetch("/epr/pq-service/api/v1/performances")
}
export async function createPerformaceQuestion(name, point){
    const body = {name, point};
    return APIFetch("/epr/pq-service/api/v1/performances", {
        method: "POST",
        body
    });
}
export async function updatePerformaceQuestion(id, name, point){
    const body = {name, point};
    return APIFetch("/epr/pq-service/api/v1/performances/"+id, {
        method: "PUT",
        body
    });
}
export async function deletePerformaceQuestion(id){
    return APIFetch("/epr/pq-service/api/v1/performances/"+id, {
        method: "DELETE"
    });
}