import { call, put, takeEvery } from "redux-saga/effects";
import { getCatsFailure, getCatsSuccess } from "./catSlice";

function* workerCatFetch() {
  try {
    const data = yield call(() => fetch("https://api.thecatapi.com/v1/breeds"));
    const cats = yield data.json();
    yield put(getCatsSuccess(cats.slice(0, 30)));
  } catch (e) {
    yield put(getCatsFailure("Something went wrong !!"));
  }
}

function* catSaga() {
  yield takeEvery("cat/getCatsFetch", workerCatFetch);
}

export default catSaga;
