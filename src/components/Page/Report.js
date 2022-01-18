import React, { useEffect, useState } from 'react';
import SNSLink from './SNSLink'

import styled from 'styled-components';
import Footer from './Footer';
import fire from './Register/LoginFire';

const Container = styled.div`
height: 37rem;
    .신고하기타이틀{
        font-size : 2rem;
        text-align : center;
        margin-top: 2rem;
        font-weight : bolder
    }
    .신고내용{
        text-align : center;
        font-size: 1rem;
        margin-top: 2rem;
        text-align: left
        margin-bottom: 0.5rem;
        color:red
    }
    .신고리스트{
        margin-top : 1.5rem;
        margin-bottom: 3rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    // .form_div{
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     flex-direction: column;
        
    //     margin-top: 2rem;
    //     margin-bottom: 2rem;
    //     button{
    //         width: 13rem;
    //         height: 3rem;
    //         border : 1px solid yellow;
    //         border-radius: 40px;
    //         background-color: pink;
    //         &:hover{
    //             background-color: grey;
    //             color: pink;
    //         }
    //     }
    // }
    // form{
    //     display:table-cell;
        
    // }
    // .form_inner{
    //     text-align:left;
    //     margin-bottom:2rem;
    //     input{
    //         width: 15rem;
    //         height: 2rem;
    //     }
    // }
`
// const db = fire.firestore()
function Report(props) {
    // let user = props.User; 

    // let[신고자uid, 신고자uid변경]=useState();
    // let[신고자정보, 신고자정보변경]=useState();
    // let[신고할닉네임,신고할닉네임변경]=useState();
    // let[전화번호,전화번호변경]=useState();
    // let[신고사유,신고사유변경]=useState();

    // const onChange = (event) => {
    //     const{target:{name, value}} = event;
    //     if(name === '닉네임'){ 신고할닉네임변경(value)}
    //     else if(name === '전화번호'){ 전화번호변경(value)}
    //     else if(name === '신고사유'){ 신고사유변경(value)}
    // }

    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     db.collection('Report').add({
    //         신고자uid: 신고자uid,
    //         신고자: 신고자정보,
    //         신고할닉네임: 신고할닉네임,
    //         신고할전화번호: 전화번호,
    //         신고할사유: 신고사유
    //     }).then((docRef)=>{
    //         console.log("Document written with ID: ", docRef.id);
    //         alert('신고 접수 감사드립니다')
    //         // window.location.href='/my'
    //     })
    // }
    // const getUserInfo = async() => {
    //     const snapShot = await db.collection('회원정보').where("ID","==",user.email.split('@')[0]).get()
    //     try{
    //         snapShot.forEach((doc)=>{
    //             신고자정보변경(doc.data()['User'])
    //             console.log(doc.data()['User'])
    //         })
    //     }catch(err){console.log(err)}

    // }

    // useEffect(()=>{
    //     getUserInfo();
    //     신고자uid변경(props.User.uid);
    //     console.log(props.User.uid)
    // },[])
    return (
        <div>
            <Container>
                <div className='신고하기타이틀'>사용자 신고하기</div>
                <div className='신고내용'>
                    아래 내용과 같은 일을 겪으셨거나 기타 신고 접수는<br />
                    플로스팅 공식 SNS계정을 통해 신고해주시기 바랍니다<br />
                </div>
                <div className='신고리스트'>
                    <ul style={{ listStyle: "none" }}>
                        <li>❗ 상대방이 거짓 정보를 이용해 매칭에 참여한 경우</li><br />
                        <li>❗ 내 개인정보가 무단으로 공유당한 경우</li><br />
                        <li>❗ 상대방이 선톡/답장을 했다고 매칭결과상 나오지만
                            실제로 선톡/답장이 오지 않은 경우 </li><br />
                        <li>❗ 욕설 및 비속어 사용자</li><br />
                        <li>❗ 그 외, 기타 이유로 신고를 하길 원하는 경우</li><br />
                        <li>❗ 부적절한 프로필 사진 및 닉네임 사용자</li>
                    </ul>
                </div>
                <SNSLink />
                {/* <div className='form_div'>
                    <form onSubmit={onSubmit}>
                        <div className='form_inner'>
                            <div>신고할 닉네임(*)</div>
                            <input
                                name='닉네임'
                                value={신고할닉네임}
                                required
                                onChange={onChange}
                                placeholder="필수입력"
                            ></input>
                        </div>
                        <div className='form_inner'>
                            <div>신고할 전화번호(*)</div>
                            <input
                                name='전화번호'
                                value={전화번호}
                                required
                                onChange={onChange}
                                placeholder="'-'제외 기입"
                            ></input>
                        </div>                    
                        <div className='form_inner'>
                            <div>
                                신고 사유<br/> 
                            </div>
                            <textarea rows='6' cols='30'
                                name='신고사유'
                                value={신고사유}
                                onChange={onChange}
                                placeholder="신고하실 내용을 적어주세요"

                            ></textarea>
                        </div>
                        <button>신고 접수하기</button>
                    </form>
                </div> */}
            </Container>
            <Footer />
        </div>
    )
}
export default Report;