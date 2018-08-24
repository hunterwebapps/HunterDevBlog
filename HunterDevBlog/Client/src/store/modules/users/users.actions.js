import * as TYPES from './users.types'

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
