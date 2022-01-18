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

    const [overlap, setoverLap] = useState(false); // 닉네임 중복
    const [open, setOpen] = useState(false); // OK알람창
    const [open2, setOpen2] = useState(false); //중복알람창
    const [nickname, setnickname] = useState(preNick); // 닉네임
    const [limitnick, setlimitnick] = useState(true); //닉네임 두글자 이상하게 하기위함.
    const [limitnickmessage, setlimitnickmessage] = useState(''); //닉넴 에러 메세지
    const [newMbti, setnewMbti] = useState(Mbti);
    const [NicknameChange, setNicknameChange] = useState(false); //닉네임 변경되었는지
    const [MbtiChange, setMbtiChange] = useState(false); //Mbti변경되었는지
    const [CanChange, setCanChange] = useState(true); //변경된 것이 있는지
    const db = fire.firestore();
    
    useEffect(() => {
        if(NicknameChange || MbtiChange){
            setCanChange(false);
        }else{
            setCanChange(true);
        }
    }, [NicknameChange, MbtiChange])

    const SaveInfor = () => {
        db.collection("회원정보").doc(DocID).update({
            "User.Mbti" : newMbti,
            "User.Nick" : nickname
        })
        setchangeInfor(!changeInfor);
        alert("변경 완료되었습니다!")
    }
    const handleNicChange = (e) => {
        let pattern = /[^ㄱ-ㅎ|가-힣|a-z|A-Z|]/gi; // 한글이랑 영어만
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 6) //글자수 제한
            e.target.value = e.target.value.slice(0, 6);
        setnickname(e.target.value);

        if (((e.target.value).length >= 2)) {
            setlimitnick(true);
        } else {
            setlimitnick(false);
        }
        if ((e.target.value).length >= 2) {

            setlimitnickmessage("중복 확인 버튼을 눌러주세요!");
        }
        else if ((e.target.value).length == 0) {
            setlimitnickmessage("한글과 영어만 입력 가능해요.");
        }
        else {
            setlimitnickmessage("닉네임의 길이가 너무 짧아요!");
        }
    }

    const overlapOk = () => {
        setlimitnickmessage("닉네임이 정해졌어요!")
        setoverLap(true);
        setOpen(false);
        setNicknameChange(true);
    }
    const handleoverlap = () => { //중복검사

        if (limitnick) {
            if (nickname == preNick) {
                alert("기존 닉네임과 동일하네요!")
            } else {
                let Infodb = db.collection("회원정보");
                let query = Infodb.where("User.Nick", "==", nickname).get().then((querySnapshot) => {
                    if (querySnapshot.size) {
                        setOpen2(true);
                        setoverLap(false);
                    } else {
                        setOpen(true); //alert창 띄우기
                    }
                });
            }
        } else {
            alert("닉네임의 길이를 확인해주세요!")
        }

    }

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <h1>
                    내 정보변경
                </h1>
                <SettingInfor>
                    <li>{Name}님! 아래 칸을 변경하여, 정보를 변경할 수 있답니다.</li>
                </SettingInfor>

                {/* <Nicname_content>
                    <School_title>
                        닉네임
                    </School_title>
                    <School_content>
                        ※ 한글과 영어로 이루어진 문자열로, 2~6글자로 설정해주세요.
                    </School_content>
                    <InputDiv>
                        <Input
                            overlap={overlap}
                            limitnum={limitnick}
                            disabled = {overlap}
                            placeholder="닉네임 입력"
                            type="text"
                            required
                            value={nickname}
                            onChange={handleNicChange}
                        />
                        <Overlapbtn overlap={overlap} onClick={handleoverlap} disabled={overlap}>
                            중복 확인
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
                                위 닉네임으로 설정하시겠습니까?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" autoFocus onClick={overlapOk} color="primary">
                                확인
                            </Button>
                            <Button variant="outlined" onClick={() => setOpen(false)} color="primary" autoFocus>
                                취소
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
                            다음 닉네임은 이미 사용중이네요!
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" autoFocus onClick={() => setOpen2(false)} color="primary">
                                확인
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Nicname_content> */}
                <Nicname_content>
                    <School_title>
                        MBTI
                    </School_title>
                    <School_content>
                        ※ 변경 버튼을 눌러 MBTI를 변경할 수 있습니다.
                    </School_content>
                    <MBTISelect {...props} setMbtiChange = {setMbtiChange} newMbti = {newMbti} setnewMbti = {setnewMbti} setCanChange = {setCanChange}>

                    </MBTISelect>
                </Nicname_content>
                <SaveButton onClick={SaveInfor} disabled = {CanChange}>
                    변경 내용 저장
                </SaveButton>
            </Container>
        </ThemeProvider>
    );
}

export default MySetting;