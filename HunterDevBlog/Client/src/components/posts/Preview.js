import * as React from 'react'
import { object } from 'prop-types'
import { Button } from 'react-bootstrap'
import './Preview.css'
import PostLink from '../links/PostLink';
import TagLink from '../links/TagLink';
import divider from '../../images/shape.png'

Preview.displayName = 'Post Preview'

Preview.propTypes = {
    post: object.isRequired
}

function Preview({ post }) {
    return (
        <div className="thumbnail preview">
            {post.Images.length ?
                <div
                    className="image"
                    style={{
                        backgroundImage: `url('${post.Images[0].Path.replace('_thumb', '')}')`
                    }}
                ></div> : <span />
            }
            {post &&
                <div className="caption">
                    <TagLink text={post.Tag}>
                        <Button
                            bsStyle="primary"
                            className="cs-btn tag"
                        >
                            {post.Tag}
                        </Button>
                    </TagLink>
                    <h1>{post.Title}</h1>
                    <h2>{post.Subtitle}</h2>
                    <img src={divider} alt="Divider" />
                    {post.CreatedBy &&
                        <h5 className="text-muted">
                            {`by ${post.CreatedBy.FullName} On ${post.TimeCreated || 'Now'}`}
                        </h5>
                    }
                    <p dangerouslySetInnerHTML={{ __html: post.Preview }} />
                    <PostLink id={post.Id} title={post.Title}>
                        <Button
                            bsStyle="primary"
                            className="cs-btn"
                        >
                            {'Continue Reading'}
                        </Button>
                    </PostLink>

                </div>
            }
        </div>
    )
}

export default Preview
