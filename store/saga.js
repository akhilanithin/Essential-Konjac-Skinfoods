// sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_PRODUCT_REQUEST, fetchProductSuccess, fetchProductFailure } from './productActions';

// This is the API call function
const fetchProductData = async (token) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BLOG_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error fetching products');
  }
  return data;
};

// Saga to handle the action
function* fetchProductSaga() {
  try {
    const token = process.env.NEXT_PUBLIC_BLOG_TOKEN; // Or from Redux state or other methods
    if (!token) {
      throw new Error('Token is missing');
    }

    const data = yield call(fetchProductData, token);
    yield put(fetchProductSuccess(data));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}

// Watcher saga
export function* watchProductFetch() {
  yield takeLatest(FETCH_PRODUCT_REQUEST, fetchProductSaga);
}
