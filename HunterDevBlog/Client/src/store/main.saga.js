import { all } from 'redux-saga/effects'

import usersWatcher from './modules/users/users.saga'
import postsWatcher from './modules/posts/posts.saga'

export default function* rootSaga() {
    yield all([
        ...usersWatcher,
        ...postsWatcher
    ])
}
