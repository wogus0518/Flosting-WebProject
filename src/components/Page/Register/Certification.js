import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import fire from "./LoginFire";

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

const Wrapper = styled.div``;

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  margin: 0rem 2rem;

  h1 {
    font-size: 1.5rem;
    margin-top: 2rem;
  }
`;

const NextButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 0rem 0rem 2rem 0rem;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: #e0bcc1;
  color: #ffffff;
  opacity: ${(props) => {
    if (props.disabled) return "0.5";
    else return "1.0";
  }};
  cursor: ${(props) => {
    if (props.disabled) return "default";
    else return "pointer";
  }};
`;

const PhoneButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 0rem 0rem 1rem 0rem;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: #e0bcc1;
  color: #ffffff;
  opacity: ${(props) => {
    if (props.disabled) return "0.5";
    else return "1.0";
  }};
  cursor: ${(props) => {
    if (props.disabled) return "default";
    else return "pointer";
  }};
`;

const School_title = styled.div`
  font-size: 1rem;
  color: "#828282";
  margin: 2rem 0rem 1rem 0rem;
`;
const School_content = styled.div`
  color: ${(props) => {
    if (props.canNext) return "#EF0C00";
    else return "#00AB6F";
  }};
  font-size: 0.5rem;
  margin: 0rem 0rem 1rem 0rem;
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

const Certification = (props) => {
  const [limitnum, setlimitnum] = useState(false); // 학번의 제한 체크 변수
  const [limitnummessasge, setlimitnummessasge] =
    useState("숫자로 입력해주세요.");
  const [overlap, setoverLap] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [canNext, setcanNext] = useState(true);
  const [goMessage, setgoMessage] = useState(
    "위 버튼을 눌러 휴대폰 인증을 완료해주세요."
  );
  const db = fire.firestore();

  const {
    auth_regis,
    U_Phone,
    setU_name,
    setU_Age,
    setU_Gender,
    setU_Phone,
    setU_unique_key,
  } = props;

  const noneactiveStyle = {
    textDecoration: "none",
  };
  //넘어온 데이터
  let confirmdata;
  //본인인증 화면에 채워넣을 데이터
  let earlydata = {
    company: "플로스 컴패니", // 회사명 또는 URL
    name: "", // 이름
    phone: "", // 전화번호
    birth: "", //생년원일
    gender: "", //성별
    min_age: "18", //최소 만 나이
  };

  const handleNumChange = (e) => {
    let pattern = /[^0-9]/gi; // 숫자 입력 되게
    e.target.value = e.target.value.replace(pattern, "");
    if (e.target.value.length > 11)
      //글자수 제한
      e.target.value = e.target.value.slice(0, 11);
    setU_Phone(e.target.value);

    if (e.target.value.length == 11) {
      setlimitnum(true);
    } else {
      setlimitnum(false);
    }
    if (e.target.value.length == 11) {
      setlimitnummessasge("입력 완료!");
    } else if (e.target.value.length == 0) {
      setlimitnummessasge("숫자로 입력해주세요.");
    } else {
      setlimitnummessasge("번호가 너무 짧아요!");
    }
  };
  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { imp_uid, success, merchant_uid, error_msg } = response;

    if (success) {
      fetchdata(imp_uid);
    } else {
      setOpen(true);
    }
  }

  function fetchdata(imp_uid) {
    fetch(
      "https://bjvy462n18.execute-api.ap-northeast-2.amazonaws.com/flosting/test",
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          imp_uid: imp_uid,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        confirmdata = data;
      })
      .then((_) => {
        const { birthday, certified, gender, name, unique_key } = confirmdata;
        db.collection('블랙리스트').where("Unique_key", "==", unique_key).get()
          .then((querySnapshot) => {
            if (querySnapshot.size) {
              setOpen3(true);
            } else {
              if (certified) {
                let Infodb = db.collection("회원정보");
                let query = Infodb.where("User.Unique_key", "==", unique_key)
                  .get()
                  .then((querySnapshot) => {
                    if (querySnapshot.size) {
                      setOpen2(true);
                    } else {
                      let agearray = birthday.split("-");
                      let nowTime = new Date();
                      let nowyear = nowTime.getFullYear();
                      let age = nowyear - agearray[0] + 1;
                      setU_Age(age);
                      if (gender == "male") {
                        setU_Gender("boy");
                      } else {
                        setU_Gender("girl");
                      }
                      setU_unique_key(unique_key);
                      setU_name(name);
                      setgoMessage(
                        "본인인증이 완료되었습니다! 다음으로 넘어가주세요."
                      );
                      setcanNext(false);
                      setlimitnum(false);
                    }
                  });
              } else {
                setOpen(true); //본인확인 실패
              }
            }
          })
      })
      .catch((err) => console.error(err));
  }

  function onClickCertification() {
    setoverLap(true);
    earlydata.phone = U_Phone;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp73280791");

    /* 4. 본인인증 창 호출하기 */
    IMP.certification(earlydata, callback);
  }
  if (!auth_regis) {
    return <Redirect to="/register" />;
  } else {
    return (
      <ThemeProvider theme={Colortheme}>
        <Wrapper>
          <Container>
            <h1>휴대폰 인증</h1>
            <School_title>
              한 사람당 하나의 계정을 가지기 위함이에요!
            </School_title>

            <Input
              overlap={overlap}
              limitnum={limitnum}
              placeholder="핸드폰 번호를 입력해주세요."
              onChange={handleNumChange}
              disabled={overlap}
            />
            <School_content canNext={!limitnum}>
              {limitnummessasge}
            </School_content>
            <PhoneButton disabled={!limitnum} onClick={onClickCertification}>
              휴대폰 인증
            </PhoneButton>
            <School_content canNext={canNext}>{goMessage}</School_content>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                본인인증에 실패하였습니다.
              </DialogTitle>
              <DialogContent>
                <DialogContentText>다시 진행해주세요!</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => setOpen(false)}
                  color="primary"
                >
                  확인
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open2}
              onClose={() => setOpen2(false)}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                등록한 휴대폰으로 가입한 이력이 있네요!
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  로그인페이지로 이동합니다!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <NavLink to="/login" style={noneactiveStyle}>
                  <Button
                    variant="contained"
                    onClick={() => setOpen2(false)}
                    color="primary"
                  >
                    이동
                  </Button>
                </NavLink>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open3}
              onClose={() => setOpen3(false)}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                탈퇴하신 이력이 있으므로 재가입이 불가능합니다.
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  회원가입을 원하실 경우 카카오 채널로 문의해주세요!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => setOpen3(false)}
                  color="primary"
                >
                  확인
                </Button>
              </DialogActions>
            </Dialog>
            <NavLink to="/register/profileselect">
              <NextButton disabled={canNext}>다음</NextButton>
            </NavLink>
          </Container>
        </Wrapper>
      </ThemeProvider>
    );
  }
};

export default Certification;
