import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import TimerComponent from './Timer.js'
import fire from '../Register/LoginFire.js'
import { NavLink } from 'react-router-dom';
const db = fire.firestore()

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
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
.ING{
    font-family: 'Do Hyeon', sans-serif;
    border-bottom: 1px solid rgb(0,0,0, 0.2);
    border-top: 3px solid rgb(255,255,255, 1);
    margin-bottom: 5px;
    color: rgb(0,0,0,0.5);
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
    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
        object-fit:cover;
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
.ING{
    font-family: 'Do Hyeon', sans-serif;
    border-bottom: 1px solid rgb(0,0,0, 0.2);
    border-top: 3px solid rgb(255,255,255, 1);
    margin-bottom: 5px;
    color: rgb(0,0,0,0.5);
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
    .defaultPic{
        width: 6rem;
        height: 6rem;
        background-color: grey;
        border-radius: 50%;
        object-fit:cover;
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

const ButtonWrap = styled.div`
text-align:center;
margin-top: 2rem;
`
const Agree = styled.button`
font-family: "Noto Sans KR", sans-serif;
margin-bottom: 1rem;
margin-right: 0.5rem;
margin-left: 0.5rem;
width: 13rem;
height: 3rem;
color : rgb(0,0,0,0.8);
border : 1px solid rgb(0,0,0, 0.2);
font-weight: 700;
border-radius: 40px;
background-color: rgb(218,219,247, 0.8);
&:hover{
    background-color: rgb(188,189,217, 0.8);
    color: white;
}
`

const Refuse = styled.button`
margin-bottom: 1rem;
margin-right: 0.5rem;
margin-left: 0.5rem;
width: 13rem;
height: 3rem;
border : 1px solid rgb(218,219,247, 0.8);
font-weight: 700;
border-radius: 40px;
background-color: white;
&:hover{
    background-color: rgb(217,91,91,0.5);
    color: white;

`


function StageZero(props) {
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
                            <LeftProfile 유저1={props.유저1} />
                            <RightProfile 유저2={props.유저2} />
                        </div>
                        <Button 새로고침변경={새로고침변경} 컬렉션={props.컬렉션} 문서번호={props.문서번호} 닉네임={props.닉네임} 회원정보문서아이디={props.회원정보문서아이디} 유저정보={props.유저정보} />
                        <Footer />
                    </Container>

                    : null
            }
        </div>
    )
}
export default StageZero;

function Timer() {
    return (
        <TimerWrap>
            <li className="Ment">
                시간이 종료되기 전까지 연락을 해주세요!
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
            <NoticeMessage><li>표시된 상대방의 번호로 연락을 먼저 해보세요!</li></NoticeMessage>
        </TitleContainer>
    )
}

function LeftProfile(props) {
    let 유저1 = props.유저1
    let profileImage = 유저1.profileImage;

    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
    }


    return (
        <LeftProfileWrap>
            <div className="ING">결정중</div>
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
    let profileImage = 유저2.profileImage;

    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#2B2A28'
    }

    return (
        <RightProfileWrap>
            <div className="ING">결정중</div>
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

function Button(props) {
    function onClick_sendMessage() {
        const result = window.confirm('정말로 먼저 연락을 보내셨나요?');
        if (result) {
            db.collection(props.컬렉션).doc(props.문서번호).update({
                stage: 'half'
            })
            db.collection(props.컬렉션).doc(props.문서번호).update({
                메세지보낸사람: props.닉네임
            })
            db.collection('회원정보').doc(props.회원정보문서아이디).update({
                'User.Manner': props.유저정보['Manner'] + 1
            }).then(() => {
                alert('매너온도가 상승했습니다! 좋은 결과 기원합니다 :)')
                props.새로고침변경(true);
            })
        } else { }
    }
    function onClick_refuse() {
        const result = window.confirm('정말로 거절하실건가요?');
        if (result) {
            db.collection(props.컬렉션).doc(props.문서번호).update({
                stage: 'end'
            })
            db.collection(props.컬렉션).doc(props.문서번호).update({
                거절한사람: props.닉네임
            }).then(() => {
                alert('매칭을 거절하셨습니다.')
                props.새로고침변경(true);
            })
        } else { }
    }

    return (
        <ButtonWrap>
            <Agree onClick={onClick_sendMessage}>먼저 연락했어요!</Agree>
            <Refuse onClick={onClick_refuse}>거절할래요</Refuse>
        </ButtonWrap>
    )
}







