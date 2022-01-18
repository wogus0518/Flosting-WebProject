import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";
import fire from "../Register/LoginFire";
import SelectList from "./SelectList";
import Extraction from "./Extraction";

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

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  margin: 0rem 2rem;

  h1 {
    font-size: 1.5rem;
    margin-top: 2rem;
  }
`;
const School_number = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 2rem;
`;
const School_name = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 2rem;
`;

const School_title = styled.div`
  font-size: 1rem;
  color: "#828282";
  margin: 0.5rem 0rem;
`;
const School_content = styled.div`
  font-size: 0.5rem;
`;
const Error_message = styled.div`
  margin-left: 0.2rem;
  font-size: 0.5rem;
  color: ${(props) => (props.limitnum ? "#00AB6F" : "#EF0C00")};
`;

const RegButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${(props) => {
    if (props.register) return "none";
    else if (props.login) return "1px solid #E0BCC1";
  }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${(props) => {
    if (props.register) return "#E0BCC1";
    else if (props.login) return "#FFFFFF";
  }};
  color: ${(props) => {
    if (props.register) return "#FFFFFF";
    else if (props.login) return "#828282";
  }};
  opacity: ${(props) => {
    if (props.disabled) return "0.5";
    else return "1.0";
  }};
  cursor: ${(props) => {
    if (props.disabled) return "default";
    else return "pointer";
  }};
`;
const Input = styled.input`
  border: ${(props) =>
    props.limitnum ? "1px solid #A6A6A6" : "1px solid #EF0C00"};
  color: ${(props) =>
    props.limitnum ? (props.overlap ? "#A6A6A6" : "black") : "#EF0C00"};
  font-family: "Noto Sans KR", sans-serif;
  type: text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;
const Overlapbtn = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 8px;
  margin: 5px;
  border: ${(props) =>
    props.overlap ? "1px solid #00AB6F" : "1px solid #A6A6A6"};
  color: ${(props) => (props.overlap ? "#00AB6F" : "black")};
  width: 4rem;
  height: 2rem;
  font-size: 0.7rem;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Admin = (props) => {
  const user = props.User;
  const db = fire.firestore();
  const { isManager, setisManager } = props;
  const [nowCount, setnowCount] = useState("1");

  useEffect(() => {
    if (user) {
      let s_id = user.email.split("@");
      let Infodb = db.collection("Admin");
      let query = Infodb.where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size) {
            setisManager(true);
          } else {
            setisManager(false);
          }
        });
    } else {
      setisManager(false);
    }
  }, [user]);

  if (isManager) {
    return (
      <ThemeProvider theme={Colortheme}>
        <Container>
          <h1>관리자 페이지ver2.0</h1>
          <School_title>현재 진행중인 플로스팅</School_title>
          <SelectList nowCount={nowCount} setnowCount={setnowCount} />
          <Extraction nowCount={nowCount} />
        </Container>
        <NavLink to="/admin/bigfoot">
          <button>왕발 기능</button>
        </NavLink>
        <NavLink to="/admin/moneygiver">
          <button>입금자 확인 기능</button>
        </NavLink>
        <NavLink to="/admin/delete">
          <button>미입금자 처형</button>
        </NavLink>
        <NavLink to="/admin/owvwo">
          <button>승훈 기능</button>
        </NavLink>
        <NavLink to="/admin/jungboo">
          <button>정부 기능</button>
        </NavLink>
        <NavLink to="/admin/usersearch">
          <button>유저 검색</button>
        </NavLink>
        <NavLink to="/admin/now">
          <button>현재 상황</button>
        </NavLink>
        <NavLink to="/admin/money">
          <button>수금 상황</button>
        </NavLink>
      </ThemeProvider>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Admin;
