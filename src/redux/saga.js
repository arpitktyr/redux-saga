import { call, put, takeEvery } from "redux-saga/effects";
import { getCatsSuccess } from "./catSlice";

function* workerCatFetch() {
  const data = yield call(() => fetch("https://api.thecatapi.com/v1/breeds"));
  const cats = yield data.json();
  yield put(getCatsSuccess(cats.slice(0, 20)));
}

function* catSaga() {
  yield takeEvery("cat/getCatsFetch", workerCatFetch);
}

export default catSaga;
