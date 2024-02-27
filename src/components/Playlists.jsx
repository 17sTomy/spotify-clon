import { useContext, useEffect, useState } from "react"
import styled from "styled-components";
import StateContext from "../context/StateContext"
import Loader from "../assets/Loader";

export default function Playlists() {
  const [playlists, setPlaylists] = useState(null);
  const { token, getPlaylistData } = useContext(StateContext)

  useEffect(() => {
    getPlaylistData().then(playlists => {
			setPlaylists(playlists);
		});
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