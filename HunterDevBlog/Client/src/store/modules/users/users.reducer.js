import * as TYPES from './users.types'

const initialState = {
    all: [],
    current: {},
    loginDialog: false,
    registerDialog: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.SET_USER:
            state = {
                ...state,
                current: payload
            }
            return state
        case TYPES.SET_USERS:
            state = {
                ...state,
                all: payload
            }
            return state
        case TYPES.SET_LOGIN_DIALOG:
            state = {
                ...state,
                loginDialog: payload
            }
            return state
        case TYPES.SET_REGISTER_DIALOG:
            state = {
                ...state,
                registerDialog: payload
            }
            return state
        default:
            return state
    }
}
