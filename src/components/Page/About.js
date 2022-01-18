import React from 'react';
import styled from 'styled-components'
import Footer from './Footer.js'
import SNSLink from './SNSLink.js'
import LogoSrc from '../../images/Flosting_Logo.png'


const Container = styled.div`
font-family: 'Noto Sans KR', sans-serif;
display: flex;
flex-direction: column;
align-items: center;
`
const AboutUsWrap = styled.div`
    text-align: center;
    height: 25rem;

    .title{
        font-size : 1.8rem;
        text-align : center;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight : bolder

    }
    .text{
        @media all and (min-width:768px) {
            font-size: 1rem;
        }
        font-size: 0.8rem;
        padding-right: 15px;
        padding-left: 15px;
    }
    .배경이미지{
        img{
            @media all and (min-width:768px) {
                width: 30rem;
                top:-25rem;
                height: auto;
            }
            height:50vh;
            position: relative;
            top:-20rem;
            opacity: 0.2;
        }
    }
`

const AdWrap = styled.div`
text-align: center;
    .title{
        font-size : 1.8rem;
        text-align : center;
        margin-top: 3.5rem;
        margin-bottom: 1rem;
        font-weight : bolder
    }

`
const About = () => {
    return (
        <Container>
            <AboutUs AboutUsWrap={AboutUsWrap} />
            <Ad AdWrap={AdWrap} />
            <SNSLink />
            <Footer />
        </Container>
    );
};
export default About;

function AboutUs({ AboutUsWrap }) {
    return (
        <AboutUsWrap>
            <div className='title'>
                Flosting
            </div>
            <div className='text'>
                코로나 바이러스로 정상적인 학교생활이 힘들어진 지금,<br />
                소중한 인연과 새로운 연락을 통해 답답한 일상을<br />
                뒤로 하고 외롭지 않고 즐거운 학교 생활을 이어 나가고<br />
                싶어하는 많은 학생들의 바램으로 여러 대학교 학생들이 <br />
                모여 플로스팅을 기획하게 되었습니다.<br />
                <br />
                무료 진행과 간단한 신청 방법 뿐만 아닌 여러 이벤트 <br />
                또한 진행하고 있는 플로스팅을 통하여 코로나 바이러스로 <br />
                인한 지친 일상을 회복하셨으면 좋겠습니다.<br />
                <br />
                많은 학교 관계자 분들과 학교 앞 상권의 제휴 및 협력<br />
                또한 진행하고 있으니, 아래 채널을 통해 연락주시면<br />
                감사하겠습니다 :)<br />

            </div>
            <div className='배경이미지'>
                <img src={LogoSrc}></img>
            </div>
        </AboutUsWrap>
    )
}

function Ad({ AdWrap }) {
    return (
        <AdWrap>
            <div className='title'>
                플로스팅 채널
            </div>
            <div className='text'>
                {/* 모든 분들의 문의 환영입니다 :)<br />
                아래 링크를 통해 문의주시면 감사하겠습니다!<br />
                - 홈페이지 양옆 배너<br />
                - 학교, 캠퍼스 간 이벤트를 기획중인 학생회 등<br /><br /> */}
                {/* 더불어, 무료로 진행되는 플로스팅의 <br/>
                도메인 호스팅, 서버 유지, 개발 비용 등<br/>
                비용이 발생하는 부분에 있어서<br/>
                후원을 간절히 기다리고있습니다. */}

            </div>

        </AdWrap>
    )
}


