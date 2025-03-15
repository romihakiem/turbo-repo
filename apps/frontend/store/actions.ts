import UserApi from "@/apis/userApi"

export const fetchUsers = () => async (dispatch: any) => {
    try {
        const res = await UserApi.fetch()
        dispatch({
            type: "FETCH_USERS",
            payload: res.data,
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const createUser = (data: any) => async (dispatch: any) => {
    try {
        const res = await UserApi.create(data)
        dispatch({
            type: "CREATE_USER",
            payload: data,
            alert: "success",
            message: res.data.message,
        })
        return Promise.resolve(res)
    } catch (err) {
        dispatch({
            type: "CREATE_USER",
            payload: data,
            alert: "error",
            message: err.response.data.message,
        })
        return Promise.reject(err)
    }
}

export const updateUser = (data: any, id: string) => async (dispatch: any) => {
    try {
        const res = await UserApi.update(data, id)
        dispatch({
            type: "UPDATE_USER",
            payload: data,
            alert: "success",
            message: res.data.message,
        })
        return Promise.resolve(res)
    } catch (err) {
        dispatch({
            type: "UPDATE_USER",
            payload: data,
            alert: "error",
            message: err.response.data.message,
        })
        return Promise.reject(err)
    }
}

export const deleteUser = (id: string) => async (dispatch: any) => {
    try {
        const res = await UserApi.delete(id)
        dispatch({
            type: "DELETE_USER",
            payload: id,
            alert: "success",
            message: res.data.message,
        })
        return Promise.resolve(res)
    } catch (err) {
        dispatch({
            type: "DELETE_USER",
            payload: id,
            alert: "error",
            message: err.response.data.message,
        })
        return Promise.reject(err)
    }
}

export const selectUser = (id: string) => {
    return {
        type: "SELECT_USER",
        payload: id,
    }
}

export const setAlert = (alert: any, message: string) => {
    return {
        type: "SET_ALERT",
        alert: alert,
        message: message,
    }
}

export const setModalOpen = (isOpen: boolean) => {
    if (isOpen) {
        return {
            type: "MODAL_OPEN",
            payload: isOpen,
            alert: null,
        }
    }
    return {
        type: "MODAL_OPEN",
        payload: isOpen,
    }
}

export const authRegister = (data: any) => async (dispatch: any) => {
    try {
        const res = await UserApi.register(data)
        dispatch({
            type: "AUTH_REGISTER",
            payload: data,
            alert: "success",
            message: "Successfully registered",
        })
        return Promise.resolve(res)
    } catch (err) {
        dispatch({
            type: "AUTH_REGISTER",
            payload: data,
            alert: "error",
            message: err.response.data.message,
        })
        return Promise.reject(err)
    }
}

export const authLogin = (data: any) => async (dispatch: any) => {
    try {
        const res = await UserApi.login(data)
        dispatch({
            type: "AUTH_LOGIN",
            payload: data,
            alert: "success",
            message: "Successfully logged in",
        })
        return Promise.resolve(res)
    } catch (err) {
        dispatch({
            type: "AUTH_LOGIN",
            payload: data,
            alert: "error",
            message: "Invalid Credential",
        })
        return Promise.reject(err)
    }
}