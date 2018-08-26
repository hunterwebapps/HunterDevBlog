import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import './gist.css'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import { history, store } from './store/store'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import ScrollToTop from './components/shared/ScrollToTop';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTop>
                <Route path="/" component={App} />
            </ScrollToTop>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
