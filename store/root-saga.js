import { all } from 'redux-saga/effects';

import { cartSaga } from '~/store/cart';

import { watchProductFetch } from './saga';

export default function* rootSaga() {
    yield all( [
        cartSaga(),
        watchProductFetch(),
    ] )
}