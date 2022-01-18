import React, { useEffect, useState } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../Register/LoginFire.js'

import Footer from '../Footer';
import StageZero from './StageZero.js';
import StageHalf from './StageHalf.js';
import StageSuccess from './StageSuccess.js';
import ReceivePerson from './ReceivePerson.js'
import Refused from './Refused.js'
import Refusing from './Refusing.js'
import NoReply from './NoReply.js';
import DidntReply from './DidntReply.js';
import BothDidnt from './BothDidnt.js';



function ShowingResult(props){
    const { docid, sort, ongoing } = useParams();
    const db = firebase.firestore()
    const user = props.User;

    let [userKey, setUserKey] = useState(false);
    let [발전단계, 발전단계변경] = useState();
    let [메세지보낸사람, 메세지보낸사람변경] = useState();
    let [거절한사람, 거절한사람변경] = useState();
    let [진행중회차,진행중회차변경] = useState();
    let [지난회차,지난회차변경] = useState();
    let [time,setTime]= useState();
    let [유저1유니크, 유저1유니크변경] = useState();
    let [유저2유니크, 유저2유니크변경] = useState();
    let [유저1, 유저1변경] = useState();
    let [유저2, 유저2변경] = useState();
    let [회원정보문서아이디,회원정보문서아이디변경] = useState();
    let [컬렉션,컬렉션변경] = useState(ongoing + sort);
    let [문서번호, 문서번호변경] = useState(docid)
    let [유저정보, 유저정보변경] = useState()
    let [닉네임, 닉네임변경] = useState()

    // DB에서 필요한 변수 불러오는 함수
    const getVariableInfo = async() => {
        await db.collection('매칭결과변수').doc('variableInfo').get().then((result)=>{
            setTime(result.data()['마감시간'])
            진행중회차변경(result.data()['진행중회차'])
            지난회차변경(result.data()['진행중회차']-1)
            // console.log(result.data()['마감시간'])
        })
    }

    // 회원정보에서 user의 Ongoing & Nickname 읽어오는 함수
    const getUserOngoingAndNick = async() => {
        const snapShot =  await db.collection('회원정보').where("ID","==",user.email.split('@')[0]).get()
        try{
            snapShot.forEach((doc)=>{
                회원정보문서아이디변경(doc.id)
                유저정보변경(doc.data().User)
                닉네임변경(doc.data().User.Nick)
                // console.log('asdf')
                })
        }catch(err){console.log(err)}

    }

    const getResult = async() => {
        await db.collection(`${ongoing}${sort}`).doc(docid).get().then((doc)=>{
            // console.log('success')
            발전단계변경(doc.data().stage)
            메세지보낸사람변경(doc.data().메세지보낸사람)
            거절한사람변경(doc.data().거절한사람)
            유저1유니크변경(doc.data().userOne.Unique_key)
            유저2유니크변경(doc.data().userTwo.Unique_key)
        })
}

    const getUser = async() => {
        const snapShot = await db.collection('회원정보').where("User.Unique_key","==",유저1유니크).get()
        try{
            snapShot.forEach((doc)=>{
                // console.log(doc.data())
                유저1변경(doc.data())
                if(doc.data().User.Nick === 닉네임){setUserKey(true)}
            })
        }catch(err){console.log(err)}

        const result = await db.collection('회원정보').where("User.Unique_key","==",유저2유니크).get()
        try{
            result.forEach((doc)=>{
                // console.log(doc.data())
                유저2변경(doc.data())
                if(doc.data().User.Nick === 닉네임){setUserKey(true)}
            })
        }catch(err){console.log(err)}
    }

    useEffect(()=>{
        getVariableInfo();
        if(user){
            getUserOngoingAndNick();
        }
        getResult()
        if(유저2유니크 && 닉네임){
            getUser();
        }
    },[유저2유니크, 닉네임])

    return(
        <div>
            {/* 잘못된 접근시 보여지는 화면 */}
            {
                !userKey
                && <div>열람 권한이 없습니다</div>
            }

            {/* StageZero화면 */}
            {
                userKey && 발전단계 === 'zero' && String(진행중회차) === ongoing
                && <StageZero 
                유저1={유저1} 
                유저2={유저2} 
                컬렉션={컬렉션} 
                문서번호={문서번호} 
                닉네임={닉네임} 
                회원정보문서아이디={회원정보문서아이디} 
                유저정보={유저정보}
                />
            }

            {/* 거절한사람한테 보여지는 화면 */}
            {
                userKey && 발전단계 === 'end' && 거절한사람 === 닉네임 
                && <Refusing />
            }

            {/* 거절당한 사람한테 보여지는 화면 */}
            {
                userKey && 발전단계 === 'end' && 거절한사람 != 닉네임 
                && <Refused />
            }
            
            {/* 메세지를 먼저 보낸사람한테 보여지는 화면 (시간남아있음)*/}
            {
                userKey && 발전단계 === 'half' && 메세지보낸사람 === 닉네임 && String(진행중회차) === ongoing
                && <StageHalf 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}/>
            }

            {/* 메세지를 먼저 보낸사람한테 보여지는 화면 (시간초과)*/}
            {
                userKey && 발전단계 === 'half' && 메세지보낸사람 === 닉네임 && String(지난회차) === ongoing
                && <NoReply />
            }

            {/* 메세지를 먼저 받은 사람한테 보여지는 화면 (시간남아있음)*/}
            {
                userKey && 발전단계 === 'half' && 메세지보낸사람 != 닉네임 && String(진행중회차) === ongoing
                && <ReceivePerson 
                    유저1={유저1}  
                    유저2={유저2} 
                    컬렉션={컬렉션} 
                    문서번호={문서번호} 
                    닉네임={닉네임}
                    메세지보낸사람={메세지보낸사람}/>
            }    

            {/* 메세지를 먼저 받은 사람한테 보여지는 화면 (시간초과 == 선톡씹음)*/}
            {
                userKey && 발전단계 === 'half' && 메세지보낸사람 != 닉네임 &&  String(지난회차) === ongoing
                && <DidntReply />
            }

            {/* 매칭 성공 화면 */}
            {
                userKey && 발전단계 === 'success' 
                && <StageSuccess
                유저1={유저1}  
                유저2={유저2} 
                컬렉션={컬렉션} 
                문서번호={문서번호} 
                닉네임={닉네임}
                메세지보낸사람={메세지보낸사람}/>
            }

            {/* 둘 다 무응답 */}
            {
                userKey && String(지난회차) === ongoing && 발전단계 === 'zero'  
                && <BothDidnt />
            }        
        </div>
    )
}
export default ShowingResult;












