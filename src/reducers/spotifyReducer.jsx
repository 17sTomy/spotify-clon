import { TYPES } from "../actions/spotifyActions";

export const spotifyInitialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
};

export const spotifyReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case TYPES.SET_USER:
      return {};
    case TYPES.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };
    case TYPES.SET_PLAYING:
      return {};
    case TYPES.SET_PLAYER_STATE:
      return {};
    case TYPES.SET_PLAYLIST:
      return {};
    case TYPES.SET_PLAYLIST_ID:
      return {};
    default:
      return state;
  };
};