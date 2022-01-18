import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire.js'
const db = firebase.firestore()

function DiscountManner(){

    let[stageZero, setStageZero] = useState([]);
    let[chewerList, setChewerList] = useState([]);
    let [지난회차,지난회차변경] = useState();
    let [진행중회차,진행중회차변경] = useState();
    let stageZeroSum = []
    let chewerSum = []
    let chewer = null

    const getVariableInfo = async() => {
        const snapShot = await db.collection('매칭결과변수').doc('variableInfo').get()
        try{
            지난회차변경(snapShot.data()['진행중회차']-1)
            진행중회차변경(snapShot.data()['진행중회차'])
        }catch(err){console.log(err)}
    }
    useEffect(()=>{
        getVariableInfo();
    },[])
    function findStageZero(){
        db.collection(`${지난회차}lilac`).where("stage", "==", 'zero')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    stageZeroSum.push(doc.data().userOne['Nick'], doc.data().userTwo['Nick'])
                });
                db.collection(`${지난회차}daisy`).where("stage", "==", 'zero')
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        stageZeroSum.push(doc.data().userOne['Nick'], doc.data().userTwo['Nick'])
                        })
                    db.collection(`${지난회차}clover`).where("stage", "==", 'zero')
                    .get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach((doc)=>{
                            stageZeroSum.push(doc.data().userOne['Nick'], doc.data().userTwo['Nick'])
                        })
                        setStageZero(stageZeroSum);
                        console.log(stageZero)
                        alert('잠수부추출완료')
                    })
                })
            })
    }


    function findChewer(){
        db.collection(`${지난회차}lilac`).where("stage", "==", 'half').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().userOne['Nick'] === doc.data().메세지보낸사람){
                    chewer = doc.data().userTwo['Nick'];
                    chewerSum.push(chewer)
                }else if(doc.data().userTwo['Nick'] === doc.data().메세지보낸사람){
                    chewer = doc.data().userOne['Nick'];
                    chewerSum.push(chewer)
                }
            });
            db.collection(`${지난회차}daisy`).where("stage", "==", "half").get().then((querySnapshot) => {
                querySnapshot.forEach((doc)=>{
                    if(doc.data().userOne['Nick'] === doc.data().메세지보낸사람){
                        chewer = doc.data().userTwo['Nick'];
                        chewerSum.push(chewer)
                    }else if(doc.data().userTwo['Nick'] === doc.data().메세지보낸사람){
                        chewer = doc.data().userOne['Nick'];
                        chewerSum.push(chewer)
                    }
                })
                db.collection(`${지난회차}clover`).where("stage", "==", "half").get().then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        if(doc.data().userOne['Nick'] === doc.data().메세지보낸사람){
                            chewer = doc.data().userTwo['Nick'];
                            chewerSum.push(chewer)
                        }else if(doc.data().userTwo['Nick'] === doc.data().메세지보낸사람){
                            chewer = doc.data().userOne['Nick'];
                            chewerSum.push(chewer)
                            console.log(chewerSum)
                        }    
                    })
                    setChewerList(chewerSum);
                    alert('씹은애들 추출완료')
                })
            })
        })
    }

    function mannerDown(){
        let documentId = null
        let userIdList=[]
        let listSumState = stageZero.concat(chewerList)
        console.log(listSumState)
        listSumState.forEach((user)=>{
            db.collection('회원정보').where("User.Nick", "==", user).get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    console.log(doc.id)
                    documentId = doc.id
                    
                })
                const docRef = db.collection('회원정보').doc(documentId);
                return db.runTransaction((transaction)=>{
                    return transaction.get(docRef).then((doc)=>{
                        if(!doc){throw "Document does not exist!"}
                        const newManner = doc.data().User.Manner - 1;
                        transaction.update(docRef,{
                            'User.Manner': newManner
                        })
                    })
                })
            })
        })

    }

    return(
        <div>
            <h2>{지난회차}회차에서 매너온도 차감</h2>
            <div>
                <button onClick={()=>{findStageZero()}}>잠수탄애들잡아내기</button>
            </div>
            <div>
                <button onClick={()=>{findChewer()}}>선톡씹은애들잡아내기</button>     
            </div>
            <div>
                <button onClick={()=>{mannerDown()}}>매너온도 차감 버튼</button>      
            </div>
        </div>
    )
}
export default DiscountManner;