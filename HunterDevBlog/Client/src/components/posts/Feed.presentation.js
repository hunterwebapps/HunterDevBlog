import * as React from 'react'
import { arrayOf, object } from 'prop-types'
import { } from 'react-bootstrap'
import Preview from './Preview'
import { throttle } from 'lodash'

class FeedPresentation extends React.Component {
    constructor() {
        super()

        this.state = {
            showCount: 5
        }

        this.throttleCheckShowMore = throttle(this.checkShowMore, 100)
    }

    static displayName = 'Feed Presentation'

    static propTypes = {
        posts: arrayOf(object)
    }

    static defaultProps = {
        posts: []
    }

    componentDidMount() {
        window.addEventListener('scroll', this.throttleCheckShowMore)
    }

    checkShowMore = () => {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 500;

        if (scrolledToBottom)
            this.onShowMore()
    }

    onShowMore = () => this.setState(state => ({
        showCount: state.showCount + 5
    }))

    render() {
        const { posts } = this.props

        const previewPanes = []
        for (let i = 0; i < posts.length; i++) {
            if (i === this.state.showCount) break

            previewPanes.push(
                <Preview
                    key={posts[i].Id}
                    post={posts[i]}
                />
            )
        }

        return previewPanes.length ?
            previewPanes
            :
            <h1>Loading...</h1>
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.throttleCheckShowMore)
    }
}

export default FeedPresentation
