import { useEffect, useContext } from "react"
import StateContext from "../context/StateContext";
import styled from "styled-components";
import axios from "axios";

export default function CurrentTrack() {
  const { token, setCurrentTrack, currentTrack } = useContext(StateContext);

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

        if (response.data !== "") {
          const currentTrack = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[2].url,
          };
          setCurrentTrack(currentTrack)
        } else {
          setCurrentTrack(null)
        };
      } catch (error) {
        console.log("An error has ocurred: ", error);
      }
    };
    getCurrentTrack();
  }, [token]);

  return (
    <Container>
      {currentTrack && (
        <div className="track">
          <div className="track__image">
            <img src={currentTrack.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentTrack.name}</h4>
            <h6 className="track__info__track__artists">
              {currentTrack.artists.join(", ")}
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