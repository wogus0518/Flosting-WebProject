import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }

    .text{
        font-family: 'Do Hyeon', sans-serif;
        height: 30rem;
        text-align: center;
        margin-top: 4rem;
        font-size: 1.2rem;
    }

`

const NoticeMessage = styled.div`
 list-style: none;
 li{
     font-size: 0.6rem;
     margin-bottom: 2rem;
 }
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
    flex-direction: column;

`
const TitleWrap = styled.div`

    color: rgb(0,0,0, 0.75);
    background: rgb(0,0,0, 0.05);
    width: 20rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content : center;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;

    font-size : 2rem;
    text-align : center;
    margin-top: 1rem;
`

function Refused(){

    return(
        <Container>
            <Title/>
            <div className='text'>
                상대방께서 사정에 의해 <br/>
                거절 의사를 표하여 <br/>
                매칭이 종료되었습니다.<br/>
                다음 플로스팅에서는<br/>
                더 나은 인연을 만나시길 플로스팅에서 기원합니다!<br/>

            </div>
            <Footer/>
        </Container>
    )
}
export default Refused;


function Title(){
    return(
        <TitleContainer>
            <TitleWrap>
                매칭 종료
            </TitleWrap>
            <NoticeMessage><li>불편한 점이 있으셨다면 카카오 채널로 문의해주세요!</li></NoticeMessage>
        </TitleContainer>
    )
}

