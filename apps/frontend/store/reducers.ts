import { combineReducers } from 'redux'

const initialState = {
  userList: [],
  userAuth: {},
  selectedUser: {},
  alert: null,
  message: null,
  isLoading: false,
  isModalOpen: false,
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        userList: action.payload,
        isLoading: false,
      }
    case "CREATE_USER":
      return {
        ...state,
        userList: [action.payload, ...state.userList],
        alert: action.alert,
        message: action.message,
        isLoading: action.loading,
      }
    case "UPDATE_USER":
      const updateUser = state.userList.map((user: any) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            name: action.payload.name,
            email: action.payload.email,
            phone: action.payload.phone,
          }
        }
        return user
      })
      return {
        ...state,
        userList: updateUser,
        alert: action.alert,
        message: action.message,
        isLoading: action.loading,
      }
    case "DELETE_USER":
      const filterUser = state.userList.filter(
        (user: any) => user.id !== action.payload
      )
      return {
        ...state,
        userList: filterUser,
        alert: action.alert,
        message: action.message,
        isLoading: action.loading,
      }
    case "SELECT_USER":
      const findUser = state.userList.find(
        (user: any) => user.id === action.payload
      )
      return {
        ...state,
        selectedUser: findUser,
      }
    case "SET_ALERT":
      return {
        ...state,
        alert: action.alert,
        message: action.message,
      }
    case "MODAL_OPEN":
      return {
        ...state,
        isModalOpen: action.payload,
      }
    case "AUTH_REGISTER":
      return {
        ...state,
        userAuth: action.payload,
        alert: action.alert,
        message: action.message,
      }
    case "AUTH_LOGIN":
      return {
        ...state,
        userAuth: action.payload,
        alert: action.alert,
        message: action.message,
      }
    default:
      return state
  }
}

const reducers = combineReducers({
  user: userReducer
})

export default reducers