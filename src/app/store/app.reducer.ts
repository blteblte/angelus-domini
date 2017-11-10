import { IAppState } from './models/_AppState';

export const appReducer = (state: IAppState, action): IAppState => {

  switch (action.type) {
    case 'LOAD_YOUTUBE_VIDEOS': {
      return { ...state, youtubeVideos: action.payload }
    }
    // ...
  }

  return state
}
