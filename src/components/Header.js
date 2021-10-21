import { useEffect } from "react";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import {
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

import {
  selectUserName,
  selectUserPhoto,
  selectUserEmail,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(selectUserName);
  const useremail = useSelector(selectUserEmail);
  const userphoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [username]);

  const handleAuth = () => {
    if (!username) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (username) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="logo" />
      </Logo>
      {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" />
              <span>HOME</span>
            </a>
            <a href="">
              <img src="/images/search-icon.svg" />
              <span>SEARCH</span>
            </a>
            <a href="">
              <img src="/images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>
            <a href="">
              <img src="/images/original-icon.svg" />
              <span>ORIGINALS</span>
            </a>
            <a href="">
              <img src="/images/movie-icon.svg" />
              <span>MOVIES</span>
            </a>
            <a href="">
              <img src="/images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImage src={userphoto} alt={username} />
            <DropDownContainer className="dropdowncontainer">
              <Dropdown>
                <span>Profile</span>
                <span>Settings</span>
                <span>Plan</span>
                <span onClick={handleAuth}>Log Out</span>
              </Dropdown>
            </DropDownContainer>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  letter-spacing: 2px;
  z-index: 3;
`;

const Logo = styled.a`
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  width: 80px;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  position: relative;
  margin-right: auto;
  margin-left: 1.5rem;
  height: max-content;
  gap: 1rem;

  a {
    display: flex;
    align-items: center;
    /* padding: 0 1rem; */
    gap: 0.3rem;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      cursor: pointer;
      color: rgb(249, 249, 249);
      font-size: 13px;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 914px) {
    display: none;
  }
`;

const Login = styled.a`
  cursor: pointer;
  background-color: rgb(0, 0, 0, 0.6);
  border: 1px solid #f9f9f9;
  padding: 10px 16px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1.5px;
  transition: all 150ms ease-in;

  &:hover {
    background-color: #f9f9f9;
    color: #090b13;
  }
`;

const UserImage = styled.img`
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #f9f9f9;
  }
`;

const DropDownContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  margin-top: 70px;
  z-index: -1;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  background-color: rgb(35 37 48);
  border-radius: 4px;
  box-shadow: 0 4px 20px rgb(0, 0, 0, 0.5);
  span {
    cursor: pointer;
    width: max-content;
    display: inline-block;
    font-size: 16px;
    color: rgb(249, 249, 249, 0.8);
    letter-spacing: 1px;
  }

  span:hover {
    color: white;
  }
`;

const SignOut = styled.div`
  position: relative;
  &:hover {
    .dropdowncontainer {
      opacity: 1;
      transition: all 150ms ease-in;
    }
  }
`;

export default Header;
