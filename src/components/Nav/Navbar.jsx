import '../../App.css'
import React from 'react';
import styled from 'styled-components';
import Navicon from './Navicon';
import Loginicon from './Loginicon';
import { NavLink } from 'react-router-dom'

const Nav = styled.nav`
  position: fixed;
  z-index: 20;
  top: 0px;
  left: 0px;
  background-color: white;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  .logo {
    a{
      font-family: 'Ubuntu', sans-serif;
      font-size : 1.2rem;
    }
    border: 1.5px solid;
    padding: 5px;
    margin: 5px;
  }
`

const Navbar = (props) => {

  const user = props.User;
  const activeStyle = {
    color: '#000000'
  };
  const noneactiveStyle = {
    textDecoration: 'none',
    color: '#000000'
  }

  return (
    <Nav>
      <div className="logo">
        <NavLink exact={true} activeStyle={activeStyle} style={noneactiveStyle} to="/">
          Flosting
        </NavLink>
      </div>
      <Navicon User={user} />
      <Loginicon User={user} />
    </Nav>
  )
}

export default Navbar