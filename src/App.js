import "./App.css";
import React, { Component, useState, useEffect } from "react";
import {
  isBrowser,
  isMobile,
  BrowserView,
  MobileView,
} from "react-device-detect"; //모바일 및 브라우저 따로 위함.
import styled from "styled-components";
import Navbar from "./components/Nav/Navbar";
import Transition from "./components/Transitionpage";
import ScrollToTop from "./components/ScrollToTop";
import fire from "./components/Page/Register/LoginFire";
import { render } from "@testing-library/react";
import { red } from "@material-ui/core/colors";
import ReactGa from "react-ga";

const TransferMobile = styled.div`
  .inner {
    width: 40rem;
    margin: 0 auto;
  }
  .warning {
    font-size: 2rem;
    text-align: center;
    background-color: red;
  }
`;

function App() {
  const [User, setUser] = useState("");

  useEffect(() => {
    authListener();
  }, []);

  useEffect(() => {
    ReactGa.initialize("G-4E949M0T9R");
    ReactGa.set({ page: window.location.pathname });
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // store the user on local storage
        localStorage.setItem("user", true);
        setUser(user);
      } else {
        // removes the user from local storage on logOut
        setUser("");
        localStorage.removeItem("user");
      }
    });
  };

  return (
    <div>
      <ScrollToTop></ScrollToTop>
      <BrowserView>
        <Navbar User={User} />
        <Transition User={User} />
        {/* <TransferMobile>
            <div className='inner'>
              <div className='warning'>본 홈페이지는 모바일에 최적화 되어 있습니다.</div>
              <Navbar User = {User}/>
              <Transition User = {User}/>
            </div>
          </TransferMobile> */}
      </BrowserView>
      <MobileView>
        <Navbar User={User} />
        <Transition User={User} />
      </MobileView>
    </div>
  );
}

export default App;
