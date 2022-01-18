import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import fire from '../Register/LoginFire';
import lilac from "../../../images/003.png";
import daisy from "../../../images/004.png";
import clover from "../../../images/005.png";
import firebase from "firebase/app";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items : center;
    justify-content: center;
`

const Container = styled.div`    

    display: flex;
    flex-direction: column;
    align-items : center;
    .NameTitle{
        margin: 1rem 0rem;
        font-weight: 700;
        font-size: 1.5rem;
    }
`;

const PaymentContent = styled.div`
    @media all and (min-width:768px) {
        width: 30rem;
    }

    width: 100vw;
    border-top : 3px solid rgb(0,0,0, 1);

    .ButtonContent{
        display: flex;
        flex-direction : row;
        justify-content : center;
        align-items : center;
    }
    .RowFlex{
        display : flex;
        flex-direction: row;
        list-style: none;
        border-bottom : 1px solid rgb(0,0,0, 0.1);
        .TicketName{
            display: flex;
            align-items: center;
            justify-content : center;
            height: 3rem;
            flex: 5;
            li{
                @media all and (min-width:768px) {
                    font-size: 0.9rem;
                }
                font-size: 0.7rem;
            }
        }
        .TicketNum{
            display: flex;
            align-items: center;
            justify-content : center;
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 0.9rem;
                }
                font-size: 0.7rem;
            }
        }
        .Ticketdollar{
            display: flex;
            align-items: center;
            justify-content : center;
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 0.9rem;
                }
                font-size: 0.7rem;
            }
        }
        .TicketSum{
            display: flex;
            align-items: center;
            justify-content : center;
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 0.9rem;
                }
                font-size: 0.7rem;
            }
        }
        
    }
    .RowFlexTicket{
        display : flex;
        flex-direction: row;
        list-style: none;
        border-bottom : 1px solid rgb(0,0,0, 0.1);
        .TicketName{
            display: flex;
            align-items: center;
            justify-content : center;
            height: 7rem;
            flex: 5;
            img{
                height : 5rem;
                border : 1px solid rgb(0,0,0, 0.1);
            }
            li{
                margin : 0rem 1rem;
                font-weight : 500;
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.8rem;
            }
        }
        }
        .TicketNum{
            display: flex;
            align-items: center;
            justify-content : center;
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 0.8rem;
                }
                font-size: 0.7rem;
            }
        }
        .Ticketdollar{
            display: flex;
            align-items: center;
            justify-content : center;
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 0.8rem;
                }
                font-size: 0.7rem;
            }
        }
        .TicketSum{
            display: flex;
            align-items: center;
            justify-content : center;
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 0.8rem;
                }
                font-size: 0.7rem;
            }
        }
    }
`
const AllPaymentPyo = styled.div`
    margin : 2rem 0rem;
    display : flex;
    flex-direction : column;

    .RowTitle{
        list-style : none;
        height: 3rem;
        display: flex;
        flex-direction : row;
        .SelectNum{
            display: flex;
            justify-content : center;
            align-items : center;
            background : rgb(0,0,0, 0.04);
            border-top : 1px solid rgb(0,0,0, 0.2);
            border-left: 1px solid rgb(0,0,0, 0.2);
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.8rem;
            }
        }
        .SelectAllSum{
            display: flex;
            justify-content : center;
            align-items : center;
            background : rgb(0,0,0, 0.04);
            border-top : 1px solid rgb(0,0,0, 0.2);
            border-left: 1px solid rgb(0,0,0, 0.2);
            flex: 2;
            li{
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.8rem;
            }
        }
        .SelectDiscount{
            display: flex;
            justify-content : center;
            align-items : center;
            background : rgb(0,0,0, 0.04);
            border-top : 1px solid rgb(0,0,0, 0.2);
            border-left: 1px solid rgb(0,0,0, 0.2);
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.7rem;
            }
        }
        .SelectRealSum{
            display: flex;
            justify-content : center;
            align-items : center;
            background : rgb(0,0,0, 0.04);
            border-top : 1px solid rgb(0,0,0, 0.2);
            border-left: 1px solid rgb(0,0,0, 0.2);
            border-right: 1px solid rgb(0,0,0, 0.2);
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.7rem;
            }
        }
    }

    .RowContent{
        list-style : none;
        height: 5rem;
        display: flex;
        flex-direction : row;
        .SelectNum{
            display: flex;
            justify-content : center;
            align-items : center;
            border-top : 1px solid rgb(0,0,0, 0.2);
            border-left: 1px solid rgb(0,0,0, 0.2);
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            flex: 1;   
            li{
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.8rem;
            }         
        }
        .SelectAllSum{
            display: flex;
            justify-content : center;
            align-items : center;
            border-top : 1px solid rgb(0,0,0, 0.2);
            border-left: 1px solid rgb(0,0,0, 0.2);
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            flex: 2;
            li{
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.8rem;
            }   
        }
        .SelectDiscount{
            display: flex;
            justify-content : center;
            align-items : center;
            border-top : 1px solid rgb(0,0,0, 0.2);
            border-left: 1px solid rgb(0,0,0, 0.2);
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            flex: 1;
            li{
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.8rem;
            }   
        }
        .SelectRealSum{
            display: flex;
            justify-content : center;
            align-items : center;
            border-top : 1px solid rgb(0,0,0, 0.2);
            border-left: 1px solid rgb(0,0,0, 0.2);
            border-right: 1px solid rgb(0,0,0, 0.2);
            border-bottom: 1px solid rgb(0,0,0, 0.2);
            flex: 1;
            li{
                font-weight: 700;
                @media all and (min-width:768px) {
                    font-size: 1.0rem;
                }
                font-size: 0.8rem;
            }   
        }
    }


`
const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 0rem 1rem;
  border: ${props => {
        if (props.Fix) return 'none';
        else return '1px solid rgb(168,185,227)';
    }};
  border-radius: 5px;
  height: 3rem;
  width: 12rem;
  background-color: ${props => {
        if (props.Fix) return 'rgb(168,185,227)';
        else return 'rgb(255,255,255)';
    }};
  color: ${props => {
        if (props.Fix) return 'white';
        else return 'rgb(168,185,227)';
    }};
`;


function Payment(props) {
    const {
        EP_Num, User, ID,
        lilac_Age, setlilac_Age,
        lilac_Univ, setlilac_Univ,
        lilac_Ticket, setlilac_Ticket,
        lilac_Ticket_FT, setlilac_Ticket_FT,
        daisy_Age, setdaisy_Age,
        daisy_Univ, setdaisy_Univ,
        daisy_Ticket, setdaisy_Ticket,
        daisy_Ticket_FT, setdaisy_Ticket_FT,
        clover_Age, setclover_Age,
        clover_Univ, setclover_Univ,
        clover_Ticket, setclover_Ticket,
        clover_Ticket_FT, setclover_Ticket_FT,
        setPayment
    } = props;

    const db = fire.firestore();
    // redirect state
    const [OneClick, setOneClick] = useState(true);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [discountSum, setDiscountSum] = useState(0); // 할인금액 상태 저장
    const [AllSum, setAllsum] = useState(0);
    const [AllTicketNum, setAllTicketNum] = useState(0);
    let FinishSum = AllSum - discountSum;

    // 할인되는 금액이 얼마인지 판단하는 hook
    useEffect(() => {
        if (lilac_Ticket_FT) { setDiscountSum(cost => cost + 1000) }
        if (daisy_Ticket_FT) { setDiscountSum(cost => cost + 1000) }
        if (clover_Ticket_FT) { setDiscountSum(cost => cost + 1000) }

        if (lilac_Ticket_FT) { setAllsum(cost => cost + (Number(lilac_Ticket) * 1000)) }
        if (daisy_Ticket_FT) { setAllsum(cost => cost + (Number(daisy_Ticket) * 1000)) }
        if (clover_Ticket_FT) { setAllsum(cost => cost + (Number(clover_Ticket) * 1000)) }

        if (lilac_Ticket_FT) { setAllTicketNum(cost => cost + Number(lilac_Ticket)) }
        if (daisy_Ticket_FT) { setAllTicketNum(cost => cost + Number(daisy_Ticket)) }
        if (clover_Ticket_FT) { setAllTicketNum(cost => cost + Number(clover_Ticket)) }
    }, [])

    let lilacvalues = {
        Ticket: "",
        Univ: "",
        Age: "",
        TicketNumber: ""
    }
    let daisyvalues = {
        Ticket: "",
        Univ: "",
        Age: "",
        TicketNumber: ""
    }
    let clovervalues = {
        Ticket: "",
        Univ: "",
        Age: "",
        TicketNumber: ""
    }

    const handleFix = () => {
        setPayment(false);
    }
    const handleSubmit = () => {

        if (OneClick) {
            setOneClick(false);
            if (!lilac_Ticket_FT) {
                lilacvalues.Ticket = false;
                lilacvalues.Univ = "";
                lilacvalues.Age = "";
                lilacvalues.TicketNumber = "";
            } else {
                lilacvalues.Ticket = true;
                lilacvalues.Univ = lilac_Univ;
                lilacvalues.Age = lilac_Age;
                lilacvalues.TicketNumber = lilac_Ticket;
            }

            if (!daisy_Ticket_FT) {
                daisyvalues.Ticket = false;
                daisyvalues.Univ = "";
                daisyvalues.Age = "";
                daisyvalues.TicketNumber = "";
            } else {
                daisyvalues.Ticket = true;
                daisyvalues.Univ = daisy_Univ;
                daisyvalues.Age = daisy_Age;
                daisyvalues.TicketNumber = daisy_Ticket;
            }

            if (!clover_Ticket_FT) {
                clovervalues.Ticket = false;
                clovervalues.Univ = "";
                clovervalues.Age = "";
                clovervalues.TicketNumber = "";
            } else {
                clovervalues.Ticket = true;
                clovervalues.Univ = clover_Univ;
                clovervalues.Age = clover_Age;
                clovervalues.TicketNumber = clover_Ticket;
            }

            db.collection("Flosting_" + EP_Num)
                .add({
                    ID: ID,
                    User: User,
                    Lilac: lilacvalues,
                    Daisy: daisyvalues,
                    Clover: clovervalues,
                    Paid: false, // 돈 냈는지 안냈는지 알려주는 변수 추가
                    Cost: FinishSum // 얼마 내야하는지 최종 금액 데이터 추가
                })
                .then(() => {
                    alert("신청이 완료되었습니다.");
                    setSubmitSuccess(true);
                })
                .catch((error) => {
                    alert(error.message);
                });

            db.collection("회원정보")
                .where("ID", "==", ID)
                .get()
                .then((querySnapshot) => {
                    let docID;

                    if (querySnapshot) {
                        querySnapshot.forEach((doc) => {
                            docID = doc.id;
                        });
                    }

                    let batch = db.batch();
                    let updatedb = db.collection("회원정보").doc(docID);
                    batch.update(updatedb, {
                        My_Usage_History: firebase.firestore.FieldValue.arrayUnion(EP_Num),
                    });
                    batch.update(updatedb, { Ongoing: String(EP_Num) });
                    batch.commit().then(() => {
                        // console.log("good");
                    });
                });
        }
    }
    if (false) { return (<Redirect to='/register' />); }
    else if (submitSuccess) {
        return <Redirect to="/confirm" />;
    }
    else {
        return (
            <Wrapper>
                <Container>
                    <h1 className="NameTitle">
                        티켓주문
                    </h1>
                    <PaymentContent>
                        <div className="RowFlex">
                            <div className="TicketName">
                                <li>
                                    티켓 이름
                                </li>
                            </div>
                            <div className="TicketNum">
                                <li>
                                    티켓 수량
                                </li>
                            </div>
                            <div className="Ticketdollar">
                                <li>
                                    단가
                                </li>
                            </div>
                            <div className="TicketSum">
                                <li>
                                    합계
                                </li>
                            </div>
                        </div>
                        <div className="RowFlexTicket">
                            <div className="TicketName">
                                <img src={lilac} />
                                <li>Lilac티켓</li>
                            </div>
                            <div className="TicketNum">
                                <li>
                                    {(lilac_Ticket_FT) ? lilac_Ticket : 0}
                                </li>
                            </div>
                            <div className="Ticketdollar">
                                <li>
                                    1,000
                                </li>
                            </div>
                            <div className="TicketSum">
                                <li>
                                    {(lilac_Ticket_FT) ? Number(lilac_Ticket) * 1000 : 0}
                                </li>
                            </div>
                        </div>
                        <div className="RowFlexTicket">
                            <div className="TicketName">
                                <img src={daisy} />
                                <li>Daisy티켓</li>
                            </div>
                            <div className="TicketNum">
                                <li>
                                    {(daisy_Ticket_FT) ? daisy_Ticket : 0}
                                </li>
                            </div>
                            <div className="Ticketdollar">
                                <li>
                                    1,000
                                </li>
                            </div>
                            <div className="TicketSum">
                                <li>
                                    {(daisy_Ticket_FT) ? Number(daisy_Ticket) * 1000 : 0}
                                </li>
                            </div>
                        </div>
                        <div className="RowFlexTicket">
                            <div className="TicketName">
                                <img src={clover} />
                                <li>Clover티켓</li>
                            </div>
                            <div className="TicketNum">
                                <li>
                                    {(clover_Ticket_FT) ? clover_Ticket : 0}
                                </li>
                            </div>
                            <div className="Ticketdollar">
                                <li>
                                    1,000
                                </li>
                            </div>
                            <div className="TicketSum">
                                <li>
                                    {(clover_Ticket_FT) ? Number(clover_Ticket) * 1000 : 0}
                                </li>
                            </div>
                        </div>
                        <AllPaymentPyo>
                            <div className="RowTitle">
                                <div className="SelectNum">
                                    <li>
                                        선택 티켓수
                                    </li>
                                </div>
                                <div className="SelectAllSum">
                                    <li>
                                        총 합계
                                    </li>
                                </div>
                                <div className="SelectDiscount">
                                    <li>
                                        총 할인금액
                                    </li>
                                </div>
                                <div className="SelectRealSum">
                                    <li>
                                        총 주문금액
                                    </li>
                                </div>
                            </div>
                            <div className="RowContent">
                                <div className="SelectNum">
                                    <li>
                                        {AllTicketNum}
                                    </li>
                                </div>
                                <div className="SelectAllSum">
                                    <li>
                                        {/* 숫자 세자릿 수 콤마 찍는 최적화된 방법이라 생각함(String변수 생성 필요없이) */}
                                        {AllSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </li>
                                </div>
                                <div className="SelectDiscount">
                                    <li>
                                        {discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </li>
                                </div>
                                <div className="SelectRealSum">
                                    <li>
                                        {FinishSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </li>
                                </div>
                            </div>
                        </AllPaymentPyo>
                        <div className="ButtonContent">
                            <Button Fix={false} onClick={handleFix}>
                                수정하기
                            </Button>
                            <Button Fix={true} onClick={handleSubmit}>
                                제출하기
                            </Button>
                        </div>
                    </PaymentContent>
                </Container>
            </Wrapper>

        );
    }
}


export default Payment;