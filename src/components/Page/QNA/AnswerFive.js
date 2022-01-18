import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

const Container = styled.div`

`

const 제목 = styled.div`
font-size : 2rem;
text-align : center;
margin-top: 2rem;
font-weight : bolder
`
const 요소wrap = styled.div`
margin-top: 15px;
text-align : center;
`

function AnswerFive(){
    return(
        <Container>
            <Title 제목={제목}/>
            <Fade up><답변내용 요소wrap={요소wrap}/></Fade>
        </Container>
    )
}
export default AnswerFive;

function Title({제목}){
    return(
        <제목>매칭 결과는 언제 나오나요?</제목>
    )
}

function 답변내용({요소wrap}){
    return(
        <요소wrap>
            답변
        </요소wrap>
    )
}