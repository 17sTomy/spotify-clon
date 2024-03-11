import { useContext, useEffect } from "react"
import StateContext from "../context/StateContext"
import Loader from "../assets/Loader";
import styled from "styled-components";
import axios from 'axios';

export default function Playlists() {
  const { token, playlists, setPlaylists, setSelectedPlaylist } = useContext(StateContext);

  const selectPlaylist = async (id) => {
    console.log(id);
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    const selectedPlaylist = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description.startsWith("<a")
        ? ""
        : response.data.description,
      image: response.data.images[0].url,
      tracks: response.data.tracks.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name),
        image: track.album.images[2].url,
        duration: track.duration_ms,
        album: track.album.name,
        context_uri: track.album.uri,
        track_number: track.track_number,
      })),
    };
    setSelectedPlaylist(selectedPlaylist);
  };

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
        setPlaylists(playlists);
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
      	    return <li key={id} onClick={() => selectPlaylist(id)}>{name}</li>
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