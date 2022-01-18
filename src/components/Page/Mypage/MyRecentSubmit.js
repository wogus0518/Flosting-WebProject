import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import firebase from "../Register/LoginFire.js";
import firebaseApp from "firebase/app";
const db = firebase.firestore();

const Colortheme = createMuiTheme({
  palette: {
    primary: {
      main: "#E0BCC1",
    },
  },
  typography: {
    fontSize: 10,
    fontWeightRegular: 700,
    fontFamily: "Noto Sans KR",
  },
});

const NoticeMessage = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.6rem;
`;
const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;

  h1 {
    font-size: 1.5rem;
  }
  .resubmitButton {
    background-color: rgb(255, 255, 255, 0.8);
    border: 2px solid rgb(255, 77, 35, 0.8);
    border-radius: 15px;
    color: rgb(255, 77, 35, 0.8);
    width: 8rem;
    height: 3rem;
    font-size: 1.2rem;
    font-weight: 700;
    &:hover {
      background-color: rgb(255, 77, 35, 0.8);
      color: rgb(255, 255, 255, 0.8);
    }
  }
  .cloverTingBox {
    h2 {
      font-size: 1.3rem;
    }
    color: rgb(0, 0, 0, 0.8);
    background-color: rgb(179, 214, 189, 0.1);
    border: 1px solid rgb(0, 0, 0, 0.05);
    border-radius: 15px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    margin-top: 0.5rem;

    .rowDivBox {
      display: flex;
      flex-direction: row;
      align-items: center;

      .conditionTitle {
        font-weight: 700;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid rgb(122, 86, 108, 0.5);
        background-color: rgb(255, 255, 255, 0.8);
        color: rgb(0, 0, 0, 0.8);
        font-size: 1.2rem;
      }

      .columnDivBox {
        .content {
          font-size: 0.8rem;
          font-weight: 500;
          border-bottom: 1px solid rgb(0, 0, 0, 0.2);
        }
        display: flex;
        flex-direction: column;
      }
    }
  }
  .daisyTingBox {
    h2 {
      font-size: 1.3rem;
    }
    color: rgb(0, 0, 0, 0.8);
    background-color: rgb(238, 236, 142, 0.1);
    border: 1px solid rgb(0, 0, 0, 0.05);
    border-radius: 15px;
    padding: 0.5rem;
    margin-bottom: 1rem;

    .rowDivBox {
      display: flex;
      flex-direction: row;
      align-items: center;

      .conditionTitle {
        font-weight: 700;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid rgb(122, 86, 108, 0.5);
        background-color: rgb(255, 255, 255, 0.8);
        color: rgb(0, 0, 0, 0.8);
        font-size: 1.2rem;
      }

      .columnDivBox {
        .content {
          font-size: 0.8rem;
          font-weight: 500;
          border-bottom: 1px solid rgb(0, 0, 0, 0.2);
        }
        display: flex;
        flex-direction: column;
      }
    }
  }
  .lilacTingBox {
    h2 {
      font-size: 1.3rem;
    }
    color: rgb(0, 0, 0, 0.8);
    background-color: rgb(255, 180, 224, 0.1);
    border: 1px solid rgb(0, 0, 0, 0.05);
    border-radius: 15px;
    padding: 0.5rem;
    margin-bottom: 1rem;

    .rowDivBox {
      display: flex;
      flex-direction: row;
      align-items: center;

      .conditionTitle {
        font-weight: 700;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid rgb(122, 86, 108, 0.5);
        background-color: rgb(255, 255, 255, 0.8);
        color: rgb(0, 0, 0, 0.8);
        font-size: 1.2rem;
      }

      .columnDivBox {
        .content {
          font-size: 0.8rem;
          font-weight: 500;
          border-bottom: 1px solid rgb(0, 0, 0, 0.2);
        }
        display: flex;
        flex-direction: column;
      }
    }
  }
  .입금전Box {
    h2 {
      font-size: 1.3rem;
    }
    color: rgb(0, 0, 0, 0.8);
    background-color: rgb(212, 94, 150, 0.1);
    border: 1px solid rgb(0, 0, 0, 0.05);
    border-radius: 15px;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  .입금후Box {
    h2 {
      font-size: 1.3rem;
    }
    color: rgb(0, 0, 0, 0.8);
    background-color: rgb(90, 82, 235, 0.1);
    border: 1px solid rgb(0, 0, 0, 0.05);
    border-radius: 15px;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  .미입금자Box {
    background-color: rgb(212, 94, 150, 0.1);
    color: red;
    border: 1px solid rgb(0, 0, 0, 0.05);
    border: 1px solid rgb(0, 0, 0, 0.05);
    border-radius: 15px;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
`;

function MyRecentSubmit(props) {
  let [몇회차, 몇회차변경] = useState();
  let [cloverAge, setCloverAge] = useState("");
  let [daisyAge, setDaisyAge] = useState("");
  let [lilacAge, setLilacAge] = useState("");
  let [cloverUniv, setCloverUniv] = useState();
  let [daisyUniv, setDaisyUniv] = useState();
  let [lilacUniv, setLilacUniv] = useState();
  let [memberInfoDocId, setMemberInfoDocId] = useState();
  let [submitDocId, setSubmitDocId] = useState();
  let [버튼상태, 버튼상태변경] = useState(false);
  let [havelilacTicket, sethavelilacTicket] = useState(false); //라일락 티켓이 있는지 없는지
  let [havedaisyTicket, sethavedaisyTicket] = useState(false); //데이지 티켓이 있는지 없는지
  let [havecloverTicket, sethavecloverTicket] = useState(false); //클로버 티켓이 있는지 없는지
  let [lilacTicketNumber, setlilacTicketNumber] = useState(); // lilac ticket number
  let [daisyTicketNumber, setdaisyTicketNumber] = useState(); // lilac ticket number
  let [cloverTicketNumber, setcloverTicketNumber] = useState(); // lilac ticket number
  let [paid, setPaid] = useState(); // 입금 했는지 안했는지
  let [cost, setCost] = useState(); // 입금해야하는 금액
  let 신청중회차 = [];

  // DB 현재 신청 중인 회차 변수 불러오는 함수
  const getVariableInfo = async () => {
    const snapShot = await db
      .collection("매칭결과변수")
      .doc("variableInfo")
      .get();
    try {
      신청중회차 = snapShot.data()["신청중"].split("/");
      버튼상태변경(신청중회차.includes(몇회차));
    } catch (err) {
      console.log(err);
    }
  };
  const findInSubmit = async () => {
    const snapShot = await db
      .collection(`Flosting_${몇회차}`)
      .where("ID", "==", props.user.email.split("@")[0])
      .get();
    try {
      snapShot.forEach((doc) => {
        setCloverAge(doc.data().Clover.Age);
        setCloverUniv(doc.data().Clover.Univ);
        setDaisyAge(doc.data().Daisy.Age);
        setDaisyUniv(doc.data().Daisy.Univ);
        setLilacAge(doc.data().Lilac.Age);
        setLilacUniv(doc.data().Lilac.Univ);
        sethavelilacTicket(doc.data().Lilac.Ticket);
        sethavedaisyTicket(doc.data().Daisy.Ticket);
        sethavecloverTicket(doc.data().Clover.Ticket);
        setlilacTicketNumber(doc.data().Lilac.TicketNumber);
        setdaisyTicketNumber(doc.data().Daisy.TicketNumber);
        setcloverTicketNumber(doc.data().Clover.TicketNumber);
        setPaid(doc.data().Paid);
        setCost(doc.data().Cost);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const prepareDelete = async () => {
    try {
      const getDocIdFromSubmit = await db
        .collection(`Flosting_${몇회차}`)
        .where("ID", "==", props.user.email.split("@")[0])
        .get();
      getDocIdFromSubmit.forEach((doc) => {
        setSubmitDocId(doc.id);
      });

      const getDocIdFromMemberInfo = await db
        .collection("회원정보")
        .where("ID", "==", props.user.email.split("@")[0])
        .get();
      getDocIdFromMemberInfo.forEach((doc) => {
        setMemberInfoDocId(doc.id);
        몇회차변경(doc.data()["Ongoing"]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onClick = async () => {
    try {
      await db
        .collection("회원정보")
        .doc(memberInfoDocId)
        .update({
          My_Usage_History: firebaseApp.firestore.FieldValue.arrayRemove(
            Number(몇회차)
          ),
          Ongoing: "",
        });

      await db.collection(`Flosting_${몇회차}`).doc(submitDocId).delete();

      alert("신청내역이 삭제되었습니다");
      window.location.href = "/my";
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVariableInfo();
    findInSubmit();
    prepareDelete();
  }, [cloverAge, daisyAge, lilacAge, cloverUniv, daisyUniv, lilacUniv, 몇회차]);

  return (
    <ThemeProvider theme={Colortheme}>
      <Container>
        <h1>최근신청내역</h1>
        <NoticeMessage>
          본인이 신청한 내역과 최근신청내역이 일치하지 않는다면 카카오 채널로
          문의해주세요!
        </NoticeMessage>
        <br />
        <h2>{몇회차}회차 신청 내역</h2>
        <div>
          {1000 > cost && !paid && (
            <div className="입금전Box">
              <h2>무료</h2>
              <NoticeMessage>
                현재 오픈 이벤트로 종류별 1개의 티켓은 무료입니다.
              </NoticeMessage>
            </div>
          )}
          {cost >= 1000 && !paid && (
            <div className="입금전Box">
              <h2>{cost}원 입금확인 전</h2>
              <NoticeMessage>
                입금계좌 : 농협 356-1499-7855-83 이상민(플로스컴패니)
              </NoticeMessage>
              <NoticeMessage>
                입금확인이 완료되기 전에만 취소 및 수정이 가능합니다.
              </NoticeMessage>
              <NoticeMessage>
                현재 오픈 이벤트로 종류별 1개의 티켓은 무료입니다.
              </NoticeMessage>
            </div>
          )}
          {cost >= 1000 && paid && (
            <div className="입금후Box">
              <h2>{cost}원 입금확인 완료!!</h2>
            </div>
          )}
          {버튼상태 == true &&
            !havelilacTicket &&
            !havecloverTicket &&
            !havedaisyTicket && (
              <div className="미입금자Box">
                <NoticeMessage>
                  {몇회차}회차 입금내역이 존재하지 않아 자동취소 되었습니다
                </NoticeMessage>
              </div>
            )}

          <div className="cloverTingBox">
            <h2>클로버팅</h2>
            <div className="rowDivBox">
              {havecloverTicket == true ? (
                <div className="conditionTitle">매칭 조건</div>
              ) : (
                ""
              )}
              <div className="columnDivBox">
                {cloverAge === "" ? (
                  ""
                ) : (
                  <div className="content">
                    나이 - {cloverAge === "dnt_M" ? "상관없음" : cloverAge}{" "}
                  </div>
                )}
                {cloverUniv === "dnt_M" && (
                  <div className="content">학교 - 학교 상관없음</div>
                )}
                {cloverUniv === "otherUniv" && (
                  <div className="content">학교 - 다른 학교만</div>
                )}
                {cloverUniv === "myUniv" && (
                  <div className="content">학교 - 같은 학교만</div>
                )}
                {havecloverTicket && (
                  <div className="content">티켓 - {cloverTicketNumber}장</div>
                )}
              </div>
            </div>
          </div>
          <div className="daisyTingBox">
            <h2>데이지팅</h2>
            <div className="rowDivBox">
              {havedaisyTicket == true ? (
                <div className="conditionTitle">매칭 조건</div>
              ) : (
                ""
              )}
              <div className="columnDivBox">
                {daisyAge === "" ? (
                  ""
                ) : (
                  <div className="content">
                    나이 - {daisyAge === "dnt_M" ? "상관없음" : daisyAge}
                  </div>
                )}
                {daisyUniv === "dnt_M" && (
                  <div className="content">학교 - 학교 상관없음</div>
                )}
                {daisyUniv === "otherUniv" && (
                  <div className="content">학교 - 다른 학교만</div>
                )}
                {daisyUniv === "myUniv" && (
                  <div className="content">학교 - 같은 학교만</div>
                )}
                {havedaisyTicket && (
                  <div className="content">티켓 - {daisyTicketNumber}장</div>
                )}
              </div>
            </div>
          </div>
          <div className="lilacTingBox">
            <h2>라일락팅</h2>
            <div className="rowDivBox">
              {havelilacTicket == true ? (
                <div className="conditionTitle">매칭 조건</div>
              ) : (
                ""
              )}
              <div className="columnDivBox">
                {lilacAge === "" ? (
                  ""
                ) : (
                  <div className="content">
                    나이 - {lilacAge === "dnt_M" ? "상관없음" : lilacAge}{" "}
                  </div>
                )}
                {lilacUniv === "dnt_M" && (
                  <div className="content">학교 - 학교 상관없음</div>
                )}
                {lilacUniv === "otherUniv" && (
                  <div className="content">학교 - 다른 학교만</div>
                )}
                {lilacUniv === "myUniv" && (
                  <div className="content">학교 - 같은 학교만</div>
                )}
                {havelilacTicket && (
                  <div className="content">티켓 - {lilacTicketNumber}장</div>
                )}
              </div>
            </div>
          </div>
          {버튼상태 &&
          !paid &&
          (havecloverTicket || havedaisyTicket || havelilacTicket) ? (
            <div>
              <button onClick={onClick} className="resubmitButton">
                신청취소
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default MyRecentSubmit;
