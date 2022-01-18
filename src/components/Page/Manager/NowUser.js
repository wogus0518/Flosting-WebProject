import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';


const Container = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    list-style : none;
    .RowDiv{
        display: flex;
        flex-direction : row;
        .DivPar{
            h3{
                margin : 1rem 0;
            }
            display: flex;
            flex-direction : column;
            flex : 1;
            align-items : center;
            justify-content : center;
            width : 30rem;
        }
    }
    margin : 2rem 0;
`
const Table = styled.div`
    display: flex;
    flex-direction : column;
    
    .ColumnDiv{
        display: flex;
        flex-direction : row;
        .RowLeftDiv{
            display: flex;
            align-items : center;
            justify-content : center;
            width : 5rem;
            background : rgb(0,0,0, 0.05);
        }
        .RowDiv{
            width : 10rem;
            display: flex;
            flex-direction : column;
            border: 1px solid rgb(0,0,0,0.1);
            align-items : center;
            justify-content : center;
            padding : 5px;
            .PointDiv{
                padding : 10px;
                display: flex;
                align-items : center;
                justify-content : center;
            }
        }
    }
`
const ProfileTable = styled.div`
    display: flex;
    flex-direction : column;
    .Facebox{
        display: flex;
        align-items : center;
        justify-content : center;
        img{
            height: 20rem;
        }
    }
        .RowDiv{
            display: flex;
            .LeftDiv{
                width: 5rem;
                padding:  10px;
                display: flex;
                align-items : center;
                justify-content : center;
                background : rgb(0,0,0, 0.05);
                border-bottom : 1px solid rgb(0,0,0,0.2);
            }
            .RigtDiv{
                width : 20rem;
                padding : 10px;
                display: flex;
                align-items : center;
                justify-content : center;
                border-bottom : 1px solid rgb(0,0,0,0.2);
            }
        }
`
function UserSearch(props) {

    const { U_Data, Refresh } = props;
    const db = firebase.firestore()
    const [SubmitData, setSubmitData] = useState("없음")

    useEffect(() => {
        if (U_Data.Ongoing != 0) {
            const checkUserOne = db.collection(`Flosting_` + String(U_Data.Ongoing)).where("User.Nick", "==", U_Data.User.Nick).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setSubmitData(doc.data());
                    });
                })
        }

    }, [Refresh])

    return (
        <Container>
            <div className="RowDiv">
                <div className="DivPar">
                    <h3>
                        신청내역
                    </h3>
                    {(SubmitData === "없음") ? (<h3>신청 안함</h3>) : (
                        <Table>
                            <div className="ColumnDiv">
                                <div className="RowLeftDiv">
                                    Clover
                                </div>
                                <div className="RowDiv">
                                    <div className="PointDiv">
                                        Age : {(SubmitData.Clover.TicketNumber == 0) ? ("_") : (SubmitData.Clover.Age)}
                                    </div>
                                    <div className="PointDiv">
                                        Univ : {(SubmitData.Clover.TicketNumber == 0) ? ("_") : (SubmitData.Clover.Univ)}
                                    </div>
                                    <div className="PointDiv">
                                        Ticket 수 : {(SubmitData.Clover.TicketNumber == 0) ? ("0") : (SubmitData.Clover.Ticket)}
                                    </div>
                                </div>
                            </div>
                            <div className="ColumnDiv">
                                <div className="RowLeftDiv">
                                    Lilac
                                </div>
                                <div className="RowDiv">
                                    <div className="PointDiv">
                                        Age : {(SubmitData.Lilac.TicketNumber == 0) ? ("_") : (SubmitData.Lilac.Age)}
                                    </div>
                                    <div className="PointDiv">
                                        Univ : {(SubmitData.Lilac.TicketNumber == 0) ? ("_") : (SubmitData.Lilac.Univ)}
                                    </div>
                                    <div className="PointDiv">
                                        Ticket 수 : {(SubmitData.Lilac.TicketNumber == 0) ? ("0") : (SubmitData.Lilac.TicketNumber)}
                                    </div>
                                </div>
                            </div>
                            <div className="ColumnDiv">
                                <div className="RowLeftDiv">
                                    Daisy
                                </div>
                                <div className="RowDiv">
                                    <div className="PointDiv">
                                        Age : {(SubmitData.Daisy.TicketNumber == 0) ? ("_") : (SubmitData.Daisy.Age)}
                                    </div>
                                    <div className="PointDiv">
                                        Univ : {(SubmitData.Daisy.TicketNumber == 0) ? ("_") : (SubmitData.Daisy.Univ)}
                                    </div>
                                    <div className="PointDiv">
                                        Ticket 수 : {(SubmitData.Daisy.TicketNumber == 0) ? ("0") : (SubmitData.Daisy.TicketNumber)}
                                    </div>
                                </div>
                            </div>
                        </Table>
                    )}
                </div>
                <div className="DivPar">
                    <h3>
                        프로필 정보
                    </h3>
                    <ProfileTable>
                        <div className="Facebox">
                            <img src={U_Data.profileImage}>
                            </img>
                        </div>
                        <div className="RowDiv">
                            <div className="LeftDiv">
                                이름
                            </div>
                            <div className="RigtDiv">
                                {U_Data.User.Name}
                            </div>
                        </div>
                        <div className="RowDiv">
                            <div className="LeftDiv">
                                아이디
                            </div>
                            <div className="RigtDiv">
                                {U_Data.ID}
                            </div>
                        </div>
                        <div className="RowDiv">
                            <div className="LeftDiv">
                                나이
                            </div>
                            <div className="RigtDiv">
                                {U_Data.User.Age}
                            </div>
                        </div>
                        <div className="RowDiv">
                            <div className="LeftDiv">
                                학교
                            </div>
                            <div className="RigtDiv">
                                {U_Data.User.Univ}
                            </div>
                        </div>
                        <div className="RowDiv">
                            <div className="LeftDiv">
                                핸드폰번호
                            </div>
                            <div className="RigtDiv">
                                {U_Data.User.Phone}
                            </div>
                        </div>
                        <div className="RowDiv">
                            <div className="LeftDiv">
                                신청회차
                            </div>
                            <div className="RigtDiv">
                                {U_Data.Ongoing}
                            </div>
                        </div>
                        <div className="RowDiv">
                            <div className="LeftDiv">
                                돈 냄?
                            </div>
                            <div className="RigtDiv">
                                {(SubmitData === "없음") ? ("신청 안함") : (
                                    (SubmitData.Paid === true) ? ("냄") : ("안냄")
                                )}
                            </div>
                        </div>
                        <div className="RowDiv">
                            <div className="LeftDiv">
                                내야하는 돈
                            </div>
                            <div className="RigtDiv">
                                {(SubmitData === "없음") ? ("_") : (
                                    (SubmitData.Cost)
                                )}
                            </div>
                        </div>
                    </ProfileTable>
                </div>
            </div>
        </Container >
    )
}
export default UserSearch;

