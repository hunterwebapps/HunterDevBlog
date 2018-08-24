import * as React from 'react'
import { arrayOf, object } from 'prop-types'
import { } from 'react-bootstrap'
import Preview from './Preview';

FeedPresentation.displayName = 'Feed'

FeedPresentation.propTypes = {
    posts: arrayOf(object).isRequired
}

function FeedPresentation({ posts = [] }) {
    return posts.map(post =>
        <Preview key={post.Id} post={post} />
    ) || <span />
}

export default FeedPresentation
