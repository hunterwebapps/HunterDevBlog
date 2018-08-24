import * as React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import PostsAdmin from './components/admin/PostsAdmin';
import FullPost from './components/posts/FullPost';


class App extends React.Component {
    render() {
        return (
            <Layout>
                <TransitionGroup style={this.props.location.pathname === '/' ? { height: '100%' } : {}}>
                    <CSSTransition
                        key={this.props.location.pathname}
                        classNames="fade"
                        timeout={500}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Switch location={this.props.location}>
                            <Route exact path="/" component={Home} />
                            <Route path="/Post/:id" component={FullPost} />
                            <Route path="/Admin/Posts" component={PostsAdmin} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Layout>
        );
    }
}

export default App;
