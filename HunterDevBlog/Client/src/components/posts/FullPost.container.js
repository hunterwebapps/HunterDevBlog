import * as React from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { GetPostById } from '../../store/main.reducer';
import FullPostPresentation from './FullPost.presentation';

FullPost.displayName = 'Full Post Container'

FullPost.propTypes = {
    post: object.isRequired
}

const mapStateToProps = (state, { match }) => ({
    post: GetPostById(state, +match.params.id)
})

function FullPost({ post }) {
    return <FullPostPresentation post={post} />
}

export default withRouter(connect(mapStateToProps, {})(FullPost))
