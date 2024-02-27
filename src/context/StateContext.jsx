import { createContext, useReducer, useState } from "react";
import { TYPES } from "../actions/spotifyActions";
import { spotifyInitialState, spotifyReducer } from "../reducers/spotifyReducer";
import axios from 'axios';

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(spotifyReducer, spotifyInitialState);
  const [token, setToken] = useState(null);

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

  const saveToken = () => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: TYPES.SET_TOKEN, payload: token })
      setToken(token);
    };
  };

  const getUserInfo = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me", 
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const userInfo = {
      userId: data.id,
      userUrl: data.external_urls.spotify,
      name: data.display_name,
    };
    console.log(userInfo);
    console.log(data);
  };

  const getPlaylistData = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: TYPES.SET_PLAYLISTS, payload: playlists })
      // console.log(playlists);
      return playlists;
    } catch (error) {
      console.log("An error has ocurred: ", error);
    }
  };

  const data = {
    token,
    getAccessToken,
    saveToken,
    getUserInfo,
    getPlaylistData,
  };
  
  return <StateContext.Provider value={data}>{children}</StateContext.Provider>
};

export { StateProvider };
export default StateContext;