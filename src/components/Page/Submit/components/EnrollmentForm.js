import React, { useCallback, useState, useEffect } from "react";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import fire from "../../Register/LoginFire";
import Slider from "react-slick";
import styled from "styled-components";
import lilac from "../../../../images/003.png";
import daisy from "../../../../images/004.png";
import submitMain from "../../../../images/002.png";
import submitFinal from "../../../../images/006.png";
import clover from "../../../../images/005.png";
import "../FormikContainer.css";
import { Redirect, Link } from "react-router-dom";
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
import Fade from "react-reveal/Fade";
import { settings } from "./SlickSliderSetting";
import CheckDbData from "./CheckDbData";

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

const ErrorMsg = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  color: red;
  font-size: 0.7rem;
`;

const InputContainer = styled.div`
  text-align: center;
  justify-content: center;
  display: flex;
`;

const TypeImage = styled.div`
  position: relative;
  z-index: 1;
  img {
    width: ${(props) => (props.Size ? "20rem" : "10rem")};
    margin: 0px auto;
    margin-top: ${(props) => (props.Size ? "-10rem" : "-7rem")};
  }
  margin: 1rem;
`;

const SlidNext = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  margin: 1rem 0rem;
`;

const Container = styled.div`
width:  
margin: 1rem;
  text-align: center;
  justify-content: center;
  display: flex;
  img {
    width: 20rem;
    margin: 0px auto;
    margin-bottom : -3rem;
  }
p{
  margin : 1rem;
}
`;

const SubmitButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  margin: 1rem auto;
  height: 5rem;
  width: 20rem;
  border-radius: 10px;
  font-weight: 700;
  background-color: ${(props) => props.color};
  color: #ffffff;
  font-size: 2rem;
  border: none;
`;

const Title = styled.h1`
  font-family: "Noto Sans KR", sans-serif;
  font-size: x-large;
  color: #f7bb9e;
`;

const ToggleButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  border-radius: 10px;
  margin: 1rem;
  padding: 10px 15px;
  width: 20rem;
  border: 1px solid rgb(0, 0, 0, 0.2);
  background-color: ${(props) => props.color};
`;

const SubText = styled.div`
  position: relative;
  z-index: 2;
  margin: 1rem;
  p {
    font-size: ${(props) => (props.setFont ? "15px" : "10px")};
  }
  b {
    font-size: ${(props) => (props.setFont ? "15px" : "10px")};
  }
`;

const MainText = styled.div`
  margin: 1rem;
`;

function useToggle(initialValue = true, values) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}

function EnrollmentForm(props, match) {
  // User ID
  const {
    User,
    ID,
    EP_Num,
    lilac_Age,
    setlilac_Age,
    lilac_Univ,
    setlilac_Univ,
    lilac_Ticket,
    setlilac_Ticket,
    lilac_Ticket_FT,
    setlilac_Ticket_FT,
    daisy_Age,
    setdaisy_Age,
    daisy_Univ,
    setdaisy_Univ,
    daisy_Ticket,
    setdaisy_Ticket,
    daisy_Ticket_FT,
    setdaisy_Ticket_FT,
    clover_Age,
    setclover_Age,
    clover_Univ,
    setclover_Univ,
    clover_Ticket,
    setclover_Ticket,
    clover_Ticket_FT,
    setclover_Ticket_FT,
    setPayment,
  } = props;
  // const EP = match.params.EP;
  // console.log(EP);
  // formik 초기 값
  // 유효성 검사
  const validationSchema = Yup.object({});
  // 신청페이지 활성화
  const [lilacOn, setLilacOn] = useToggle(true);
  const [daisyOn, setDaisyOn] = useToggle(true);
  const [cloverOn, setCloverOn] = useToggle(true);
  // alert Dialog Message
  const [open, setOpen] = useState(false);
  // db 중복 검사
  const [IsSubmit, setIsSubmit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // 신청 페이지 활성화
  const handleLilac = () => {
    setLilacOn();
  };
  const handleDaisy = () => {
    setDaisyOn();
  };
  const handleClover = () => {
    setCloverOn();
  };

  const db = fire.firestore();
  // 이벤트 신청 중복검사
  useEffect(() => {
    if (User) {
      db.collection("Flosting_" + EP_Num)
        .where("ID", "==", ID)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              setIsSubmit(true);
            });
          } else {
            // console.log("데이터없어");
          }
        });
    }
  }, [User]);

  // Submit Handler
  const onSubmit = () => {
    if (lilacOn) {
      setlilac_Ticket_FT(false);
    } else {
      setlilac_Ticket_FT(true);
    }

    if (daisyOn) {
      setdaisy_Ticket_FT(false);
    } else {
      setdaisy_Ticket_FT(true);
    }

    if (cloverOn) {
      setclover_Ticket_FT(false);
    } else {
      setclover_Ticket_FT(true);
    }

    setPayment(true);
  };

  return (
    <ThemeProvider theme={Boldtheme}>
      {IsSubmit ? (
        <div>
          <CheckDbData EP_Num={EP_Num} User={User} ID={ID} />
        </div>
      ) : (
        <div>
          <Slider {...settings}>
            <Container>
              <Fade bottom cascade>
                <Title>User Info</Title>

                <img src={submitMain}></img>
                <MainText>
                  <p>{User.Nick}님 안녕하세요. </p>
                  <p>신청을 계속해서 진행하실 분은</p>
                  <p>페이지를 넘겨주세요.</p>
                </MainText>
              </Fade>
            </Container>

            <InputContainer>
              <Title>Lilac</Title>
              <SubText setFont={lilacOn}>
                <p>라일락의 꽃말</p>
                <p>
                  <b>'새로운 사랑의 싹이 트다'</b>
                </p>
                <br></br>
                <p>
                  라일락팅을 통해 새로운 <b>이성</b>과
                </p>
                <p>소중한 인연을 가져보세요.</p>
                <br></br>
              </SubText>
              <TypeImage Size={lilacOn}>
                <img src={lilac} />
              </TypeImage>
              {/* 라일락 나이 */}
              <ToggleButton
                type="button"
                onClick={handleLilac}
                color={
                  lilacOn ? "rgb(247,244,148,0.5)" : "rgb(208,174,209,0.5)"
                }
              >
                {lilacOn ? "신청 하기" : "신청 취소"}
              </ToggleButton>
              {!lilacOn ? (
                <div>
                  {/* 티켓 선택 */}
                  <FormikControl
                    blockSubmit={lilacOn}
                    control="ticket"
                    label="티켓 개수"
                    disabled={lilacOn}
                    controlAge={lilac_Age}
                    setcontrolAge={setlilac_Age}
                    controlUniv={lilac_Univ}
                    setcontrolUniv={setlilac_Univ}
                    controlTicket={lilac_Ticket}
                    setcontrolTicket={setlilac_Ticket}
                  />
                  {/* 학교 선택 */}
                  <FormikControl
                    blockSubmit={lilacOn}
                    control="select"
                    label="학교 선택"
                    disabled={lilacOn}
                    controlAge={lilac_Age}
                    setcontrolAge={setlilac_Age}
                    controlUniv={lilac_Univ}
                    setcontrolUniv={setlilac_Univ}
                    controlTicket={lilac_Ticket}
                    setcontrolTicket={setlilac_Ticket}
                  />
                  <FormikControl
                    type={"lilac"}
                    blockSubmit={lilacOn}
                    control="radio"
                    label="상대의 나이를 선택해주세요"
                    disabled={lilacOn}
                    controlAge={lilac_Age}
                    setcontrolAge={setlilac_Age}
                    controlUniv={lilac_Univ}
                    setcontrolUniv={setlilac_Univ}
                    controlTicket={lilac_Ticket}
                    setcontrolTicket={setlilac_Ticket}
                  />
                  <SlidNext>옆으로 밀어주세요</SlidNext>
                </div>
              ) : (
                ""
              )}
            </InputContainer>
            <InputContainer>
              <Title>Daisy</Title>
              <SubText setFont={daisyOn}>
                <p>
                  데이지의 꽃말 <br />
                  <b>'우정'</b>
                </p>
                <br></br>
                <p>데이지팅을 통해</p>
                <p>
                  <b>이성</b> 사람과 새로운
                </p>
                <p>
                  <b>친구</b>가 되어보세요
                </p>
              </SubText>
              <TypeImage Size={daisyOn}>
                <img src={daisy} />
              </TypeImage>
              {/* 데이지 나이 */}
              <ToggleButton
                type="button"
                onClick={handleDaisy}
                color={
                  daisyOn ? "rgb(247,244,148,0.5)" : "rgb(208,174,209,0.5)"
                }
              >
                {daisyOn ? "신청 하기" : "신청 취소"}
              </ToggleButton>
              {!daisyOn ? (
                <div>
                  {/* 티켓 선택 */}
                  <FormikControl
                    blockSubmit={daisyOn}
                    control="ticket"
                    label="티켓 개수"
                    disabled={daisyOn}
                    controlAge={daisy_Age}
                    setcontrolAge={setdaisy_Age}
                    controlUniv={daisy_Univ}
                    setcontrolUniv={setdaisy_Univ}
                    controlTicket={daisy_Ticket}
                    setcontrolTicket={setdaisy_Ticket}
                  />
                  {/* 학교 선택 */}
                  <FormikControl
                    blockSubmit={daisyOn}
                    control="select"
                    label="학교 선택"
                    disabled={daisyOn}
                    controlAge={daisy_Age}
                    setcontrolAge={setdaisy_Age}
                    controlUniv={daisy_Univ}
                    setcontrolUniv={setdaisy_Univ}
                    controlTicket={daisy_Ticket}
                    setcontrolTicket={setdaisy_Ticket}
                  />
                  <FormikControl
                    type={"daisy"}
                    blockSubmit={daisyOn}
                    control="radio"
                    label="상대의 나이를 선택해주세요"
                    disabled={daisyOn}
                    controlAge={daisy_Age}
                    setcontrolAge={setdaisy_Age}
                    controlUniv={daisy_Univ}
                    setcontrolUniv={setdaisy_Univ}
                    controlTicket={daisy_Ticket}
                    setcontrolTicket={setdaisy_Ticket}
                  />
                  <SlidNext>옆으로 밀어주세요</SlidNext>
                </div>
              ) : (
                ""
              )}
            </InputContainer>
            <InputContainer>
              <Title>Clover</Title>
              <SubText setFont={cloverOn}>
                <p>클로버의 꽃말</p>
                <p>
                  <b>'약속, 행운'</b>
                </p>
                <br></br>
                <p>클로버팅을 통해</p>
                <p>우정을 약속할</p>
                <p>
                  <b>동성</b> 친구를 만들어봐요!
                </p>
              </SubText>
              <TypeImage Size={cloverOn}>
                <img src={clover} />
              </TypeImage>
              {/* 게이 나이 */}
              <ToggleButton
                type="button"
                onClick={handleClover}
                color={
                  cloverOn ? "rgb(247,244,148,0.5)" : "rgb(208,174,209,0.5)"
                }
              >
                {cloverOn ? "신청 하기" : "신청 취소"}
              </ToggleButton>
              {!cloverOn ? (
                <div>
                  {/* 티켓 선택 */}
                  <FormikControl
                    blockSubmit={cloverOn}
                    control="ticket"
                    label="티켓 개수"
                    disabled={cloverOn}
                    controlAge={clover_Age}
                    setcontrolAge={setclover_Age}
                    controlUniv={clover_Univ}
                    setcontrolUniv={setclover_Univ}
                    controlTicket={clover_Ticket}
                    setcontrolTicket={setclover_Ticket}
                  />
                  {/* 학교 선택 */}
                  <FormikControl
                    blockSubmit={cloverOn}
                    control="select"
                    label="학교 선택"
                    disabled={cloverOn}
                    controlAge={clover_Age}
                    setcontrolAge={setclover_Age}
                    controlUniv={clover_Univ}
                    setcontrolUniv={setclover_Univ}
                    controlTicket={clover_Ticket}
                    setcontrolTicket={setclover_Ticket}
                  />
                  <FormikControl
                    type={"clover"}
                    blockSubmit={cloverOn}
                    control="radio"
                    label="상대의 나이를 선택해주세요"
                    disabled={cloverOn}
                    controlAge={clover_Age}
                    setcontrolAge={setclover_Age}
                    controlUniv={clover_Univ}
                    setcontrolUniv={setclover_Univ}
                    controlTicket={clover_Ticket}
                    setcontrolTicket={setclover_Ticket}
                  />
                  <SlidNext>옆으로 밀어주세요</SlidNext>
                </div>
              ) : (
                ""
              )}
            </InputContainer>
            <Container>
              <Title>마지막!!</Title>
              <img src={submitFinal} width={"100%"} />
              {lilacOn && daisyOn && cloverOn ? (
                <div>
                  <SubmitButton
                    type="button"
                    onClick={handleClickOpen}
                    color={"#8F8F8F"}
                    disabled={true}
                  >
                    제출하기!!
                  </SubmitButton>
                  <ErrorMsg>최소 하나의 타입을 선택해주세요</ErrorMsg>
                </div>
              ) : (
                <div>
                  <SubmitButton
                    type="button"
                    onClick={handleClickOpen}
                    color={"#C6B4CE"}
                  >
                    제출하기!!
                  </SubmitButton>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"신청을 완료 하시겠습니까?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        참가 신청서는 마이 페이지에서 수정 가능합니다.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={onSubmit} color="primary" autoFocus>
                        네
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        아니오
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </Container>
          </Slider>
        </div>
      )}
    </ThemeProvider>
  );
}

export default EnrollmentForm;
