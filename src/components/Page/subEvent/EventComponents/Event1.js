import React from "react";
import styled from "styled-components";
import OpenEventMain from "../../../../images/OpenEventMain.png";
import Footer from "../../Footer";
import { NavLink } from "react-router-dom";

const Title = styled.h1`
  fontfamily: "Noto Sans KR", sans-serif;
  font-size: x-large;
  color: #e0bcc1;
  text-align: center;
  margin: 1rem;
`;

const Divider = styled.div`
  margin: 1rem;
  opacity: 0.8;
`;

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  left: 0;
  width: 100%;
  height: 40rem;
  align-items: center;
  background-color: white;
`;

const Text = styled.p`
  margin: 1rem;
  font-size: 13px;
  opacity: 0.7;
  text-align: center;
`;

const NavContainer = styled.div`
  border: solid 2px #f4f4f4;
  border-radius: 10px;
  margin: 0.5rem;
  img {
    @media all and (min-width:768px) {
      width: 30rem;
  }

    width: 80vw;
    margin: 1rem auto;
    display: block;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Button = styled.button`
    @media all and (min-width:768px) {
      width: 30rem;
    }
    width: 80vw;
    
  margin: 1rem auto;
  text-align: center;
  justify-content: center;
  height: 5rem;
  border-radius: 5px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  background-color: #e0bcc1;
  color: #ffffff;
  font-size: 2rem;
  display: block;
  border: none;
`;

function Event1(props) {
  return (
    <Container>
      <Title>오픈 기념 이벤트</Title>
      <NavContainer>
        <img src={OpenEventMain}></img>
        <NavLink to="/currentevent">
          <Button>신청하기!!</Button>
        </NavLink>
      </NavContainer>

      <Footer></Footer>
    </Container>
  );
}

export default Event1;
