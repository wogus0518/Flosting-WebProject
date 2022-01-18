import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import firebase from '../Register/LoginFire.js'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import 폭죽 from "../../../images/폭죽.png";
import { DoubleArrow } from "@material-ui/icons";

const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 13,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const Bestfriendbox = styled.div`
    margin-top: 1rem;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction : column;
    img{
        height: 10rem;
    }
    .ImBF{
        position:relative;
        bottom: 9rem;
        font-size: 2rem;
        font-weight: 700;
    }

`
const MainContent = styled.div`
    display: flex;
    width: 20rem;
    flex-direction : column;
    list-style: none;
    .SubBar{
        margin : 1rem 0rem;
        padding-bottom : 1rem;
        display: flex;
        width: 100%;
        list-style: none;
        li{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            font-size : 2rem;
            color : rgb(80,80,80,1.0);
            border-bottom : 2px solid rgb(0,0,0,0.05);
        }
        a{
            display: flex;
            flex: 1;
        }
        .clicked{
            border-bottom : 2px solid rgb(0,0,0,0.2);
            font-weight: bold;
        }
    }
    .Noticecontent{
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }
    .Noticecontent2{
        font-size: 0.5rem;
    }
    .SelectBox{
        li{
            border-bottom : 1px solid rgb(0,0,0,0.4);
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding : 0 1rem;
        }
        margin-top : 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
`
const OneRow = styled.div`
    display : flex;
    flex-direction : row;
    width: 100%;
    border-bottom : 1px solid rgb(0,0,0, 0.1);
    height: 2rem;
    margin : 5px 0;
    .Nameblock{
        flex : 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size : 0.9rem;
        font-weight: 500;
    }
    .Percentblock{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size : 0.8rem;
    }
    .Graphblock{
        flex    : 4;
        display: flex;
        justify-content: center;
        align-items: center;

        .Graph{
            display: flex;
            flex-direction : row;
            align-items: center;
            border: 2px solid rgb(0,0,0,0.2);
            border-radius: 1.2rem;
            height: 1.2rem;
            width: 80%;
        }
    }

`;


const Bluepart = styled.div`
    width : ${props => props.percent}%;
    background: rgb(178,201,232,0.5);
    height: 1.2rem;
    border-top-left-radius: 1.2rem;
    border-bottom-left-radius: 1.2rem;
    border-top-right-radius: ${(props) => {
        if (props.percent === String(100)) return "1.2rem";
        else return "0";
    }};
    border-bottom-right-radius: ${(props) => {
        if (props.percent === String(100)) return "1.2rem";
        else return "0";
    }};
`
const Redpart = styled.div`
    width : ${props => props.percent}%;
    background: rgb(232,177,166,0.5);
    height: 1.2rem;
    border-top-right-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
    border-top-left-radius: ${(props) => {
        if (props.percent === String(100)) return "1.2rem";
        else return "0";
    }};
    border-bottom-left-radius: ${(props) => {
        if (props.percent === String(100)) return "1.2rem";
        else return "0";
    }};
`

function MBTIstatics() {
    const [newMbti, setnewMbti] = useState("X");
    const [goCount, setgoCount] = useState("");
    const [isSearch, setisSearch] = useState(false);
    const [RealArray, setRealArray] = useState([]);
    const [BF, setBF] = useState("");
    const db = firebase.firestore()

    const handleChange = (event) => {
        setnewMbti(event.target.value);
    };

    let MbTIEndArray = [
        { name: '선택안함', count: 0 },
        { name: 'INTJ', count: 0 },
        { name: 'INTP', count: 0 },
        { name: 'ENTJ', count: 0 },
        { name: 'ENTP', count: 0 },
        { name: 'INFJ', count: 0 },
        { name: 'INFP', count: 0 },
        { name: 'ENFJ', count: 0 },
        { name: 'ENFP', count: 0 },
        { name: 'ISTJ', count: 0 },
        { name: 'ISFJ', count: 0 },
        { name: 'ESTJ', count: 0 },
        { name: 'ESFJ', count: 0 },
        { name: 'ISTP', count: 0 },
        { name: 'ISFP', count: 0 },
        { name: 'ESTP', count: 0 },
        { name: 'ESFP', count: 0 }]
    let MbTISuccessArray = [
        { name: '선택안함', count: 0 },
        { name: 'INTJ', count: 0 },
        { name: 'INTP', count: 0 },
        { name: 'ENTJ', count: 0 },
        { name: 'ENTP', count: 0 },
        { name: 'INFJ', count: 0 },
        { name: 'INFP', count: 0 },
        { name: 'ENFJ', count: 0 },
        { name: 'ENFP', count: 0 },
        { name: 'ISTJ', count: 0 },
        { name: 'ISFJ', count: 0 },
        { name: 'ESTJ', count: 0 },
        { name: 'ESFJ', count: 0 },
        { name: 'ISTP', count: 0 },
        { name: 'ISFP', count: 0 },
        { name: 'ESTP', count: 0 },
        { name: 'ESFP', count: 0 }]
    let PercentArray = [
        { name: '선택안함', count: 0 },
        { name: 'INTJ', count: 0 },
        { name: 'INTP', count: 0 },
        { name: 'ENTJ', count: 0 },
        { name: 'ENTP', count: 0 },
        { name: 'INFJ', count: 0 },
        { name: 'INFP', count: 0 },
        { name: 'ENFJ', count: 0 },
        { name: 'ENFP', count: 0 },
        { name: 'ISTJ', count: 0 },
        { name: 'ISFJ', count: 0 },
        { name: 'ESTJ', count: 0 },
        { name: 'ESFJ', count: 0 },
        { name: 'ISTP', count: 0 },
        { name: 'ISFP', count: 0 },
        { name: 'ESTP', count: 0 },
        { name: 'ESFP', count: 0 }]

    const getCount = async () => {
        const snapShot = await db
            .collection("매칭결과변수")
            .doc("variableInfo")
            .get();
        try {
            setgoCount(snapShot.data().통계카운트 + 1);
        } catch (err) {
            console.log(err);
        }
    };
    const sortArray = async () => {
        PercentArray.sort(function (a, b) {
            return b["count"] - a["count"];
        });
    };
    const userChecker = async () => {

        for (let i = 1; i < goCount; i++) {
            const check_userOne_Lilac_End = await db.collection(`${String(i)}lilac`).where("stage", "==", "end").where("userOne.Mbti", "==", `${newMbti}`).get()
            try {
                check_userOne_Lilac_End.forEach((doc) => {
                    if (doc.data().userTwo.Mbti == "INTJ") {
                        MbTIEndArray[1].count += 1;
                    } else if (doc.data().userTwo.Mbti == "INTP") {
                        MbTIEndArray[2].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ENTJ") {
                        MbTIEndArray[3].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ENTP") {
                        MbTIEndArray[4].count += 1;
                    } else if (doc.data().userTwo.Mbti == "INFJ") {
                        MbTIEndArray[5].count += 1;
                    } else if (doc.data().userTwo.Mbti == "INFP") {
                        MbTIEndArray[6].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ENFJ") {
                        MbTIEndArray[7].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ENFP") {
                        MbTIEndArray[8].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ISTJ") {
                        MbTIEndArray[9].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ISFJ") {
                        MbTIEndArray[10].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ESTJ") {
                        MbTIEndArray[11].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ESFJ") {
                        MbTIEndArray[12].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ISTP") {
                        MbTIEndArray[13].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ISFP") {
                        MbTIEndArray[14].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ESTP") {
                        MbTIEndArray[15].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ESFP") {
                        MbTIEndArray[16].count += 1;
                    } else {
                        MbTIEndArray[0].count += 1;
                    }
                });
            } catch (err) { console.log(err) }

            const check_userTwo_Lilac_End = await db.collection(`${String(i)}lilac`).where("stage", "==", "end").where("userTwo.Mbti", "==", `${newMbti}`).get()
            try {
                check_userTwo_Lilac_End.forEach((doc) => {
                    if (doc.data().userOne.Mbti == "INTJ") {
                        MbTIEndArray[1].count += 1;
                    } else if (doc.data().userOne.Mbti == "INTP") {
                        MbTIEndArray[2].count += 1;
                    } else if (doc.data().userOne.Mbti == "ENTJ") {
                        MbTIEndArray[3].count += 1;
                    } else if (doc.data().userOne.Mbti == "ENTP") {
                        MbTIEndArray[4].count += 1;
                    } else if (doc.data().userOne.Mbti == "INFJ") {
                        MbTIEndArray[5].count += 1;
                    } else if (doc.data().userOne.Mbti == "INFP") {
                        MbTIEndArray[6].count += 1;
                    } else if (doc.data().userOne.Mbti == "ENFJ") {
                        MbTIEndArray[7].count += 1;
                    } else if (doc.data().userOne.Mbti == "ENFP") {
                        MbTIEndArray[8].count += 1;
                    } else if (doc.data().userOne.Mbti == "ISTJ") {
                        MbTIEndArray[9].count += 1;
                    } else if (doc.data().userOne.Mbti == "ISFJ") {
                        MbTIEndArray[10].count += 1;
                    } else if (doc.data().userOne.Mbti == "ESTJ") {
                        MbTIEndArray[11].count += 1;
                    } else if (doc.data().userOne.Mbti == "ESFJ") {
                        MbTIEndArray[12].count += 1;
                    } else if (doc.data().userOne.Mbti == "ISTP") {
                        MbTIEndArray[13].count += 1;
                    } else if (doc.data().userOne.Mbti == "ISFP") {
                        MbTIEndArray[14].count += 1;
                    } else if (doc.data().userOne.Mbti == "ESTP") {
                        MbTIEndArray[15].count += 1;
                    } else if (doc.data().userOne.Mbti == "ESFP") {
                        MbTIEndArray[16].count += 1;
                    } else {
                        MbTIEndArray[0].count += 1;
                    }
                });
            } catch (err) { console.log(err) }

            const check_userOne_Lilac_Success = await db.collection(`${String(i)}lilac`).where("stage", "==", "success").where("userOne.Mbti", "==", `${newMbti}`).get()
            try {
                check_userOne_Lilac_Success.forEach((doc) => {
                    if (doc.data().userTwo.Mbti == "INTJ") {
                        MbTISuccessArray[1].count += 1;
                    } else if (doc.data().userTwo.Mbti == "INTP") {
                        MbTISuccessArray[2].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ENTJ") {
                        MbTISuccessArray[3].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ENTP") {
                        MbTISuccessArray[4].count += 1;
                    } else if (doc.data().userTwo.Mbti == "INFJ") {
                        MbTISuccessArray[5].count += 1;
                    } else if (doc.data().userTwo.Mbti == "INFP") {
                        MbTISuccessArray[6].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ENFJ") {
                        MbTISuccessArray[7].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ENFP") {
                        MbTISuccessArray[8].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ISTJ") {
                        MbTISuccessArray[9].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ISFJ") {
                        MbTISuccessArray[10].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ESTJ") {
                        MbTISuccessArray[11].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ESFJ") {
                        MbTISuccessArray[12].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ISTP") {
                        MbTISuccessArray[13].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ISFP") {
                        MbTISuccessArray[14].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ESTP") {
                        MbTISuccessArray[15].count += 1;
                    } else if (doc.data().userTwo.Mbti == "ESFP") {
                        MbTISuccessArray[16].count += 1;
                    } else {
                        MbTISuccessArray[0].count += 1;
                    }
                });
            } catch (err) { console.log(err) }

            const check_userTwo_Lilac = await db.collection(`${String(i)}lilac`).where("stage", "==", "success").where("userTwo.Mbti", "==", `${newMbti}`).get()
            try {
                check_userTwo_Lilac.forEach((doc) => {
                    if (doc.data().userOne.Mbti == "INTJ") {
                        MbTISuccessArray[1].count += 1;
                    } else if (doc.data().userOne.Mbti == "INTP") {
                        MbTISuccessArray[2].count += 1;
                    } else if (doc.data().userOne.Mbti == "ENTJ") {
                        MbTISuccessArray[3].count += 1;
                    } else if (doc.data().userOne.Mbti == "ENTP") {
                        MbTISuccessArray[4].count += 1;
                    } else if (doc.data().userOne.Mbti == "INFJ") {
                        MbTISuccessArray[5].count += 1;
                    } else if (doc.data().userOne.Mbti == "INFP") {
                        MbTISuccessArray[6].count += 1;
                    } else if (doc.data().userOne.Mbti == "ENFJ") {
                        MbTISuccessArray[7].count += 1;
                    } else if (doc.data().userOne.Mbti == "ENFP") {
                        MbTISuccessArray[8].count += 1;
                    } else if (doc.data().userOne.Mbti == "ISTJ") {
                        MbTISuccessArray[9].count += 1;
                    } else if (doc.data().userOne.Mbti == "ISFJ") {
                        MbTISuccessArray[10].count += 1;
                    } else if (doc.data().userOne.Mbti == "ESTJ") {
                        MbTISuccessArray[11].count += 1;
                    } else if (doc.data().userOne.Mbti == "ESFJ") {
                        MbTISuccessArray[12].count += 1;
                    } else if (doc.data().userOne.Mbti == "ISTP") {
                        MbTISuccessArray[13].count += 1;
                    } else if (doc.data().userOne.Mbti == "ISFP") {
                        MbTISuccessArray[14].count += 1;
                    } else if (doc.data().userOne.Mbti == "ESTP") {
                        MbTISuccessArray[15].count += 1;
                    } else if (doc.data().userOne.Mbti == "ESFP") {
                        MbTISuccessArray[16].count += 1;
                    } else {
                        MbTISuccessArray[0].count += 1;
                    }
                });
            } catch (err) { console.log(err) }
        }

    }
    const calculateall = async () => {

        for (let i = 0; i < MbTIEndArray.length; i++) {
            let sum = MbTIEndArray[i].count + MbTISuccessArray[i].count;
            let result;
            if (sum == 0) {
                result = 0;
            } else {
                result = Number((MbTISuccessArray[i].count / sum).toFixed(2)) * 100;
            }
            PercentArray[i].count = result;
        }
    }

    const activeStyle = {
        color: '#505050',
        background: '#F2F2F2'
    };
    const noneactiveStyle = {
        textDecoration: 'none',
        color: '#505050'
    }

    useEffect(() => {
        getCount();
        if (goCount) {
            userChecker().then(_ => {
                calculateall().then(_ => {
                    sortArray().then(_ => {
                        setBF(PercentArray[0].name);
                        setRealArray(PercentArray);
                        setisSearch(true);
                    })
                })
            })
        }

    }, [newMbti])

    let worklist = RealArray.map(list =>
        <Fade bottom>
            <OneRow>
                <div className="Nameblock">
                    {list.name}
                </div>
                <div className="Percentblock">
                    {(list.count).toFixed(2)}%
                </div>
                <div className="Graphblock">
                    <div className="Graph">
                        <Bluepart percent={String(list.count)}>
                            &nbsp;
                        </Bluepart>
                        <Redpart percent={String(100 - list.count)}>
                            &nbsp;
                        </Redpart>
                    </div>
                </div>
            </OneRow>
        </Fade>
    )
    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <MainContent>
                    <Fade up>
                        <div className="SubBar">
                            <li className="clicked">
                                MBTI별
                            </li>
                            <NavLink exact to="/statistics/School" activeStyle={activeStyle} style={noneactiveStyle}>
                                <li>
                                    학교별
                                </li>
                            </NavLink>
                        </div>
                        <li className="Noticecontent">
                            MBTI별 매칭 성공률을 볼 수 있습니다.
                        </li>
                        <li className="Noticecontent2">
                            매칭 후 양측이 모두 답장했어요 버튼을 클릭한 비율을 계산한 통계입니다.
                            <br></br> 재미로 봐주세요!
                        </li>
                        <div className="SelectBox">
                            <li>
                                MBTI 선택
                            </li>
                            <Select
                                native
                                value={newMbti}
                                onChange={handleChange}
                                input={<Input id="demo-dialog-native" />}
                            >
                                <option value="">선택x</option>
                                <option value="INTJ">INTJ</option>
                                <option value="INTP">INTP</option>
                                <option value="ENTJ">ENTJ</option>
                                <option value="ENTP">ENTP</option>
                                <option value="INFJ">INFJ</option>
                                <option value="INFP">INFP</option>
                                <option value="ENFJ">ENFJ</option>
                                <option value="ENFP">ENFP</option>
                                <option value="ISTJ">ISTJ</option>
                                <option value="ISFJ">ISFJ</option>
                                <option value="ESTJ">ESTJ</option>
                                <option value="ESFJ">ESFJ</option>
                                <option value="ISTP">ISTP</option>
                                <option value="ISFP">ISFP</option>
                                <option value="ESTP">ESTP</option>
                                <option value="ESFP">ESFP</option>
                            </Select>
                        </div>
                    </Fade>
                    {
                        (isSearch) ? (
                            <Zoom>
                                <Bestfriendbox>
                                    <h1>최고의 짝궁</h1>
                                    <img src={폭죽}>

                                    </img>
                                    <li className="ImBF">{BF}</li>
                                </Bestfriendbox>
                            </Zoom>
                        ) : ("")
                    }
                    {
                        worklist
                    }
                </MainContent>
            </Container>
        </ThemeProvider>
    );
}
export default MBTIstatics;