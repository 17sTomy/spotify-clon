import { TYPES } from "../actions/spotifyActions";

export const spotifyInitialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "5ISoQMku8LAmIUFKYSBX3L",
};

export const spotifyReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case TYPES.SET_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case TYPES.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };
    case TYPES.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.payload,
      };
    case TYPES.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.payload,
      };
    case TYPES.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.payload,
      };
    default:
      return state;
  };
};