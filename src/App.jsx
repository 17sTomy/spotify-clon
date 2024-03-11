import { useContext, useEffect } from 'react'
import Login from './components/Login'
import StateContext from './context/StateContext';
import Spotify from './components/Spotify';

function App() {
  const { token, setTheToken } = useContext(StateContext);

  useEffect(() => {
    setTheToken();
  }, []);

  return (
    <>
      { token ? <Spotify /> : <Login /> }
    </>
  )
}

export default App;
