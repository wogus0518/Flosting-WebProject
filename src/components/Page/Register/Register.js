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

    const [limitnum, setlimitnum] = useState(false); // ???????????? ?????? ?????? ??????
    const [limitschoolnum, setlimitschoolnum] = useState(false); //??????
    const [limitname, setlimitname] = useState(false); // ????????? ?????? ??????
    const [limitnummessasge, setlimitnummessasge] = useState("?????? ?????????!");
    const [limitschoolnummessasge, setlimitschoolnummessasge] = useState("????????? ??????????????????.");
    const [canNext, setcanNext] = useState(true); //???????????? ??? ??? ????????? ??????????????? ??????
    const [overlap, setoverLap] = useState(false);
    const db = fire.firestore();

    const [open, setOpen] = useState(false); // OK?????????
    const [open2, setOpen2] = useState(false); //???????????????

    useEffect(() => {
        cangoNext();
    }, [overlap])
    useEffect(() => {
        cangoNext();
    }, [limitname])
    useEffect(() => {
        cangoNext();
    }, [limitschoolnum])

    const handleoverlap = () => { //????????????

        if (limitnum) {
            let Infodb = db.collection("????????????");
            let query = Infodb.where("ID", "==", S_num).get().then((querySnapshot) => {
                if (querySnapshot.size) {
                    setOpen2(true);
                    setoverLap(false);
                } else {
                    setOpen(true); //alert??? ?????????
                }
            });
        } else {
            alert("????????? ID??? ??????????????????!")
        }

    }

    const overlapOk = () => {
        setlimitnummessasge("ID??? ???????????????!")
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
        let pattern = /[^0-9]/gi; // ?????? ?????? ??????
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 15) //????????? ??????
            e.target.value = e.target.value.slice(0, 15);


        setU_School_num(e.target.value);
        if (((e.target.value).length <= 13 && (e.target.value).length >= 8)) {
            setlimitschoolnum(true);
        } else {
            setlimitschoolnum(false);
        }
        if ((e.target.value).length <= 13 && (e.target.value).length >= 8) {
            setlimitschoolnummessasge("??????????????? ????????? ????????????!");
        }
        else if ((e.target.value).length == 0) {
            setlimitschoolnummessasge("????????? ??????????????????.");
        }
        else {
            setlimitschoolnummessasge("????????? ????????? ?????? ?????????!");
        }
    }
    const handleNumChange = (e) => {
        let pattern = /[^0-9|a-z|]/gi; // ?????? ?????? ??????
        e.target.value = e.target.value.replace(pattern, '');
        e.target.value = e.target.value.toLowerCase();
        if (e.target.value.length > 13) //????????? ??????
            e.target.value = e.target.value.slice(0, 13);


        set_S_num((e.target.value).toLowerCase());
        if (((e.target.value).length <= 13 && (e.target.value).length >= 6)) {
            setlimitnum(true);
        } else {
            setlimitnum(false);
        }
        if ((e.target.value).length <= 13 && (e.target.value).length >= 6) {
            setlimitnummessasge("?????? ?????? ????????? ???????????????!");
        }
        else if ((e.target.value).length == 0) {
            setlimitnummessasge("?????? ?????????!");
        }
        else {
            setlimitnummessasge("???????????? ????????? ?????? ?????????!");
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
                    ???????????? ????????????
                </h1>
                <School_number>
                    <School_title>
                        ?????????
                    </School_title>
                    <School_content>
                        ??? ??????(?????????)??? ????????? ???????????? 6 ~ 13?????? ???????????? ??????????????????.
                    </School_content>
                    <InputDiv>
                        <Input
                            overlap={overlap}
                            limitnum={limitnum}
                            placeholder="???????????? ???????????????"
                            onChange={handleNumChange}
                            disabled={overlap}
                        />
                        <Overlapbtn overlap={overlap} onClick={handleoverlap} disabled={overlap}>
                            ?????? ??????
                        </Overlapbtn>
                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">{S_num}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    ??? ID??? ?????????????????????????
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" autoFocus onClick={overlapOk} color="primary">
                                    ??????
                                </Button>
                                <Button variant="outlined" onClick={() => setOpen(false)} color="primary">
                                    ??????
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
                                ?????? ID??? ???????????????!
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" autoFocus onClick={() => setOpen2(false)} color="primary">
                                    ??????
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
                        ??????
                    </School_title>
                    <School_content>
                        ??? ????????? ?????? 8 ~ 13????????? ???????????? ????????? ??????????????? ??????????????????.
                    </School_content>
                    <InputDiv>
                        <Input
                            limitnum={limitschoolnum}
                            placeholder="????????? ???????????????"
                            onChange={handleSchoolNumChange}
                        />
                    </InputDiv>
                    <Error_message limitnum={limitschoolnum}>
                        {limitschoolnummessasge}
                    </Error_message>

                </School_number>
                <School_name>
                    <School_title>
                        ??????
                    </School_title>
                    <SelectSearch
                        options={Schools}
                        search
                        filterOptions={fuzzySearch}
                        onChange={handleNameChange}
                        emptyMessage="Not found"
                        placeholder="?????? ????????? ???????????????."
                    />
                </School_name>
                <NavLink to="/register/terms">
                    <RegButton register onClick={handleClick} disabled={canNext}>
                        ??????
                    </RegButton>
                </NavLink>
            </Container>
        </ThemeProvider>
    );
}

export default Register;