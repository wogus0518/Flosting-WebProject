import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { NavLink, Redirect } from 'react-router-dom';
import fire from './LoginFire'
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
const Item = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  position: relative;
  margin: 0rem 1rem;
  .labelName {
    font-family: "Do Hyeon", sans-serif;
    width: 4rem;
  }
`;
const FlexrowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const RadioButtonLabel = styled.label`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      margin: 0.5rem;
      background: #eeeeee;
    }
  }
  ${(props) =>
        props.checked &&
        ` 
    &:checked + ${RadioButtonLabel} {
      background: #E0BCC1;
      border: 1px solid #E0BCC1;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        margin: 0.5rem;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
`;


const ProfileSelect = (props) => {
    const classes = useStyles();
    const { auth_regis, controlWhere, setcontrolWhere } = props

    const [goNext, setgoNext] = useState(true);
    const handleSelectChange = (event) => {
        const value = event.target.value;
        setcontrolWhere(value);
        setgoNext(false);
    };

    if (!auth_regis) { return (<Redirect to='/register' />); }
    else {
        return (
            <ThemeProvider theme={Colortheme}>
                <Wrapper>
                    <Container>
                        <h1>
                            가입경로
                        </h1>
                        <School_title>
                            <li>어느 경로로 통해 들어오셨나요?</li>
                        </School_title>
                        <Item>
                            <RadioButton
                                id="radio"
                                type="radio"
                                value="insta"
                                checked={controlWhere === "insta" ? true : false}
                                onChange={(event) => handleSelectChange(event)}
                            />
                            <RadioButtonLabel />
                            <div className="labelName">인스타그램</div>
                        </Item>
                        <Item>
                            <RadioButton
                                id="radio"
                                type="radio"
                                value="facebook"
                                checked={controlWhere === "facebook" ? true : false}
                                onChange={(event) => handleSelectChange(event)}
                            />
                            <RadioButtonLabel />
                            <div className="labelName">FaceBook</div>
                        </Item>
                        <Item>
                            <RadioButton
                                id="radio"
                                type="radio"
                                value="friend"
                                checked={controlWhere === "friend" ? true : false}
                                onChange={(event) => handleSelectChange(event)}
                            />
                            <RadioButtonLabel />
                            <div className="labelName">친구추천</div>
                        </Item>
                        <Item>
                            <RadioButton
                                id="radio"
                                type="radio"
                                value="gitar"
                                checked={controlWhere === "gitar" ? true : false}
                                onChange={(event) => handleSelectChange(event)}
                            />
                            <RadioButtonLabel />
                            <div className="labelName">기타</div>
                        </Item>

                        <NavLink to="/register/last">
                            <NextButton disabled={goNext}>
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
