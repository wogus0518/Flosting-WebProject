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
  const [limitnum, setlimitnum] = useState(false); // ????????? ?????? ?????? ??????
  const [limitnummessasge, setlimitnummessasge] =
    useState("????????? ??????????????????.");
  const [overlap, setoverLap] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [canNext, setcanNext] = useState(true);
  const [goMessage, setgoMessage] = useState(
    "??? ????????? ?????? ????????? ????????? ??????????????????."
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
  //????????? ?????????
  let confirmdata;
  //???????????? ????????? ???????????? ?????????
  let earlydata = {
    company: "????????? ?????????", // ????????? ?????? URL
    name: "", // ??????
    phone: "", // ????????????
    birth: "", //????????????
    gender: "", //??????
    min_age: "18", //?????? ??? ??????
  };

  const handleNumChange = (e) => {
    let pattern = /[^0-9]/gi; // ?????? ?????? ??????
    e.target.value = e.target.value.replace(pattern, "");
    if (e.target.value.length > 11)
      //????????? ??????
      e.target.value = e.target.value.slice(0, 11);
    setU_Phone(e.target.value);

    if (e.target.value.length == 11) {
      setlimitnum(true);
    } else {
      setlimitnum(false);
    }
    if (e.target.value.length == 11) {
      setlimitnummessasge("?????? ??????!");
    } else if (e.target.value.length == 0) {
      setlimitnummessasge("????????? ??????????????????.");
    } else {
      setlimitnummessasge("????????? ?????? ?????????!");
    }
  };
  /* 3. ?????? ?????? ???????????? */
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
        db.collection('???????????????').where("Unique_key", "==", unique_key).get()
          .then((querySnapshot) => {
            if (querySnapshot.size) {
              setOpen3(true);
            } else {
              if (certified) {
                let Infodb = db.collection("????????????");
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
                        "??????????????? ?????????????????????! ???????????? ??????????????????."
                      );
                      setcanNext(false);
                      setlimitnum(false);
                    }
                  });
              } else {
                setOpen(true); //???????????? ??????
              }
            }
          })
      })
      .catch((err) => console.error(err));
  }

  function onClickCertification() {
    setoverLap(true);
    earlydata.phone = U_Phone;
    /* 1. ????????? ???????????? */
    const { IMP } = window;
    IMP.init("imp73280791");

    /* 4. ???????????? ??? ???????????? */
    IMP.certification(earlydata, callback);
  }
  if (!auth_regis) {
    return <Redirect to="/register" />;
  } else {
    return (
      <ThemeProvider theme={Colortheme}>
        <Wrapper>
          <Container>
            <h1>????????? ??????</h1>
            <School_title>
              ??? ????????? ????????? ????????? ????????? ???????????????!
            </School_title>

            <Input
              overlap={overlap}
              limitnum={limitnum}
              placeholder="????????? ????????? ??????????????????."
              onChange={handleNumChange}
              disabled={overlap}
            />
            <School_content canNext={!limitnum}>
              {limitnummessasge}
            </School_content>
            <PhoneButton disabled={!limitnum} onClick={onClickCertification}>
              ????????? ??????
            </PhoneButton>
            <School_content canNext={canNext}>{goMessage}</School_content>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                ??????????????? ?????????????????????.
              </DialogTitle>
              <DialogContent>
                <DialogContentText>?????? ??????????????????!</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => setOpen(false)}
                  color="primary"
                >
                  ??????
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open2}
              onClose={() => setOpen2(false)}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                ????????? ??????????????? ????????? ????????? ?????????!
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  ????????????????????? ???????????????!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <NavLink to="/login" style={noneactiveStyle}>
                  <Button
                    variant="contained"
                    onClick={() => setOpen2(false)}
                    color="primary"
                  >
                    ??????
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
                ???????????? ????????? ???????????? ???????????? ??????????????????.
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  ??????????????? ????????? ?????? ????????? ????????? ??????????????????!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => setOpen3(false)}
                  color="primary"
                >
                  ??????
                </Button>
              </DialogActions>
            </Dialog>
            <NavLink to="/register/profileselect">
              <NextButton disabled={canNext}>??????</NextButton>
            </NavLink>
          </Container>
        </Wrapper>
      </ThemeProvider>
    );
  }
};

export default Certification;
