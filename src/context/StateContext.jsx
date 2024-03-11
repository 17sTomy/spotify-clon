import { createContext, useState } from "react";

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [playerState, setPlayerState] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  const getAccessToken = async () => {
    const client_id = import.meta.env.VITE_CLIENT_ID;
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

  const setTheToken = () => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      setToken(token);
    };
  };

  const data = {
    token,
    getAccessToken,
    setTheToken,
    userInfo,
    setUserInfo,
    playerState,
    setPlayerState,
    playlists,
    setPlaylists,
    selectedPlaylist, 
    setSelectedPlaylist,
    currentTrack,
    setCurrentTrack,
  };
  
  return <StateContext.Provider value={data}>{children}</StateContext.Provider>
};

export { StateProvider };
export default StateContext;