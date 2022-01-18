import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import firebase from '../Register/LoginFire.js'
import { Redirect } from 'react-router-dom';

const db = firebase.firestore()

const Box = styled.div`
display: flex;
align-items: center;
justify-content : center;
border: 1px solid black;
height: 5rem;
maring-top: 1rem
`
const SearchBox = styled.div`
display: flex;
align-items: center;
justify-content : center;
border: 1px solid black;
height: 5rem;
maring-top: 1rem
`
const Info = styled.div`
width: 70%;
font-size: 1.5rem;

`
const Btn = styled.button`
width: 5rem;
height: 3rem;

`


function AdminCheckMoneyGiver(props) {

    let [신청중회차arr, 신청중회차arr변경] = useState(null);
    let [미입금자명단, 미입금자명단변경] = useState();
    let [ready, setReady] = useState();
    let [새로고침, 새로고침변경] = useState(false);
    let [검색어, 검색어변경] = useState();
    let [검색결과, 검색결과변경] = useState();

    let 미입금자들 = []
    let arry = [];

    const { isManager } = props;
    // DB에서 필요한 변수 불러오는 함수
    async function getVariableInfo() {
        await db.collection('매칭결과변수').doc('variableInfo').get().then((doc) => {
            신청중회차arr변경(doc.data()['신청중'].split("/"));
        })
    }

    const aLoop = () => {
        신청중회차arr.map((회차) => {
            checking(회차)
        })
    }
    async function checking(회차) {
        await db.collection(`Flosting_${회차}`).where("Paid", "==", false).get().then((snapShot) => {
            snapShot.forEach((doc) => {
                if (doc.data().Cost > 0) {
                    미입금자들.push({
                        '회차': 회차,
                        '이름': doc.data().User.Name,
                        '금액': doc.data().Cost,
                        '번호': doc.id
                    });
                }
            })
            미입금자명단변경(미입금자들)
        })
    }
    useEffect(() => {
        getVariableInfo()
    }, [])

    useEffect(() => {
        if (신청중회차arr) {
            aLoop()
        }
    }, [신청중회차arr, 새로고침])

    useEffect(() => {
        if (미입금자명단) {
            setReady(true)
        }

        if (새로고침) {
            console.log('refresh');
        }
    }, [미입금자명단, 새로고침])

    useEffect(() => {
        if (미입금자명단) {
            미입금자명단.filter((data) => {
                if (data.이름.toLowerCase().includes(검색어.toLowerCase())) {
                    return data
                } else if (검색어 == "") { console.log('없어') }
            }).map(data => {
                arry.push(data)
            })
            검색결과변경(arry)
        }
    }, [검색어])

    if (!isManager) {
        return (<Redirect to='/' />);
    } else {
        return (
            <div>
                {
                    ready ?
                        <div>
                            미입금자 명단<br />
                            {신청중회차arr[0]} , {신청중회차arr[1]} , {신청중회차arr[2]}회차에서 명단 추려냄
                            <input
                                name='search'
                                value={검색어}
                                onChange={function onChange(e) { 검색어변경(e.target.value) }}
                            />
                            {
                                검색결과 ?
                                    검색결과.map((list, idx) => {
                                        return <Listsearch 새로고침변경={새로고침변경} list={list} key={idx} />
                                    })
                                    : null
                            }
                            {
                                검색결과 ?
                                    null
                                    :
                                    미입금자명단.map((list, idx) => {
                                        return <List 새로고침변경={새로고침변경} list={list} key={idx} />
                                    })
                            }
                        </div>
                        : null
                }
            </div>
        )
    }
}

function Listsearch(props) {
    let list = props.list

    function onClick() {
        const result = window.confirm(`${list.이름} : ${list.금액} 맞아?`);
        if (result) {
            db.collection(`Flosting_${list.회차}`).doc(list.번호).update({
                Paid: true
            })
                .then(() => {
                    props.새로고침변경(true);
                })
        } else { }
    }

    return (
        <SearchBox>
            <Info>
                {list.회차}회차) {list.이름} : {list.금액}원
            </Info>
            <Btn onClick={onClick}>확인</Btn>
        </SearchBox>
    )
}


function List(props) {
    let list = props.list

    function onClick() {
        const result = window.confirm(`${list.이름} : ${list.금액} 맞아?`);
        if (result) {
            db.collection(`Flosting_${list.회차}`).doc(list.번호).update({
                Paid: true
            })
                .then(() => {
                    props.새로고침변경(true);
                })
        } else { }
    }

    return (
        <Box>
            <Info>
                {list.회차}회차) {list.이름} : {list.금액}원
            </Info>
            <Btn onClick={onClick}>확인</Btn>
        </Box>
    )
}
export default AdminCheckMoneyGiver;