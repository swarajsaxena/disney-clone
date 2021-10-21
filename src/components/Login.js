import styled from "styled-components";
import { useEffect } from "react";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

import {
  selectUserName,
  selectUserPhoto,
  selectUserEmail,
} from "../features/user/userSlice";

const Login = (props) => {
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
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt="cta-logo-one" />
          <SignUp onClick={handleAuth}>GET IT ALL THERE</SignUp>
          <Description>
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.
          </Description>
          <CTALogoTwo src="/images/cta-logo-two.png" alt="cta-logo-two" />
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
  height: 100%;
  width: 100%;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("/images/login-background.jpg");
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
`;

const CTA = styled.div`
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.2s ease-out;
  width: 100%;
`;

const CTALogoOne = styled.img`
  min-height: 1px;
  display: block;
  width: 100%;
`;

const SignUp = styled.button`
  cursor: pointer;
  font-weight: 500;
  color: #f9f9f9;
  background-color: #0063e5;
  border: none;
  outline: none;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 1.5rem 0;
  border: 1px solid transparent;
  border-radius: 4px;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  letter-spacing: 1.5px;
  color: hsla(0, 0%, 95.3%, 1);
  line-height: 1.5;
`;

const CTALogoTwo = styled.img`
  max-width: 600px;
  width: 100%;
  display: inline-block;
  vertical-align: bottom;
`;

export default Login;
