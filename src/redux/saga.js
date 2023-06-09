import { call, put, takeEvery, retry, takeLatest } from "redux-saga/effects";
import { getCatsFailure, getCatsSuccess } from "./catSlice";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

function* workerCatFetch(action) {
  const { page } = action.payload || 1;
  try {
    const data = yield call(() =>
      fetch(
        `https://api.thecatapi.com/v1/breeds?page=${page}&limit=100&order=ASC`
      )
    );
    const cats = yield data.json();
    yield put(getCatsSuccess(cats));
  } catch (e) {
    yield put(getCatsFailure("Something went wrong !!"));
  }
}

function* workerCatFetchWithRetry(action) {
  const { page } = action.payload || 1;

  try {
    const data = yield retry(
      MAX_RETRIES,
      RETRY_DELAY,
      call(() =>
        fetch(
          `https://api.thecatapi.com/v1/breeds?page=${page}&limit=100&order=ASC`
        )
      )
    );

    const cats = yield data.json();
    yield put(getCatsSuccess(cats));
  } catch (error) {
    yield put(getCatsFailure("Something went wrong !!"));
  }
}

function* catSaga() {
  yield takeEvery("cat/getCatsFetch", workerCatFetch);
  yield takeLatest("cat/getCatsFetchWithRetry", workerCatFetchWithRetry);
}

export default catSaga;
