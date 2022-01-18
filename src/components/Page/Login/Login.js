import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LoginBar from './LoginBar'
import fire from '../Register/LoginFire'
import { Redirect } from 'react-router-dom';
import Logosrc from '../../../images/Logo_Pink.png'


const Wrapper = styled.div`
`;

const Forgotlinkbox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    width: 300px;
    list-style : none;
    li{
        font-size: 0.8rem;
    }
`
const Registerlinkbox = styled.div`
    margin : 1rem 0rem 0rem 0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 300px;
    list-style : none;
    font-family: 'Noto Sans KR', sans-serif;
    li{
        font-size: 1.0rem;
    }
    .li1{
        color : rgb(0,0,0,0.5);
    }
    .li2{
        font-weight: 500;
    }
`
const Container = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const FlostingImg = styled.div`
    img{
        width: 15rem;
    }
`
const FlostingTitle = styled.div`
    list-style : none;
    li{
        font-family: 'Ubuntu', sans-serif;
        font-size: 2rem;
    }
    position : relative;
    top : -2rem;
    padding: 5px;
    margin: 5px;
    margin-bottom: 2.0rem;
`;
const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${props => {
        if (props.register) return 'none';
        else if (props.login) return '1px solid #E0BCC1';
    }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${props => {
        if (props.register) return '#E0BCC1';
        else if (props.login) return '#FFFFFF';
    }};
  color: ${props => {
        if (props.register) return '#FFFFFF';
        else if (props.login) return '#828282';
    }};
  font-size: 15pt;
`;

const Login = () => {
    const noneactiveStyle = {
        color: '#000000',
        textDecoration: 'none'
    }

    const [currentPage, handlePageChange] = useState(false);
    const [user, setUser] = useState('');

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    if (user) {
        return (<Redirect to='/' />);
    }
    else {
        return (
            <Wrapper>
                <Container>
                    <FlostingImg>
                        <img src={Logosrc}></img>
                    </FlostingImg>
                    <FlostingTitle>
                        <li>Flosting</li>
                    </FlostingTitle>
                    {currentPage == false ? (
                        <Container>
                            <Button login onClick={() => handlePageChange(true)}>
                                로그인
                            </Button>
                            <NavLink to="/register">
                                <Button register>
                                    회원가입
                                </Button>
                            </NavLink>
                            <Forgotlinkbox>
                                <NavLink to="/forgot" style={noneactiveStyle}>
                                    <li>아이디/비밀번호 찾기</li>
                                </NavLink>
                            </Forgotlinkbox>
                        </Container>
                    ) : (
                        <div>
                            <LoginBar />
                            <Forgotlinkbox>
                                <NavLink to="/forgot" style={noneactiveStyle}>
                                    <li>아이디/비밀번호 찾기</li>
                                </NavLink>
                            </Forgotlinkbox>
                            <Registerlinkbox>
                                <li className="li1">플로스팅이 처음이신가요?&nbsp;</li>
                                <NavLink to="/register" style={noneactiveStyle}>
                                    <li className="li2">회원가입</li>
                                </NavLink>
                            </Registerlinkbox>
                        </div>
                    )
                    }
                </Container>
            </Wrapper>
        );
    }
}
export default Login;