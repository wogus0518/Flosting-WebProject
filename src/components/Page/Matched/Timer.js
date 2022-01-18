import React, { useState, useEffect } from "react";
import firebase from '../Register/LoginFire.js'
import styled from 'styled-components';

const db = firebase.firestore()

const FontDiv = styled.div`
  color : black;
  list-style : none;
  width: 20rem;
  border-bottom: 1px solid rgb(0,0,0,0.2);
  display: flex;
  justify-content : center;
  align-items : center;
  li{
    font-size: 3rem;
    font-family: 'Pacifico', cursive;
  }
`

function Timer(){
  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [지금까지, 지금까지변경] = useState();
  const [time,setTime] = useState();

  const getVariableInfo = async() => {
    const snapShot = await db.collection('매칭결과변수').doc('variableInfo').get()
    try{
        setTime(snapShot.data()['마감시간'])
    }catch(err){console.log(err)}
}

  useEffect(()=>{
    getVariableInfo();
    const 현재까지 = Date.now()
    const 마감시간 = new Date(time);
    const 마감까지 = 마감시간.getTime()
    const 남은시간 = 마감까지 - 현재까지
  
    const seconds변환 = parseInt(남은시간 / 1000)
    const minutes변환 = parseInt(seconds변환/60)
    const hours변환 = parseInt(minutes변환/60)
    const days변환 = parseInt(hours변환/24)
    setDays(days변환)
    setHours(hours변환-days*24)
    setMinutes(minutes변환-days*24*60-hours*60)
    setSeconds(seconds변환-days*24*60*60-hours*60*60-minutes*60)
    
    setInterval(() => {
      지금까지변경(Date.now())
    }, 1000);
  },[지금까지,time])
  return(
    <FontDiv>
      <li>{hours}: {minutes}: {seconds}</li>
    </FontDiv>
  )
}
export default Timer;
