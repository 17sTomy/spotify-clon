import { useContext, useEffect, useReducer } from "react";
import StateContext from "../context/StateContext"
import { TYPES } from "../actions/spotifyActions";
import { spotifyInitialState, spotifyReducer } from "../reducers/spotifyReducer";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function Navbar({ navBackground }) {
  const [state, dispatch] = useReducer(spotifyReducer, spotifyInitialState);
  const { userInfo } = state;
  const { token } = useContext(StateContext);

  // useEffect(() => {
  //   getUserInfo().then(userInfo => {
  //     dispatch({ type: TYPES.SET_USER, payload: userInfo })
  //   });
  // }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
        image: data.images[0],
      };
      dispatch({ type: TYPES.SET_USER, payload: userInfo })
    };

    getUserInfo();
  });

  return (
    <Container navBackground={navBackground}>
      <div className="search__bar">
        <FaSearch fill="#000" />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <div className="avatar">
        <a href={userInfo ? userInfo.userUrl : ""}>
          <img src={userInfo ? userInfo.image.url : ""} alt="" />
          <span>{userInfo ? userInfo.name : ""}</span>
        </a>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) => navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      background-color: #fff;
      color: #000;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
    img {
      border-radius: 50%;
      width: 35px;
    }
  }
`;