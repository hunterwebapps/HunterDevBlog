import * as React from 'react'
import { object } from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { GetCurrentUser } from '../../store/main.reducer';
import { CreatePostRequest } from '../../store/modules/posts/posts.actions';
import PostEditor from './PostEditor';

PostsAdmin.displayName = 'Post Admin'

PostsAdmin.propTypes = {
    user: object.isRequired
}

const mapStateToProps = state => ({
    user: GetCurrentUser(state)
})

const mapDispatchToProps = {
    CreatePostRequest
}

function PostsAdmin({ user, CreatePostRequest }) {
    return (
        <Grid>
            <Row>
                <Col xs={12}>
                    <PostEditor createPost={CreatePostRequest} currentUser={user} />
                </Col>
            </Row>
        </Grid>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsAdmin)
