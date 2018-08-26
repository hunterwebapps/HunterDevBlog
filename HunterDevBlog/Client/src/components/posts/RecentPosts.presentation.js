import * as React from 'react'
import { arrayOf, object } from 'prop-types'
import { Image, Table } from 'react-bootstrap'
import './RecentPosts.css'
import PostLink from '../links/PostLink';

RecentPosts.displayName = 'Recent Post Presentation'

RecentPosts.propTypes = {
    posts: arrayOf(object).isRequired
}

function RecentPosts({ posts }) {
    return (
        <div className="recent-posts">
            <h1>Recent Posts</h1>
            <Table hover condensed>
                <tbody>
                    {posts.map(post =>
                        <tr key={post.Id}>
                            <td className="image">
                                <PostLink id={post.Id} title={post.Title}>
                                    <Image src={post.Images[0].Path} alt={post.Title} responsive />
                                </PostLink>
                            </td>
                            <td>
                                <PostLink id={post.Id} title={post.Title}>
                                    <h3>{post.Title}</h3>
                                    <h5>{post.TimeCreated}</h5>
                                </PostLink>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default RecentPosts
