import { useContext, useEffect } from 'react'
// import './App.css'
import Login from './components/Login'
import StateContext from './context/StateContext';
import Spotify from './components/Spotify';

function App() {
  const { token, saveToken, getUserInfo, getPlaylistData } = useContext(StateContext);

  useEffect(() => {
    saveToken();
  }, []);


  useEffect(() => {
    console.log(token);
    getUserInfo();
  }, [token]);

  return (
    <>
      { token ? <Spotify /> : <Login /> }
    </>
  )
}

export default App;
