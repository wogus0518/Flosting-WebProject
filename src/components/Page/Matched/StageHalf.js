import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring'
import Footer from '../Footer';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
import profileImageBoy from '../../../images/profile_boy_default.png';
import profileImageGirl from '../../../images/profile_girl_default.png';
import { NavLink, Link } from 'react-router-dom';
const db = fire.firestore()

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
        height: 12rem;
        text-align: center;
        margin-top: 3rem;
        font-size: 1.1rem;
    }

`

const TimerWrap = styled.div`
    list-style :  none;
    display: flex;
    justify-content: flex;
    align-items: flex;
    flex-direction: column;
    .Ment{
        text-decoration: underline;
        margin-top: 5px;
        font-size: 0.6rem;
        text-align: center;
    }
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
    flex-direction: column;

`
const NoticeMessage = styled.div`
 list-style: none;
 li{
     font-size: 0.6rem;
     margin-bottom: 2rem;
 }
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
const LeftProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-right: 1.5rem;

    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
        object-fit:cover;
    }
    .defaultPicBox{
        list-style: none;
        a{
            
            .LookProfile{
                font-family: 'Do Hyeon', sans-serif;
                margin-bottom: 5px;
                border-radius : 5px;
                background: rgb(0,0,0, 0.1);
            }
        }
    }
    .decisionState{
        .ING{
            font-family: 'Do Hyeon', sans-serif;
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            border-top: 3px solid rgb(255,255,255, 1);
            margin-bottom: 5px;
            color: rgb(0,0,0,0.5);
        }
        .ED{
            font-family: 'Do Hyeon', sans-serif;
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            border-top: 3px solid rgb(218,219,247, 0.8);
            margin-bottom: 5px;
        }
    }
    .profileInfo{
        list-style: none;
        width: 8rem;
        .UserNick{
            font-weight: 700;
        }
        .UserUniv{
            font-size: 0.5rem;
        }
        .UserManner{
            font-size: 0.5rem;
        }
        .UserPhone{
            background: rgb(209,240,228,0.8);
            font-size: 0.9rem;
            font-weight: 700;
            
        }
    }
`
const RightProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-left: 1.5rem;

.defaultPic{
    width: 6rem;
    height: 6rem;
    background-color: grey;
    border-radius: 50%;
    object-fit:cover;
}
.defaultPicBox{
    list-style: none;
    a{
        
        .LookProfile{
            font-family: 'Do Hyeon', sans-serif;
            margin-bottom: 5px;
            border-radius : 5px;
            background: rgb(0,0,0, 0.1);
        }
    }
}
.decisionState{
    .ING{
        font-family: 'Do Hyeon', sans-serif;
        border-bottom: 1px solid rgb(0,0,0, 0.2);
        border-top: 3px solid rgb(255,255,255, 1);
        margin-bottom: 5px;
        color: rgb(0,0,0,0.5);
    }
    .ED{
        font-family: 'Do Hyeon', sans-serif;
        border-bottom: 1px solid rgb(0,0,0, 0.2);
        border-top: 3px solid rgb(218,219,247, 0.8);
        margin-bottom: 5px;
    }
}
.profileInfo{
    list-style: none;
    width: 8rem;
    .UserNick{
        font-weight: 700;
    }
    .UserUniv{
        font-size: 0.5rem;
    }
    .UserManner{
        font-size: 0.5rem;
    }
    .UserPhone{
        background: rgb(209,240,228,0.8);
        font-size: 0.9rem;
        font-weight: 700;
        
    }
}
`


function StageHalf(props) {
    let [init, setInit] = useState(false)
    let [새로고침, 새로고침변경] = useState(false)

    useEffect(() => {
        if (props.유저1 && props.유저2) {
            setInit(true);
        }
        if (새로고침) {
            console.log('refresh')
            window.location.reload();
        }
    })

    return (
        <div>
            {
                init
                    ?
                    <Container>
                        <Timer />
                        <Title />
                        <div className='ProfileWrap'>
                            <LeftProfile 유저1={props.유저1} 메세지보낸사람={props.메세지보낸사람} />
                            <RightProfile 유저2={props.유저2} 메세지보낸사람={props.메세지보낸사람} />
                        </div>
                        <div className='text'>
                            서로 연락중인데 계속 이 화면이 지속되면<br />
                            상대방에게 '답장했어요' 버튼을<br />
                            눌러달라고 요청해주세요!<br />
                            상대방이 답장버튼을 눌러야만<br />
                            매너온도에 악영향을 미치지 않습니다.<br />
                        </div>
                        <Footer />
                    </Container>
                    : null
            }
        </div>
    )
}
export default StageHalf;

function Timer() {
    return (
        <TimerWrap>
            <li className="Ment">
                시간이 종료되기전까지 연락이 오길 기원합니다!
            </li>
            <TimerComponent />
        </TimerWrap>
    )
}

function Title() {
    return (
        <TitleContainer>
            <TitleWrap>
                매칭 진행 중
            </TitleWrap>
            <NoticeMessage><li>표시된 상대방의 번호가 잘못된 것 같으면 카카오 채널로 문의해주세요!</li></NoticeMessage>
        </TitleContainer>
    )
}

function LeftProfile(props) {
    let 유저1 = props.유저1
    let 메세지보낸사람 = props.메세지보낸사람
    let profileImage = 유저1.profileImage;

    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
    }


    return (
        <LeftProfileWrap>
            <div className='decisionState'>
                {
                    메세지보낸사람 === 유저1.User.Nick
                        ? <div className="ED">메세지보냈음!</div>
                        : <div className="ING">결정중</div>
                }
            </div>
            <div className='defaultPicBox'>
                <NavLink to={`/userprofile/${유저1.User.Nick}`} style={noneactiveStyle}><li className="LookProfile">프로필 보기</li></NavLink>
                <img src={profileImage} className='defaultPic' />
            </div>
            <div className='profileInfo'>
                <li className="UserNick">{유저1.User.Nick}[{유저1.User.Age}]</li>
                <li className="UserPhone">{유저1.User.Phone.substring(0, 3)}-{유저1.User.Phone.substring(3, 7)}-{유저1.User.Phone.substring(7)}</li>
                <li className="UserUniv">{유저1.User.Univ}</li>
            </div>
        </LeftProfileWrap>
    )
}

function RightProfile(props) {
    let 유저2 = props.유저2
    let 메세지보낸사람 = props.메세지보낸사람
    let profileImage = 유저2.profileImage;

    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
    }

    return (
        <RightProfileWrap>
            <div className='decisionState'>
                {
                    메세지보낸사람 === 유저2.User.Nick
                        ? <div className="ED">메세지보냈음!</div>
                        : <div className="ING">결정중</div>
                }
            </div>
            <div className='defaultPicBox'>
                <NavLink to={`/userprofile/${유저2.User.Nick}`} style={noneactiveStyle}><li className="LookProfile">프로필 보기</li></NavLink>
                <img src={profileImage} className='defaultPic' />
            </div>
            <div className='profileInfo'>
                <li className="UserNick">{유저2.User.Nick}[{유저2.User.Age}]</li>
                <li className="UserPhone">{유저2.User.Phone.substring(0, 3)}-{유저2.User.Phone.substring(3, 7)}-{유저2.User.Phone.substring(7)}</li>
                <li className="UserUniv">{유저2.User.Univ}</li>
            </div>
        </RightProfileWrap>
    )
}

