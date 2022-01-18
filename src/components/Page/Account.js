import React from 'react';
import styled from 'styled-components'
import Footer from './Footer.js'
import SNSLink from './SNSLink.js'


const Wrapper = styled.div`
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  `

const Account = () =>{

    return(
        <Wrapper>
            <h1>결제 안내</h1>
            <p>
                번호 뽑기를 1개 이상 희망하신 분들은<br/>
                농협 356-1499-7855-83 플로스 컴패니로<br/>
                입금 후 카카오톡 플러스 친구 ‘플로스팅＇으로<br/>
                입금내역을 캡쳐하여 보내주시면<br/>
                입금 확인 완료 알림 및 신청 접수 완료 알림을<br/>
                보내 드리도록 하겠습니다.<br/>

                

                7월 3일 토요일 00시 이전까지<br/>
                입금이 이루어지지 않을 경우<br/>
                번호가 지급되지 않을 예정이므로,<br/>
                접수 및 신청 기간을 준수해주세요!<br/> 
            </p>      
            <SNSLink/> 
            <Footer/>
        </Wrapper>
    );
};

export default Account;