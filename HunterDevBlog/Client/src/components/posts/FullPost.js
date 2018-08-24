import * as React from 'react'
import { object } from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { GetPostById } from '../../store/main.reducer';

FullPost.displayName = 'Full Post'

FullPost.propTypes = {
    post: object.isRequired
}

const mapStateToProps = (state, { match }) => ({
    post: GetPostById(state, +match.params.id)
})

function FullPost({ post }) {
    return (
        <Grid>

        </Grid>
    )
}

export default connect(mapStateToProps, {})(FullPost)
