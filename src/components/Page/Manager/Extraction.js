import React, { useState } from 'react';
import styled from 'styled-components';
import fire from '../Register/LoginFire';
import MatchingManager from './MatchingManager';

const Wrapper = styled.div`
    padding : 5px;
    margin : 5px;
    border : 1px solid rgb(0,0,0 ,0.1);
    justify-content : center;
    align-items : center;
    display: flex;
    flex-direction : column;
`
const Exbutton = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    border-radius: 8px;
    margin: 5px;
    border : ${props => props.overlap ? '1px solid #00AB6F' : '1px solid #A6A6A6'};
    color :  ${props => props.overlap ? '#00AB6F' : 'black'};
    height: 2rem;
    width: 20rem;
    font-size: 0.7rem;
`;
const Exbar = styled.div`
    display: flex;
    justify-content : center;
    align-items : center;
    list-style : none;
    li{
        font-family: 'Noto Sans KR', sans-serif;
        font-weight : 500;
    }
`

export default function Extraction(props) {
    const { nowCount } = props;
    const [isEx, setisEx] = useState(false);
    const db = fire.firestore();

    const handleonClick = () => {
        alert("추출완료");
        setisEx(true);
    }
    const Exlist = () => {
        return (
            <div>
                <Exbar>
                    <li>{nowCount}회차 애들 매칭해주기</li>
                </Exbar>
                <MatchingManager nowCount={nowCount}>

                </MatchingManager>
            </div>
        )
    }


    return (
        <Wrapper>
            <Exbutton onClick={handleonClick}>추출</Exbutton>
            {isEx ?
                (
                    <Exlist>

                    </Exlist>
                ) : ""}
        </Wrapper>
    );
}
