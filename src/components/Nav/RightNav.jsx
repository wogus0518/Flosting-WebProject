import React, { Component, useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { NavLink } from 'react-router-dom';
import Flostinglogo from '../../images/Flosting_Logo.png'
import fire from '../Page/Register/LoginFire';


//카테고리별
const ContentDiv = styled.div`
  display: flex;
  border-bottom : 1px solid rgb(0,0,0, 0.05);
  border-left : 1px solid rgb(0,0,0, 0.0.5);;
`;
//Content오른쪽
const RightContentDiv = styled.div`
  flex-grow : 1;
`;

//빈 공간 만들기
const BlankDiv = styled.div`
  height : 50vh;
`
//한줄
const RowDiv = styled.div` 
  display: flex;
  justify-content : space-between;
  flex-direction : row;
  flex-grow : 1;
  .newlist{
    font-weight: 700;
  }
  .newcommend{
    position: relative;
    left: 3rem;
    font-size: 0.5rem;
    font-weight: 700;
  }
`;
const RowParrent = styled.div`
  color: rgb(0,0,0, 0.7);
  background : #F5E9E9;
  display: flex;
  justify-content : center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  width: 75px;
  img{
    width: 50px;
    height: 50px;
  }
`
const Ul = styled.ul`
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li{
    padding: 15px 10px;
  }

    flex-flow: column nowrap;
    background: white;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    opacity: ${({ open }) => open ? '1.0' : '0.8'};
    top: 0;
    right: 0;
    max-height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    a {
      flex-grow : 3;
    }
    li {
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: 400;
      text-align: right;
      font-size: 1rem;
    }
`;




const RightNav = (props) => {

  const user = props.User;
  const db = fire.firestore();
  const [isManager, setisManager] = useState(false);

  useEffect(() => {
    if (user) {
      let s_id = user.email.split('@');
      let Infodb = db.collection('Admin');
      let query = Infodb.where("ID", "==", s_id[0]).get().then((querySnapshot) => {
        if (querySnapshot.size) {
          setisManager(true);
        }
        else {
          setisManager(false);
        }
      });
    } else {
      setisManager(false);
    }
  }, [user]);

  const activeStyle = {
    color: '#2B2A28',
    background: '#F2F2F2'
  };

  const noneactiveStyle = {
    textDecoration: 'none',
    color: '#2B2A28'
  }
  return (
    <Ul open={props.open}>
      {/* 위에 테두리 */}
      <ContentDiv>
      </ContentDiv>
      <ContentDiv>
        <RowDiv>
          <NavLink exact={true} to="/" activeStyle={activeStyle} style={noneactiveStyle}>
            <li onClick={() => props.setOpen(!props.open)}>
              홈
            </li>
          </NavLink>
        </RowDiv>
      </ContentDiv>
      <ContentDiv>
        <RowDiv>
          <RowParrent>
            <img src={Flostinglogo}></img>
          </RowParrent>
          <RightContentDiv>
            {isManager ? (
              <RowDiv>
                <NavLink to="/admin" activeStyle={activeStyle} style={noneactiveStyle}>
                  <li onClick={() => props.setOpen(!props.open)}>
                    관리자페이지
                  </li>
                </NavLink>
              </RowDiv>
            ) : ""}
            <RowDiv>
              <NavLink to="/my" activeStyle={activeStyle} style={noneactiveStyle}>
                <li onClick={() => props.setOpen(!props.open)}>
                  마이페이지
                </li>
              </NavLink>
            </RowDiv>
            <RowDiv>
              <NavLink to="/currentevent" activeStyle={activeStyle} style={noneactiveStyle}>
                <li onClick={() => props.setOpen(!props.open)}>
                  플로스팅 신청하기
                </li>
              </NavLink>
            </RowDiv>
            <RowDiv>
              <li className="newcommend">
                New!!
              </li>
              <NavLink to="/statistics/MBTI" activeStyle={activeStyle} style={noneactiveStyle}>
                <li className="newlist" onClick={() => props.setOpen(!props.open)}>
                  플로스팅 통계
                </li>
              </NavLink>
            </RowDiv>
          </RightContentDiv>
        </RowDiv>
      </ContentDiv>
      <ContentDiv>
        <RowParrent>
          <img src={Flostinglogo}></img>
        </RowParrent>
        <RightContentDiv>
          <RowDiv>
            <NavLink to="/about" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                플로스팅 소개
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/history" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                역대 진행
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/plan" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                일정 안내
              </li>
            </NavLink>
          </RowDiv>
        </RightContentDiv>
      </ContentDiv>
      <ContentDiv>
        <RowParrent>
          <img src={Flostinglogo}></img>
        </RowParrent>
        <RightContentDiv>
          <RowDiv>
            <NavLink to="/subevent" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                이벤트 및 공지사항
              </li>
            </NavLink>
          </RowDiv>
        </RightContentDiv>
      </ContentDiv>
      <ContentDiv>
        <RowParrent>
          <img src={Flostinglogo}></img>
        </RowParrent>
        <RightContentDiv>
          <RowDiv>
            <NavLink to="/qna" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                질의응답
              </li>
            </NavLink>
          </RowDiv>
          <RowDiv>
            <NavLink to="/report" activeStyle={activeStyle} style={noneactiveStyle}>
              <li onClick={() => props.setOpen(!props.open)}>
                고객 센터
              </li>
            </NavLink>
          </RowDiv>
        </RightContentDiv>
        <BlankDiv>

        </BlankDiv>
      </ContentDiv>
    </Ul>
  )
}

export default RightNav