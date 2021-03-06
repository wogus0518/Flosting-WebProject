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
    let [??????????????????, ????????????????????????] = useState([]);
    let [???????????????????????????, ?????????????????????????????????] = useState([]);
    let copy?????????????????? = [];
    const [complete, setcomplete] = useState(false);

    useEffect(() => {
        controlTitle();
    }, [])

    function controlTitle() {
        if (sort == "lilac") {
            setTitleName("?????????")
        } else if (sort == "daisy") {
            setTitleName("?????????")
        } else {
            setTitleName("?????????")
        }
    }
    function controlStage() {
        if (sort == "lilac") {
            setTitleName("?????????")
        } else if (sort == "daisy") {
            setTitleName("?????????")
        } else {
            setTitleName("?????????")
        }
    }
    // ?????????????????? user??? Ongoing & Nickname ???????????? ??????
    const getUserOngoingAndNick = async () => {
        const snapShot = await db.collection('????????????').where("ID", "==", user.email.split('@')[0]).get()
        try {
            snapShot.forEach((doc) => {
                setOngoing(doc.data()['Ongoing'])
                setUniqueKey(doc.data()['User']['Unique_key'])
            })
        } catch (err) { console.log(err) }
    }
    //????????? ???????????? ???????????? ???????????? ???????????? ??????(1)
    const userChecker = async () => {
        const checkUserOne = await db.collection(`${Ongoing}${sort}`).where("userOne.Unique_key", "==", uniqueKey).get()
        try {
            checkUserOne.forEach((doc) => {
                setOriginalTicket(doc.data().userOne.OriginalTicket);
                if (doc.data()['stage'] == 'zero') {
                    copy??????????????????.push({
                        'StageView': "?????????",
                        'Nick': doc.data()['userTwo']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userTwo']['Unique_key'],
                        'DocId': doc.id
                    })
                } else if (doc.data()['stage'] == 'half') {
                    copy??????????????????.push({
                        'StageView': "?????????",
                        'Nick': doc.data()['userTwo']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userTwo']['Unique_key'],
                        'DocId': doc.id
                    })
                } else if (doc.data()['stage'] == 'success') {
                    copy??????????????????.push({
                        'StageView': "??????!",
                        'Nick': doc.data()['userTwo']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userTwo']['Unique_key'],
                        'DocId': doc.id
                    })
                } else {
                    copy??????????????????.push({
                        'StageView': "??????",
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
                    copy??????????????????.push({
                        'StageView': "?????????",
                        'Nick': doc.data()['userOne']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userOne']['Unique_key'],
                        'DocId': doc.id
                    })
                } else if (doc.data()['stage'] == 'half') {
                    copy??????????????????.push({
                        'StageView': "?????????",
                        'Nick': doc.data()['userOne']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userOne']['Unique_key'],
                        'DocId': doc.id
                    })
                } else if (doc.data()['stage'] == 'success') {
                    copy??????????????????.push({
                        'StageView': "??????!",
                        'Nick': doc.data()['userOne']['Nick'],
                        'Stage': doc.data()['stage'],
                        'Unique_key': doc.data()['userOne']['Unique_key'],
                        'DocId': doc.id
                    })
                } else {
                    copy??????????????????.push({
                        'StageView': "??????",
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
                    console.log(copy??????????????????);
                    console.log(OriginalTicket);
                    ????????????????????????(copy??????????????????.slice(0, Number(OriginalTicket)));
                    ?????????????????????????????????(copy??????????????????.slice(Number(OriginalTicket)));
                })
            }
        }
    }, [user, Ongoing, uniqueKey, complete])

    let matchingList = ??????????????????.map(list =>
        <Fade bottom>
            <NavLink to={`/selectresult/${sort}/${Ongoing}/${list.DocId}`} style={{ textDecoration: 'none' }}>
                <Parent>
                    <div className="confirm">
                        ????????????
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
    let matchingList2 = ???????????????????????????.map(list =>
        <Fade bottom>
            <NavLink to={`/selectresult/${sort}/${Ongoing}/${list.DocId}`} style={{ textDecoration: 'none' }}>
                <Parent2>
                    <div className="confirm">
                        ????????????
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
                <h1>{TitleName}??? ?????? ??????</h1>
                <div className="TicketTitle">
                    <div className="RowBox">
                        <div className="NameBox">
                            <li>????????? ?????? ???</li>
                        </div>
                        <div className="NumberBoxtop">
                            <li className="OriginalTicket">{OriginalTicket}???</li>
                        </div>
                    </div>
                    <div className="RowBox">
                        <div className="NameBox">
                            <li>????????? ??????</li>
                        </div>
                        <div className="NumberBoxbotom">
                            <li>{??????????????????.length + ???????????????????????????.length}???</li>
                        </div>
                    </div>
                </div>
                <li className="Notice">
                    ????????? ???????????? ???????????? ????????????, ????????? ??????????????????!
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
