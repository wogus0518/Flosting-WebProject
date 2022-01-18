import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Footer from '../Footer';
import firebase from '../Register/LoginFire.js'
import AdfitWebComponent from 'react-adfit-web-component'

const db = firebase.firestore()

const ButtonDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 3rem;
height: 25rem;
    button{
        font-size: 1.5rem;
        font-weight: 500;
        padding: 5px;
        height: 5rem;
        width: 17rem;
        border-radius: 15px;
        margin-bottom : 2rem;
    }
    .lilacbutton{
        color:black;
        border: 2px solid rgb(255,180,224,0.3);
        background-color:rgb(255,180,224,0.2)
    }
    .daisybutton{
        color:black;
        border: 2px solid rgb(238,236,142,0.3);
        background-color:rgb(238,236,142,0.2)
    }
    .cloverbutton{
        color:black;
        border: 2px solid rgb(179,214,189,0.3);
        background-color:rgb(179,214,189,0.2)
    }

`
const Title = styled.div`
font-size : 2rem;
text-align : center;
margin-top: 2rem;
font-weight : bolder

`
const Subtitle = styled.div`
font-size : 1rem;
text-align : center;
margin-top: 1rem;
font-weight : bolder
`

function SelectResult(){

    let [진행중회차,진행중회차변경] = useState();
    let [지난회차,지난회차변경] = useState();

    // DB에서 필요한 변수 불러오는 함수
    const getVariableInfo = async() => {
        const snapShot = await db.collection('매칭결과변수').doc('variableInfo').get()
        try{
            진행중회차변경(snapShot.data()['진행중회차'])
            지난회차변경(snapShot.data()['진행중회차']-1)
        }catch(err){console.log(err)}
    }
    useEffect(()=>{
        getVariableInfo()
    }, [])

    return(
        <div>
            <Title>
                매칭 결과 확인하기
            </Title>
            <Subtitle>
                현재 플로스팅 {지난회차}, {진행중회차}회차<br/>
                매칭 결과가 확인 가능합니다<br/>
            </Subtitle>
            <AdfitWebComponent adUnit="DAN-Vs8rNxQiL53hwAhs" />

            <Flip left>
            <ButtonDiv>
                <NavLink to = {`/selectresult/lilac`}>
                    <button className='lilacbutton'>라일락팅 결과 확인하기</button>
                </NavLink>
                <NavLink to = {`/selectresult/daisy`}>
                    <button className='daisybutton'>데이지팅 결과 확인하기</button>
                </NavLink>
                <NavLink to = {`/selectresult/clover`}>
                    <button className='cloverbutton'>클로버팅 결과 확인하기</button>
                </NavLink>
            </ButtonDiv>
            </Flip>
            <Footer/>
        </div>
    )
}
export default SelectResult;



// import React from "react";
// import styled from 'styled-components';
// import Footer from './Footer.js';
// import { NavLink } from "react-router-dom";
// import Flip from 'react-reveal/Flip';
// import Tada from 'react-reveal/Tada';


// const Container = styled.div`
// font-family: 'Noto Sans KR', sans-serif;
// left: 0;
// width: 100%;
// height: 40rem;
// overflow: scroll;
// align-items: center;
// background-color: white;
// `
// const 제목 = styled.div`
// font-size : 2rem;
// text-align : center;
// margin-top: 2rem;
// font-weight : bolder
// `

// const 요소wrap = styled.div`
// margin-top: 15px;
// text-align : center;
// `

// const 요소btn = styled.button`
// color:#9F34AD;
// padding: 5px;
// width: 15rem;
// border-radius: 15px;
// border : 2px solid #C2679D;
// background-color:rgb(255,180,224,0.3)
// `
// const 알림wrap = styled.div`
// margin-top: 15px;
// text-align : center;
// `

// const 알림btn = styled.button`
// color:09007A;
// padding: 5px;
// width: 15rem;
// border-radius: 10px;
// border : 1px solid B14AF7;
// background-color:#D7C9FF;
// `

// const CurrentEvent = () => {

//     return(
//         <div>
//             <Container>
//                 <Title 제목={제목}/>
//                 <Tada><NavLink to ='/currentevent/event1'><요소1 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Tada>
//                 <Tada><NavLink to ='/currentevent/event1'><요소2 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Tada>
//                 <Tada><NavLink to ='/currentevent/event1'><요소3 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Tada>
//                 <Tada><NavLink to ='/currentevent/event1'><요소4 요소wrap={요소wrap} 요소btn={요소btn}/></NavLink></Tada>
//                 <Tada><NavLink to ='/currentevent/alarm'><알람신청 알림wrap={알림wrap} 알림btn={알림btn}/></NavLink></Tada>
//             </Container>

//             <Footer/>
//         </div>

//     )
// }
// export default CurrentEvent;

// function Title({제목}){
//     return(
//         <제목>현재 진행중인 학교들</제목>
//     )
// }

// function 요소1({요소wrap, 요소btn}){
//     return(
//         <요소wrap>
//             <요소btn>
//                 건국대학교<br/>
//                 세종대학교
//             </요소btn>
//         </요소wrap>
//     )
// }
// function 요소2({요소wrap, 요소btn}){
//     return(
//         <요소wrap>
//             <요소btn>
//                 단국대학교(죽전)<br/>
//                 강남대학교
//             </요소btn>
//         </요소wrap>
//     )
// }
// function 요소3({요소wrap, 요소btn}){
//     return(
//         <요소wrap>
//             <요소btn>
//                 을지대학교(성남)<br/>
//                 가천대학교(성남)
//             </요소btn>
//         </요소wrap>
//     )
// }
// function 요소4({요소wrap, 요소btn}){
//     return(
//         <요소wrap>
//             <요소btn>
//                 성균관대학교(수원)<br/>
//                 경희대학교(국제)
//             </요소btn>
//         </요소wrap>
//     )
// }
// function 알람신청({알림wrap, 알림btn}){
//     return(
//         <알림wrap>
//             <알림btn>
//                 우리학교 알림 신청하기
//             </알림btn>
//         </알림wrap>
//     )
// }