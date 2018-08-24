import * as TYPES from './users.types'

const initialState = {
    all: [],
    current: {}
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
        default:
            return state
    }
}
