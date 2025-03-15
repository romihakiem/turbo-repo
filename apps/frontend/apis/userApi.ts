import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:3100/api",
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer 123456"
    }
})

class UserApi {
    fetch() {
        return http.get("/user")
    }

    create(data: any) {
        return http.post("/user", data)
    }

    update(data: any, id: string) {
        return http.post(`/user/${id}`, data)
    }

    delete(id: string) {
        return http.delete(`/user/${id}`)
    }

    register(data: any) {
        return http.post("/register", data)
    }

    login(data: any) {
        return http.post("/login", data)
    }

    logout() {
        return http.post("/logout")
    }
}

export default new UserApi()