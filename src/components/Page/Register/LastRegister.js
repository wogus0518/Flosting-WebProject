import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";

import { Redirect } from "react-router-dom";
import fire from "./LoginFire";
import SuccessRegister from "./SuccessRegister";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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
const Nicname_content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 2rem;
`;

const Password_content = styled.div`
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
  type: text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const Input_password = styled.input`
  border-radius: 5px;
  border: 1px solid #a6a6a6;
  background: #ebebeb;
  type: text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
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
  opacity: ${props => {
    if (props.overlap) return '0.5';
    else return '1.0';
  }};
cursor: ${props => {
    if (props.overlap) return 'default';
    else return 'pointer'
  }};
`;
const Error_message = styled.div`
  margin-left: 0.2rem;
  font-size: 0.5rem;
  color: ${(props) => (props.limitnum ? "#00AB6F" : "#EF0C00")};
`;
const Error_message_Password = styled.div`
  margin-left: 0.2rem;
  font-size: 0.5rem;
  color: ${(props) =>
    props.limitnum ? (props.limitnum_C ? "#00AB6F" : "#F55C29") : "#EF0C00"};
`;

const LastRegister = (props) => {
  const {
    auth_regis,
    controlWhere,
    S_name,
    S_num,
    user,
    U_unique_key,
    U_name,
    U_Age,
    U_Gender,
    U_Phone,
    U_MBTI,
    U_Profileurl,
    U_School_num,
  } = props;
  const email = S_num + "@flosting.com";
  const [nickname, setnickname] = useState(""); // 닉네임
  const [password, setPassword] = useState(""); // 패스워드
  const [password2, setPassword2] = useState(""); //패스워드 확인
  const [passwordError, setPasswordError] =
    useState("패스워드를 입력해주세요.");
  const [repasswordError, setrepasswordError] =
    useState("패스워드를 재입력해주세요.");
  const [correspass, setcorrespass] = useState(false); //패스워드 일치 불일치
  const [limitpassword, setlimitpassword] = useState(false); // 패스워드 글자 수 통과
  const [limitpassword_C, setlimitpassword_C] = useState(false); //패스워드 안전, 매우안전
  const [overlap, setoverLap] = useState(false); // 닉네임 중복
  const [open, setOpen] = useState(false); // OK알람창
  const [open2, setOpen2] = useState(false); //중복알람창
  const [limitnick, setlimitnick] = useState(false); //닉네임 두글자 이상하게 하기위함.
  const [limitnickmessage, setlimitnickmessage] = useState(""); //닉넴 에러 메세지
  const [canNext, setcanNext] = useState(true); //다음으로 갈 수 있는지 체크해주는 변수
  const [success, setSuccess] = useState(true);
  const db = fire.firestore();

  let DBForm = {
    profileImage: "",
    ID: "",
    User: {
      Schoolnumber: "",
      Age: "",
      Gender: "",
      Manner: "",
      Name: "",
      Nick: "",
      Phone: "",
      Univ: "",
      Mbti: "",
      Unique_key: "",
    },
  };
  const clearErrors = () => {
    setPasswordError("");
  };
  useEffect(() => {
    cangoNext();
  }, [overlap]);
  useEffect(() => {
    cangoNext();
  }, [correspass]);
  useEffect(() => {
    cangoNext();
  }, [limitpassword]);
  useEffect(() => {
    cangoNext();
    setoverLap(false);
  }, [nickname]);

  const cangoNext = () => {
    if (nickname && correspass && limitpassword && overlap) {
      setcanNext(false);
    }
    if (!nickname && correspass && limitpassword && overlap) {
      setcanNext(true);
    }
  };

  const overlapOk = () => {
    setlimitnickmessage("닉네임이 정해졌어요!");
    setoverLap(true);
    setOpen(false);
  };

  const handleoverlap = () => {
    //중복검사
    if (!overlap) {
      if (nickname.indexOf("ㆍ") != -1) {
        alert("닉네임에는 특수문자가 포함될 수 없어요!");
      } else if (limitnick) {
        let Infodb = db.collection("회원정보");
        let query = Infodb.where("User.Nick", "==", nickname)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size) {
              setOpen2(true);
              setoverLap(false);
            } else {
              setOpen(true); //alert창 띄우기
            }
          });
      } else {
        alert("닉네임의 길이를 확인해주세요!");
      }
    }
  };
  const handlerePassChange = (e) => {
    if (e.target.value.length > 20)
      //글자수 제한
      e.target.value = e.target.value.slice(0, 20);
    setPassword2(e.target.value);

    if (e.target.value.length == 0) {
      setrepasswordError("패스워드를 입력해주세요.");
      setcorrespass(false);
    } else if (e.target.value == password) {
      setrepasswordError("패스워드 일치!");
      setcorrespass(true);
    } else {
      setrepasswordError("패스워드 불일치!");
      setcorrespass(false);
    }
  };
  const handlePassChange = (e) => {
    if (e.target.value.length > 20)
      //글자수 제한
      e.target.value = e.target.value.slice(0, 20);
    setPassword(e.target.value);

    if (e.target.value.length == 0) {
      setPasswordError("패스워드를 입력해주세요.");
      setlimitpassword(false);
    } else if (e.target.value.length < 6) {
      setPasswordError("글자 부족!");
      setlimitpassword(false);
    } else if (e.target.value.length < 10) {
      setPasswordError("안전");
      setlimitpassword(true);
      setlimitpassword_C(false);
    } else if (e.target.value.length < 20) {
      setPasswordError("매우 안전");
      setlimitpassword_C(true);
    }
  };
  const handleNicChange = (e) => {
    let pattern = /[^ㄱ-ㅎ|가-힣|a-z|A-Z|ㆍ|]/gi; // 한글이랑 영어만
    e.target.value = e.target.value.replace(pattern, "");
    if (e.target.value.length > 6)
      //글자수 제한
      e.target.value = e.target.value.slice(0, 6);
    setnickname(e.target.value);

    if (e.target.value.length >= 2) {
      setlimitnick(true);
    } else {
      setlimitnick(false);
    }
    if (e.target.value.length >= 2) {
      setlimitnickmessage("중복 확인 버튼을 눌러주세요!");
    } else if (e.target.value.length == 0) {
      setlimitnickmessage("한글과 영어만 입력 가능해요.");
    } else {
      setlimitnickmessage("닉네임의 길이가 너무 짧아요!");
    }
  };
  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        saveDB();
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          // case "auth/invalid-email":
          //     setEmailError(err.message);
          //     break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const saveDB = () => {
    DBForm.ID = S_num;
    DBForm.User.Name = U_name;
    DBForm.User.Mbti = U_MBTI;
    DBForm.User.Age = U_Age;
    DBForm.User.Gender = U_Gender;
    DBForm.User.Manner = 36.5;
    DBForm.User.Nick = nickname;
    DBForm.User.Phone = U_Phone;
    DBForm.User.Unique_key = U_unique_key;
    DBForm.User.Univ = S_name;
    DBForm.User.Schoolnumber = U_School_num;

    fire
      .firestore()
      .collection("회원정보")
      .add({
        ID: DBForm.ID,
        Ongoing: "",
        profileImage: U_Profileurl,
        User: DBForm.User,
      })
      .then(() => {
        const docRef = db.collection("가입경로").doc("가입경로");
        docRef
          .get()
          .then((doc) => {
            if (controlWhere === "insta") {
              let Insta = doc.data().Insta;
              db.collection("가입경로")
                .doc("가입경로")
                .update({
                  Insta: Insta + 1,
                });
            } else if (controlWhere === "facebook") {
              let facebook = doc.data().Facebook;
              db.collection("가입경로")
                .doc("가입경로")
                .update({
                  Facebook: facebook + 1,
                });
            } else if (controlWhere === "gitar") {
              let gitar = doc.data().Gitar;
              db.collection("가입경로")
                .doc("가입경로")
                .update({
                  Gitar: gitar + 1,
                });
            } else {
              let friend = doc.data().Friend;
              db.collection("가입경로")
                .doc("가입경로")
                .update({
                  Friend: friend + 1,
                });
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!auth_regis) {
    return <Redirect to="/register" />;
  } else {
    if (user) {
      return (
        <SuccessRegister
          U_unique_key={U_unique_key}
          U_name={U_name}
          U_Age={U_Age}
          U_Gender={U_Gender}
          U_Phone={U_Phone}
          ID={S_num}
          Nickname={nickname}
          School_name={S_name}
        ></SuccessRegister>
      );
    } else {
      return (
        <ThemeProvider theme={Colortheme}>
          <Container>
            <h1>플로스팅 회원가입</h1>
            <Nicname_content>
              <School_title>닉네임</School_title>
              <School_content>
                ※ 한글과 영어로 이루어진 문자열로, 2~6글자로 설정해주세요.
              </School_content>
              <InputDiv>
                <Input
                  overlap={overlap}
                  limitnum={limitnick}
                  placeholder="닉네임 입력"
                  type="text"
                  required
                  value={nickname}
                  onChange={handleNicChange}
                  disabled={overlap}
                />
                <Overlapbtn overlap={overlap} onClick={handleoverlap}>
                  중복 확인
                </Overlapbtn>
              </InputDiv>
              <Error_message limitnum={limitnick}>
                {limitnickmessage}
              </Error_message>
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {nickname}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    위 닉네임으로 설정하시겠습니까?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    autoFocus
                    onClick={overlapOk}
                    color="primary"
                  >
                    확인
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                    color="primary"
                    autoFocus
                  >
                    취소
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={open2}
                onClose={() => setOpen2(false)}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {nickname}
                </DialogTitle>
                <DialogContent>다음 닉네임은 이미 사용중이네요!</DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    autoFocus
                    onClick={() => setOpen2(false)}
                    color="primary"
                  >
                    확인
                  </Button>
                </DialogActions>
              </Dialog>
            </Nicname_content>
            <Password_content>
              <School_title>비밀번호</School_title>
              <School_content>
                ※ 최소 6글자 이상 문자로 이루어진 문자열로 입력해주세요.
              </School_content>
              <Input_password
                placeholder="비밀번호 입력"
                type="password"
                required
                value={password}
                onChange={handlePassChange}
              />
              <Error_message_Password
                limitnum_C={limitpassword_C}
                limitnum={limitpassword}
              >
                {passwordError}
              </Error_message_Password>
              <School_title>비밀번호 확인</School_title>
              <Input_password
                placeholder="비밀번호 재입력"
                type="password"
                required
                value={password2}
                onChange={handlerePassChange}
              />
              <Error_message limitnum={correspass}>
                {repasswordError}
              </Error_message>
            </Password_content>
            <RegButton onClick={handleSignUp} register disabled={canNext}>
              회원가입 완료
            </RegButton>
          </Container>
        </ThemeProvider>
      );
    }
  }
};

export default LastRegister;
