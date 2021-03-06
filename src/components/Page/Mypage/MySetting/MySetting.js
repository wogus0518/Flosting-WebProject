import React, { Component, useState, useEffect } from 'react'

import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MBTISelect from './MBTISelect';
import fire from '../../Register/LoginFire';

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

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;

    h1{
        font-size: 1.5rem;
    }
`;

const SettingInfor = styled.div`
    margin: 0.5rem 0rem;
    list-style : none;
    li{
        color: rgb(0,0,0,0.8);
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 400;
        font-size: 0.8rem;
    }
`
const Nicname_content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;
const School_title = styled.div`
    font-weight: 500;
    font-size: 1.1rem;
    color: '#828282';
    margin: 0.5rem 0rem;
`;
const School_content = styled.div`
    font-size: 0.5rem;
`;
const InputDiv = styled.div`
    display : flex;
    flex-direction: row;
`
const Input = styled.input`
  border : ${props => props.limitnum ? '1px solid #A6A6A6' : '1px solid #EF0C00'};
  color: ${props => props.limitnum ? (props.overlap ? '#A6A6A6' : 'black') : '#EF0C00'};
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;
const Overlapbtn = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    border-radius: 8px;
    margin: 5px;
    border : ${props => props.overlap ? '1px solid #00AB6F' : '1px solid #A6A6A6'};
    color :  ${props => props.overlap ? '#00AB6F' : 'black'};
    width: 4rem;
    height: 2rem;
    font-size: 0.7rem;
`;

const Error_message = styled.div`
    margin-left : 0.2rem;
    font-size: 0.5rem;
    color: ${props => props.limitnum ? '#00AB6F' : '#EF0C00'};
`
const SaveButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin-top: 2rem;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 300px;
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

const MySetting = (props) => {

    const { Mbti, Name, preNick, DocID, changeInfor, setchangeInfor} = props;

    const [overlap, setoverLap] = useState(false); // ????????? ??????
    const [open, setOpen] = useState(false); // OK?????????
    const [open2, setOpen2] = useState(false); //???????????????
    const [nickname, setnickname] = useState(preNick); // ?????????
    const [limitnick, setlimitnick] = useState(true); //????????? ????????? ???????????? ????????????.
    const [limitnickmessage, setlimitnickmessage] = useState(''); //?????? ?????? ?????????
    const [newMbti, setnewMbti] = useState(Mbti);
    const [NicknameChange, setNicknameChange] = useState(false); //????????? ??????????????????
    const [MbtiChange, setMbtiChange] = useState(false); //Mbti??????????????????
    const [CanChange, setCanChange] = useState(true); //????????? ?????? ?????????
    const db = fire.firestore();
    
    useEffect(() => {
        if(NicknameChange || MbtiChange){
            setCanChange(false);
        }else{
            setCanChange(true);
        }
    }, [NicknameChange, MbtiChange])

    const SaveInfor = () => {
        db.collection("????????????").doc(DocID).update({
            "User.Mbti" : newMbti,
            "User.Nick" : nickname
        })
        setchangeInfor(!changeInfor);
        alert("?????? ?????????????????????!")
    }
    const handleNicChange = (e) => {
        let pattern = /[^???-???|???-???|a-z|A-Z|]/gi; // ???????????? ?????????
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 6) //????????? ??????
            e.target.value = e.target.value.slice(0, 6);
        setnickname(e.target.value);

        if (((e.target.value).length >= 2)) {
            setlimitnick(true);
        } else {
            setlimitnick(false);
        }
        if ((e.target.value).length >= 2) {

            setlimitnickmessage("?????? ?????? ????????? ???????????????!");
        }
        else if ((e.target.value).length == 0) {
            setlimitnickmessage("????????? ????????? ?????? ????????????.");
        }
        else {
            setlimitnickmessage("???????????? ????????? ?????? ?????????!");
        }
    }

    const overlapOk = () => {
        setlimitnickmessage("???????????? ???????????????!")
        setoverLap(true);
        setOpen(false);
        setNicknameChange(true);
    }
    const handleoverlap = () => { //????????????

        if (limitnick) {
            if (nickname == preNick) {
                alert("?????? ???????????? ???????????????!")
            } else {
                let Infodb = db.collection("????????????");
                let query = Infodb.where("User.Nick", "==", nickname).get().then((querySnapshot) => {
                    if (querySnapshot.size) {
                        setOpen2(true);
                        setoverLap(false);
                    } else {
                        setOpen(true); //alert??? ?????????
                    }
                });
            }
        } else {
            alert("???????????? ????????? ??????????????????!")
        }

    }

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <h1>
                    ??? ????????????
                </h1>
                <SettingInfor>
                    <li>{Name}???! ?????? ?????? ????????????, ????????? ????????? ??? ????????????.</li>
                </SettingInfor>

                {/* <Nicname_content>
                    <School_title>
                        ?????????
                    </School_title>
                    <School_content>
                        ??? ????????? ????????? ???????????? ????????????, 2~6????????? ??????????????????.
                    </School_content>
                    <InputDiv>
                        <Input
                            overlap={overlap}
                            limitnum={limitnick}
                            disabled = {overlap}
                            placeholder="????????? ??????"
                            type="text"
                            required
                            value={nickname}
                            onChange={handleNicChange}
                        />
                        <Overlapbtn overlap={overlap} onClick={handleoverlap} disabled={overlap}>
                            ?????? ??????
                        </Overlapbtn>
                    </InputDiv>
                    <Error_message limitnum={limitnick}>
                        {limitnickmessage}
                    </Error_message>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{nickname}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                ??? ??????????????? ?????????????????????????
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" autoFocus onClick={overlapOk} color="primary">
                                ??????
                            </Button>
                            <Button variant="outlined" onClick={() => setOpen(false)} color="primary" autoFocus>
                                ??????
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={open2}
                        onClose={() => setOpen2(false)}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{nickname}</DialogTitle>
                        <DialogContent>
                            ?????? ???????????? ?????? ??????????????????!
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" autoFocus onClick={() => setOpen2(false)} color="primary">
                                ??????
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Nicname_content> */}
                <Nicname_content>
                    <School_title>
                        MBTI
                    </School_title>
                    <School_content>
                        ??? ?????? ????????? ?????? MBTI??? ????????? ??? ????????????.
                    </School_content>
                    <MBTISelect {...props} setMbtiChange = {setMbtiChange} newMbti = {newMbti} setnewMbti = {setnewMbti} setCanChange = {setCanChange}>

                    </MBTISelect>
                </Nicname_content>
                <SaveButton onClick={SaveInfor} disabled = {CanChange}>
                    ?????? ?????? ??????
                </SaveButton>
            </Container>
        </ThemeProvider>
    );
}

export default MySetting;