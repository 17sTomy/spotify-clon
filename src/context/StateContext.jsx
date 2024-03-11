import { createContext, useReducer, useState } from "react";
import { TYPES } from "../actions/spotifyActions";
import { spotifyInitialState, spotifyReducer } from "../reducers/spotifyReducer";

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(spotifyReducer, spotifyInitialState);
  const { token } = state;
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  const getAccessToken = async () => {
    const client_id = "593ebe3ad8e74156a28c6f7d9fdee82f";
    const redirect_uri = "http://localhost:5173/";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  };

  const setToken = () => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: TYPES.SET_TOKEN, payload: token });
    };
  };

  const data = {
    token,
    getAccessToken,
    setToken,
    playlists,
    setPlaylists,
    selectedPlaylist, 
    setSelectedPlaylist,
    currentTrack,
    setCurrentTrack
  };
  
  return <StateContext.Provider value={data}>{children}</StateContext.Provider>
};

export { StateProvider };
export default StateContext;