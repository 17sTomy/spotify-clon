import { useContext, useEffect, useReducer } from "react"
import StateContext from "../context/StateContext"
import { TYPES } from "../actions/spotifyActions";
import { spotifyInitialState, spotifyReducer } from "../reducers/spotifyReducer";
import Loader from "../assets/Loader";
import styled from "styled-components";
import axios from 'axios';

export default function Playlists() {
  const [state, dispatch] = useReducer(spotifyReducer, spotifyInitialState);
  const { playlists } = state;
  const { token } = useContext(StateContext);

  useEffect(() => {
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
        console.log(playlists);
        dispatch({ type: TYPES.SET_PLAYLISTS, payload: playlists });
      } catch (error) {
        console.log("An error has ocurred: ", error);
      }
    };
    getPlaylistData();
  }, [token]);

  return (
    <Container>
			<ul>
      	{ playlists ? (
					playlists.map(({ name, id }) => {
      	    return <li key={id}>{name}</li>
      		})
					) : (
						<Loader />
					)
				}
			</ul>
    </Container>
  );
};

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;