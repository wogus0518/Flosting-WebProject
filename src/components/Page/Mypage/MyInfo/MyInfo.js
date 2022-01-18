import React, { useState, useEffect } from "react";
import fire from "../../Register/LoginFire";
import Badge from "@material-ui/core/Badge";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MannerInfo from "./MannerInfo";
import TierInfo from "./TierInfo";
import MbtiInfo from "./MbtiInfo";
import imageCompression from 'browser-image-compression';

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteUser from "./DeleteUser";

const db = fire.firestore();
const storage = fire.storage();
const storageRef = storage.ref();

const inputStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

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
  flex-direction: row;
`;
const FlexColumnbox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
`;
const CameraBox = styled.div`
  label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;
    border-radius: 10px;
    padding: 3px;
    border: 1px solid rgb(0, 0, 0, 0.1);
    list-style: none;
    background-color: rgb(0, 0, 0, 0.2);
    li {
      font-family: "Do Hyeon", sans-serif;
      font-size: 0.8rem;
    }
  }
`;
const ProfileChangeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5px;
  border-top: 1px solid rgb(0, 0, 0, 0.1);
  display: flex;
  height: 2.5rem;
`;

const MyInfo = (props) => {
  const user = props.user;
  const onGoing = props.onGoing;
  const Ukey = props.Ukey;
  const userNick = props.userNick;
  const [refresh, setrefresh] = useState(true);
  const classes = useStyles();
  const [ID, setID] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [Univ, setUniv] = useState("");
  const [Unique_key, setUnique_key] = useState("");
  const [RealName, setRealName] = useState("");
  const [Manner, setManner] = useState("");
  const [Nickname, setNickname] = useState("");
  const [NextTier, setNextTier] = useState("");
  const [Mbti, setMbti] = useState("");
  const [Age, setAge] = useState(19);
  const [tierName, settierName] = useState("");
  const [tierImg, settierImg] = useState("tier_zero.png");
  const [프사, 프사변경] = useState(null);
  const [회원정보docId, 회원정보docId변경] = useState();
  const [imgBase64, setImgBase64] = useState("");
  const tier_mi2 =
    "https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_mi2.jpeg?alt=media";
  const tier_mi1 =
    "https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_mi1.jpeg?alt=media";
  const tier_zero =
    "https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_zero.png?alt=media";
  const tier_plus1 =
    "https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_plus1.jpeg?alt=media";
  const tier_plus2 =
    "https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_plus2.png?alt=media";
  const tier_plus3 =
    "https://firebasestorage.googleapis.com/v0/b/flosting-65c9e.appspot.com/o/TierImage%2Ftier_plus3.png?alt=media";

  useEffect(() => {
    if (user) {
      let s_id = user.email.split("@");
      setID(s_id[0]);
      let Infodb = db.collection("회원정보");
      let query = Infodb.where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            회원정보docId변경(doc.id);
            setProfileImage(doc.data().profileImage);
            setNickname(doc.data().User.Nick);
            setRealName(doc.data().User.Name);
            setUniv(doc.data().User.Univ);
            setAge(doc.data().User.Age);
            setUnique_key(doc.data().User.Unique_key);
            setMbti(doc.data().User.Mbti);
            let mannertemp = doc.data().User.Manner;
            setManner(mannertemp);
            whatTier(mannertemp);
            let Till = Math.ceil(mannertemp / 10) * 10;
            setNextTier(Till - mannertemp);
          });
        });
    }
  }, [user, refresh]);

  function whatTier(Temp) {
    if (Temp < 20) {
      settierImg(tier_mi2);
      settierName("썩은 씨앗");
    } else if (Temp < 30) {
      settierImg(tier_mi1);
      settierName("깨진 씨앗");
    } else if (Temp < 40) {
      settierImg(tier_zero);
      settierName("씨앗");
    } else if (Temp < 50) {
      settierImg(tier_plus1);
      settierName("새싹");
    } else if (Temp < 60) {
      settierImg(tier_plus2);
      settierName("꽃봉오리");
    } else {
      settierImg(tier_plus3);
      settierName("데이지");
    }
  }

  return (
    <Container>
      <FlexRowbox>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <SmallAvatar
              alt="Remy Sharp"
              src={
                require("../../../../images/Age/Age_" + Age + ".png").default
              }
            />
          }
        >
          <Avatar
            alt={Nickname}
            src={ProfileImage}
            className={classes.largeavatar}
          />
        </Badge>
        <FlexColumnbox>
          <SchoolNumBox>
            <li className="ID">
              {RealName}[{ID}]
            </li>
          </SchoolNumBox>
          <NicknameBox>
            <h1>{Nickname}</h1>
          </NicknameBox>
          <SchoolNumBox>
            <li className="School">{Univ}</li>
          </SchoolNumBox>
        </FlexColumnbox>
      </FlexRowbox>
      <ProfileChangeBox>
        <UploadProfileImage
          프사변경={프사변경}
          프사={프사}
          refresh={refresh}
          setrefresh={setrefresh}
          user={user}
          회원정보docId={회원정보docId}
          imgBase64={imgBase64}
          Unique_key={Unique_key}
          setImgBase64={setImgBase64}
        />
      </ProfileChangeBox>
      <MannerInfo
        Manner={Manner}
        tier_mi2={tier_mi2}
        tier_mi1={tier_mi1}
        tier_zero={tier_zero}
        tier_plus1={tier_plus1}
        tier_plus2={tier_plus2}
        tier_plus3={tier_plus3}
      />
      <MbtiInfo Mbti={Mbti}></MbtiInfo>
      <TierInfo tierName={tierName} tierImg={tierImg} NextTier={NextTier} />
      <DeleteUser
        User={user}
        회원정보docId={회원정보docId}
        onGoing={onGoing}
        Ukey={Ukey}
        userNick={userNick}
      ></DeleteUser>
    </Container>
  );
};

export default MyInfo;

function UploadProfileImage(props) {
  const [open, setOpen] = useState(false);
  const classes = inputStyles();
  const date = new Date();
  const { refresh, setrefresh, Unique_key } = props;


  async function onSubmit(event) {
    let storageUniquekey = Unique_key.replace('/');
    event.preventDefault();
    const uploadTask = storageRef.child(`profileImage_2/${storageUniquekey}`).put(props.프사)
    uploadTask.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        db.collection("회원정보")
          .doc(props.회원정보docId)
          .update({ profileImage: downloadURL })
          .then(
            alert("프로필 사진 변경 성공! 새로고침 해주세요!"),
            setOpen(false),
            setrefresh(!refresh)
          );
      });
    });
  }

  const onChange = async (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        props.setImgBase64(base64.toString());
      }
    }
    if (e.target.files[0]) {
      let file = e.target.files[0];

      const options = {
        maxSizeMB: 0.15
      }

      try {
        const compressedFile = await imageCompression(file, options);
        reader.readAsDataURL(compressedFile);
        props.프사변경(compressedFile);

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        id="icon-button-file"
        type="file"
        accept=".gif, .jpg, .png"
        onChange={onChange}
      />
      <CameraBox>
        <label htmlFor="icon-button-file" onClick={() => setOpen(true)}>
          <li>프로필 사진 변경</li>
        </label>
      </CameraBox>
      {props.프사 === null ? (
        <div></div>
      ) : (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            프로필 사진 변경
          </DialogTitle>
          <DialogContent>
            <label htmlFor="contained-button-file">
              <div>
                <Avatar
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "1px solid grey",
                  }}
                  src={props.imgBase64}
                />
              </div>
            </label>
            <DialogContentText>위 사진으로 변경하시겠습니까?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={onSubmit}
            >
              저장하기
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
