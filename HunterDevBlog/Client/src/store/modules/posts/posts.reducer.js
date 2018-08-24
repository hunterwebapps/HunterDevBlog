import * as TYPES from './posts.types'

const initialState = {
    all: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.GET_POSTS_SUCCESS:
            state = {
                ...state,
                all: payload
            }
            return state
        case TYPES.CREATE_POST_SUCCESS:
            state = {
                ...state,
                all: [
                    payload,
                    ...state.all
                ]
            }
            return state
        default:
            return state
    }
}
