import React, { useState, useEffect } from 'react';
import fire from './Register/LoginFire'

const AD = () => {
    // const db = fire.firestore();
    // const [ID, setID] = useState('');


    // useEffect(() => {
    //     const user = fire.auth().currentUser;
    //     if (user) {
    //         const s_id = user.email.split('@');
    //         setID(s_id[0]);
    //     } else {

    //     }

    //     let Infodb = db.collection("회원정보");
    //     let query = Infodb.where("ID", "==", '20111240').get().then((querySnapshot) => {
    //         console.log(querySnapshot.size)
    //         // if (querySnapshot) {
    //         //     querySnapshot.forEach((doc) => {
    //         //         console.log(doc.data());
    //         //     });
    //         //     console.log(querySnapshot);
    //         // }
    //         // else {
    //         //     console.log("데이터없어")
    //         // }

    //     });


    // }, []);

    return (
        <div>
            <h3>지금 로그인되어있는 학번</h3>
            <h2>정우 치팅 ㄱ</h2>
        </div>
    );
};

export default AD;