import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import { NavLink } from 'react-router-dom';
import fire from '../Register/LoginFire.js'

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
        border-top: 3px solid rgb(218,219,247, 0.8);
        height: 15rem;
        text-align: center;
        margin-top: 4rem;
        font-size: 1.5rem;
    }

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
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
    flex-direction: column;

`

const LeftProfileWrap = styled.div`
text-align : center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-right: 1.5rem;

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


function StageSuccess(props) {
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
                        <Title />
                        <div className='ProfileWrap'>
                            <LeftProfile 유저1={props.유저1} 메세지보낸사람={props.메세지보낸사람} />
                            <RightProfile 유저2={props.유저2} 메세지보낸사람={props.메세지보낸사람} />
                        </div>
                        <div className='text'>
                            플로스팅을 이용해주셔서 감사합니다 :)<br />
                        </div>
                        <Footer />
                    </Container>
                    : null
            }
        </div>
    )
}
export default StageSuccess;


function Title() {
    return (
        <TitleContainer>
            <TitleWrap>
                매칭 완료!
            </TitleWrap>
            <NoticeMessage><li>표시와 다르게 연락이 진행되지 않았다면 카카오 채널을 통해 문의해주세요!</li></NoticeMessage>
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

