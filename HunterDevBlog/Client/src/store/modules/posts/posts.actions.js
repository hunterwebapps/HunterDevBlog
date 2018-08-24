import * as TYPES from './posts.types'

// Get Posts
export const GetPostsRequest = () => ({
    type: TYPES.GET_POSTS_REQUEST
})

export const GetPostsSuccess = postModels => ({
    type: TYPES.GET_POSTS_SUCCESS,
    payload: postModels
})

export const GetPostsFailure = error => ({
    type: TYPES.GET_POSTS_FAILURE,
    payload: error
})

// Create Post
export const CreatePostRequest = (postModel, bag) => ({
    type: TYPES.CREATE_POST_REQUEST,
    payload: postModel,
    meta: bag
})

export const CreatePostSuccess = postModel => ({
    type: TYPES.CREATE_POST_SUCCESS,
    payload: postModel
})

export const CreatePostFailure = error => ({
    type: TYPES.CREATE_POST_FAILURE,
    payload: error
})