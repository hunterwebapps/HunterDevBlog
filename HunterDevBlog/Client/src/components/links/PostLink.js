import * as React from 'react'
import { number, string } from 'prop-types'
import { Link } from 'react-router-dom'

PostLink.displayName = 'Post Link'

PostLink.propTypes = {
    id: number,
    title: string
}

function PostLink({ id = 'newPost', title = 'Testing', children }) {
    title = title.replace(/\s/g, '-').replace(/[^-\w]/g, '')

    if (id === 'newPost')
        return <a>{children}</a>

    return (
        <Link to={`/Post/${id}/${title}`}>
            {children}
        </Link>
    )
}

export default PostLink
