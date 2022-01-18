import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import firebase from '../Register/LoginFire';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ForgotID from './forgotID';
import ForgotPW from './forgotPW';

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
`;

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

const Forgot = (props) => {

    const [User, setUser] = useState(props.User);
    const [limitnum, setlimitnum] = useState(false); // 학번의 제한 체크 변수
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [ID, setID] = useState('');
    const [Phone_number, setPhone_number] = useState('');
    const [limitPhone_number, setlimitPhone_number] = useState(false);
    const [Phone_num_msg, setPhone_num_msg] = useState('휴대폰 숫자는 11자리란 사실!');
    const [ID_msg, setID_msg] = useState('아이디를 입력해주세요')
    const [limitID, setlimitID] = useState(true);
    const [goNext, setgoNext] = useState(false);
    const [password, setPassword] = useState(''); // 패스워드
    const [password2, setPassword2] = useState(''); //패스워드 확인
    const [passwordError, setPasswordError] = useState("패스워드를 입력해주세요.");
    const [repasswordError, setrepasswordError] = useState("패스워드를 재입력해주세요.");
    const [correspass, setcorrespass] = useState(false); //패스워드 일치 불일치
    const [limitpassword, setlimitpassword] = useState(false); // 패스워드 글자 수 통과
    const [limitpassword_C, setlimitpassword_C] = useState(false); //패스워드 안전, 매우안전
    const [canchangePW, setcanchangePW] = useState(false);

    const [S_num, setS_num] = useState('');
    const [S_Univ, setS_Univ] = useState('');
    const [goNextID, setgoNextID] = useState(true);
    const [limitSnum, setlimitSnum] = useState(false);
    const [limitSUniv, setlimitSUniv] = useState(false);
    const [IDopen, setIDopen] = useState(false);
    const [findID, setfindID] = useState('');

    useEffect(() => {
        changecanPW();
    }, [correspass, limitpassword]);
    useEffect(() => {
        changecanID();
    }, [limitSnum, limitSUniv]);

    useEffect(() => {
        setUser(props.User);

    }, [props]);

    function changecanID() {
        if (limitSnum && limitSUniv)
            setgoNextID(false);
        else
            setgoNextID(true);
    }
    function changecanPW() {
        if (correspass && limitpassword)
            setcanchangePW(true);
        else
            setcanchangePW(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <AppBar position="static" color="default">
                    <div id="recaptcha-container"></div>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="아이디 찾기" {...a11yProps(0)} />
                        <Tab label="비밀번호 찾기" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <ForgotID
                            S_num={S_num}
                            setS_num={setS_num}
                            S_Univ={S_Univ}
                            setS_Univ={setS_Univ}
                            goNextID={goNextID}
                            setgoNextID={setgoNextID}
                            setlimitSnum={setlimitSnum}
                            setlimitSUniv={setlimitSUniv}
                            IDopen={IDopen}
                            setIDopen={setIDopen}
                            findID={findID}
                            setfindID={setfindID}
                        ></ForgotID>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <ForgotPW
                            setlimitpassword_C={setlimitpassword_C}
                            limitpassword_C={limitpassword_C}
                            setlimitpassword={setlimitpassword}
                            limitpassword={limitpassword}
                            setcorrespass={setcorrespass}
                            correspass={correspass}
                            repasswordError={repasswordError}
                            setrepasswordError={setrepasswordError}
                            setPasswordError={setPasswordError}
                            passwordError={passwordError}
                            password2={password2}
                            setPassword2={setPassword2}
                            password={password}
                            setPassword={setPassword}
                            ID={ID}
                            setID={setID}
                            Phone_number={Phone_number}
                            setPhone_number={setPhone_number}
                            limitnum={limitnum}
                            setlimitnum={setlimitnum}
                            limitPhone_number={limitPhone_number}
                            setlimitPhone_number={setlimitPhone_number}
                            Phone_num_msg={Phone_num_msg}
                            setPhone_num_msg={setPhone_num_msg}
                            ID_msg={ID_msg}
                            setID_msg={setID_msg}
                            limitID={limitID}
                            setlimitID={setlimitID}
                            canchangePW={canchangePW}
                            goNext={goNext}
                            setgoNext={setgoNext}
                        ></ForgotPW>
                    </TabPanel>
                </SwipeableViews>
            </Container>
        </ThemeProvider>
    );
}

export default Forgot;