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
        height: 30rem;
        text-align: center;
        margin-top: 4rem;
        font-size: 1.2rem;
    }
    
`

const TitleWrap = styled.div`
color: white;
background-color: grey;
width: 20rem;
font-size : 2rem;
text-align : center;
margin-top: 2rem;
font-weight : bolder
`

function NoReply(){

    return(
        <Container>
            <Title/>
            <div className='text'>
                제한시간동안 상대방에게<br/>
                답장이 도착하지 않았군요<br/><br/>
                저희 플로스팅이<br/>
                다음 매칭에 더 힘쓰도록 하겠습니다<br/>
            </div>
            <Footer/>
        </Container>
    )
}
export default NoReply;


function Title(){
    return(
        <TitleWrap>
            매칭 종료
        </TitleWrap>
    )
}
