import React from 'react';
import './css/Home.css';
import {
  Fade,
  Button,
} from 'reactstrap';
import {
  Link,
} from 'react-router-dom';
import firebase from '../firebase';
import firestoreHandler from '../firestoreHandler';
import PropTypes from 'prop-types';

const Home = (props) => {
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  const logout = async () => {
    firebase.auth().signOut();
  };
  const checkUser = async () => {
    firestoreHandler.checkUser(
        props.user.uid,
        props.user.email,
        props.user.displayName
    );
  };
  return (
    <div id="home" className="d-flex flex-column
      justify-content-center align-items-end px-5">
      <div className="d-flex flex-column align-items-center
        text-light mr-5 mb-5 h4">
        <Fade in={true}>
        </Fade>
        {
          !props.user &&
          <Button outline color="light" className="mr-1" onClick={googleLogin}>
            <div className="d-flex align-items-center">
              <img src="/google_logo.png"
                alt="google_logo"
                id="google-logo" className="mr-2"
              />
              구글 아이디로 로그인
            </div>
          </Button>
        }
        {
          props.user &&
          <span className="mb-3">{props.user.displayName}님 안녕하세요</span>
        }
        {
          props.user &&
          <div className="d-flex">
            <Link to="/mycalendar">
              <Button color="blueGrey" className="mr-2" onClick={checkUser}>
                메인으로
              </Button>
            </Link>
            <Button color="dark" onClick={logout}>로그아웃</Button>
          </div>
        }
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
};

export default Home;
