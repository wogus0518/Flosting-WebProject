import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import fire from '../Register/LoginFire';
import xlsx from "xlsx";



const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 10,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    display: flex;
    flex-directcion : row;
    h1{
        font-size: 1.5rem;
    }
`;

const ExcelBtn = styled.button`
font-family: 'Noto Sans KR', sans-serif;
font-weight: 700;
border-radius: 8px;
margin: 5px;
border : 1px solid #A6A6A6;
font-size : 1rem;
color :  rgb(0,0,0,0.7);
background : rgb(225,241,245,0.8);
width: 10rem;
height: 3rem;

`
const MatchButton = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
    border-radius: 8px;
    margin: 5px;
    border : 1px solid #A6A6A6;
    font-size : 1rem;
    color :  rgb(0,0,0,0.7);
    background : rgb(245,241,220,0.8);
    width: 10rem;
    height: 3rem;
    h2{
        font-size: 2rem;
    }
`

const MatchingBox = styled.div`
    display : flex;
    flex-direction : column;
    list-style : none;
    li{
        font-family: 'Noto Sans KR', sans-serif;
        font-size : 0.7rem;
    }
`
const MatchingManager2 = (props) => {

    const { nowCount } = props;
    const user = props.user;
    const db = fire.firestore();
    //Lilac 정보
    const [L_user, setL_user] = useState("");
    const [L_boy, setL_boy] = useState("");
    const [L_girl, setL_girl] = useState("");
    const [L_couple, setL_couple] = useState("");
    const [L_trash, setL_trash] = useState("");

    const [D_user, setD_user] = useState("");
    const [D_boy, setD_boy] = useState("");
    const [D_girl, setD_girl] = useState("");
    const [D_couple, setD_couple] = useState("");
    const [D_trash, setD_trash] = useState("");

    const [C_user, setC_user] = useState("");
    const [C_boy, setC_boy] = useState("");
    const [C_girl, setC_girl] = useState("");
    const [C_couple, setC_couple] = useState("");
    const [C_trash, setC_trash] = useState("");


    const MAX_MATCHING_NUM = 20;

    //DB에서 우선순위배열에 추가하는 함수
    function DBtoPriority_Array(Priority_Array, Priority, MatchingType, data) {
        //우선순위 배열, 우선순위, Lilac/Daisy/Clover/ DOC.data

        let tempdic = {
            Name: data.User.Name, // 본인 이름
            Age: data.User.Age, // 본인 나이
            Gender: data.User.Gender, //본인 성별
            Nick: data.User.Nick, // 본인 닉네임
            Phone: data.User.Phone,// 본인 폰
            Unique_key: data.User.Unique_key, //Unique Key 값
            Univ: data.User.Univ, // 본인 학교
            Mbti: data.User.Mbti, // 본인 MBTI
            MaxMatching: MAX_MATCHING_NUM, // 최대 매칭 수
            MatchingCode: [] // 매칭된 사람
        }
        if (MatchingType == "Lilac") {
            tempdic['OriginalTicket'] = data.Lilac.TicketNumber // 처음 신청한 티켓 수
            tempdic['Ticket'] = data.Lilac.TicketNumber; // 남은 티켓 수
            tempdic['W_Age'] = data.Lilac.Age; //원하는 나이
            tempdic['W_Univ'] = data.Lilac.Univ; //원하는 학교
        } else if (MatchingType == "Daisy") {
            tempdic['OriginalTicket'] = data.Daisy.TicketNumber // 처음 신청한 티켓 수
            tempdic['Ticket'] = data.Daisy.TicketNumber; //티켓 수
            tempdic['W_Age'] = data.Daisy.Age; //원하는 나이
            tempdic['W_Univ'] = data.Daisy.Univ; //원하는 학교
        } else {
            tempdic['OriginalTicket'] = data.Clover.TicketNumber // 처음 신청한 티켓 수
            tempdic['Ticket'] = data.Clover.TicketNumber; //티켓 수
            tempdic['W_Age'] = data.Clover.Age; //원하는 나이
            tempdic['W_Univ'] = data.Clover.Univ; //원하는 학교
        }
        Priority_Array[Priority].push(tempdic);
    };

    //배열을 섞어주는 함수.
    const shuffleArray = (array) => {
        let arraylength = array.length;
        for (let i = 0; i < arraylength; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            const x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    };
    //나이조건이 맞는지 검사하는 함수
    const CheckAgeCondition = (Condition, OtherAge) => {
        if (Condition == "20") {
            if (OtherAge == 20)
                return true;
            else
                return false;
        } else if (Condition == "21~23") {
            if (OtherAge > 20 && OtherAge < 24)
                return true;
            else
                return false;
        } else if (Condition == "24+") {
            if (OtherAge >= 24)
                return true;
            else
                return false;
        }
    }
    //PickUser와 OtherUser가 커플이 될 수 있는지 확인하는 함수
    const CheckCanCouple = (PickUser, OtherUser, MatchingType) => {

        //만약 이전에 매칭된 놈이면 패스
        if (PickUser.MatchingCode.length) {
            let forlength = PickUser.MatchingCode.length;
            for (let i = 0; i < forlength; i++) {
                if (PickUser.MatchingCode[i] == OtherUser.Unique_key)
                    return false;
            }
        }

        //Lilac일 경우, 남녀만됨.
        if (MatchingType == "Lilac" || MatchingType == "Daisy") {
            if (PickUser.Gender != OtherUser.Gender) {
                //젠더 달라야함.
                if (PickUser.W_Age == "dnt_M" && PickUser.W_Univ == "dnt_M") {
                    //pickuser는 나이, 학교 상관없어.
                    if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                        //otheruser는 나이, 학교 상관없어.
                        return true;
                    }
                    else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                        //otheruser는 나이 조건있고, 학교 상관없어.
                        if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                        //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                        if (PickUser.Univ == OtherUser.Univ) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                        //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                        if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                        //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                        if (PickUser.Univ != OtherUser.Univ) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                        //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                        if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if (PickUser.W_Age != "dnt_M" && PickUser.W_Univ == "dnt_M") {
                    //pickuser는 나이 조건있고, 학교 상관없어.
                    if (CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age == "dnt_M" && PickUser.W_Univ == "myUniv") {
                    //pickuser는 나이 상관없고, 학교만 울학교면 좋겠어.
                    if (PickUser.Univ == OtherUser.Univ) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age != "dnt_M" && PickUser.W_Univ == "myUniv") {
                    //pickuser는 나이 조건있고, 학교는 울학교면 좋겠어.
                    if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age == "dnt_M" && PickUser.W_Univ == "otherUniv") {
                    //pickuser는 나이 상관없고, 학교가 타학교면 좋겠어.
                    if (PickUser.Univ != OtherUser.Univ) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age != "dnt_M" && PickUser.W_Univ == "otherUniv") {
                    //pickuser는 나이 조건있고, 학교가 타학교면 좋겠어.
                    if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else {
                    console.log("ㅈ버그")
                    return false;
                }
            } else
                return false;
        }
        //Clover일 경우, 동성만됨.
        else {
            if (PickUser.Gender == OtherUser.Gender) {
                //젠더 달라야함.
                if (PickUser.W_Age == "dnt_M" && PickUser.W_Univ == "dnt_M") {
                    //pickuser는 나이, 학교 상관없어.
                    if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                        //otheruser는 나이, 학교 상관없어.
                        return true;
                    }
                    else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                        //otheruser는 나이 조건있고, 학교 상관없어.
                        if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                        //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                        if (PickUser.Univ == OtherUser.Univ) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                        //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                        if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                        //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                        if (PickUser.Univ != OtherUser.Univ) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                        //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                        if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if (PickUser.W_Age != "dnt_M" && PickUser.W_Univ == "dnt_M") {
                    //pickuser는 나이 조건있고, 학교 상관없어.
                    if (CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age == "dnt_M" && PickUser.W_Univ == "myUniv") {
                    //pickuser는 나이 상관없고, 학교만 울학교면 좋겠어.
                    if (PickUser.Univ == OtherUser.Univ) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age != "dnt_M" && PickUser.W_Univ == "myUniv") {
                    //pickuser는 나이 조건있고, 학교는 울학교면 좋겠어.
                    if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age == "dnt_M" && PickUser.W_Univ == "otherUniv") {
                    //pickuser는 나이 상관없고, 학교가 타학교면 좋겠어.
                    if (PickUser.Univ != OtherUser.Univ) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else if (PickUser.W_Age != "dnt_M" && PickUser.W_Univ == "otherUniv") {
                    //pickuser는 나이 조건있고, 학교가 타학교면 좋겠어.
                    if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(PickUser.W_Age, OtherUser.Age)) {
                        if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이,학교 상관없어.
                            return true;
                        }
                        else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "dnt_M") {
                            //otheruser는 나이 조건있고, 학교 상관없어.
                            if (CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 상관없고, 학교만 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "myUniv") {
                            //otheruser는 나이 조건있고, 학교는 울학교면 좋겠어.
                            if (PickUser.Univ == OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age == "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 상관없고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (OtherUser.W_Age != "dnt_M" && OtherUser.W_Univ == "otherUniv") {
                            //otheruser는 나이 조건있고, 학교가 타학교면 좋겠어.
                            if (PickUser.Univ != OtherUser.Univ && CheckAgeCondition(OtherUser.W_Age, PickUser.Age)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                } else {
                    console.log("ㅈ버그")
                    return false;
                }
            } else
                return false;
        }

    }

    //MatchingType별 couple, trash 만드는  함수
    const MatchingSystem = (CollectionName, MatchingType, Alluser, Priority_Array, couple, trash) => {
        db.collection(CollectionName).where(MatchingType + ".Ticket", "==", true)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.size) {
                    alert(nowCount + "회차_" + MatchingType + "데이터가 없음.")
                } else {

                    let boynum = 0;
                    let girlnum = 0;

                    if (MatchingType == "Lilac") {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().Lilac.Age == "dnt_M" && doc.data().Lilac.Univ == "dnt_M") {
                                //1순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 0, MatchingType, doc.data());
                            } else if (doc.data().Lilac.Age == "dnt_M" || doc.data().Lilac.Univ == "dnt_M") {
                                //2순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 1, MatchingType, doc.data());
                            } else {
                                //3순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 2, MatchingType, doc.data());
                            }

                            if (doc.data().User.Gender == "boy") {
                                boynum++;
                            } else {
                                girlnum++;
                            }
                        })
                    } else if (MatchingType == "Daisy") {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().Daisy.Age == "dnt_M" && doc.data().Daisy.Univ == "dnt_M") {
                                //1순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 0, MatchingType, doc.data());
                            } else if (doc.data().Daisy.Age == "dnt_M" || doc.data().Daisy.Univ == "dnt_M") {
                                //2순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 1, MatchingType, doc.data());
                            } else {
                                //3순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 2, MatchingType, doc.data());
                            }

                            if (doc.data().User.Gender == "boy") {
                                boynum++;
                            } else {
                                girlnum++;
                            }
                        })
                    } else if (MatchingType == "Clover") {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().Clover.Age == "dnt_M" && doc.data().Clover.Univ == "dnt_M") {
                                //1순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 0, MatchingType, doc.data());
                            } else if (doc.data().Clover.Age == "dnt_M" || doc.data().Clover.Univ == "dnt_M") {
                                //2순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 1, MatchingType, doc.data());
                            } else {
                                //3순위 매칭 우선배열
                                DBtoPriority_Array(Priority_Array, 2, MatchingType, doc.data());
                            }

                            if (doc.data().User.Gender == "boy") {
                                boynum++;
                            } else {
                                girlnum++;
                            }
                        })
                    }

                    // 각 우선순위 배열을 셔플하고 차곡차곡 쌓음.
                    for (let i = 0; i < 3; i++) {
                        shuffleArray(Priority_Array[i]);
                        Alluser.push(...Priority_Array[i]);
                    }
                    console.log(Alluser);
                    //전체 유저의 수
                    let User_Num = Alluser.length;

                    for (let k = 0; k < MAX_MATCHING_NUM; k++) {
                        //MAX_MATCHING_NUM 만큼 돌림
                        if (k == 1) {
                            let a = "brak";
                        }
                        for (let i = 0; i < User_Num; i++) {
                            //PickUser = 매칭중인 유저
                            let PickUser = Alluser[i];
                            //이번턴에 매칭 되었으면 패스
                            if (PickUser.MatchingCode.length == k + 1)
                                continue;
                            //Pick이 된지 먼저 검증
                            if (PickUser.Ticket == 0) {
                                continue;
                                //티켓이 없으면 패스~
                            } else {
                                //나 다음부터 커플을 찾아보자
                                for (let j = 0; j < User_Num; j++) {
                                    //나 자신이면 패스
                                    if (j == i)
                                        continue;
                                    //OtherUser = 상대 유저
                                    let OtherUser = Alluser[j];
                                    if (OtherUser.MatchingCode.length == MAX_MATCHING_NUM || OtherUser.MatchingCode.length == k + 1) {
                                        //이미 최대한으로 매칭되어있거나, 전사람과 매칭되어있으면 패스임
                                        continue;
                                    } else {
                                        if (CheckCanCouple(PickUser, OtherUser, MatchingType)) {
                                            //커플이 되는사람이면,
                                            if (PickUser.Ticket >= 1) {
                                                PickUser.Ticket = PickUser.Ticket - 1;
                                            }
                                            if (OtherUser.Ticket >= 1) {
                                                OtherUser.Ticket = OtherUser.Ticket - 1;
                                            }
                                            PickUser.MatchingCode.push(OtherUser.Unique_key);
                                            OtherUser.MatchingCode.push(PickUser.Unique_key);
                                            //서로의 매칭코드에 서로의 유니크키를 넣어준다.
                                            couple[0].push(PickUser);
                                            couple[1].push(OtherUser);
                                            console.table(PickUser);
                                            console.table(OtherUser);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for (let i = 0; i < User_Num; i++) {
                        if (Alluser[i].Ticket) {
                            //티켓 남은 놈들
                            trash.push(Alluser[i]);
                        }
                    }

                    if (MatchingType == "Lilac") {
                        PushCoupletoDB(nowCount, "lilac", couple);
                        PushTrashtoDB(nowCount, "lllac", trash);
                        setL_user(User_Num);
                        setL_boy(boynum);
                        setL_girl(girlnum);
                        setL_couple(couple[0].length);
                        setL_trash(trash.length);
                    } else if (MatchingType == "Daisy") {
                        PushCoupletoDB(nowCount, "daisy", couple);
                        PushTrashtoDB(nowCount, "daisy", trash);
                        setD_user(User_Num);
                        setD_boy(boynum);
                        setD_girl(girlnum);
                        setD_couple(couple[0].length);
                        setD_trash(trash.length);
                    } else {
                        PushCoupletoDB(nowCount, "clover", couple);
                        PushTrashtoDB(nowCount, "clover", trash);
                        setC_user(User_Num);
                        setC_boy(boynum);
                        setC_girl(girlnum);
                        setC_couple(couple[0].length);
                        setC_trash(trash.length);
                    }
                    console.table(couple);
                    console.table(trash);
                }
            });
    }
    //DBdp trash push 해주는 함수
    const PushTrashtoDB = (NowCount, MatchingType, trash) => {
        const trashlength = trash.length;
        for (let i = 0; i < trashlength; i++) {
            let userTrash = {
                Nick: trash[i].Nick,
                Name: trash[i].Name,
                OriginalTicket: trash[i].OriginalTicket,
                NamTicket: trash[i].Ticket,
                MatchingNum: trash[i].MatchingCode.length,
            };
            db.collection(String(NowCount) + MatchingType + "trash")
                .add({
                    Trash: userTrash
                })
                .then(() => {
                    console.log("success[i]");
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    }
    //DB에 push해주는 함수
    const PushCoupletoDB = (NowCount, MatchingType, couple) => {
        const couplelength = couple[0].length;
        for (let i = 0; i < couplelength; i++) {
            let userOne = {
                Age: couple[0][i].Age,
                Gender: couple[0][i].Gender,
                Name: couple[0][i].Name,
                Nick: couple[0][i].Nick,
                Phone: couple[0][i].Phone,
                Univ: couple[0][i].Univ,
                Mbti: couple[0][i].Mbti,
                OriginalTicket: couple[0][i].OriginalTicket,
                Matchingnum: couple[0][i].MatchingCode.length,
                Unique_key: couple[0][i].Unique_key
            };
            let userTwo = {
                Age: couple[1][i].Age,
                Gender: couple[1][i].Gender,
                Name: couple[1][i].Name,
                Nick: couple[1][i].Nick,
                Phone: couple[1][i].Phone,
                Univ: couple[1][i].Univ,
                Mbti: couple[1][i].Mbti,
                OriginalTicket: couple[1][i].OriginalTicket,
                Matchingnum: couple[1][i].MatchingCode.length,
                Unique_key: couple[1][i].Unique_key
            };
            db.collection(String(NowCount) + MatchingType)
                .add({
                    stage: "zero",
                    userOne: userOne,
                    userTwo: userTwo,
                    거절한사람: "",
                    메세지보낸사람: ""
                })
                .then(() => {
                    console.log("success[i]");
                })
                .catch((error) => {
                    alert(error.message);
                });
        }

        alert(MatchingType + " 매칭 끝")
    };
    // Array비우는 함수
    const clearArray = (Alluser, Priority_Array, couple, trash) => {
        Alluser = [];
        Priority_Array = [[], [], []];
        couple = [[], []];
        trash = [];
    }
    const handleLilacmatch = () => {

        //이미 매칭되어있으면 하지말기
        const MatchingCollection_DB = String(nowCount) + "lilac"
        const MatchingCollection_Flosting = "Flosting_" + String(nowCount)

        db.collection(MatchingCollection_DB).get().then((querySnapshot) => {
            if (querySnapshot.size)
                alert("이미 매칭이 되어있음. DB확인해봐")
            else {
                let Alluser = [];
                let Priority_Array = [[], [], []]; //우선순위를 3단계로 둠.
                let couple = [[], []];
                let trash = [];
                MatchingSystem(MatchingCollection_Flosting, "Lilac", Alluser, Priority_Array, couple, trash);
            }
        })

    }
    const handleDaisymatch = () => {

        //이미 매칭되어있으면 하지말기
        const MatchingCollection_DB = String(nowCount) + "daisy"
        const MatchingCollection_Flosting = "Flosting_" + String(nowCount)

        db.collection(MatchingCollection_DB).get().then((querySnapshot) => {
            if (querySnapshot.size)
                alert("이미 매칭이 되어있음. DB확인해봐")
            else {
                let Alluser = [];
                let Priority_Array = [[], [], []]; //우선순위를 3단계로 둠.
                let couple = [[], []];
                let trash = [];
                MatchingSystem(MatchingCollection_Flosting, "Daisy", Alluser, Priority_Array, couple, trash);
            }
        })

    }
    const handleClovermatch = () => {

        //이미 매칭되어있으면 하지말기
        const MatchingCollection_DB = String(nowCount) + "clover"
        const MatchingCollection_Flosting = "Flosting_" + String(nowCount)

        db.collection(MatchingCollection_DB).get().then((querySnapshot) => {
            if (querySnapshot.size)
                alert("이미 매칭이 되어있음. DB확인해봐")
            else {
                let Alluser = [];
                let Priority_Array = [[], [], []]; //우선순위를 3단계로 둠.
                let couple = [[], []];
                let trash = [];
                MatchingSystem(MatchingCollection_Flosting, "Clover", Alluser, Priority_Array, couple, trash);
            }
        })

    }

    let lilaclist = [];
    let daisylist = [];
    let cloverlist = [];

    async function getallData() {
        const LilacCollection_DB = String(nowCount) + "lilac"

        const lilacdiv = await db.collection(LilacCollection_DB).get()
        try {
            lilacdiv.forEach((doc) => {
                let tempdic = {
                    userOneName: doc.data().userOne.Name,
                    userOneAge: doc.data().userOne.Age,
                    userOneNick: doc.data().userOne.Nick,
                    userOnePhone: doc.data().userOne.Phone,
                    userOneUniv: doc.data().userOne.Univ,
                    userOneTicket: doc.data().userOne.OriginalTicket,
                    userOneMatchingnum: String(doc.data().userOne.Matchingnum),
                    userTwoName: doc.data().userTwo.Name,
                    userTwoAge: doc.data().userTwo.Age,
                    userTwoNick: doc.data().userTwo.Nick,
                    userTwoPhone: doc.data().userTwo.Phone,
                    userTwoUniv: doc.data().userTwo.Univ,
                    userTwoTicket: doc.data().userTwo.OriginalTicket,
                    userTwoMatchingnum: String(doc.data().userTwo.Matchingnum),
                }
                lilaclist.push(tempdic)
            })
        } catch (err) { console.log(err) }
        const DaisyCollection_DB = String(nowCount) + "daisy"

        const daisydiv = await db.collection(DaisyCollection_DB).get()
        try {
            daisydiv.forEach((doc) => {
                let tempdic = {
                    userOneName: doc.data().userOne.Name,
                    userOneAge: doc.data().userOne.Age,
                    userOneNick: doc.data().userOne.Nick,
                    userOnePhone: doc.data().userOne.Phone,
                    userOneUniv: doc.data().userOne.Univ,
                    userOneTicket: doc.data().userOne.OriginalTicket,
                    userOneMatchingnum: String(doc.data().userOne.Matchingnum),
                    userTwoName: doc.data().userTwo.Name,
                    userTwoAge: doc.data().userTwo.Age,
                    userTwoNick: doc.data().userTwo.Nick,
                    userTwoPhone: doc.data().userTwo.Phone,
                    userTwoUniv: doc.data().userTwo.Univ,
                    userTwoTicket: doc.data().userTwo.OriginalTicket,
                    userTwoMatchingnum: String(doc.data().userTwo.Matchingnum),
                }
                daisylist.push(tempdic)
            })
        } catch (err) { console.log(err) }
        const CloverCollection_DB = String(nowCount) + "clover"

        const cloverdiv = await db.collection(CloverCollection_DB).get()
        try {
            cloverdiv.forEach((doc) => {
                console.log(doc.data().userOne);
                let tempdic = {
                    userOneName: doc.data().userOne.Name,
                    userOneAge: doc.data().userOne.Age,
                    userOneNick: doc.data().userOne.Nick,
                    userOnePhone: doc.data().userOne.Phone,
                    userOneUniv: doc.data().userOne.Univ,
                    userOneTicket: doc.data().userOne.OriginalTicket,
                    userOneMatchingnum: String(doc.data().userOne.Matchingnum),
                    userTwoName: doc.data().userTwo.Name,
                    userTwoAge: doc.data().userTwo.Age,
                    userTwoNick: doc.data().userTwo.Nick,
                    userTwoPhone: doc.data().userTwo.Phone,
                    userTwoUniv: doc.data().userTwo.Univ,
                    userTwoTicket: doc.data().userTwo.OriginalTicket,
                    userTwoMatchingnum: String(doc.data().userTwo.Matchingnum),

                }
                cloverlist.push(tempdic)
            })
        } catch (err) { console.log(err) }
    }
    const excelDownhandle = () => {

        getallData().then(_ => {
            const dataWS = xlsx.utils.json_to_sheet(lilaclist);
            const dataWS2 = xlsx.utils.json_to_sheet(daisylist);
            const dataWS3 = xlsx.utils.json_to_sheet(cloverlist);
            const wb = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(wb, dataWS, "Lilac");
            xlsx.utils.book_append_sheet(wb, dataWS2, "Daisy");
            xlsx.utils.book_append_sheet(wb, dataWS3, "Clover");
            xlsx.writeFile(wb, "Alarm.xlsx");
        })
    }

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <MatchingBox>
                    <MatchButton onClick={handleLilacmatch}>
                        LilacMatching
                    </MatchButton>
                    <li>남자 : {L_boy}</li>
                    <li>여자 : {L_girl}</li>
                    <li>총 인원 : {L_user}</li>
                    <li>커플 : {L_couple}</li>
                    <li>트레쉬행 : {L_trash}</li>
                </MatchingBox>
                <MatchingBox>
                    <MatchButton onClick={handleDaisymatch}>
                        DaisyMatching
                    </MatchButton>
                    <li>남자 : {D_boy}</li>
                    <li>여자 : {D_girl}</li>
                    <li>총 인원 : {D_user}</li>
                    <li>커플 : {D_couple}</li>
                    <li>트레쉬행 : {D_trash}</li>
                </MatchingBox>
                <MatchingBox>
                    <MatchButton onClick={handleClovermatch}>
                        CloverMatching
                    </MatchButton>
                    <li>남자 : {C_boy}</li>
                    <li>여자 : {C_girl}</li>
                    <li>총 인원 : {C_user}</li>
                    <li>커플 : {C_couple}</li>
                    <li>트레쉬행 : {C_trash}</li>
                </MatchingBox>
                <ExcelBtn onClick={excelDownhandle}>
                    {nowCount}회차 결과 다운
                </ExcelBtn>
            </Container>
        </ThemeProvider>
    );
}

export default MatchingManager2;