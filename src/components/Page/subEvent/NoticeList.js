import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import NoticeItem from "./NoticeItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
}));

function NoticeList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {/* <NoticeItem Title="7월 이벤트" Date="2021.07.20 - 07.31"></NoticeItem> */}
      <NoticeItem
        Title="베타 서비스 시작"
        Date="2021.07.26 - "
        Notice="/subevent/notice1"
      ></NoticeItem>
      <NoticeItem
        Title="플로스팅 변경 사항 안내"
        Date="2021.08.19 - "
        Notice="/subevent/notice2"
      ></NoticeItem>
      {/* <NoticeItem Title="왕코 행님" Date="2021.06.20 - 10.31"></NoticeItem>
      <NoticeItem Title="왕코 행님" Date="2021.06.20 - 10.31"></NoticeItem>
      <NoticeItem Title="왕코 행님" Date="2021.06.20 - 10.31"></NoticeItem> */}
    </List>
  );
}

export default NoticeList;
