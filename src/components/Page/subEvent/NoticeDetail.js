import React from "react";
import styled from "styled-components";
import Footer from "../Footer";

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

function NoticeDetail(props) {
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
          안녕하세요. 플로스팅입니다.<br />
          <br />
          앞선 상반기 동안 진행해 왔던 기존의 플로스팅을 이용해 주신 여러분께 진심으로 감사의 말씀을 드립니다.<br />
          여러 회차를 거듭하며 많은 이용자 여러분의 피드백을 통해 더 나은 서비스로 보답하고자 홈페이지를 보완하여 새롭게 돌아왔습니다.
          <br />
          <br />
          현재, 돌아온 플로스팅 또한 앞으로의 활동을 통해 더 나은 시스템으로 도약하여 여러분과 함께 할 예정이오니, <br />
          불편사항이나 오류 등이 있다면 카카오톡 채널을 통해 문의해 주시면 적극 개선하도록 하겠습니다.
          <br />
          <br />
          감사합니다.
        </Text>
      </NavContainer>
      <Footer></Footer>
    </Container>
  );
}

export default NoticeDetail;
