import * as React from 'react'
import { number, object } from 'prop-types'
import RecentPosts from '../posts/RecentPosts.container'
import AllTags from '../tags/AllTags.container'
import './Sidebar.css'
import FollowLinks from './FollowLinks'
import SubscribeForm from '../subscriptions/SubscribeForm';

Sidebar.displayName = 'Sidebar'

Sidebar.propTypes = {
    recentCount: number.isRequired,
    style: object
}

function Sidebar({ recentCount, style = {} }) {
    return (
        <div className="sidebar">
            <div className="sidebar-panel">
                <SubscribeForm />
            </div>
            <div className="sidebar-panel">
                <RecentPosts recentCount={recentCount} />
            </div>
            <div className="sidebar-panel">
                <AllTags />
            </div>
            <div className="sidebar-panel">
                <FollowLinks />
            </div>
        </div>
    )
}

export default Sidebar
