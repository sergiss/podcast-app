import { configureStore } from '@reduxjs/toolkit';
import podcastListReducer from './slices/podcastListSlice'; 
import podcastDetailReducer from './slices/podcastDetailSlice';
import globalReducer from './slices/globalSlice';

const store = configureStore({
  reducer: {
    global: globalReducer,
    podcastList: podcastListReducer,
    podcastDetail: podcastDetailReducer,
  }
});

export const dispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;