import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import fire from "../../Register/LoginFire";
import "firebase/auth";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  h1 {
    font-size: 2rem;
  }
`;
const 탈퇴버튼 = styled.button`
width: 5rem;
margin: 2rem 0;
border-radius: 10px;
padding: 3px;
border: 1px solid rgb(0, 0, 0, 0.1);
font-family: "Do Hyeon", sans-serif;
font-size: 0.8rem;

`;
const db = fire.firestore();
// const db = firebase.firestore();
const storage = fire.storage();
const storageRef = storage.ref();
function DeleteUser(props) {
  const user = props.User;
  const userDoc = props.회원정보docId;
  const onGoing = props.onGoing;
  const Ukey = props.Ukey;
  const userNick = props.userNick;
  const userUid = user.uid;
  const [open, setOpen] = useState(false);
  const Tings = ["lilac", "daisy", "clover"];
  const userNums = ["userOne", "userTwo"];

  const onClick = () => {
    authStateListener();
    setOpen(true);
  };

  const onComfirm = async () => {
    deleteUser(Ukey);

    // 매칭기간 중에 회원 탈퇴 할 경우 무조건 거절 처리
    Tings.map(ting => (
      userNums.map(userNum => (
        db.collection(`${onGoing}${ting}`).where(`${userNum}.Unique_key`, "==", Ukey).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              stage: "end",
              거절한사람: userNick,
            });
          })
        })
      ))
    ))

    // FLosting_onging => 신청내역 삭제
    await db.collection(`Flosting_${onGoing}`).where("User.Unique_key", "==", Ukey).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    })

    // 회원정보 삭제
    await db.collection(`회원정보`).where("User.Unique_key", "==", Ukey).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    })
  };



  return (
    <div>
      <탈퇴버튼 onClick={onClick}>회원탈퇴</탈퇴버튼>
      {props.프사 === null ? (
        <div></div>
      ) : (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">회원 탈퇴</DialogTitle>
          <DialogContent>
            <label htmlFor="contained-button-file">
              <div></div>
            </label>
            <DialogContentText>탈퇴 후 재가입은 불가능합니다. 정말 탈퇴하시겠습니까?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={onComfirm}
            >
              탈퇴하기
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component="span"
              onClick={() => {
                setOpen(false);
              }}
            >
              취소하기
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default DeleteUser;

function authStateListener() {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      currentUser();
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // [END auth_state_listener]
}
function currentUser() {
  // [START auth_current_user]
  const user = firebase.auth().currentUser;
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    // No user is signed in.
  }
  // [END auth_current_user]
}

function getUserProfile() {
  // [START auth_get_user_profile]
  const user = firebase.auth().currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }
  // [END auth_get_user_profile]
}
function deleteUser(Ukey) {
  // [START auth_delete_user]
  const user = firebase.auth().currentUser;

  user
    .delete()
    .then(() => {
      console.log("deleted")
      // 유니크_키 블랙리스트 등록
      db.collection("블랙리스트").add({
        Unique_key: Ukey,
        탈퇴사유: "회원탈퇴"
      })
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
  // [END auth_delete_user]
}

