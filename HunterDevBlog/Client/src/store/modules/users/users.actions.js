import * as TYPES from './users.types'

// Authentication
export const Login = (loginModel, bag) => ({
    type: TYPES.LOGIN,
    payload: loginModel,
    meta: bag
})

export const Register = (registerModel, bag) => ({
    type: TYPES.REGISTER,
    payload: registerModel,
    meta: bag
})

export const Logout = () => ({
    type: TYPES.LOGOUT
})

// Set User(s)
export const SetUser = userModel => ({
    type: TYPES.SET_USER,
    payload: userModel
})

export const SetUsers = userModels => ({
    type: TYPES.SET_USERS,
    payload: userModels
})


// Get Users
export const GetUsersRequest = () => ({
    type: TYPES.GET_USERS_REQUEST
})

export const GetUsersFailure = error => ({
    type: TYPES.GET_USERS_FAILURE,
    payload: error
})


// Login Dialog
export const ShowLoginDialog = show => ({
    type: TYPES.SHOW_LOGIN_DIALOG,
    payload: show
})

export const SetLoginDialog = show => ({
    type: TYPES.SET_LOGIN_DIALOG,
    payload: show
})

// Register Dialog
export const ShowRegisterDialog = show => ({
    type: TYPES.SHOW_REGISTER_DIALOG,
    payload: show
})

export const SetRegisterDialog = show => ({
    type: TYPES.SET_REGISTER_DIALOG,
    payload: show
})

// Subscribe
export const Subscribe = (email, bag) => ({
    type: TYPES.SUBSCRIBE_USER,
    payload: email,
    meta: bag
})
