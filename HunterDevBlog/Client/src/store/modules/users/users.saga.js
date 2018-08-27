import * as TYPES from './users.types'
import { Users } from '../../api'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { SetUser, SetUsers, GetUsersFailure, GetUsersRequest, SetLoginDialog, SetRegisterDialog } from './users.actions';
import { GetPostsRequest } from '../posts/posts.actions';
import { GetLoginDialogState, GetRegisterDialogState } from '../../main.reducer';

export default [
    takeLatest(TYPES.LOGIN, LoginSaga),
    takeLatest(TYPES.REGISTER, RegisterSaga),
    takeLatest(TYPES.LOGOUT, LogoutSaga),
    takeLatest(TYPES.GET_USERS_REQUEST, GetUsersSaga),
    takeLatest(TYPES.SHOW_LOGIN_DIALOG, ShowLoginDialogSaga),
    takeLatest(TYPES.SHOW_REGISTER_DIALOG, ShowRegisterDialogSaga),
    takeLatest(TYPES.SUBSCRIBE_USER, SubscribeSaga)
]

function* LoginSaga({ payload, meta }) {
    const res = yield call(Users.Login, payload)
    if (res && res.status === 200) {
        yield put(SetUser(res.data))
        if (meta) {
            console.log(meta.props)
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

function* ShowLoginDialogSaga({ payload }) {
    if (payload) {
        const registerDialog = yield select(GetRegisterDialogState)
        if (registerDialog)
            yield put(SetRegisterDialog(false))
    }

    yield put(SetLoginDialog(payload))
}

function* ShowRegisterDialogSaga({ payload }) {
    if (payload) {
        const loginDialog = yield select(GetLoginDialogState)
        if (loginDialog)
            yield put(SetLoginDialog(false))
    }

    yield put(SetRegisterDialog(payload))
}

function* SubscribeSaga({ payload, meta }) {
    const { navigator } = window
    const copy = {}

    for (let i in navigator)
        copy[i] = navigator[i]

    delete copy.plugins
    delete copy.mimeTypes

    const subscribeModel = {
        EmailAddress: payload,
        Browser: JSON.stringify(copy)
    }

    const res = yield call(Users.Subscribe, subscribeModel)

    if (res && res.status === 200) {
        meta.resetForm()
    } else {
        console.log(res)
    }

    meta.setSubmitting(false)
}   