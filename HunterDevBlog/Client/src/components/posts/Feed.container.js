import * as React from 'react'
import { arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'
import FeedPresentation from './Feed.presentation'
import { GetPosts } from '../../store/main.reducer'

Feed.displayName = 'Feed Container'

Feed.propTypes = {
    posts: arrayOf(object).isRequired
}

const mapStateToProps = state => ({
    posts: GetPosts(state)
})

function Feed({ posts }) {
    return posts.length ?
        <FeedPresentation posts={posts} />
        :
        <span />
}

export default connect(mapStateToProps, {})(Feed)