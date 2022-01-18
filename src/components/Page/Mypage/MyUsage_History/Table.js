import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import fire from "../../Register/LoginFire";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    width: "100%",
  },
  container: {
    maxHeight: 200,
  },
});

function createData(EP, info_1, info_2, lilac, daisy, clover, other, stage) {
  return {
    EP,
    info_1,
    info_2,
    detail: [
      {
        customerId: "Lilac",
        amount: lilac,
        other: other[0],
        stage: stage[0],
      }, // amout -> EP.Lilac.Ticket
      {
        customerId: "Daisy",
        amount: daisy,
        other: other[1],
        stage: stage[1],
      }, // amout -> EP.Daisy.Ticket
      {
        customerId: "Clover",
        amount: clover,
        other: other[2],
        stage: stage[2],
      }, // amout -> EP.Clover.Ticket
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.EP}
        </TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                세부사항
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>타입</TableCell>
                    <TableCell align="right">신청여부</TableCell>
                    <TableCell align="right">상대 닉네임</TableCell>
                    <TableCell align="right">진행 상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detail.map((detailRow) => (
                    <TableRow key={detailRow.date}>
                      <TableCell>{detailRow.customerId}</TableCell>
                      <TableCell align="right">{detailRow.amount}</TableCell>
                      <TableCell align="right">{detailRow.other}</TableCell>
                      <TableCell align="right">{detailRow.stage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    info_1: PropTypes.string.isRequired,
    info_2: PropTypes.string.isRequired,
    detail: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
      })
    ).isRequired,
    EP: PropTypes.number.isRequired,
  }).isRequired,
};

// 여기서 오류 찾음 !!!!!!!! 초기값 때문에 그럼

export default function CollapsibleTable(props) {
  const { User, UserID, UserHistory, UserNick } = props;
  const [row, setRow] = useState([]);

  async function searchHistory(UserID, UserHistory) {
    let testrow = [];
    const db = fire.firestore();
    for (let i in UserHistory) {
      let EP = UserHistory[i];
      let ticket = [];
      let currStage = [];
      let currOther = [];
      let lilacDoc;
      let daisyDoc;
      let cloverDoc;

      // 신청 중인 디비 데이터 탐색
      const searchData = await db
        .collection("Flosting_" + UserHistory[i])
        .where("ID", "==", UserID)
        .get();
      try {
        searchData.forEach((doc) => {
          ticket[0] = doc.data().Lilac.Ticket;
          ticket[1] = doc.data().Daisy.Ticket;
          ticket[2] = doc.data().Clover.Ticket;
        });
      } catch (err) {
        console.log(err);
      }

      for (var k = 0; k < 3; k++) {
        currOther[k] = "매칭전 ";
        currStage[k] = "매칭전";
      }
      // 매칭 완료 된 디비 검색 -> other, stage 추출
      let matchedLilacDb = await db
        .collection(EP + "lilac")
        .where("userOne.Nick", "==", UserNick)
        .get();

      try {
        matchedLilacDb.forEach((doc) => {
          lilacDoc = doc.data();
          currStage[0] = lilacDoc.stage;
          currOther[0] = lilacDoc.userTwo.Nick;
        });
      } catch (err) {
        console.log(err);
      }
      if (lilacDoc === undefined) {
        matchedLilacDb = await db
          .collection(EP + "lilac")
          .where("userTwo.Nick", "==", UserNick)
          .get();
        try {
          matchedLilacDb.forEach((doc) => {
            lilacDoc = doc.data();
            currStage[0] = lilacDoc.stage;
            currOther[0] = lilacDoc.userOne.Nick;
          });
        } catch (err) {
          console.log(err);
        }
      }
      // 데이지 검색
      // 매칭 완료 된 디비 검색 -> other, stage 추출
      let matchedDaisyDb = await db
        .collection(EP + "daisy")
        .where("userOne.Nick", "==", UserNick)
        .get();

      try {
        matchedDaisyDb.forEach((doc) => {
          daisyDoc = doc.data();
          currStage[1] = daisyDoc.stage;
          currOther[1] = daisyDoc.userTwo.Nick;
        });
      } catch (err) {
        console.log(err);
      }
      if (daisyDoc === undefined) {
        matchedDaisyDb = await db
          .collection(EP + "daisy")
          .where("userTwo.Nick", "==", UserNick)
          .get();
        try {
          matchedDaisyDb.forEach((doc) => {
            daisyDoc = doc.data();
            currStage[1] = daisyDoc.stage;
            currOther[1] = daisyDoc.userOne.Nick;
          });
        } catch (err) {
          console.log(err);
        }
      }

      // 데이지 검색
      // 매칭 완료 된 디비 검색 -> other, stage 추출
      let matchedCloverDb = await db
        .collection(EP + "clover")
        .where("userOne.Nick", "==", UserNick)
        .get();

      try {
        matchedCloverDb.forEach((doc) => {
          cloverDoc = doc.data();
          currStage[2] = cloverDoc.stage;
          currOther[2] = cloverDoc.userTwo.Nick;
        });
      } catch (err) {
        console.log(err);
      }
      if (cloverDoc === undefined) {
        matchedCloverDb = await db
          .collection(EP + "clover")
          .where("userTwo.Nick", "==", UserNick)
          .get();
        try {
          matchedCloverDb.forEach((doc) => {
            cloverDoc = doc.data();
            currStage[2] = cloverDoc.stage;
            currOther[2] = cloverDoc.userOne.Nick;
          });
        } catch (err) {
          console.log(err);
        }
      }

      for (var t = 0; t < 3; t++) {
        if (!ticket[t]) {
          currStage[t] = "미신청";
          currOther[t] = "미신청";
        }
      }

      testrow[i] = createData(
        UserHistory[i] + "회차",
        "",
        "",
        ticket[0] ? "O" : "X",
        ticket[1] ? "O" : "X",
        ticket[2] ? "O" : "X",
        currOther,
        currStage
      );
    }

    setRow(testrow);
  }

  useEffect(() => {
    // 여기서 rows db 처리
    searchHistory(UserID, UserHistory);
  }, [UserID]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>회차</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <Row key={row.EP} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
