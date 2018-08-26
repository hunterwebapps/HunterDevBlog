import * as React from 'react'
import { object } from 'prop-types'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import Sidebar from '../shared/Sidebar';
import divider from '../../images/shape.png'
import './FullPost.css'

FullPost.displayName = 'Full Post Presentation'

FullPost.propTypes = {
    post: object.isRequired
}

function FullPost({ post }) {
    if (!post.Title) return <span />
    return (
        <Grid className="full-post">
            <Row>
                <Col md={8} lg={9}>
                    <div className="text-center">
                        <h1>{post.Title}</h1>

                        <h3>{post.Subtitle}</h3>

                        {post.CreatedBy &&
                            <h5>
                                {'by '}<strong>{post.CreatedBy.FullName}</strong>
                                {' on '}<strong>{post.TimeCreated}</strong>
                            </h5>
                        }

                        <img src={divider} alt="Divider" />
                    </div>

                    <div className="spacer-3"></div>

                    <Image src={post.Images[0].Path.replace('_thumb', '')} alt="post.Title" responsive />

                    <p dangerouslySetInnerHTML={{ __html: post.Content }}></p>
                </Col>
                <Col md={4} lg={3} style={{ height: '100%' }}>
                    <Sidebar recentCount={3} />
                </Col>
            </Row>
        </Grid>
    )
}

export default FullPost
