import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import RootComponent from './RootComponent';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
const store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = () => ReactDOM.render(
	<Provider store={store}><RootComponent /></Provider>,
	document.getElementById('appRoot')
);

sagaMiddleware.run(rootSaga);
if (document.getElementById('appRoot')) render();
store.subscribe(render);
