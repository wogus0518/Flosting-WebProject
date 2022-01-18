import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire.js'

import StageZero from './StageZero.js';
import StageHalf from './StageHalf.js';
import StageSuccess from './StageSuccess.js';
import ReceivePerson from './ReceivePerson.js'
import Refused from './Refused.js'
import Refusing from './Refusing.js'
import NoReply from './NoReply.js';
import DidntReply from './DidntReply.js';
import BothDidnt from './BothDidnt.js';


function CloverResult(props){
    const db = firebase.firestore()
    const user = props.User;

    let [닉네임, 닉네임변경] = useState('');
    let [발전단계, 발전단계변경] = useState('');
    let [메세지보낸사람, 메세지보낸사람변경] = useState('');
    let [거절한사람, 거절한사람변경] = useState('');
    let [유저1, 유저1변경] = useState('');
    let [유저2, 유저2변경] = useState('');
    let [진행중회차,진행중회차변경] = useState();
    let [지난회차,지난회차변경] = useState();
    let [컬렉션, 컬렉션변경] = useState();
    let [회원정보문서아이디,회원정보문서아이디변경] = useState();
    let [문서번호,문서번호변경] = useState();
    let [남은시간, 남은시간변경] = useState();
    let [유저정보, 유저정보변경] = useState();
    let [Ongoing,setOngoing]= useState();
    let [time,setTime]= useState();

    // DB에서 필요한 변수 불러오는 함수
    const getVariableInfo = async() => {
        const snapShot = await db.collection('매칭결과변수').doc('variableInfo').get()
        try{
            setTime(snapShot.data()['마감시간'])
            진행중회차변경(snapShot.data()['진행중회차'])
            지난회차변경(snapShot.data()['진행중회차']-1)
            컬렉션변경(`${진행중회차}clover`)

        }catch(err){console.log(err)}
    }
    // 회원정보에서 user의 Ongoing & Nickname 읽어오는 함수
    const getUserOngoingAndNick = async() => {
        const snapShot = await db.collection('회원정보').where("ID","==",user.email.split('@')[0]).get()
        try{
            snapShot.forEach((doc)=>{
                회원정보문서아이디변경(doc.id)
                유저정보변경(doc.data()['User'])
                setOngoing(doc.data()['Ongoing'])
                닉네임변경(doc.data()['User']['Nick'])
            })
        }catch(err){console.log(err)}
        
    }
    //유저의 닉네임과 일치하는 매칭결과 찾아오는 함수(1)
    const userOneChecker = async () => {
        const checkUserOne = await db.collection(`${진행중회차}clover`).where("userOne.Nick", "==", 닉네임).get()
        try {
            checkUserOne.forEach((doc) => {
                문서번호변경(doc.id)
                유저1변경(doc.data()['userOne'])
                유저2변경(doc.data()['userTwo'])
                발전단계변경(doc.data()['stage'])
                메세지보낸사람변경(doc.data()['메세지보낸사람'])
                거절한사람변경(doc.data()['거절한사람'])
            });
        } catch (err) { console.log(err) }
    }
    //유저의 닉네임과 일치하는 매칭결과 찾아오는 함수(2)
    const userTwoChecker = async () => {
        const checkUserTwo = await db.collection(`${진행중회차}clover`).where("userTwo.Nick", "==", 닉네임).get()
        checkUserTwo.forEach((doc) => {
            문서번호변경(doc.id)
            유저1변경(doc.data()['userOne'])
            유저2변경(doc.data()['userTwo'])
            발전단계변경(doc.data()['stage'])
            메세지보낸사람변경(doc.data()['메세지보낸사람'])
            거절한사람변경(doc.data()['거절한사람'])
        });
    }
    const 지난회차참여자userOneChecker = async () => {
        const checkUserOne = await db.collection(`${지난회차}clover`).where("userOne.Nick", "==", 닉네임).get()
        try {
            checkUserOne.forEach((doc) => {
                문서번호변경(doc.id)
                유저1변경(doc.data()['userOne'])
                유저2변경(doc.data()['userTwo'])
                발전단계변경(doc.data()['stage'])
                메세지보낸사람변경(doc.data()['메세지보낸사람'])
                거절한사람변경(doc.data()['거절한사람'])
            });
        } catch (err) { console.log(err) }
    }
    const 지난회차참여자userTwoChecker = async () => {
        const checkUserOne = await db.collection(`${지난회차}clover`).where("userTwo.Nick", "==", 닉네임).get()
        try {
            checkUserOne.forEach((doc) => {
                문서번호변경(doc.id)
                유저1변경(doc.data()['userOne'])
                유저2변경(doc.data()['userTwo'])
                발전단계변경(doc.data()['stage'])
                메세지보낸사람변경(doc.data()['메세지보낸사람'])
                거절한사람변경(doc.data()['거절한사람'])
            });
        } catch (err) { console.log(err) }
    }

    useEffect(()=>{
        getVariableInfo();
        if(user){
        const 현재까지 = Date.now()
        const 마감시간 = new Date(time);
        const 마감까지 = 마감시간.getTime()
        남은시간변경(마감까지 - 현재까지)
        getUserOngoingAndNick();
        userOneChecker();
        userTwoChecker();
        지난회차참여자userOneChecker();
        지난회차참여자userTwoChecker();
        // console.log(남은시간)
        }
    }, [user, 닉네임, 발전단계, 진행중회차, time])

    return(
        <div>
            {/* 초기 로딩 화면 */}
            {
                닉네임 === ''
                && <div>유저정보 불러오는 중</div>
            }

            {/* 신청을 한 번도 안한 사람한테 보여지는 화면 */}
            {
                닉네임 != '' && Ongoing === ''
                && <div>신청내역이 없습니다!</div>
            }

            {/* 진행중,지난회차 신청자가 아닌 사람한테 보여지는 화면 */}
            {
                닉네임 != '' && Ongoing != String(진행중회차) && Ongoing != String(지난회차)
                && <div>신청내역에 해당하는 결과 확인 시간이 아닙니다!</div>
            }

            {/* StageZero화면 */}
            {
                발전단계 === 'zero' && String(진행중회차) === Ongoing
                && <StageZero 
                    유저1={유저1} 
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호}
                    닉네임={닉네임}
                    남은시간={남은시간}
                    발전단계={발전단계}
                    메세지보낸사람={메세지보낸사람}
                    회원정보문서아이디={회원정보문서아이디}
                    유저정보={유저정보}
                    />
            }

            {/* 거절한사람한테 보여지는 화면 */}
            {
                발전단계 === 'end' && 거절한사람 === 닉네임 
                && <Refusing />
            }

            {/* 거절당한 사람한테 보여지는 화면 */}
            {
                발전단계 === 'end' && 거절한사람 != 닉네임 
                && <Refused />
            }

            {/* 메세지를 먼저 보낸사람한테 보여지는 화면 (시간남아있음)*/}
            {
                발전단계 === 'half' && 메세지보낸사람 === 닉네임 && String(진행중회차) === Ongoing
                && <StageHalf 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}
                    남은시간={남은시간}/>
            }
            {/* 메세지를 먼저 보낸사람한테 보여지는 화면 (시간초과)*/}
            {
                발전단계 === 'half' && 메세지보낸사람 === 닉네임 && String(지난회차) === Ongoing
                && <NoReply />
            }

            {/* 메세지를 먼저 받은 사람한테 보여지는 화면 (시간남아있음)*/}
            {
                발전단계 === 'half' && 메세지보낸사람 != 닉네임 && String(진행중회차) === Ongoing
                && <ReceivePerson 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}
                    남은시간={남은시간}/>
            }
            {/* 메세지를 먼저 받은 사람한테 보여지는 화면 (시간초과 == 선톡씹음)*/}
            {
                발전단계 === 'half' && 메세지보낸사람 != 닉네임 &&  String(지난회차) === Ongoing
                && <DidntReply />
            }

            {/* 매칭 성공 화면 */}
            {
                발전단계 === 'success' 
                && <StageSuccess
                유저1={유저1}  
                유저2={유저2} 
                컬렉션={컬렉션} 
                문서번호={문서번호} 
                닉네임={닉네임}
                메세지보낸사람={메세지보낸사람}
                남은시간={남은시간}/>
            }

            {
                String(지난회차) === Ongoing && 발전단계 === 'zero'  
                && <BothDidnt />
            }


        </div>
    )
}
export default CloverResult;