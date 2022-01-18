import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../Footer.js";
import { NavLink } from "react-router-dom";
import Fade from "react-reveal/Fade";
import fire from "../Register/LoginFire";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
  left: 0;
  width: 100%;
  height: 40rem;
  align-items: center;
  background-color: white;
  list-style: none;
  .clickhere {
    font-weight: 700;
  }
`;
const 제목 = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  font-weight: bolder;
`;

const 요소wrap = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const 요소btn = styled.button`
  color: rgb(0, 0, 0, 0.9);
  padding: 5px;
  width: 17rem;
  border-radius: 15px;
  border: 1px solid rgb(125, 200, 224, 0.5);
  background-color: rgb(125, 200, 224, 0.1);
  list-style: none;
  .EP_Num {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    font-size: 0.8rem;
    text-decoration: underline;
  }
  .EP_Region {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    font-size: 1.2rem;
  }
  .EP_School_Name {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    font-size: 1.1rem;
  }
  &:hover{
    background-color: rgb(125, 200, 224, 0.8);
    color: rgb(255,255,255,1.0);
`;
const 알림wrap = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const 알림btn = styled.button`
  color: rgb(173,115,240,0.8);
  padding: 5px;
  width: 15rem;
  border-radius: 10px;
  border: 2px solid rgb(173,115,240,0.8);
  background-color: rgb(255,255,255,0.5);
  font-family: 'Do Hyeon', sans-serif;
  margin: 10px;
  &:hover{
    background-color: rgb(173,115,240,0.8);
    color: rgb(255,255,255,0.8);
`;

const CurrentEvent = (props) => {
  const user = props.User;
  const dbUser = [
    {
      Age: "",
      Gender: "",
      Manner: "",
      Nick: "",
      Phone: "",
      Univ: "",
    },
  ];
  const [User, setUser] = useState(dbUser);
  const db = fire.firestore();
  useEffect(() => {
    if (user) {
      const s_id = user.email.split("@");
      db.collection("회원정보")
        .where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              setUser(doc.data().User);
            });
          } else {
            // console.log("데이터없어");
          }
        });
    }
  }, [user]);

  return (
    <div>
      <Container>
        <Title 제목={제목} />
        <Fade bottom>
          <NavLink to="/currentevent/EP">
            {/* <Buttoncontent
              {...props}
              요소wrap={요소wrap}
              요소btn={요소btn}
              School_Name={[
                "강남대학교",
                "단국대학교 죽전캠퍼스",
                "가천대학교",
                "을지대학교 성남캠퍼스",
              ]}
              Region="성남&용인권"
              Num={1}
              Start_Day="0824"
              End_Day="0827"
              Result_Day="0828"
            /> */}
            {/* <Buttoncontent
              {...props}
              요소wrap={요소wrap}
              요소btn={요소btn}
              School_Name={[
                "단국대학교 천안캠퍼스",
                "상명대학교 천안캠퍼스",
                "순천향대학교",
                "백석대학교",
                "선문대학교",
                "호서대학교",
              ]}
              Region="충남권"
              Num={2}
              Start_Day="0831"
              End_Day="0903"
              Result_Day="0904"
            /> */}
            <Buttoncontent
              {...props}
              요소wrap={요소wrap}
              요소btn={요소btn}
              School_Name={[
                "건국대학교 서울캠퍼스",
                "중앙대학교 서울캠퍼스",
                "세종대학교",
                "숭실대학교",
              ]}
              Region="동작구, 광진구"
              Num={3}
              Start_Day="0907"
              End_Day="0910"
              Result_Day="0911"
            />
          </NavLink>
          <li className="clickhere">👆원하시는 회차를 클릭해주세요!!👆</li>
        </Fade>
        <Fade bottom>
          <NavLink to="/currentevent/alarm">
            <알람신청 알림wrap={알림wrap} 알림btn={알림btn} />
          </NavLink>
        </Fade>

        <Footer />
      </Container>
    </div>
  );
};
export default CurrentEvent;

function Title({ 제목 }) {
  return <제목>현재 진행중인 학교들</제목>;
}

function Buttoncontent(props) {
  const handleallprops = () => {
    setEP_Num(Num);
    setEP_Start_Day(Start_Day);
    setEP_School_Name(School_Name);
    setEP_End_Day(End_Day);
    setEP_Result_Day(Result_Day);
    setEP_Region(Region);
  };
  const {
    setEP_School_Name,
    setEP_Num,
    setEP_Start_Day,
    setEP_End_Day,
    setEP_Result_Day,
    setEP_Region,
  } = props;

  const { School_Name, Num, Start_Day, End_Day, Result_Day, Region } = props;

  return (
    <요소wrap>
      <요소btn Num={1} School_Name={School_Name} onClick={handleallprops}>
        <li className="EP_Num">{Num}회차</li>
        <li className="EP_Region">{Region}</li>
        {School_Name_Rendering(School_Name)}
      </요소btn>
    </요소wrap>
  );
}

const School_Name_Rendering = (School_Name) => {
  const result = [];
  let length = School_Name.length;
  for (let i = 0; i < length; i++) {
    result.push(
      <h1 key={i} className="EP_School_Name">
        {School_Name[i]}{" "}
      </h1>
    );
  }
  return result;
};

function 알람신청({ 알림wrap, 알림btn }) {
  return (
    <알림wrap>
      <알림btn>우리학교 알림 신청하기</알림btn>
    </알림wrap>
  );
}
