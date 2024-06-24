import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useSelector } from 'react-redux';
import {
  categoryApi,
  gradeApi,
  stampApi,
  unitApi,
  videoApi,
  wordApi,
} from '../features/api/api-slice';

export type State = {
  videos: VideosState;
};
type VideosState = Partial<Record<string, VideoState>>;
type VideoState = Partial<{
  normalStamps: number[];
  goodStamps: number[];
  bestStamps: number[];
  question: string;
}>;
type StampActionPayload = {
  videoId: string;
  stamps: number[];
};
type VideosReducers = {
  setVideoNormalStamps: (
    state: VideosState,
    action: PayloadAction<StampActionPayload>,
  ) => void;
  setVideoGoodStamps: (
    state: VideosState,
    action: PayloadAction<StampActionPayload>,
  ) => void;
  setVideoBestStamps: (
    state: VideosState,
    action: PayloadAction<StampActionPayload>,
  ) => void;
  setVideoQuestion: (state: VideosState, action: any) => void;
};

const videoSlice = createSlice<VideosState, VideosReducers>({
  name: 'videos',
  initialState: {},
  reducers: {
    setVideoNormalStamps: (state, action) => {
      const { videoId, stamps } = action.payload;
      state[videoId] = { ...state[videoId], normalStamps: stamps };
    },
    setVideoGoodStamps: (state, action) => {
      const { videoId, stamps } = action.payload;
      state[videoId] = { ...state[videoId], goodStamps: stamps };
    },
    setVideoBestStamps: (state, action) => {
      const { videoId, stamps } = action.payload;
      state[videoId] = { ...state[videoId], bestStamps: stamps };
    },
    setVideoQuestion: (state, action) => {
      const { videoId, question } = action.payload;
      state[videoId] = { ...state[videoId], question };
    },
  },
});

export const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [gradeApi.reducerPath]: gradeApi.reducer,
    [unitApi.reducerPath]: unitApi.reducer,
    [wordApi.reducerPath]: wordApi.reducer,
    [stampApi.reducerPath]: stampApi.reducer,
    videos: videoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(
    //   videoApi.middleware,
    //   categoryApi.middleware,
    //   gradeApi.middleware,
    //   unitApi.middleware
    // ),
    getDefaultMiddleware()
      .concat(videoApi.middleware)
      .concat(categoryApi.middleware)
      .concat(unitApi.middleware)
      .concat(gradeApi.middleware)
      .concat(wordApi.middleware)
      .concat(stampApi.middleware),
});

export const {
  setVideoNormalStamps,
  setVideoGoodStamps,
  setVideoBestStamps,
  setVideoQuestion,
} = videoSlice.actions;

setupListeners(store.dispatch);

export const useVideoSelector = (videoId: string) =>
  useSelector<State, VideoState>((state) => state.videos[videoId] || {});
