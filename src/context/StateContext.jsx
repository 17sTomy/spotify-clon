import { createContext, useReducer } from "react";
import { TYPES } from "../actions/spotifyActions";
import { spotifyInitialState, spotifyReducer } from "../reducers/spotifyReducer";
import axios from 'axios';

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(spotifyReducer, spotifyInitialState);
  const { token } = state;

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

  const getUserInfo = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me", 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const userInfo = {
      userId: data.id,
      userUrl: data.external_urls.spotify,
      name: data.display_name,
      image: data.images[0],
    };
    return userInfo;
  };

  const getPlaylistData = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      return playlists;
    } catch (error) {
      console.log("An error has ocurred: ", error);
    }
  };

  const data = {
    token,
    getAccessToken,
    setToken,
    getUserInfo,
    getPlaylistData,
  };
  
  return <StateContext.Provider value={data}>{children}</StateContext.Provider>
};

export { StateProvider };
export default StateContext;