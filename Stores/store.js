import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from './reducer'
import rootSaga from './saga'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const makeStore = context => {

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware),
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

const wrapper = createWrapper(makeStore)

export default wrapper