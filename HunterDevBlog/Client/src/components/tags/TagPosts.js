import * as React from 'react'
import { arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { GetPostsByTag } from '../../store/main.reducer'
import FeedPresentation from '../posts/Feed.presentation'
import Sidebar from '../shared/Sidebar'
import divider from '../../images/shape.png'
import './TagPosts.css'

TagPosts.displayName = 'Tag Posts'

TagPosts.propTypes = {
    posts: arrayOf(object).isRequired
}

const mapStateToProps = (state, { match }) => ({
    posts: GetPostsByTag(state, match.params.tag.replace(/-/g, ' '))
})

function TagPosts({ posts, match }) {
    const tag = match.params.tag.replace(/-/g, ' ')
    return (
        <Grid className="tag-posts">
            <Row>
                <div className="text-center">
                    <h1>Posts Tagged '{tag}'</h1>
                    <img src={divider} alt="Divider" />
                </div>
                <Col md={8} lg={9}>
                    <FeedPresentation posts={posts} />
                </Col>
                <Col md={4} lg={3}>
                    <Sidebar recentCount={5} />
                </Col>
            </Row>
        </Grid>
    )
}

export default withRouter(connect(mapStateToProps, {})(TagPosts))
