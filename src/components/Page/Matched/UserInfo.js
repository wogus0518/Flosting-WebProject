import React, { useState, useEffect } from "react";
import fire from "../Register/LoginFire";
import Badge from '@material-ui/core/Badge';
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MannerInfo from "../Mypage/MyInfo/MannerInfo";
import TierInfo from "../Mypage/MyInfo/TierInfo";
import MbtiInfo from "../Mypage/MyInfo/MbtiInfo";

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  largeavatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    border: "1px solid rgb(0,0,0,0.2)",
  },
}));

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
`;

const NicknameBox = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  h1 {
    font-size: 2rem;
  }
`;
const SchoolNumBox = styled.div`
  list-style: none;
  font-family: "Noto Sans KR", sans-serif;
  .ID {
    font-weight: 400;
    font-size: 1rem;
    color: rgb(0, 0, 0, 0.8);
  }
  .School {
    font-weight: 400;
    font-size: 0.8rem;
    color: rgb(0, 0, 0, 0.8);
  }
  .Age {
    font-weight: 400;
    font-size: 0.8rem;
    color: rgb(0, 0, 0, 0.8);
  }
`;

const FlexRowbox = styled.div`
  display: flex;
  flex-direction : row;
`
const FlexColumnbox = styled.div`
  display: flex;
  flex-direction : column;
  margin: 0px 10px;
`

const UserInfo = (props) => {
  const classes = useStyles();
  const user = props.user;
  const db = fire.firestore();

  const { Nickname,
  ProfileImage,
  ID, 
  Name,
  Mbti,
  Univ,
  RealName,
  Manner,
  NextTier,
  Age,
  tierName,
  tierImg} = props;

  return (
    <Container>
      <FlexRowbox>
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        
        badgeContent={<SmallAvatar alt="Remy Sharp" src={require('../../../images/Age/Age_'+ Age +'.png').default} />}
      >
        <Avatar
          alt={Nickname}
          src={ProfileImage}
          className={classes.largeavatar}
        />
        </Badge>
        <FlexColumnbox>
          <SchoolNumBox>
            <li className="ID">{RealName}[{ID}]</li>
          </SchoolNumBox>
          <NicknameBox>
            <h1>{Nickname}</h1>
          </NicknameBox>
          <SchoolNumBox>
            <li className="School">{Univ}</li>
          </SchoolNumBox>
        </FlexColumnbox>
      </FlexRowbox>
      <MannerInfo Manner={Manner} />
      <MbtiInfo Mbti = {Mbti}></MbtiInfo>
      <TierInfo tierName ={tierName} tierImg ={tierImg} Manner={Manner} NextTier={NextTier} />
    </Container>
  );
};

export default UserInfo;
