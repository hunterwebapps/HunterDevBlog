import * as React from 'react'
import { arrayOf, object } from 'prop-types'
import { Carousel } from 'react-bootstrap'
import './Featured.css'
import PostLink from '../links/PostLink';

FeaturedPresentation.displayName = 'Featured Presentation'

FeaturedPresentation.propTypes = {
    posts: arrayOf(object).isRequired
}

function FeaturedPresentation({ posts }) {
    return (
        <div className="featured-carousel">
            <Carousel
                className="carousel-fade"
                indicators={false}
                nextIcon={<i className="fas fa-angle-right"></i>}
                prevIcon={<i className="fas fa-angle-left"></i>}
            >
                {posts.map(post =>
                    <Carousel.Item
                        key={post.Id}
                        style={{
                            backgroundImage: `url('${post.Images[0].Path.replace('_thumb', '')}')`
                        }}
                    >
                        <Carousel.Caption>
                            <h4>Featured Post</h4>
                            <PostLink id={post.Id} title={post.Title}>
                                <h3>{post.Title}</h3>
                                <p>{post.Subtitle}</p>
                            </PostLink>
                            {post.CreatedBy &&
                                <p>
                                    {`by `}<strong>{post.CreatedBy.FullName}</strong>
                                </p>
                            }
                            <p>
                                {`on `}<strong>{post.TimeCreated}</strong>
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    )
}

export default FeaturedPresentation
