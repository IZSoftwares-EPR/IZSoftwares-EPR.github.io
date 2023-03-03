import { authState } from "../context/auth-context";
async function APIFetch(url, params = {}){
    let response = await fetch(url, {
        ...params,
        headers: {
            Authorization: `Bearer ${authState.userJWT}`
        }
    });
    let json = await response.json();
    let {apiError, data} = json;
    if (apiError || !response.ok){
        throw new Error({message: apiError, code: response.status});
    }
    return data;
}
export async function getUsers() {
    return APIFetch("/epr/user-service/api/v1/users")
    return [
        { id: 0, name: "Anna" },
        { id: 0, name: "Brown" },
        { id: 0, name: "Claude" },
        { id: 0, name: "Daniel" },
        { id: 0, name: "Ellen" },
        { id: 0, name: "Fred" },
        { id: 0, name: "Gerald" },
    ]
}
export async function getPerformanceQuestions() {
    return APIFetch("/epr/pq-service/api/v1/performances")
    return [
        { id: 0, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" },
        { id: 1, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" },
        { id: 2, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" },
        { id: 3, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" },
        { id: 4, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" }
    ]
}
export async function createReview(email, review){
    const body = JSON.stringify({
        user: email,
        review
    });
    return APIFetch("/epr/user-service/api/v1/users/review", {
        method: "POST",
        body
    })
}
export async function authUser(email, password){
    const body = JSON.stringify({
        "email": email,
        "pwd": password
    });
    return APIFetch("/epr/user-service/api/v1/auth", {
        method: "POST",
        body
    })
    return {email, isVerified: false}
}
export async function verificationCode(email, code){
    return APIFetch(`/epr/user-service/api/v1/auth/verification/${email}/${code}`);
}
export async function updatePassword(email, password){
    const body = JSON.stringify({
        "email": email,
        "pwd": password
    });
    return APIFetch("/epr/user-service/api/v1/auth/update-password", {
        method: "POST",
        body
    });
}
export async function updatePasswordDefault(email, defaultPassword, password){
    const body = JSON.stringify({
        "email": email,
        "defaultPwd": defaultPassword,
        "pwd": password
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