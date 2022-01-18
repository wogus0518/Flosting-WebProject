import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Lilac_Table from "./Lilac_Table";
import Table from "./Table";
import fire from "../../Register/LoginFire";
import { forEach } from "property-expr";

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
`;

const Usage_main = (props) => {
  const UserID = props.ID;
  const UserHistory = props.UserHistory;
  const User = props.User;
  const UserNick = props.UserNick;
  const [ID, setID] = useState("");
  const [DocID, setDocID] = useState("");
  const db = fire.firestore();
  const [userHistory, setUserHistory] = useState();

  // useEffect(() => {
  //   if (User) {
  //     const s_id = User.email.split("@");
  //     db.collection("회원정보")
  //       .where("ID", "==", s_id[0])
  //       .get()
  //       .then((querySnapshot) => {
  //         if (querySnapshot) {
  //           querySnapshot.forEach((doc) => {
  //             setID(s_id[0]);
  //             setDocID(doc.id);
  //             // console.log(DocID);
  //             var docRef = db.collection("회원정보").doc(doc.id);
  //             docRef
  //               .get()
  //               .then((doc) => {
  //                 if (doc.exists) {
  //                   console.log("Document data:", doc.data().My_Usage_History);
  //                   setUserHistory(doc.data().My_Usage_History);
  //                 } else {
  //                   // doc.data() will be undefined in this case
  //                   console.log("No such document!");
  //                 }
  //               })
  //               .catch((error) => {
  //                 console.log("Error getting document:", error);
  //               });
  //           });
  //         } else {
  //           console.log("데이터 없음");
  //         }
  //       });
  //   }
  // }, [User]);

  return (
    <ThemeProvider theme={Colortheme}>
      <Container>
        <Table
          User={User}
          UserID={UserID}
          UserHistory={UserHistory}
          UserNick={UserNick}
        ></Table>
      </Container>
    </ThemeProvider>
  );
};

export default Usage_main;
