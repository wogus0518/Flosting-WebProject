import React from "react";
import styled from "styled-components";
import 달력 from "../../images/플로스팅 로고.png";
import Footer from "./Footer";
import Fade from "react-reveal/Fade";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  .title {
    margin-top: 15px;
    font-size: 2rem;
    font-weight: bolder;
  }
  .subtitle {
    font-weight: bold;
    margin-top: 10px;
  }
  img {
    width: 15rem;
  }
  .scheduleBox {
    display: flex;
    .scheduleLeft {
      flex: 1;
      height: 6rem;
    }
    .scheduleRight {
      flex: 1;
      height: 5rem;
    }
    .scheduleTitle {
      font-size: 2rem;
      font-weight: bold;
    }
    .inner {
      font-size: 1rem;
      margin-top: 5px;
      margin: 0 auto;
      width: 150px;
      background-color: #f8ecf4;
    }
  }
  .안내사항_제목 {
    font-weight: bold;
    color: red;
  }
  .안내사항_내용 {
    font-size: 0.8rem;
    text-align: left;
    margin-left: 1rem;
  }
  .highlight {
    box-shadow: inset 0 -20px 0 #fbf38a;
  }
  .submitBtn {
    width: 80%;
    height: 3rem;
    background-color: ;
  }
`;

function 건대() {
  return (
    <div>
      <Container>
        <div className="title">플로스팅 일정안내</div>
        <div className="subtitle">건국대학교 & 세종대학교</div>
        <img src={달력} />
        <Link to="/submit">
          <button className="submitBtn">신청하기</button>
        </Link>

        <Fade bottom>
          <div className="scheduleBox">
            <div className="scheduleLeft">
              <div className="scheduleTitle">신청기간</div>
              <div className="inner">07.07(수)~07.09(금)</div>
            </div>
            <div className="scheduleRight">
              <div className="scheduleTitle">결과발송</div>
              <div className="inner">07.07(수)~07.09(금)</div>
            </div>
          </div>
          <div className="안내사항">
            <div className="안내사항_제목">
              <span className="highlight">※당부 메세지※</span>
            </div>
            <div className="안내사항_내용">
              신청기간을 엄수해 주시기 바랍니다.
              <br />
              모든 매칭 결과는 '문자 메세지'로 발송됩니다.
              <br />
              결과메세지를 못 받으신 분들은 아래 두 가지 확인부탁드립니다.
              <br />
              - 통신사 스팸 필터링 서비스 가입
              <br />
              - 아이폰의 경우 데이터가 켜져있는지
              <br />
              <br />
              결과발송일이 지났음에도 결과를 수신하지 못하신 분들은
              <br />
              카카오채널로 문의 주시면 결과 안내 도와드리겠습니다.
              <br />
            </div>
          </div>
        </Fade>
      </Container>
      <Footer></Footer>
    </div>
  );
}
export default 건대;
