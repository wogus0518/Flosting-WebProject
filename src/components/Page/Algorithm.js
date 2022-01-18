import React, { useState, useEffect } from 'react';
import firebase from './Register/LoginFire'

const db = firebase.firestore();

function Algorithm() {

    const getInfo = async() => {

        const snapshot  = await db.collection('Flosting_7').where('Clover.Ticket', '==', false).get()
        snapshot.forEach( (doc)=>{
            console.log(doc.data());
        })
    }
    useEffect(()=>{getInfo()},[])
    return(
        <div>
        </div>
    )
}
export default Algorithm;