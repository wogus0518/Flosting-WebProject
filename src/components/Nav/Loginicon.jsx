import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GiSpotedFlower } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import fire from '../Page/Register/LoginFire'

const Logicon = styled.div`
  display: flex;  
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: 10px;
  right: 63px;
`;


const Menutitle = styled.div`
  list-style: none;
  li{
    font-size: 0.5rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 1rem;
  position: fixed;
  top: 33px;
  right: 55px;
  font-family: 'Nanum Gothic', sans-serif;

`;

const Loginicon = (props) => {

  const user = props.User
  const handleLogout = () => {
    fire.auth().signOut();
  }

  const activeStyle = {
    color: '#000000'
  };
  const noneactiveStyle = {
    color: '#000000'
  }

  if (user) {
    return (
      <div onClick = {handleLogout}>
        <NavLink activeStyle={activeStyle} style={noneactiveStyle} to="/">
        <Logicon>
            <GiSpotedFlower size="1.5em" />
        </Logicon>
        </NavLink>
        <Menutitle>
        <li>로그아웃</li>
        </Menutitle>

      </div>
    );
  } else {
    return (
      <>
        <Logicon>
          <NavLink activeStyle={activeStyle} style={noneactiveStyle} to="/login">
            <GiSpotedFlower size="1.5em" />
          </NavLink>
        </Logicon>
        <Menutitle>
          <li>로그인</li>
        </Menutitle>

      </>
    );
  }
}

export default Loginicon