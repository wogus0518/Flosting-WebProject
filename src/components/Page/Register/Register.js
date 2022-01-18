import React, { Component, useState, useEffect } from 'react'
import SelectSearch from 'react-select-search';
import './Searchbox.css'
import fuzzySearch from './fuzzySearch';
import { Schools } from './Schools';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


import { NavLink } from 'react-router-dom';
import fire from './LoginFire'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
    margin: 0rem 2rem;
    

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
    font-size: 0.5rem;
`;
const Error_message = styled.div`
    margin-left : 0.2rem;
    font-size: 0.5rem;
    color: ${props => props.limitnum ? '#00AB6F' : '#EF0C00'};
`

const RegButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${props => {
        if (props.register) return 'none';
        else if (props.login) return '1px solid #E0BCC1';
    }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${props => {
        if (props.register) return '#E0BCC1';
        else if (props.login) return '#FFFFFF';
    }};
  color: ${props => {
        if (props.register) return '#FFFFFF';
        else if (props.login) return '#828282';
    }};
  opacity: ${props => {
        if (props.disabled) return '0.5';
        else return '1.0';
    }};
  cursor: ${props => {
        if (props.disabled) return 'default';
        else return 'pointer'
    }};
`;
const Input = styled.input`

  border : ${props => props.limitnum ? '1px solid #A6A6A6' : '1px solid #EF0C00'};
  color: ${props => props.limitnum ? (props.overlap ? "#A6A6A6" : 'black') : '#EF0C00'};
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

const InputDiv = styled.div`
    display : flex;
    flex-direction: row;
`


const Register = (props) => {

    const { S_num, set_S_num, set_S_name, set_auth_regis, setU_School_num } = props

    const [limitnum, setlimitnum] = useState(false); // 아이디의 제한 체크 변수
    const [limitschoolnum, setlimitschoolnum] = useState(false); //학번
    const [limitname, setlimitname] = useState(false); // 학교의 체크 변수
    const [limitnummessasge, setlimitnummessasge] = useState("입력 가즈아!");
    const [limitschoolnummessasge, setlimitschoolnummessasge] = useState("숫자로 입력해주세요.");
    const [canNext, setcanNext] = useState(true); //다음으로 갈 수 있는지 체크해주는 변수
    const [overlap, setoverLap] = useState(false);
    const db = fire.firestore();

    const [open, setOpen] = useState(false); // OK알람창
    const [open2, setOpen2] = useState(false); //중복알람창

    useEffect(() => {
        cangoNext();
    }, [overlap])
    useEffect(() => {
        cangoNext();
    }, [limitname])
    useEffect(() => {
        cangoNext();
    }, [limitschoolnum])

    const handleoverlap = () => { //중복검사

        if (limitnum) {
            let Infodb = db.collection("회원정보");
            let query = Infodb.where("ID", "==", S_num).get().then((querySnapshot) => {
                if (querySnapshot.size) {
                    setOpen2(true);
                    setoverLap(false);
                } else {
                    setOpen(true); //alert창 띄우기
                }
            });
        } else {
            alert("알맞은 ID를 입력해주세요!")
        }

    }

    const overlapOk = () => {
        setlimitnummessasge("ID가 정해졌어요!")
        setoverLap(true);
        setOpen(false);
    }

    const cangoNext = () => {
        if (limitnum && limitname && overlap && limitschoolnum)
            setcanNext(false);
        else
            setcanNext(true);
    }

    const handleClick = () => {
        set_auth_regis(true);
    }

    const handleSchoolNumChange = (e) => {
        let pattern = /[^0-9]/gi; // 숫자 입력 되게
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 15) //글자수 제한
            e.target.value = e.target.value.slice(0, 15);


        setU_School_num(e.target.value);
        if (((e.target.value).length <= 13 && (e.target.value).length >= 8)) {
            setlimitschoolnum(true);
        } else {
            setlimitschoolnum(false);
        }
        if ((e.target.value).length <= 13 && (e.target.value).length >= 8) {
            setlimitschoolnummessasge("학번입력이 알맞게 되었네요!");
        }
        else if ((e.target.value).length == 0) {
            setlimitschoolnummessasge("숫자로 입력해주세요.");
        }
        else {
            setlimitschoolnummessasge("학번의 길이가 너무 짧아요!");
        }
    }
    const handleNumChange = (e) => {
        let pattern = /[^0-9|a-z|]/gi; // 숫자 입력 되게
        e.target.value = e.target.value.replace(pattern, '');
        e.target.value = e.target.value.toLowerCase();
        if (e.target.value.length > 13) //글자수 제한
            e.target.value = e.target.value.slice(0, 13);


        set_S_num((e.target.value).toLowerCase());
        if (((e.target.value).length <= 13 && (e.target.value).length >= 6)) {
            setlimitnum(true);
        } else {
            setlimitnum(false);
        }
        if ((e.target.value).length <= 13 && (e.target.value).length >= 6) {
            setlimitnummessasge("중복 확인 버튼을 눌러주세요!");
        }
        else if ((e.target.value).length == 0) {
            setlimitnummessasge("입력 가즈아!");
        }
        else {
            setlimitnummessasge("아이디의 길이가 너무 짧아요!");
        }
    }
    const handleNameChange = (selected) => {
        set_S_name(selected);
        setlimitname(true);
    }


    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <h1>
                    플로스팅 회원가입
                </h1>
                <School_number>
                    <School_title>
                        아이디
                    </School_title>
                    <School_content>
                        ※ 영어(소문자)와 숫자로 이루어진 6 ~ 13자리 문자열을 입력해주세요.
                    </School_content>
                    <InputDiv>
                        <Input
                            overlap={overlap}
                            limitnum={limitnum}
                            placeholder="아이디를 입력하세요"
                            onChange={handleNumChange}
                            disabled={overlap}
                        />
                        <Overlapbtn overlap={overlap} onClick={handleoverlap} disabled={overlap}>
                            중복 확인
                        </Overlapbtn>
                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">{S_num}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    위 ID로 가입하시겠습니까?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" autoFocus onClick={overlapOk} color="primary">
                                    확인
                                </Button>
                                <Button variant="outlined" onClick={() => setOpen(false)} color="primary">
                                    취소
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={open2}
                            onClose={() => setOpen2(false)}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">{S_num}</DialogTitle>
                            <DialogContent>
                                다음 ID는 중복입니다!
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" autoFocus onClick={() => setOpen2(false)} color="primary">
                                    확인
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </InputDiv>
                    <Error_message limitnum={limitnum}>
                        {limitnummessasge}
                    </Error_message>

                </School_number>

                <School_number>
                    <School_title>
                        학번
                    </School_title>
                    <School_content>
                        ※ 년도가 아닌 8 ~ 13자리로 이루어진 본인의 고유학번을 입력해주세요.
                    </School_content>
                    <InputDiv>
                        <Input
                            limitnum={limitschoolnum}
                            placeholder="학번을 입력하세요"
                            onChange={handleSchoolNumChange}
                        />
                    </InputDiv>
                    <Error_message limitnum={limitschoolnum}>
                        {limitschoolnummessasge}
                    </Error_message>

                </School_number>
                <School_name>
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
                </School_name>
                <NavLink to="/register/terms">
                    <RegButton register onClick={handleClick} disabled={canNext}>
                        다음
                    </RegButton>
                </NavLink>
            </Container>
        </ThemeProvider>
    );
}

export default Register;