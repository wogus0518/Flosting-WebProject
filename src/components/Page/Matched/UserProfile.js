import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../Footer';
import fire from '../Register/LoginFire'
import UserInfo from './UserInfo';

const db = fire.firestore()

const Container = styled.div`
    margin: 2rem;
`

function UserProfile() {
    let { Nick } = useParams();

    const db = fire.firestore();
    const [ID, setID] = useState("");
    const [Name, setName] = useState("");
    const [Nickname, setNickname] = useState();
    const [ProfileImage, setProfileImage] = useState("");
    const [Mbti, setMbti] = useState(); //본인 mbti
    const [Univ, setUniv] = useState("");
    const [RealName, setRealName] = useState("");
    const [Manner, setManner] = useState("");
    const [NextTier, setNextTier] = useState("");
    const [Age,setAge] = useState(19);
    const [tierName, settierName] = useState("");
    const [tierImg, settierImg] = useState("tier_zero.png");
    const tier_mi2 = 'https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_mi2.jpeg?alt=media'
    const tier_mi1 = 'https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_mi1.jpeg?alt=media'
    const tier_zero = 'https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_zero.png?alt=media'
    const tier_plus1 = 'https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_plus1.jpeg?alt=media'
    const tier_plus2 = 'https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_plus2.png?alt=media'
    const tier_plus3 = 'https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_plus3.png?alt=media'

    useEffect(() => {
        db.collection("회원정보")
            .where("User.Nick", "==", Nick)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot) {
                    querySnapshot.forEach((doc) => {
                        setProfileImage(doc.data().profileImage);
                        setUniv(doc.data().User.Univ);
                        setID(doc.data().ID);
                        setName(doc.data().User.Name);
                        setMbti(doc.data().User.Mbti);
                        setNickname(doc.data().User.Nick);
                        setRealName(doc.data().User.Name);
                        setAge(doc.data().User.Age);
                        let mannertemp = doc.data().User.Manner;
                        setManner(mannertemp);
                        whatTier(mannertemp);
                        let Till = Math.ceil(mannertemp / 10) * 10;
                        setNextTier(Till - mannertemp);
                    });
                } else {
                    // console.log("데이터 없음");
                }
            });
    }, []);

    function whatTier(Temp) {

      if (Temp < 20) {
        settierImg(tier_mi2);
        settierName("썩은 씨앗");
      }
      else if (Temp < 30) {
        settierImg(tier_mi1);
        settierName("깨진 씨앗");
      } else if (Temp < 40) {
        settierImg(tier_zero);
        settierName("씨앗");
      } else if (Temp < 50) {
        settierImg(tier_plus1);
        settierName("새싹");
      } else if (Temp < 60) {
        settierImg(tier_plus2);
        settierName("꽃봉오리")
      } else {
        settierImg(tier_plus3);
        settierName("데이지")
      }
    }

    return (
        <Container>
            <UserInfo 
            ProfileImage = {ProfileImage}
            Nickname = {Nickname}
            ID = {ID} 
            Name = {Name} 
            Mbti = {Mbti}
            Univ = {Univ}
            RealName = {RealName}
            Manner = {Manner}
            NextTier = {NextTier}
            Age ={Age}
            tierName = {tierName}
            tierImg ={tierImg}
            >

            </UserInfo>
        </Container>
    )
}
export default UserProfile;
