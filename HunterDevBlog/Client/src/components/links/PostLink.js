import * as React from 'react'
import { number, string } from 'prop-types'
import { Link } from 'react-router-dom'

PostLink.displayName = 'Post Link'

PostLink.propTypes = {
    id: number.isRequired,
    title: string.isRequired
}

function PostLink({ id, title, children }) {
    title = title.replace(/\s/g, '-').replace(/[^-\w]/g, '')
    return (
        <Link to={`/Post/${id}/${title}`}>
            {children}
        </Link>
    )
}

export default PostLink
