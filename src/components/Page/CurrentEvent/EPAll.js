import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./../../../images/001.png";
import Footer from "../Footer";
import Fade from "react-reveal/Fade";
import { Link, Redirect } from "react-router-dom";
import Notice from "./Notice";
import Period from "./Period";
import fire from "../Register/LoginFire";
import {
  createMuiTheme,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

const Boldtheme = createMuiTheme({
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
const SubmitButton = styled.button`
  color: rgb(0,0,0,0.9);
  background-color: rgb(0,0,0,0.05);
  border: 2px solid rgb(0,0,0,0.9);
  border-radius: 10px;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.4rem;
  &:hover{
    background-color: rgb(0,0,0,0.9);
    color: white;
`;
const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  .title {
    margin-top: 15px;
    font-size: 2rem;
    font-weight: bolder;
  }
  .subtitle {
    font-weight: bold;
    margin-top: 10px;
  }
  .subtitle2{
    margin-top: 10px;
    font-size : 1.4rem;
    font-weight: bold;
  }
  img {
    text-align: center;
    width: 15rem;
    margin-bottom: -2rem;
  }
  .submitBtn {
    width: 23rem;
    height: 3rem;
    background-color: ;
  }
`;

const ButtonContainer = styled.div``;

function EP1(props) {
  const {
    EP_School_Name,
    EP_Num,
    EP_Start_Day,
    EP_End_Day,
    EP_Result_Day,
    EP_Region,
  } = props;
  const user = props.User;
  const period =
    EP_Start_Day.substr(0, 2) +
    "/" +
    EP_Start_Day.substr(2) +
    "~" +
    EP_End_Day.substr(0, 2) +
    "/" +
    EP_End_Day.substr(2);
  const ep = EP_Num;
  const eventUniv = EP_School_Name;
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handletimeClose = () => {
    settimeopen(false);
  };
  const handlesubmitClose = () => {
    setsubmitopen(false);
  };

  const [checkUserUniv, setCheckUserUniv] = useState("");
  const [open, setOpen] = useState(false);
  const [submitopen, setsubmitopen] = useState(false);
  const [timeopen, settimeopen] = useState(false);
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
            console.log("데이터없어");
          }
        });
    }
  }, [user]);

  function getSchool(eventUniv) {
    const result = [];
    let length = eventUniv.length;
    for (let i = 0; i < length; i++) {
      result.push(
        <h3 key={i} className="eventUniv">
          {eventUniv[i]}{" "}
        </h3>
      );
    }
    return result;
  }
  let index = eventUniv.indexOf(User.Univ);

  function TimeisRight() {
    let nowdate = new Date();
    let comparedate = new Date(
      2021,
      Number(EP_Start_Day.substr(0, 2)) - 1,
      Number(EP_Start_Day.substr(2)),
      0,
      0
    );
    let endcomparedate = new Date(
      2021,
      Number(EP_End_Day.substr(0, 2)) - 1,
      Number(EP_End_Day.substr(2)) + 1,
      0,
      0
    );

    if (
      nowdate.getTime() > comparedate.getTime() &&
      nowdate.getTime() < endcomparedate.getTime()
    ) {
      setsubmitopen(true);
    } else {
      settimeopen(true);
    }
  }

  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/login" />;
  } else if (!EP_End_Day) {
    return <Redirect to="/currentevent" />;
  } else {
    return (
      <div>
        <Container>
          <div className="title">플로스팅 일정안내</div>
          <div className="subtitle2">{ep}회차</div>
          <div className="subtitle">{EP_Region}</div>
          <div className="subtitle">{getSchool(eventUniv)}</div>
          <img src={Logo} />
          {index === -1 ? (
            <ThemeProvider theme={Boldtheme}>
              <ButtonContainer>
                <SubmitButton className="submitBtn" onClick={handleOpen}>
                  신청하기
                </SubmitButton>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"학교 오류"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      해당 이벤트 참여 대상자가 아닙니다.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      창 닫기
                    </Button>
                  </DialogActions>
                </Dialog>
              </ButtonContainer>
            </ThemeProvider>
          ) : (
            <ButtonContainer>
              <SubmitButton className="submitBtn" onClick={TimeisRight}>
                신청하기
              </SubmitButton>
              <ThemeProvider theme={Boldtheme}>
                <Dialog
                  open={timeopen}
                  onClose={handletimeClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"신청기간을 확인해주세요!"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      신청기간이 아닙니다.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="outlined"
                      onClick={handletimeClose}
                      color="primary"
                    >
                      창 닫기
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={submitopen}
                  onClose={handlesubmitClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"신청하기"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      신청 페이지로 이동할까요?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Link to="/submit">
                      <Button
                        variant="contained"
                        onClick={handlesubmitClose}
                        color="primary"
                      >
                        이동
                      </Button>
                    </Link>
                  </DialogActions>
                </Dialog>
              </ThemeProvider>
            </ButtonContainer>
          )}

          <Fade bottom>
            <Period EP_Result_Day={EP_Result_Day} period={period}></Period>
            <Notice />
          </Fade>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}
export default EP1;
