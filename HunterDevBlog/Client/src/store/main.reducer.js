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

export const GetLoginDialogState = state => state.users.loginDialog

export const GetRegisterDialogState = state => state.users.registerDialog

// Posts

export const GetPosts = (state, limit) => {
    const posts = state.posts.all.map(post => {
        post.CreatedBy = GetUserById(state, post.CreatedById)
        return post
    })
    if (limit)
        return posts.splice(0, limit)

    return posts
}

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

export const GetPostsByTag = (state, tag) =>
    state.posts.all.reduce((posts, post) => {
        if (post.Tag !== tag)
            return posts
        post.CreatedBy = GetUserById(state, post.CreatedById)
        posts.push(post)
        return posts
    }, [])

// Tags

export const GetTags = state =>
    state.posts.all.reduce((tags, post) => {
        if (!tags.includes(post.Tag))
            tags.push(post.Tag)

        return tags
    }, [])
