import { call, put, takeEvery } from "redux-saga/effecs";
import { getCatsSuccess } from "./catSlice";

function* catSaga() {
  yield takeEvery("cat/getCatFetch", workerCatFetch);
}

function* workerCatFetch() {
  const data = yield call(() => fetch("https://api.thecatapi.com/v1/breeds"));
  const cats = yield data.JSON();
  yield put(getCatsSuccess(cats.slice(0, 20)));
}

export default catSaga;
