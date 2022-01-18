import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { Redirect } from "react-router-dom";
import fire from "../Register/LoginFire";
import MyInfo from "./MyInfo/MyInfo";
import MySetting from "./MySetting/MySetting";
import MyUsage_History from "./MyUsage_History/Usage_main";
import MyRecentSubmit from "./MyRecentSubmit";

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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const Mypage = (props) => {
  const [User, setUser] = useState(props.User);
  const [preNick, setpreNick] = useState(""); // 기존 닉네임
  const [ID, setID] = useState("");
  const [Name, setName] = useState("");
  const [DocID, setDocID] = useState("");
  const db = fire.firestore();
  const [userHistory, setUserHistory] = useState();
  const [userNick, setUserNick] = useState();
  const [Mbti, setMbti] = useState(); //본인 mbti
  const [row, setrow] = useState({});
  const [onGoing, setOnGoing] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [changeInfor, setchangeInfor] = useState(true); // 정보 수정되면 업데이트하게 하는 변수

  useEffect(() => {
    setUser(props.User);
  }, [props]);

  useEffect(() => {
    if (User) {
      const s_id = User.email.split("@");
      db.collection("회원정보")
        .where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              setID(s_id[0]);
              setName(doc.data().User.Name);
              setDocID(doc.id);
              setpreNick(doc.data().User.Nick);
              setUserHistory(doc.data().My_Usage_History);
              setMbti(doc.data().User.Mbti);
              setUserNick(doc.data().User.Nick);
              setOnGoing(doc.data().Ongoing);
              setUniqueKey(doc.data().User.Unique_key);
            });
          } else {
            // console.log("데이터 없음");
          }
        });
    }
  }, [User, changeInfor]);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/login" />;
  } else {
    return (
      <ThemeProvider theme={Colortheme}>
        <Container>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="내 정보" {...a11yProps(0)} />
              <Tab label="내 설정" {...a11yProps(1)} />
              {/* <Tab label="이용 내역" {...a11yProps(2)} /> */}
              <Tab label="최근신청" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <MyInfo
                user={User}
                onGoing={onGoing}
                Ukey={uniqueKey}
                userNick={userNick}
              ></MyInfo>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <MySetting
                user={User}
                Name={Name}
                Mbti={Mbti}
                DocID={DocID}
                preNick={preNick}
                setchangeInfor={setchangeInfor}
                changeInfor={changeInfor}
              ></MySetting>
            </TabPanel>
            {/* <TabPanel value={value} index={2} dir={theme.direction}>
                            <MyUsage_History
                                User={User}
                                ID={ID}
                                DocID={DocID}
                                UserHistory={userHistory}
                                UserNick={userNick}
                            ></MyUsage_History>
                        </TabPanel> */}
            <TabPanel value={value} index={2} dir={theme.direction}>
              <MyRecentSubmit user={User}></MyRecentSubmit>
            </TabPanel>
          </SwipeableViews>
        </Container>
      </ThemeProvider>
    );
  }
};

export default Mypage;
