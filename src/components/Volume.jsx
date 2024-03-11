import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import StateContext from "../context/StateContext";
import { IoMdVolumeHigh } from "react-icons/io";

export default function Volume() {
  const { token } = useContext(StateContext);

  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <Container>
      <IoMdVolumeHigh className="volume" />
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </Container>
  );
}

const Container = styled.div`
  margin-right: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  input {
    width: 10rem;
    color: #fff;
    border-radius: 2rem;
    height: 0.5rem;
    background-color: white;
  }
  .volume {
    font-size: 1.1rem;
  }
`;