import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import img from "../../images/2ndCalendar.png";

const Container = styled.div``;
const 제목 = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  font-weight: bolder;
`;
const 달력 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    @media all and (min-width: 768px) {
      width: 40rem;
    }
    width: 100vw;
  }
  margin-top: 2rem;
`;

function Plan() {
  return (
    <Container>
      <Title 제목={제목} />
      <Fade up>
        <Calendar 달력={달력} />
      </Fade>
    </Container>
  );
}
export default Plan;

function Title({ 제목 }) {
  return <제목>플로스팅 일정 안내</제목>;
}

function Calendar({ 달력 }) {
  return (
    <달력>
      <img src={img} />
    </달력>
  );
}
