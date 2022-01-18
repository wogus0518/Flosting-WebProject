import React from "react";
import styled from "styled-components";
import Footer from "../../Footer";

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
  overflow: scroll;
  align-items: center;
  background-color: white;
`;

const Text = styled.p`
  margin: 1rem;
  font-size: 13px;
  opacity: 0.7;
`;

const NavContainer = styled.div`
  border: solid 2px #f4f4f4;
  border-radius: 10px;
  margin: 0.5rem;
`;

function Notice1(props) {
  return (
    <Container>
      <NavContainer>
        <Title>
          홈페이지 개편에 따른 <br /> 베타 서비스 오픈
        </Title>
        <Divider>
          <hr></hr>
        </Divider>
        <Text>
          안녕하세요. <br />
          <br /> 플로스팅입니다. <br />
          <br />
          지난 5회차 동안 저희 플로스팅을 이용해주셔서 진심으로 감사드립니다.
          앞서 지난 회차동안 많은 이용자들의 피드백을 더 나은 서비스로
          보답하고자 홈페이지를 보완하여 새롭게 돌아왔습니다.
          <br />
          <br />
          현재 서비스는 아직 개발중에 있으며 불편사항이나 오류 등은 카카오톡
          채널을 통해서 문의 드리면 적극 개선하도록 하겠습니다.
          <br />
          <br />
          감사합니다.
        </Text>
      </NavContainer>
      <Footer></Footer>
    </Container>
  );
}

export default Notice1;
