import React, { useState } from 'react';
import firebase from '../Register/LoginFire.js'
const db = firebase.firestore()

export default function SubmitStatus() {

    let [판매금액, 판매금액변경] = useState(0)
    let [수금금액, 수금금액변경] = useState(0)
    let [검색어, 검색어변경] = useState();


    function onChange(e){
        검색어변경(e.target.value);
    }

    async function onClick(){
        await db.collection(`Flosting_${검색어}`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc)=>{
                const { Cost } = doc.data();
                if(doc.data().Paid){
                    수금금액변경(prev => prev + doc.data().Cost)
                }
                판매금액변경(prev => prev + Cost)
            })
        })
    }

    return (
        <div>
            <input onChange={onChange}></input>
            <button onClick={onClick}>{검색어}회차 검색하기</button>
            <div>
                {검색어}회차
            </div>
            <div>
                판매금액: {판매금액}원
            </div>
            <div>
                수금금액: {수금금액}원
            </div>
        </div>
    )
}
