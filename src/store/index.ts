import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountSlice from './account/reducers'

const rootReducer = combineReducers({
    account:accountSlice
})

export type AppState = ReturnType<typeof rootReducer>;

function configureAppStore() {
  const store = configureStore({
    reducer: {
        account:accountSlice,
    }
  });

  return store;
}

export default configureAppStore;
