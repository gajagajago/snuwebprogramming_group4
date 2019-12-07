import React from 'react';
import './css/Home.css';
import {
  Fade,
  Button,
} from 'reactstrap';
import {
  Link,
} from 'react-router-dom';
import * as firebase from 'firebase';
import firebaseConfig from '../firebase.config';
firebase.initializeApp(firebaseConfig);

const Home = (props) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      props.setUser(user);
    } else {
      props.setUser();
    }
  })
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  const logout = async () => {
    firebase.auth().signOut();
  }
  return (
    <div id="home" className="d-flex flex-column justify-content-center align-items-center">
      <Fade in={true}>
        <h1>
          저세상 캘린더
        </h1>
      </Fade>
      {
        !props.user &&
        <Button outline color="dark" className="mr-1" onClick={googleLogin}>
          <div className="d-flex align-items-center">
            <img src="/google_logo.png" alt="google_logo" id="google-logo" className="mr-2"/>구글 아이디로 로그인
          </div>
        </Button>
      }
      {
        props.user &&
        <span className="mb-2">{props.user.displayName}님 안녕하세요</span>
      }
      {
        props.user &&
        <div className="d-flex">
          <Link to="/main"><Button color="blue" className="mr-2">내 캘린더로</Button></Link>
          <Button color="dark" onClick={logout}>로그아웃</Button>
        </div>
      }
    </div>
  )
};

export default Home;