import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { NavLink, Redirect } from 'react-router-dom';
import fire from './LoginFire'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MbtiBox from './Mbtibox';

const db = fire.firestore();
const storage = fire.storage();
const storageRef = storage.ref();

const inputStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const useStyles = makeStyles((theme) => ({
    largeavatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        border: "1px solid rgb(0,0,0,0.2)",
    },
}));

const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 10,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Wrapper = styled.div`
`;

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

const CameraBox = styled.div`
label{
  display: flex;
  flex-direction : row;
  justify-content : center;
  align-items : center;
  margin : 0px 5px;
  border-radius : 10px;
  padding: 3px;
  border : 1px solid rgb(0,0,0, 0.1);
  list-style: none;
  background-color: rgb(0,0,0, 0.2);
  li{
    font-family: 'Do Hyeon', sans-serif;
    font-size: 0.8rem;
  }
}
`

const NextButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 0rem 0rem 2rem 0rem;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: #E0BCC1;
  color: #FFFFFF;
  opacity: ${props => {
        if (props.disabled) return '0.5';
        else return '1.0';
    }};
  cursor: ${props => {
        if (props.disabled) return 'default';
        else return 'pointer'
    }};
`;

const School_title = styled.div`
  list-style : none;
  margin: 2rem 0rem 1rem 0rem;
  li{
    font-size: 0.7rem;
    color: '#828282';
  }
`;
const AvatarBox = styled.div`
    border-top : 1px solid rgb(0,0,0, 0.1);
    border-bottom : 1px solid rgb(0,0,0, 0.1);
    padding : 1rem 0rem;
    margin : 1rem 0rem;
    display: flex;
    flex-direction : column;
    list-style : none;
    justify-content: center;
    align-items : center;
    li{
        margin-top: 10px;
        text-align : center;
        font-family: 'Noto Sans KR', sans-serif;
        font-size : 0.7rem;
    }

`
const ProfileChangeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 2.5rem;
  margin-bottom : 10px;
  border-bottom: 1px solid rgb(0,0,0, 0.1);
`


const ProfileSelect = (props) => {
    const classes = useStyles();
    const { auth_regis, U_MBTI, setU_MBTI } = props

    const noneactiveStyle = {
        textDecoration: 'none'
    }



    if (!auth_regis) { return (<Redirect to='/register' />); }
    else {
        return (
            <ThemeProvider theme={Colortheme}>
                <Wrapper>
                    <Container>
                        <h1>
                            MBTI 선택
                        </h1>
                        <School_title>
                            <li>MBTI는 사람의 성격을 16가지로 분류해서 나타내는 검사입니다.</li>
                            <li>성격에 따른 MBTI테스트를 진행후 값을 입력해주세요!</li>
                            <li>나중에 변경가능해요!</li>
                        </School_title>
                        <MbtiBox U_MBTI={U_MBTI} setU_MBTI={setU_MBTI}>

                        </MbtiBox>
                        <NavLink to="/register/where">
                            <NextButton >
                                다음
                            </NextButton>
                        </NavLink>
                    </Container>
                </Wrapper>
            </ThemeProvider>
        );
    }
}

export default ProfileSelect;
