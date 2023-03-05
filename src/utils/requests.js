import { authState } from "../context/auth-context";
async function APIFetch(url, params = {}){
    if (params.headers == null){
        params.headers = {
            "Content-Type": "application/json",
        }
    }
    if (authState.userJWT != null) {
        params.headers.Authorization = `Bearer ${authState.userJWT}`
    }
    let response = await fetch(url, params);
    let json = await response.json();
    let {apiError, data} = json;
    if (apiError || !response.ok){
        let error = new Error(apiError.errorMessage);
        error.code = apiError.errorCode;
        throw error;
    }
    return data;
}
export async function getUsers() {
    return APIFetch("/epr/user-service/api/v1/users")
}
export async function getPerformanceQuestions() {
    return APIFetch("/epr/pq-service/api/v1/performances")
}
export async function createReview(email, reviews){
    const body = JSON.stringify({
        user: email,
        reviews
    });
    return APIFetch("/epr/user-service/api/v1/users/review", {
        method: "POST",
        body
    })
}
export async function authUser(email, password){
    const body = JSON.stringify({
        "email": email,
        "pwd": btoa(password)
    });
    return APIFetch("/epr/user-service/api/v1/auth", {
        method: "POST",
        body
    })
}
export async function verificationCode(email, code){
    return APIFetch(`/epr/user-service/api/v1/auth/verification/${email}/${code}`);
}
export async function updatePassword(password){
    const body = JSON.stringify({
        "pwd": btoa(password)
    });
    return APIFetch("/epr/user-service/api/v1/auth/update-password", {
        method: "POST",
        body
    });
}
export async function updatePasswordDefault(email, defaultPassword, password){
    const body = JSON.stringify({
        "email": email,
        "defaultPwd":  btoa(defaultPassword),
        "pwd": btoa(password)
    });
    return APIFetch("/epr/user-service/api/v1/auth/update-password", {
        method: "POST",
        body
    });
}
export async function createPerformaceQuestion(name, point){
    const body = JSON.stringify({name, point});
    return APIFetch("/epr/pq-service/api/v1/performances", {
        method: "POST",
        body
    });
}