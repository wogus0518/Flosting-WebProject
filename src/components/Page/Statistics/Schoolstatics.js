import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import firebase from '../Register/LoginFire.js'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import 폭죽 from "../../../images/폭죽.png";
import { DoubleArrow } from "@material-ui/icons";

const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 13,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const Bestfriendbox = styled.div`
    margin-top: 1rem;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction : column;
    img{
        height: 10rem;
    }
    .ImBF{
        position:relative;
        bottom: 9rem;
        font-size: 2rem;
        font-weight: 700;
    }

`
const MainContent = styled.div`
    display: flex;
    width: 20rem;
    flex-direction : column;
    list-style: none;
    .SubBar{
        margin : 1rem 0rem;
        padding-bottom : 1rem;
        display: flex;
        width: 100%;
        list-style: none;
        li{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            font-size : 2rem;
            color : rgb(80,80,80,1.0);
            border-bottom : 2px solid rgb(0,0,0,0.05);
        }
        a{
            display: flex;
            flex: 1;
        }
        .clicked{
            border-bottom : 2px solid rgb(0,0,0,0.2);
            font-weight: bold;
        }
    }
    .Noticecontent{
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }
    .Noticecontent2{
        font-size: 0.5rem;
    }
    .SelectBox{
        li{
            border-bottom : 1px solid rgb(0,0,0,0.4);
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding : 0 1rem;
        }
        margin-top : 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
`
const OneRow = styled.div`
    display : flex;
    flex-direction : row;
    width: 100%;
    border-bottom : 1px solid rgb(0,0,0, 0.1);
    height: 2rem;
    margin : 5px 0;
    .Nameblock{
        flex : 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size : 0.9rem;
        font-weight: 500;
    }
    .Percentblock{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size : 0.8rem;
    }
    .Graphblock{
        flex    : 4;
        display: flex;
        justify-content: center;
        align-items: center;

        .Graph{
            display: flex;
            flex-direction : row;
            align-items: center;
            border: 2px solid rgb(0,0,0,0.2);
            border-radius: 1.2rem;
            height: 1.2rem;
            width: 80%;
        }
    }

`;


const Bluepart = styled.div`
    width : ${props => props.percent}%;
    background: rgb(178,201,232,0.5);
    height: 1.2rem;
    border-top-left-radius: 1.2rem;
    border-bottom-left-radius: 1.2rem;
    border-top-right-radius: ${(props) => {
        if (props.percent === String(100)) return "1.2rem";
        else return "0";
    }};
    border-bottom-right-radius: ${(props) => {
        if (props.percent === String(100)) return "1.2rem";
        else return "0";
    }};
`
const Redpart = styled.div`
    width : ${props => props.percent}%;
    background: rgb(232,177,166,0.5);
    height: 1.2rem;
    border-top-right-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
    border-top-left-radius: ${(props) => {
        if (props.percent === String(100)) return "1.2rem";
        else return "0";
    }};
    border-bottom-left-radius: ${(props) => {
        if (props.percent === String(100)) return "1.2rem";
        else return "0";
    }};
`

function Schoolstatics() {
    const db = firebase.firestore()


    const activeStyle = {
        color: '#505050',
    };
    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#505050'
    }

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <MainContent>
                    <Fade up>
                        <div className="SubBar">
                            <NavLink exact to="/statistics/MBTI" activeStyle={activeStyle} style={noneactiveStyle}>
                                <li>
                                    MBTI별
                                </li>
                            </NavLink>

                            <li className="clicked">
                                학교별
                            </li>
                        </div>
                        <li className="Noticecontent">
                            학교별 매칭 성공률을 볼 수 있습니다.
                        </li>
                        <li className="Noticecontent2">
                            준비중입니다!
                        </li>

                    </Fade>

                </MainContent>
            </Container>
        </ThemeProvider>
    );
}
export default Schoolstatics;