import { useReducer, useEffect, useContext } from "react"
import StateContext from "../context/StateContext";
import { TYPES } from "../actions/spotifyActions";
import { spotifyInitialState, spotifyReducer } from "../reducers/spotifyReducer";
import styled from "styled-components";
import axios from "axios";

export default function CurrentTrack() {
  const [state, dispatch] = useReducer(spotifyReducer, spotifyInitialState);
  const { currentPlaying } = state;
  const { token } = useContext(StateContext);

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data !== "") {
          const currentPlaying = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[2].url,
          };
          dispatch({ type: TYPES.SET_PLAYING, payload: currentPlaying });
        } else {
          dispatch({ type: TYPES.SET_PLAYING, payload: null });
        };
      } catch (error) {
        console.log("An error has ocurred: ", error);
      }
    };
    getCurrentTrack();
  }, [token]);

  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
        margin: 0;
      }
      &__track__artists {
        color: #b3b3b3;
        margin: 0;
      }
    }
  }
`;