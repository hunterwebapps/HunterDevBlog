import * as React from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'

TagLink.displayName = 'Tag Link'

TagLink.propTypes = {
    text: string.isRequired
}

function TagLink({ text, children }) {
    text = text.replace(/ /g, '-')
    return (
        <Link to={`/Tag/${text}`}>
            {children}
        </Link>
    )
}

export default TagLink
