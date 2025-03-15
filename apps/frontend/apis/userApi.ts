import axios from "axios"
import { User } from "@share/model/user";

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

    create(data: User) {
        return http.post("/user", data)
    }

    update(data: User, id: string) {
        return http.post(`/user/${id}`, data)
    }

    delete(id: string) {
        return http.delete(`/user/${id}`)
    }

    register(data: User) {
        return http.post("/register", data)
    }

    login(data: User) {
        return http.post("/login", data)
    }

    logout() {
        return http.post("/logout")
    }
}

export default new UserApi()