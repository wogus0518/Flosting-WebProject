import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Certification from "./Register/Certification";
import "./Home.css";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import logoimg from "../../images/플로스팅 로고.png";
import HomeImg from "../../images/HomeImg.png";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import 참여방법Slider from "./HowToSubmitSlider.js";
import 매칭진행Slider from "./MatchingStageSlider.js";
import 데이지배경 from "../../images/daisy.png";
import 라일락배경 from "../../images/lilac.png";
import 클로버배경 from "../../images/clover.png";
import firebase from "./Register/LoginFire.js";
import AdfitWebComponent from "react-adfit-web-component";
import Adsense from "react-adsense";

const db = firebase.firestore();
const analytics = firebase.analytics();

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  left: 0;
  width: 100%;
  height: calc(100%-50px);
  align-items: center;
  background-color: white;
  position: relative;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ContentWrap = styled.div`
  width: 23rem;
`;
const RightAdBox = styled.div`
@media all and (min-width:768px) {
  position : fixed;
  display: flex;
  top : 100px;
  left : 5%;
  width: 160px;
  height: 600px;
  z-index : 10;
}
display : none;
`
const LeftAdBox = styled.div`
@media all and (min-width:768px) {
  position : fixed;
  display: flex;
  top : 100px;
  right : 5%;
  width: 160px;
  height: 600px;
  z-index : 10;
}
display : none;
`
const WhatIsFlostingWrap = styled.div`
  margin-top: 3rem;
  height: 20rem;
  .highlight {
    box-shadow: inset 0 -20px 0 #fbf38a;
    margin-top: 1rem;
    text-align: left;
    font-size: 1.8rem;
    font-weight: bold;
  }
  .로고배경 {
    width: 20rem;
    position: relative;
    right: -2rem;
    top: -13rem;
    opacity: 0.2;
  }
`;
const DaisyTingWrap = styled.div`
  background-color: rgb(238, 236, 142, 0.2);
  width: 20rem;
  height: 30rem;
  border: 2px solid rgb(238, 236, 142, 0.3);
  border-radius: 20px;
  margin-top: 3rem;
  .highlight {
    box-shadow: inset 0 -20px 0 #fbf38a;
    margin-top: 1rem;
    text-align: left;
    font-size: 1.8rem;
    font-weight: bold;
  }
  .배경이미지 {
    img {
      width: 20rem;
      position: relative;
      top: -13rem;
    }
  }
`;
const LilacTingWrap = styled.div`
background-color: rgb(255,180,224,0.2);
width: 20rem;
height: 30rem;
border: 2px solid rgb(255,180,224,0.3);
border-radius: 20px;
margin-top: 3rem;
    .highlight{
        box-shadow: inset 0 -20px 0 #FFB4E0;
        margin-top: 1rem;
        text-align: left;
        font-size: 1.8rem;
        font-weight: bold;
    }
    .배경이미지{
        img{
            width:20rem;
            position: relative;
            top:-13rem;
        }

`;
const CloverTingWrap = styled.div`
background-color: rgb(179,214,189,0.2);
width: 20rem;
height: 30rem;
border: 2px solid rgb(179,214,189,0.3);
border-radius: 20px;
margin-top: 3rem;
    .highlight{
        box-shadow: inset 0 -20px 0 #8DDDA4;
        margin-top: 1rem;
        text-align: left;
        font-size: 1.8rem;
        font-weight: bold;
    }
    .배경이미지{
        img{
            width:20rem;
            position: relative;
            top:-11.5rem;
        }

`;
const 참여방법Wrap = styled.div`
  width: 100%;
  .silderDiv {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middleText {
    text-align: center;
    font-weight: bolder;
    font-size: 1.1rem;
    margin-bottom: 5rem;
  }
  ul {
    margin-top: 1rem;
    margin-left: 2rem;
    margin-bottom: 1rem;
  }
  .text {
    border-top: 1px solid rgb(0, 0, 0, 0.1);
    margin-top: 3rem;
    padding-top: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 500;
  }
`;
const CurrentButton = styled.button`
  font-size: 2rem;
  background-color: rgb(255, 255, 255, 0.5);
  color: rgb(173, 115, 240, 0.8);
  border: 3px solid rgb(173, 115, 240, 0.8);
  font-family: "Do Hyeon", sans-serif;
  height: 4rem;
  width: 14rem;
  border-radius: 12px;
  padding: 5px;
  &:hover {
    background-color: rgb(173, 115, 240, 0.8);
    color: rgb(255, 255, 255, 0.8);
  }
`;
const ResultButton = styled.button`
  font-size: 2rem;
  background-color: rgb(255, 255, 255, 0.5);
  font-family: "Do Hyeon", sans-serif;
  color: rgb(217, 164, 67, 0.8);
  border: 3px solid rgb(217, 164, 67, 0.8);
  width: 14rem;
  height: 4rem;
  border-radius: 12px;
  padding: 5px;
  &:hover {
    background-color: rgb(217, 164, 67, 0.8);
    color: rgb(255, 255, 255, 0.8);
  }
`;
const TempWrap = styled.div`
  position : absolute;
  @media all and (min-width: 768px) {
    top : 3rem;
  }
  top : 1rem;
  left : 0px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .Slogun{
    font-family: 'Noto Sans KR', sans-serif;
    width: 100%;
    text-align: center;
    @media all and (min-width: 768px) {
      font-size : 1.2rem;
    }
    font-size : 0.8rem;
    font-weight: 700;
  }
  .Slogun2{
    font-family: 'Ubuntu', sans-serif;
    width: 100%;
    text-align: center;
    @media all and (min-width: 768px) {
      font-size : 3.5rem;
    }
    font-size : 3.0rem;
    font-weight: 700;
  }
`

const Home = (props) => {
  let user = props.User;
  let [버튼타이머, 버튼타이머변경] = useState(false);
  let [매칭결과조회여부, 매칭결과조회여부변경] = useState(false);
  let [지난회차, 지난회차변경] = useState();
  let [진행중회차, 진행중회차변경] = useState();
  let [Ongoing, setOngoing] = useState();

  const getVariableInfo = async () => {
    const snapShot = await db
      .collection("매칭결과변수")
      .doc("variableInfo")
      .get();
    try {
      지난회차변경(snapShot.data()["진행중회차"] - 1);
      진행중회차변경(snapShot.data()["진행중회차"]);
    } catch (err) {
      console.log(err);
    }
  };
  const getUserOngoing = async () => {
    const getDocIdFromMemberInfo = await db
      .collection("회원정보")
      .where("ID", "==", props.User.email.split("@")[0])
      .get();
    getDocIdFromMemberInfo.forEach((doc) => {
      setOngoing(doc.data()["Ongoing"]);
    });
  };
  useEffect(() => {
    if (user) {
      getVariableInfo();
      getUserOngoing();
      if (Number(Ongoing) === 0) {
        매칭결과조회여부변경(false);
      } else if (Number(Ongoing) === 진행중회차) {
        매칭결과조회여부변경(true);
      } else if (Number(Ongoing) === 지난회차) {
        매칭결과조회여부변경(true);
      }
    }
    setTimeout(function () {
      버튼타이머변경(true);
    }, 4000);
  });

  return (
    <Container>
      <TempWrap>
        <h1 className="Slogun">
          대학생이라면 누구나,
        </h1>
        <h1 className="Slogun2">
          Flosting
        </h1>
      </TempWrap>
      <RightAdBox>
        <Adsense.Google
          client='ca-pub-3344134203628892'
          slot='6654887852'
          style={{
            display: 'inline-block',
            width: 160,
            height: 600
          }}
          format=''
        />
      </RightAdBox>
      <LeftAdBox>
        <Adsense.Google
          client='ca-pub-3344134203628892'
          slot='6654887852'
          style={{
            display: 'inline-block',
            width: 160,
            height: 600
          }}
          format=''
        />
      </LeftAdBox>
      <Jumbotron
        CurrentButton={CurrentButton}
        버튼타이머={버튼타이머}
        매칭결과조회여부={매칭결과조회여부}
      />
      <Center>
        <ContentWrap>
          <WhatIsFlosting WhatIsFlostingWrap={WhatIsFlostingWrap} />
          <div className="parent">
            <LilacTing LilacTingWrap={LilacTingWrap} />
            <DaisyTing DaisyTingWrap={DaisyTingWrap} />
            <CloverTing CloverTingWrap={CloverTingWrap} />
          </div>
          <참여방법 참여방법Wrap={참여방법Wrap}></참여방법>
          <매칭방법 참여방법Wrap={참여방법Wrap} />
          <추후업데이트 참여방법Wrap={참여방법Wrap}></추후업데이트>
          <AdfitWebComponent adUnit="DAN-Vs8rNxQiL53hwAhs" />
        </ContentWrap>
      </Center>
      <Footer></Footer>
    </Container>
  );
};
export default Home;

function Jumbotron({ CurrentButton, 버튼타이머, 매칭결과조회여부 }) {
  // const mp4link =
  //   "https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/mainflosting(high).mp4?alt=media";
  return (
    <div className="jb_wrap">
      <div className="video_wrap">
        <img
          // src="https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/startmain.png?alt=media"
          src={HomeImg}
          alt
          aria-hidden="true"
          className="start_img"
        ></img>
        {/* <video muted autoPlay playsInline className="videoview">
          <source
            poster="https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/startmain.png?alt=media"
            src={mp4link}
            type="video/mp4"
          ></source>
        </video> */}
      </div>
      {매칭결과조회여부 === true ? (
        <div className="result_link">
          <NavLink to="/selectresult">
            <Fade bottom>
              <ResultButton>매칭결과보기</ResultButton>
            </Fade>
          </NavLink>
        </div>
      ) : null}

      <div className="jb_link">
        <NavLink to="/currentevent">
          <Fade bottom>
            <CurrentButton>시작하기</CurrentButton>
          </Fade>
        </NavLink>
      </div>
    </div>
  );
}

function WhatIsFlosting({ WhatIsFlostingWrap }) {
  return (
    <WhatIsFlostingWrap>
      <Fade bottom>
        <div className="daisy">
          <div>
            <span className="mainTitleHighlight">Flosting이란?</span>
          </div>
          <div className="intro_sh">
            Flos<span>라틴어로 '꽃'</span> + Meeting
          </div>
          <div className="aboutName">
            Flos는 라틴어로 '꽃'을 의미합니다.
            <br />
            '꽃'을 주요 테마로 하여 여러 꽃의 <br />
            꽃말을 적용한 저희 만의 이벤트 이름입니다
          </div>
        </div>
        <div>
          <img src={logoimg} className="로고배경" />
        </div>
      </Fade>
    </WhatIsFlostingWrap>
  );
}
function DaisyTing({ DaisyTingWrap }) {
  return (
    <DaisyTingWrap>
      <Fade bottom>
        <div className="내용">
          <span className="highlight">'이성친구'를</span>
          <br />
          원하시나요?
        </div>
        <div className="daisy">
          데이지의 꽃말은 '우정'입니다.
          <br />
          데이지팅을 통해서
          <br />
          새로운 친구와 선후배
          <br />
          같은 학교 뿐만 아니라 인근 학교까지!!
          <br />
        </div>
        <div className="배경이미지">
          <img src={데이지배경} />
        </div>
      </Fade>
    </DaisyTingWrap>
  );
}
function CloverTing({ CloverTingWrap }) {
  return (
    <CloverTingWrap>
      <Fade bottom>
        <div className="내용">
          <span className="highlight">'동성친구'를</span>
          <br />
          원하시나요?
        </div>
        <div className="daisy">
          클로버의 꽃말은 '행운, 약속'입니다.
          <br />
          클로버팅을 통해서
          <br />
          우정을 약속할 동성 친구를 만들어 보세요!!
          <br />
        </div>
        <div className="배경이미지">
          <img src={클로버배경} />
        </div>
      </Fade>
    </CloverTingWrap>
  );
}

function LilacTing({ LilacTingWrap }) {
  return (
    <LilacTingWrap>
      <Fade bottom>
        <div className="내용">
          <span className="highlight">'연인'을</span>
          <br />
          원하시나요?
        </div>
        <div className="daisy">
          라일락의 꽃말은 <br />
          '새로운 사랑의 싹이 트다'입니다.
          <br />
          라일락팅을 통해서
          <br />
          운명의 상대를 만나보세요!!
          <br />
        </div>
        <div className="배경이미지">
          <img src={라일락배경} />
        </div>
      </Fade>
    </LilacTingWrap>
  );
}

function 참여방법({ 참여방법Wrap }) {
  return (
    <Fade bottom>
      <참여방법Wrap>
        <div className="목차제목">
          <span className="highlight">참여방법</span>
        </div>
        <div className="silderDiv">
          <참여방법Slider />
        </div>
      </참여방법Wrap>
    </Fade>
  );
}
function 매칭방법({ 참여방법Wrap }) {
  return (
    <참여방법Wrap>
      <Fade bottom>
        <div className="잠깐">
          <span className="잠깐highlight">잠깐!</span>
        </div>
      </Fade>
      <Fade bottom>
        <div className="middleText">
          매칭은 되었지만 상대방에서 <br />
          아무런 반응이 없다구요?
          <br />
          또는 사정이 생겨 매칭 거절 <br />
          의사를 표하고 싶으시다구요?
          <br />
          <br />
          플로스팅에서는 매칭이 이루어지면 특별한
          <br />
          화면으로 매칭 진행 상황을 보실 수 있습니다.
        </div>
      </Fade>
      <Fade bottom>
        <div className="목차제목">
          <span className="highlight">매칭 단계 진행 방법</span>
        </div>
        <div className="silderDiv">
          <매칭진행Slider />
        </div>
      </Fade>
    </참여방법Wrap>
  );
}
function 추후업데이트({ 참여방법Wrap }) {
  return (
    <참여방법Wrap>
      <Fade bottom>
        <div className="목차제목">
          <span className="highlight">추후 업데이트 예정</span>
        </div>
        <ul className="updateList">
          <li>⚪️ 매너온도에 따른 티어별 매칭</li>
          <li>⚪️ MBTI 조건에 따른 매칭</li>
          <li>⚪️ 매칭 성공에 따른 이벤트 진행 예정</li>
          <li>⚪️ 거짓 정보를 이용한 사용자 신고접수 기능 추가</li>
        </ul>
        <div className="text">
          대학생들만의 풋풋하고 설레임 가득한 플로스팅은
          <br />
          대학생이라면 누구나 다같이 참여가 가능하기에 <br />
          여러분의 많은 의견과 피드백에 대해 환영하고 있습니다. <br />
          여러 무료 서비스와 다양한 이벤트를 <br />
          함께 진행하고 있는 만큼 많은 참여 부탁드립니다.
        </div>
      </Fade>
    </참여방법Wrap>
  );
}
