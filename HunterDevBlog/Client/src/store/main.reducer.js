import { combineReducers } from 'redux'

import usersReducer from './modules/users/users.reducer'
import postsReducer from './modules/posts/posts.reducer'

export default combineReducers({
    users: usersReducer,
    posts: postsReducer
})

/*
 * Selectors
 * 
*/

// Users

export const GetUsers = state => state.users.all

export const GetCurrentUser = state => state.users.current

export const GetUserById = (state, id) => state.users.all.find(user => user.Id === id)

// Posts

export const GetPosts = state =>
    state.posts.all.map(post => {
        post.CreatedBy = GetUserById(state, post.CreatedById)
        return post
    })

export const GetFeaturedPosts = state =>
    state.posts.all.reduce((output, post) => {
        if (post.Featured) {
            post.CreatedBy = GetUserById(state, post.CreatedById)
            output.push(post)
        }
        return output
    }, [])

export const GetPostById = (state, id) => {
    const post = state.posts.all.find(post => post.Id === id)
    if (!post) return {}
    post.CreatedBy = GetUserById(state, post.CreatedById)
    return post
}