export async function fetchEmployees() {
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
export async function fetchQuestions() {
    return [
        { id: 0, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" },
        { id: 1, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" },
        { id: 2, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" },
        { id: 3, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" },
        { id: 4, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" }
    ]
}
export async function postReview(){
    
}
export async function authUser(email, password){
    return {email, isVerified: false}
}
export async function sendCodeVerif(code){
    return code === "asa"
}
export async function changePassword(password){
    return true
}