import * as React from 'react'
import { arrayOf, string } from 'prop-types'
import { Button } from 'react-bootstrap'
import './AllTags.css'
import TagLink from '../links/TagLink';

AllTags.displayName = 'All Tags Presentation'

AllTags.propTypes = {
    tags: arrayOf(string)
}

function AllTags({ tags }) {
    return (
        <div className="all-tags">
            <h1>Tags</h1>
            {tags.map(tag =>
                <TagLink
                    key={tag}
                    text={tag}
                >
                    <Button
                        bsStyle="primary"
                        className="cs-btn tag"
                    >
                        {tag}
                    </Button>
                </TagLink>
            )}
        </div>
    )
}

export default AllTags
