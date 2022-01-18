import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire.js'
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { setNestedObjectValues } from 'formik';
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .ProfileWrap{
        display: flex;
    }
`

const Parent = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    flex-direction: row;
    margin-top: 1rem;
    color: black;
    border-bottom : 1px solid rgb(0,0,0,0.2);
    list-style : none;
    width: 24rem;
    .confirm{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 1;
        font-size : 0.6rem;
        text-decoration : underline;
        padding: 0.5rem;
    }
    .Nick{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 4;
        padding: 0.5rem;
        font-weight: 700;
        background : rgb(104,86,255,0.1)
    }
}
`

const Parent2 = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    flex-direction: row;
    margin-top: 1rem;
    color: black;
    border-bottom : 1px solid rgb(0,0,0, 0.2);
    list-style : none;
    width: 24rem;
    .confirm{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 1;
        font-size : 0.6rem;
        text-decoration : underline;
        padding: 0.5rem;
    }
    .Nick{
        display: flex;
        align-items : center;
        justify-content : center;
        flex: 4;
        padding: 0.5rem;
        font-weight: 700;
    }
}
`
const Stage = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    flex: 1;
    background: ${props => {
        if (props.stage == "zero") return 'rgb(0,0,0,0.1)';
        else if (props.stage == "half") return 'rgb(245,218,63,0.1)';
        else if (props.stage == "end") return 'rgb(245,114,107,0.8)';
        else return 'rgb(198,225,250,0.8)';
    }};
    padding: 0.5rem;
`

const Title = styled.div`
    display: flex;
    flex-direction : column;
    list-style: none;
    align-items : center;
    justify-content : center;
    width: 20rem;
    margin: 1rem 0rem;
    border-bottom : 1px solid rgb(0,0,0, 0.1);
    h1{
        font-size: 2rem;
    }
    .Notice{
        font-size : 0.7rem;
    }
    .TicketTitle{
        margin: 1rem;
        display: flex;
        flex-direction : column;
        border-right: 1px solid rgb(0,0,0, 0.1);
        border-bottom: 1px solid rgb(0,0,0, 0.1);
        .RowBox{
            display: flex;
            width: 15rem;
            flex-direction : row;
            .NameBox{
                background : rgb(0,0,0, 0.03);
                display :flex;
                flex: 3;
                align-items : center;
                justify-content : center;
                padding: 0.5rem;
                border-top : 1px solid rgb(0,0,0, 0.1);
                border-left : 1px solid rgb(0,0,0, 0.1);
                
            }
            .NumberBoxtop{
                display :flex;
                flex: 1;
                align-items : center;
                justify-content : center;
                border-top : 1px solid rgb(0,0,0, 0.1);
                border-left : 1px solid rgb(0,0,0, 0.1);
                background : rgb(104,86,255,0.1);
                li{
                    font-weight: 700;
                }
                .OriginalTicket{
                }
            }
            .NumberBoxbotom{
                display :flex;
                flex: 1;
                align-items : center;
                justify-content : center;
                border-top : 1px solid rgb(0,0,0, 0.1);
                border-left : 1px solid rgb(0,0,0, 0.1);
                li{
                    font-weight: 700;
                }
                .OriginalTicket{
                }
            }
        }
    }
`
function MatchingList(props) {

    const db = firebase.firestore()
    const user = props.User;
    const { sort } = useParams();

    let [TitleName, setTitleName] = useState();
    let [Ongoing, setOngoing] = useState();
    let [uniqueKey, setUniqueKey] = useState();
    let [OriginalTicket, setOriginalTicket] = useState();
    let [매칭결과배열, 매칭결과배열변경] = useState([]);
    let [매칭결과나머지배열, 매칭결과나머지배열변경] = useState([]);
    let copy매칭결과배열 = [];
    const [complete, setcomplete] = useState(false);

    useEffect(() => {
        controlTitle();
    }, [])

    function controlTitle() {
        if (sort == "lilac") {
            setTitleName("라일락")
        } else if (sort == "daisy") {
            setTitleName("데이지")
        } else {
            setTitleName("클로버")
        }
    }
    function controlStage() {
        if (sort == "lilac") {
            setTitleName("라일락")
        } else if (sort == "daisy") {
            setTitleName("데이지")
        } else {
            setTitleName("클로버")
        }
    }
    // 회원정보에서 user의 Ongoing & Nickname 읽어오는 함수
    const getUserOngoingAndNick = async () => {
        const snapShot = await db.collection('회원정보').where("ID", "==", user.email.split('@')[0]).get()
        try {
            snapShot.forEach((doc) => {
                setOngoing(doc.data()['Ongoing'])
                setUniqueKey(doc.data()['User']['Unique_key'])
            })
        } catch (err) { console.log(err) }
    }
    //유저의 닉네임과 일치하는 매칭결과 찾아오는 함수(1)
    const userChecker = async () => {
        const checkUserOne = await db.collection(`${Ongoing}${sort}`).where("userOne.Unique_key", "==", uniqueKey).get()
        try {
            checkUserOne.forEach((doc) => {
                setOriginalTicket(doc.data().userOne.OriginalTicket);
                if (doc.data()['stage'] == 'zero') {
                    copy매칭결과배열.push({
                        'StageView': "미확인",
                        'Nick': doc.data()['userTwo']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userTwo']['Unique_key'],
                        'DocId': doc.id
                    })
                } else if (doc.data()['stage'] == 'half') {
                    copy매칭결과배열.push({
                        'StageView': "대기중",
                        'Nick': doc.data()['userTwo']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userTwo']['Unique_key'],
                        'DocId': doc.id
                    })
                } else if (doc.data()['stage'] == 'success') {
                    copy매칭결과배열.push({
                        'StageView': "성공!",
                        'Nick': doc.data()['userTwo']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userTwo']['Unique_key'],
                        'DocId': doc.id
                    })
                } else {
                    copy매칭결과배열.push({
                        'StageView': "종료",
                        'Nick': doc.data()['userTwo']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userTwo']['Unique_key'],
                        'DocId': doc.id
                    })
                }
                setcomplete(true);
            });
        } catch (err) { console.log(err) }

        const checkUserTwo = await db.collection(`${Ongoing}${sort}`).where("userTwo.Unique_key", "==", uniqueKey).get()
        try {
            checkUserTwo.forEach((doc) => {
                setOriginalTicket(doc.data().userTwo.OriginalTicket);
                if (doc.data()['stage'] == 'zero') {
                    copy매칭결과배열.push({
                        'StageView': "미확인",
                        'Nick': doc.data()['userOne']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userOne']['Unique_key'],
                        'DocId': doc.id
                    })
                } else if (doc.data()['stage'] == 'half') {
                    copy매칭결과배열.push({
                        'StageView': "대기중",
                        'Nick': doc.data()['userOne']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userOne']['Unique_key'],
                        'DocId': doc.id
                    })
                } else if (doc.data()['stage'] == 'success') {
                    copy매칭결과배열.push({
                        'StageView': "성공!",
                        'Nick': doc.data()['userOne']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userOne']['Unique_key'],
                        'DocId': doc.id
                    })
                } else {
                    copy매칭결과배열.push({
                        'StageView': "종료",
                        'Nick': doc.data()['userOne']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userOne']['Unique_key'],
                        'DocId': doc.id
                    })
                }
            });
        } catch (err) { console.log(err) }
    }

    useEffect(() => {
        if (user) {
            getUserOngoingAndNick();
            if (Ongoing && uniqueKey) {
                userChecker().then(_ => {
                    console.log(copy매칭결과배열);
                    console.log(OriginalTicket);
                    매칭결과배열변경(copy매칭결과배열.slice(0, Number(OriginalTicket)));
                    매칭결과나머지배열변경(copy매칭결과배열.slice(Number(OriginalTicket)));
                })
            }
        }
    }, [user, Ongoing, uniqueKey, complete])

    let matchingList = 매칭결과배열.map(list =>
        <Fade bottom>
            <NavLink to={`/selectresult/${sort}/${Ongoing}/${list.DocId}`} style={{ textDecoration: 'none' }}>
                <Parent>
                    <div className="confirm">
                        확인하기
                    </div>
                    <div className="Nick">
                        <li>{list.Nick}</li>
                    </div>
                    <Stage stage={list.Stage}>
                        <li>{list.StageView}</li>
                    </Stage>
                </Parent>
            </NavLink>
        </Fade>
    )
    let matchingList2 = 매칭결과나머지배열.map(list =>
        <Fade bottom>
            <NavLink to={`/selectresult/${sort}/${Ongoing}/${list.DocId}`} style={{ textDecoration: 'none' }}>
                <Parent2>
                    <div className="confirm">
                        확인하기
                    </div>
                    <div className="Nick">
                        <li>{list.Nick}</li>
                    </div>
                    <Stage stage={list.Stage}>
                        <li>{list.StageView}</li>
                    </Stage>
                </Parent2>
            </NavLink>
        </Fade>
    )

    return (

        <Container>
            <Title>
                <h1>{TitleName}팅 매칭 결과</h1>
                <div className="TicketTitle">
                    <div className="RowBox">
                        <div className="NameBox">
                            <li>신청한 티켓 수</li>
                        </div>
                        <div className="NumberBoxtop">
                            <li className="OriginalTicket">{OriginalTicket}장</li>
                        </div>
                    </div>
                    <div className="RowBox">
                        <div className="NameBox">
                            <li>매칭된 사람</li>
                        </div>
                        <div className="NumberBoxbotom">
                            <li>{매칭결과배열.length + 매칭결과나머지배열.length}명</li>
                        </div>
                    </div>
                </div>
                <li className="Notice">
                    매칭된 상대방의 닉네임을 클릭하여, 번호를 확인해보세요!
                </li>
            </Title>
            {
                matchingList
            }
            {
                matchingList2
            }
        </Container>
    )
}
export default MatchingList;
