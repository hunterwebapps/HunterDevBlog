import * as React from 'react'
import { string, object } from 'prop-types'
import axios from 'axios'
import { SerializeNavigator } from '../../helpers';

class ErrorCatch extends React.Component {
    state = {
        hasError: false
    }

    static displayName = 'Error Catch'

    static propTypes = {
        type: string.isRequired,
        store: object
    }

    static defaultProps = {
        store: {}
    }

    componentDidCatch(err, info) {
        const state = JSON.stringify(this.props.store.getState())
        axios.post(`/api/Errors`, {
            Message: err.message,
            Type: `${err.name}-${this.props.type}`,
            Source: info.componentStack,
            URL: window.location.href,
            State: state,
            Browser: SerializeNavigator(navigator)
        })
    }

    render() {
        return this.props.children
    }
}

export default ErrorCatch
