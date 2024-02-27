import { useContext, useEffect } from 'react'
import Login from './components/Login'
import StateContext from './context/StateContext';
import Spotify from './components/Spotify';

function App() {
  const { token, setToken } = useContext(StateContext);

  useEffect(() => {
    setToken();
  }, []);

  return (
    <>
      { token ? <Spotify /> : <Login /> }
    </>
  )
}

export default App;
