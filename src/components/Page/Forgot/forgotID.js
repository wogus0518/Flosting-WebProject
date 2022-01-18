import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import kakaochannel from '../../../images/kakaochannel.png'

import { Schools } from '../Register/Schools';
import SelectSearch from 'react-select-search';
import fuzzySearch from '../Register/fuzzySearch';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import fire from '../Register/LoginFire';


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
        margin-top: 2rem;
    }
`;
const School_number = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;
const School_name = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 2rem;
`;

const School_title = styled.div`
    font-size: 1.0rem;
    color: '#828282';
    margin: 0.5rem 0rem;
`;
const School_content = styled.div`
    margin: 5px 0 0 0;
    font-size: 0.5rem;
    list-style : none;
    li{
        font-size: 0.5rem;
    }
`;
const Input = styled.input`

  border : 1px solid #A6A6A6;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const KakaoChannelBox = styled.div`
    background : #F6ECF8;
    border-radius: 10px;
    border: 1px solid rgb(0,0,0, 0.2);
    padding: 5px;
    list-style : none;
    display: flex;
    align-items: center;
    flex-direction: row;
    img{
        margin: 0px 5px;
        width: 3rem;
        height: 3rem;
    }
    li{
        font-size: 0.8rem;
        color: rgb(0,0,0,0.7);
    }
`
const PhoneButton = styled.button`

  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 1rem 0rem 1rem 0rem;
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

const forgotID = (props) => {

    const {
        S_num, setS_num,
        S_Univ, setS_Univ,
        goNextID, setgoNextID,
        setlimitSnum,
        setlimitSUniv,
        IDopen, setIDopen,
        findID, setfindID
    } = props;

    const db = fire.firestore();
    const handleNameChange = (selected) => {
        setS_Univ(selected);
        setlimitSUniv(true);
    }

    const handleNumChange = (e) => {
        let pattern = /[^0-9]/gi; // 숫자 입력 되게
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 13) //글자수 제한
            e.target.value = e.target.value.slice(0, 13);

        setS_num(e.target.value);

        if (e.target.value.length > 0) {
            setlimitSnum(true);
        } else {
            setlimitSnum(false);
        }

    }

    const handleCheckButton = () => {
        let Infodb = db.collection("회원정보");
        let query = Infodb.where("User.Schoolnumber", "==", S_num).where("User.Univ", "==", S_Univ).get().then((querySnapshot) => {
            if (querySnapshot.size) {
                querySnapshot.forEach((doc) => {
                        setfindID(doc.data().ID);
                        setIDopen(true);
                });
            } else {
                alert("입력하신 정보로 가입된 ID는 없어요.")
            }
        });
    }
    return (
        <ThemeProvider theme={Colortheme}>
            <div>
                <Container>
                    <h1>
                        아이디 찾기
                    </h1>
                    <School_content>
                        <li>아이디를 까먹으신 회원님은 아래 정보를 입력해주세요!</li>
                    </School_content>
                    <School_title>
                        학교
                    </School_title>
                    <SelectSearch
                        options={Schools}
                        search
                        filterOptions={fuzzySearch}
                        onChange={handleNameChange}
                        emptyMessage="Not found"
                        placeholder="학교 이름을 검색하세요."
                    />

                    <School_number>
                        <School_title>
                            학번
                        </School_title>
                    </School_number>
                    <Input
                        placeholder="학번을 입력하세요"
                        onChange={handleNumChange}
                    />

                    <PhoneButton disabled={goNextID} onClick={handleCheckButton}>
                        ID 찾기
                    </PhoneButton>

                    <School_number>
                        <School_title>
                            본인 학번을 잘못 기입하신 회원님께선<br />
                            아래 카카오채널로 문의해주세요!
                        </School_title>
                    </School_number>
                    <Dialog
                        open={IDopen}
                        onClose={() => setIDopen(false)}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">ID는 다음과 같습니다.</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {findID}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={() => setIDopen(false)} color="primary">
                                확인
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <KakaoChannelBox onClick={() => { window.open('http://pf.kakao.com/_xfuvpK', '_blank') }}>
                        <img calssName='icon' src={kakaochannel} />
                        <li>플로스팅 공식 채널로 이동하기</li>
                    </KakaoChannelBox>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default forgotID;