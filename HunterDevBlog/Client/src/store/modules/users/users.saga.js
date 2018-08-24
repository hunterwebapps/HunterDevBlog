import * as TYPES from './users.types'
import { Users } from '../../api'
import { takeLatest, call, put } from 'redux-saga/effects'
import { SetUser, SetUsers, GetUsersFailure, GetUsersRequest } from './users.actions';
import { GetPostsRequest } from '../posts/posts.actions';

export default [
    takeLatest(TYPES.LOGIN, LoginSaga),
    takeLatest(TYPES.REGISTER, RegisterSaga),
    takeLatest(TYPES.LOGOUT, LogoutSaga),
    takeLatest(TYPES.GET_USERS_REQUEST, GetUsersSaga)
]

function* LoginSaga({ payload, meta }) {
    const res = yield call(Users.Login, payload)
    if (res && res.status === 200) {
        yield put(SetUser(res.data))
        if (meta) {
            meta.props.onHide()
            meta.setSubmitting(false)
        }
    } else {
        console.log(res)
    }
    yield put(GetUsersRequest())
    yield put(GetPostsRequest())
}

function* RegisterSaga({ payload, meta }) {
    const res = yield call(Users.Register, payload)
    if (res && res.status === 201) {
        yield put(SetUser(res.data))
        meta.props.onHide()
        meta.setSubmitting(false)
    } else {
        console.log(res)
    }
}

function* LogoutSaga() {
    const res = yield call(Users.Logout)
    if (res && res.status === 200) {
        yield put(SetUser({}))
    } else {
        console.log(res)
    }
}


function* GetUsersSaga() {
    const res = yield call(Users.Get)
    if (res && res.status === 200) {
        yield put(SetUsers(res.data))
    } else {
        yield put(GetUsersFailure(res))
    }
}