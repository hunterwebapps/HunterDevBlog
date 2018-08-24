import * as React from 'react'
import { arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'
import FeaturedPresentation from './Featured.presentation'
import { GetFeaturedPosts } from '../../store/main.reducer';

Featured.displayName = 'Featured'

Featured.propTypes = {
    posts: arrayOf(object)
}

const mapStateToProps = state => ({
    posts: GetFeaturedPosts(state)
})

function Featured({ posts }) {
    return posts.length ?
        <FeaturedPresentation posts={posts} />
        :
        <span />
}

export default connect(mapStateToProps, {})(Featured)
