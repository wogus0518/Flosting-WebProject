import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../Register/LoginFire.js";
import DiscountManner from "../Matched/DiscountManner.js";
import styled from "styled-components";
import xlsx from "xlsx";
const db = firebase.firestore();

const Container = styled.div`
  text-align: center;
  .box {
    margin-top: 1rem;
    border-bottom: 1px solid black;
    div {
      margin-top: 1rem;
      margin-bottom: 1rem;
      button {
        width: 15rem;
        height: 3rem;
        background-color: red;
        border: none;
        border-radius: 15px;
      }
    }
  }
  .alarm {
    height: 8rem;
    border-bottom: 1px solid black;
    div {
      margin-top: 1rem;
    }
    button {
      width: 15rem;
      height: 3rem;
      background-color: red;
      border: none;
      border-radius: 15px;
    }
  }
  .매칭현황 {
    margin-top: 2rem;
    input {
      margin-top: 1rem;
      margin-bottom: 2rem;
      width: 12rem;
    }
  }
`;
function AdminBigFoot(props) {
  const { isManager } = props;
  let [진행중회차, 진행중회차변경] = useState();
  let [신청중회차, 신청중회차변경] = useState([]);
  let [마감시간, 마감시간변경] = useState();

  let [수정진행중회차, 수정진행중회차변경] = useState();
  let [수정신청중회차, 수정신청중회차변경] = useState([]);
  let [수정마감시간, 수정마감시간변경] = useState();

  let [회차, 회차변경] = useState();
  let [modal, setModal] = useState(false);
  let [클로버현황, 클로버현황변경] = useState();
  let [라일락현황, 라일락현황변경] = useState();
  let [데이지현황, 데이지현황변경] = useState();
  // let [cloverZero,setCloverZero] = useState(0);
  // let [cloverHalf,setCloverHalf] = useState(0);
  // let [cloverSuccess,setCloverSuccess] = useState(0);

  let alarmList = [];
  let userList = [];
  let cloverStage = [0, 0, 0, 0];
  let lilacStage = [0, 0, 0, 0];
  let daisyStage = [0, 0, 0, 0];

  const getVariableInfo = async () => {
    const snapShot = await db
      .collection("매칭결과변수")
      .doc("variableInfo")
      .get();
    try {
      진행중회차변경(snapShot.data()["진행중회차"]);
      마감시간변경(snapShot.data()["마감시간"]);
      신청중회차변경(snapShot.data()["신청중"]);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "마감시간") {
      수정마감시간변경(value);
    } else if (name === "진행중회차") {
      수정진행중회차변경(value);
    } else if (name === "신청중회차") {
      수정신청중회차변경(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    db.collection("매칭결과변수")
      .doc("variableInfo")
      .update({
        마감시간: 수정마감시간,
        신청중: 수정신청중회차,
        진행중회차: Number(수정진행중회차),
      })
      .then(() => {
        alert("데이터베이스 수정이 완료되었습니다!");
      });
  };
  async function getData() {
    const readAlarm = await db.collection("Alarm").get();
    try {
      readAlarm.forEach((doc) => {
        alarmList.push(doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserData() {
    const readAlarm = await db.collection("회원정보").get();
    try {
      readAlarm.forEach((doc) => {
        userList.push(doc.data().User);
      });
    } catch (err) {
      console.log(err);
    }
  }

  function getAlarmExcel() {
    getData().then((_) => {
      const dataWS = xlsx.utils.json_to_sheet(alarmList);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, dataWS, "알람신청리스트");
      xlsx.writeFile(wb, "Alarm.xlsx");
    });
  }

  function getUserExcel() {
    getUserData().then((_) => {
      const dataWS = xlsx.utils.json_to_sheet(userList); //데이터
      const wb = xlsx.utils.book_new(); // 새로운 시트
      xlsx.utils.book_append_sheet(wb, dataWS, "유저리스트");
      xlsx.writeFile(wb, "User.xlsx");
    });
  }

  const 회차업데이트 = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "회차") {
      회차변경(value);
    }
  };
  async function 클로버매칭현황조회() {
    const readClover = await db.collection(`${회차}clover`).get();
    try {
      readClover.forEach((doc) => {
        // console.log(doc.data().stage)
        if (doc.data().stage === "zero") {
          cloverStage[0] += 1;
        } else if (doc.data().stage === "half") {
          cloverStage[1] += 1;
        } else if (doc.data().stage === "success") {
          cloverStage[2] += 1;
        } else if (doc.data().stage === "end") {
          cloverStage[3] += 1;
        }
        // console.log(cloverStage)
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function 라일락매칭현황조회() {
    const readClover = await db.collection(`${회차}lilac`).get();
    try {
      readClover.forEach((doc) => {
        // console.log(doc.data().stage)
        if (doc.data().stage === "zero") {
          lilacStage[0] += 1;
        } else if (doc.data().stage === "half") {
          lilacStage[1] += 1;
        } else if (doc.data().stage === "success") {
          lilacStage[2] += 1;
        } else if (doc.data().stage === "end") {
          lilacStage[3] += 1;
        }
        // console.log(lilacStage)
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function 데이지매칭현황조회() {
    const readClover = await db.collection(`${회차}daisy`).get();
    try {
      readClover.forEach((doc) => {
        // console.log(doc.data().stage)
        if (doc.data().stage === "zero") {
          daisyStage[0] += 1;
        } else if (doc.data().stage === "half") {
          daisyStage[1] += 1;
        } else if (doc.data().stage === "success") {
          daisyStage[2] += 1;
        } else if (doc.data().stage === "end") {
          daisyStage[3] += 1;
        }
        // console.log(daisyStage)
      });
    } catch (err) {
      console.log(err);
    }
  }
  function 매칭현황조회() {
    클로버매칭현황조회();
    라일락매칭현황조회();
    데이지매칭현황조회();
    setTimeout(() => {
      클로버현황변경(cloverStage);
      라일락현황변경(lilacStage);
      데이지현황변경(daisyStage);
      setModal(true);
    }, 5000);
  }
  useEffect(() => {
    getVariableInfo();
  }, []);

  if (!isManager) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container>
        <div className="box">
          <h1>회차 DB 수정</h1>
          <div>
            매칭 마감시간: {마감시간}
            <br />
            매칭 진행중인 회차: {진행중회차}
            <br />
            신청 받고 있는 회차: {신청중회차}
            <br />
            <form onSubmit={onSubmit}>
              수정 마감시간:{" "}
              <input
                name="마감시간"
                value={수정마감시간}
                placeholder="마감시간"
                onChange={onChange}
              ></input>
              <div>{수정마감시간}</div>
              매칭 진행할 회차:{" "}
              <input
                name="진행중회차"
                value={수정진행중회차}
                placeholder="매칭 진행할 회차"
                onChange={onChange}
              ></input>
              <div>{수정진행중회차}</div>
              신청중회차:{" "}
              <input
                name="신청중회차"
                value={수정신청중회차}
                placeholder="신청중회차"
                onChange={onChange}
              ></input>
              <div>{수정신청중회차}</div>
              <button>데이터베이스 수정하기</button>
            </form>
          </div>
        </div>
        <div className="box">
          <h1>매너온도 차감</h1>
          <DiscountManner />
        </div>
        <div className="alarm">
          <h1>알람 신청 명단</h1>
          <div>
            <button onClick={getAlarmExcel}>엑셀 다운로드</button>
          </div>
        </div>
        <div className="alarm">
          <h1>유저 리스트</h1>
          <div>
            <button onClick={getUserExcel}>엑셀 다운로드</button>
          </div>
        </div>
        <div className="매칭현황">
          <h1>매칭 현황</h1>
          <div>
            <input
              name="회차"
              value={회차}
              onChange={회차업데이트}
              placeholder="조회할 회차를 입력해주세요"
            ></input>
            <button onClick={매칭현황조회}>{회차}회차 조회</button>
            {modal === true ? (
              <div>
                <h2>클로버</h2>총 매칭 수:{" "}
                {클로버현황[0] + 클로버현황[1] + 클로버현황[2] + 클로버현황[3]} <br />
                zero: {클로버현황[0]} <br />
                half: {클로버현황[1]} <br />
                ssuccess: {클로버현황[2]} <br />
                end: {클로버현황[3]} <br />
                매칭성공률:{" "}
                {(클로버현황[2] /
                  (클로버현황[0] + 클로버현황[1] + 클로버현황[2] + 클로버현황[3])) *
                  100}
                % <br />
                <br />
                <h2>라일락</h2>총 매칭 수:{" "}
                {라일락현황[0] + 라일락현황[1] + 라일락현황[2] + 라일락현황[3]} <br />
                zero: {라일락현황[0]} <br />
                half: {라일락현황[1]} <br />
                ssuccess: {라일락현황[2]} <br />
                end: {라일락현황[3]} <br />
                매칭성공률:{" "}
                {(라일락현황[2] /
                  (라일락현황[0] + 라일락현황[1] + 라일락현황[2] + 라일락현황[3])) *
                  100}
                % <br />
                <br />
                <h2>데이지</h2>총 매칭 수:{" "}
                {데이지현황[0] + 데이지현황[1] + 데이지현황[2] + 데이지현황[3]} <br />
                zero: {데이지현황[0]} <br />
                half: {데이지현황[1]} <br />
                ssuccess: {데이지현황[2]} <br />
                end: {데이지현황[3]} <br />
                매칭성공률:{" "}
                {(데이지현황[2] /
                  (데이지현황[0] + 데이지현황[1] + 데이지현황[2] + 데이지현황[3])) *
                  100}
                % <br />
              </div>
            ) : (
              <h3>조회버튼 누르고 5초 대기하면 결과 나옴</h3>
            )}
          </div>
        </div>
      </Container>
    );
  }
}
export default AdminBigFoot;

// async function 명단불러오기(){
//     const readSubmit = await db.collection(`Flosting_${회차}`).get()
//     try{
//         readSubmit.forEach((doc)=>{
//             console.log(doc.data().Clover.Ticket)
//             submitList.push(doc.data())
//         })
//     }catch(err){console.log(err)}
// }

// function getSubmitExcel(){
//     const dataWS = xlsx.utils.json_to_sheet(submitList);
//     const wb = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(wb, dataWS, "신청리스트");
//     xlsx.writeFile(wb, "SubmitList.xlsx");
// }
{
  /* <div className='submitList'>
                <h1>신청자 명단</h1>
                <div>
                    <input
                        name='회차'
                        value={회차}
                        onChange={회차업데이트}
                        placeholder="다운받을 회차를 입력해주세요"
                    ></input>
                    <button onClick={명단불러오기}>{회차}회차 신청자 명단 불러오기</button>
                    <button onClick={getSubmitExcel}>{회차}회차 신청자 명단 다운로드</button>
                </div>
            </div> */
}
