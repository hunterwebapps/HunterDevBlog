import * as TYPES from './posts.types'
import { Posts } from '../../api'
import { takeLatest, call, put } from 'redux-saga/effects'
import { CreatePostSuccess, CreatePostFailure, GetPostsSuccess, GetPostsFailure } from './posts.actions'

export default [
    takeLatest(TYPES.GET_POSTS_REQUEST, GetPostsSaga),
    takeLatest(TYPES.CREATE_POST_REQUEST, CreatePostSaga)
]

function* GetPostsSaga() {
    const res = yield call(Posts.Get)
    if (res && res.status === 200) {
        yield put(GetPostsSuccess(res.data))
    } else {
        yield put(GetPostsFailure(res))
    }
}

function* CreatePostSaga({ payload, meta }) {
    const res = yield call(Posts.Create, payload)
    if (res && res.status === 201) {
        yield put(CreatePostSuccess(res.data))
        meta.resetForm()
    } else {
        yield put(CreatePostFailure(res))
    }
    meta.setSubmitting(false)
}