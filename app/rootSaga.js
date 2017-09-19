const sagas = [];

export default function* rootSaga() {
    yield sagas.map(saga => saga());
}