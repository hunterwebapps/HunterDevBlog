import * as React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import PostsAdmin from './components/admin/PostsAdmin';
import FullPost from './components/posts/FullPost.container';
import TagPosts from './components/tags/TagPosts';


class App extends React.Component {
    render() {
        return (
            <Layout>
                {user =>
                    <TransitionGroup style={this.props.location.pathname === '/' ? { height: '100%' } : {}}>
                        <CSSTransition
                            key={this.props.location.pathname}
                            classNames="fade"
                            timeout={500}
                            mountOnEnter
                            unmountOnExit
                        >
                            <Switch location={this.props.location}>
                                <Route exact path="/" render={() => <div className="absoluteFull"><Home /></div>} />
                                <Route path="/Post/:id" render={() => <div className="absoluteFull"><FullPost /></div>} />
                                <Route path="/Tag/:tag" render={() => <div className="absoluteFull"><TagPosts /></div>} />
                                {user.Administrator &&
                                    <Route path="/Admin/Posts" render={() => <div className="absoluteFull"><PostsAdmin /></div>} />
                                }
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                }
            </Layout>
        );
    }
}

export default App;
