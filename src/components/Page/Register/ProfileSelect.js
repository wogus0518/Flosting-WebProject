import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { NavLink, Redirect } from 'react-router-dom';
import fire from './LoginFire'

import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';
import Avatar from "@material-ui/core/Avatar";
import imageCompression from 'browser-image-compression';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const db = fire.firestore();
const storage = fire.storage();
const storageRef = storage.ref();

const inputStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const useStyles = makeStyles((theme) => ({
    largeavatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        border: "1px solid rgb(0,0,0,0.2)",
    },
}));

const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 10,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Wrapper = styled.div`
`;

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

const CameraBox = styled.div`
label{
  display: flex;
  flex-direction : row;
  justify-content : center;
  align-items : center;
  margin : 0px 5px;
  border-radius : 10px;
  padding: 3px;
  border : 1px solid rgb(0,0,0, 0.1);
  list-style: none;
  background-color: rgb(0,0,0, 0.2);
  li{
    font-family: 'Do Hyeon', sans-serif;
    font-size: 0.8rem;
  }
}
`

const NextButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 0rem 0rem 2rem 0rem;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 100%;
  background-color: #E0BCC1;
  color: #FFFFFF;
  opacity: ${props => {
        if (props.disabled) return '0.5';
        else return '1.0';
    }};
  cursor: ${props => {
        if (props.disabled) return 'default';
        else return 'pointer'
    }};
`;

const School_title = styled.div`
  list-style : none;
  margin: 2rem 0rem 1rem 0rem;
  li{
    font-size: 0.7rem;
    color: '#828282';
  }
  .InstaError{
      font-size: 0.6rem;
      color: red;
  }
`;
const AvatarBox = styled.div`
    border-top : 1px solid rgb(0,0,0, 0.1);
    border-bottom : 1px solid rgb(0,0,0, 0.1);
    padding : 1rem 0rem;
    margin : 1rem 0rem;
    display: flex;
    flex-direction : column;
    list-style : none;
    justify-content: center;
    align-items : center;
    li{
        margin-top: 10px;
        text-align : center;
        font-family: 'Noto Sans KR', sans-serif;
        font-size : 0.7rem;
    }

`
const ProfileChangeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 2.5rem;
  margin-bottom : 10px;
  border-bottom: 1px solid rgb(0,0,0, 0.1);
`


const ProfileSelect = (props) => {
    const classes = useStyles();

    const db = fire.firestore();
    const [goNext, setgoNext] = useState(true);
    const [ProfileImage, setProfileImage] = useState("");
    const [프사, 프사변경] = useState(null);
    const [imgBase64, setImgBase64] = useState("");

    const { setU_Profileurl, auth_regis, U_unique_key } = props

    const noneactiveStyle = {
        textDecoration: 'none'
    }



    if (false) { return (<Redirect to='/register' />); }
    else {
        return (
            <ThemeProvider theme={Colortheme}>
                <Wrapper>
                    <Container>
                        <h1>
                            프로필 사진 선택
                        </h1>
                        <School_title>
                            <li>프로필 사진을 등록해주세요!</li>
                            <li>매칭 시 상대방이 알아볼 수 있는 매력적인 사진으로 선택해주세요!</li>
                            <li className="InstaError">인스타그램 링크를 통해 들어오신 경우, 정상적으로 등록되지 않습니다.</li>
                        </School_title>
                        <AvatarBox>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                            >
                                <Avatar
                                    alt={"임시프로필"}
                                    src={ProfileImage}
                                    className={classes.largeavatar}
                                />
                            </Badge>
                            <li>
                                프로필 사진선택은 필수입니다!<br />
                                비정상적인 프로필 사진을 등록하시면<br />
                                블랙리스트에 오를 수 있으니 조심하셔야겠죠?
                            </li>
                        </AvatarBox>
                        <ProfileChangeBox>
                            <UploadProfileImage 프사변경={프사변경} 프사={프사} U_unique_key={U_unique_key} setU_Profileurl={setU_Profileurl} setgoNext={setgoNext} setProfileImage={setProfileImage} imgBase64={imgBase64} setImgBase64={setImgBase64} />
                        </ProfileChangeBox>
                        <NavLink to="/register/mbtiselect">
                            <NextButton disabled={goNext}>
                                다음
                            </NextButton>
                        </NavLink>
                    </Container>
                </Wrapper>
            </ThemeProvider>
        );
    }
}

export default ProfileSelect;

function UploadProfileImage(props) {

    const [open, setOpen] = useState(false);
    const classes = inputStyles();
    const date = new Date();
    const { setProfileImage, setgoNext, setU_Profileurl, U_unique_key } = props;


    async function onSubmit(event) {
        let storageUniquekey = U_unique_key.replace('/');
        event.preventDefault();
        // const uploadTask = storageRef.child(`profileImage/registerImage/${date}`).put(props.프사)
        const uploadTask = storageRef.child(`profileImage_2/${storageUniquekey}`).put(props.프사)
        uploadTask.then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                setU_Profileurl(downloadURL);
                setProfileImage(downloadURL);
                setOpen(false);
                setgoNext(false);
            })
        })
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
            <input className={classes.input} id="icon-button-file" type="file" accept=".gif, .jpg, .png"
                onChange={onChange}
            />
            <CameraBox>
                <label htmlFor="icon-button-file" onClick={() => setOpen(true)}>
                    <li>프로필 사진 변경</li>
                </label>
            </CameraBox>
            {
                props.프사 === null
                    ?
                    <div></div>
                    :
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">프로필 사진 변경</DialogTitle>
                        <DialogContent>
                            <label htmlFor="contained-button-file">
                                <div>
                                    <Avatar style={{ "width": "150px", "height": "150px", "border": "1px solid grey" }} src={props.imgBase64} />
                                </div>
                            </label>
                            <DialogContentText>
                                위 사진으로 변경하시겠습니까?
                            </DialogContentText>
                            <DialogContentText>
                                누르고 3초만 기다려주세요!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" component="span" onClick={onSubmit}>
                                저장하기
                            </Button>
                            <Button variant="outlined" color="primary" component="span" onClick={() => { setOpen(false) }}>
                                취소하기
                            </Button>
                        </DialogActions>
                    </Dialog>
            }
        </div>
    );
}