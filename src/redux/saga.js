import { call, put, takeEvery } from "redux-saga/effects";
import { getCatsFailure, getCatsSuccess } from "./catSlice";

function* workerCatFetch(action) {
  const { page } = action.payload;
  try {
    const data = yield call(() =>
      fetch(
        `https://api.thecatapi.com/v1/breeds?page=${page}&limit=20&order=DESC`
      )
    );
    const cats = yield data.json();
    yield put(getCatsSuccess(cats));
  } catch (e) {
    yield put(getCatsFailure("Something went wrong !!"));
  }
}

function* catSaga() {
  yield takeEvery("cat/getCatsFetch", workerCatFetch);
}

export default catSaga;
