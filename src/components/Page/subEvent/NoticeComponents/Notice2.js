import React from "react";
import styled from "styled-components";
import Footer from "../../Footer";
import Imgsrc from "../../../../images/popupImage1.png"
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
  display: flex;
  align-items:center;
  justify-content: center;
  img{
    @media all and (min-width:768px) {
        width: 30rem;
    }

    width: 80vw;
  }
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
                    플로스팅 변경 사항 안내
                </Title>
                <Divider>
                    <hr></hr>
                </Divider>
                <Text>
                    <img src={Imgsrc}>

                    </img>
                </Text>
            </NavContainer>
            <Footer></Footer>
        </Container>
    );
}

export default Notice1;
