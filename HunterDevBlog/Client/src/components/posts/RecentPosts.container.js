import * as React from 'react'
import { number, arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'
import { GetPosts } from '../../store/main.reducer'
import RecentPostsPresentation from './RecentPosts.presentation'

RecentPosts.displayName = 'Recent Posts Container'

RecentPosts.propTypes = {
    recentCount: number.isRequired,
    posts: arrayOf(object).isRequired
}

const mapStateToProps = (state, { recentCount }) => ({
    posts: GetPosts(state, recentCount)
})

function RecentPosts({ posts }) {
    return <RecentPostsPresentation posts={posts} />
}

export default connect(mapStateToProps, {})(RecentPosts)
