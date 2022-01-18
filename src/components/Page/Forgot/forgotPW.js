import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import fire from '../Register/LoginFire'


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
const Error_message = styled.div`
    margin-left : 0.2rem;
    font-size: 0.5rem;
    color: ${props => props.limitnum ? '#00AB6F' : '#EF0C00'};
`
const Input_password = styled.input`
  border-radius: 5px;
  border : 1px solid #A6A6A6;
  background: #EBEBEB;
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
`;

const Error_message_Password = styled.div`
    margin-left : 0.2rem;
    font-size: 0.5rem;
    color: ${props => props.limitnum ? (props.limitnum_C ? '#00AB6F' : '#F55C29') : '#EF0C00'};
`


const forgotPW = (props) => {


    const db = fire.firestore();
    const { 
        canchangePW,
        setlimitpassword_C, limitpassword_C,
        setlimitpassword, limitpassword,
        setcorrespass, correspass, 
        repasswordError, setrepasswordError,
        setPasswordError, passwordError,
        password2, setPassword2,
        ID_msg, setID_msg,
        Phone_num_msg, setPhone_num_msg,
        limitPhone_number, setlimitPhone_number,
        limitnum, setlimitnum,
        password, setPassword,
        ID, setID,
        limitID, setlimitID,
        goNext, setgoNext,
        Phone_number, setPhone_number } = props

    const handleNumChange = (e) => {
        let pattern = /[^|a-z|0-9|]/gi; // 숫자 입력 되게
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 13) //글자수 제한
            e.target.value = e.target.value.slice(0, 13);

        setID(e.target.value);

        if (((e.target.value).length <= 13 && (e.target.value).length >= 8)) {
            setlimitnum(true);
        } else {
            setlimitnum(false);
        }

    }

    const handlePhoneChange = (e) => {
        let pattern = /[^0-9]/gi; // 숫자 입력 되게
        e.target.value = e.target.value.replace(pattern, '');
        if (e.target.value.length > 11) //글자수 제한
            e.target.value = e.target.value.slice(0, 11);

        setPhone_number(e.target.value);

        if (((e.target.value).length == 11)) {
            setlimitPhone_number(true);
            setPhone_num_msg('휴대폰 인증을 진행해주세요.')
        } else {
            setlimitPhone_number(false);
            setPhone_num_msg('휴대폰 숫자는 11자리란 사실!')
        }

    }
    const handlePassChange = (e) => {
        if (e.target.value.length > 20) //글자수 제한
            e.target.value = e.target.value.slice(0, 20);
        setPassword(e.target.value);

        if ((e.target.value).length == 0) {
            setPasswordError("패스워드를 입력해주세요.");
            setlimitpassword(false);
        } else if ((e.target.value).length < 6) {
            setPasswordError("글자 부족!");
            setlimitpassword(false);
        } else if ((e.target.value).length < 10) {
            setPasswordError("안전");
            setlimitpassword(true);
            setlimitpassword_C(false);
        } else if ((e.target.value).length < 20) {
            setPasswordError("매우 안전");
            setlimitpassword_C(true);
        }

        if ((e.target.value).length == 0) {
            setrepasswordError("패스워드를 입력해주세요.");
            setcorrespass(false);
        } else if ((e.target.value) == password2) {
            setrepasswordError("패스워드 일치!");
            setcorrespass(true);
        } else {
            setrepasswordError("패스워드 불일치!");
            setcorrespass(false);
        }
    }

    const handlerePassChange = (e) => {
        if (e.target.value.length > 20) //글자수 제한
            e.target.value = e.target.value.slice(0, 20);
        setPassword2(e.target.value);

        if ((e.target.value).length == 0) {
            setrepasswordError("패스워드를 입력해주세요.");
            setcorrespass(false);
        } else if ((e.target.value) == password) {
            setrepasswordError("패스워드 일치!");
            setcorrespass(true);
        } else {
            setrepasswordError("패스워드 불일치!");
            setcorrespass(false);
        }
    }
    
    const handleCheckButton = () => {
        let Infodb = db.collection("회원정보");
        let query = Infodb.where("ID", "==", ID).get().then((querySnapshot) => {
            if (querySnapshot.size) {
                querySnapshot.forEach((doc) => {
                    if (doc.data().User.Phone != Phone_number) {
                        alert("입력하신 ID와 등록한 휴대폰 번호가 일치하지 않아요.")
                    } else {
                        DoCertification();
                    }
                });
            } else {
                alert("입력하신 ID로 가입된 정보는 없어요.")
            }
        });
    }

    const handleChangePassword = () =>{

        const letID = ID+'@flosting.com'
        // console.log(letID);
        // console.log(password);
        fetch("https://bjvy462n18.execute-api.ap-northeast-2.amazonaws.com/0727/chps", {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: JSON.stringify({
        'email' : letID,
        'changepassword' : password
      })
    }).then(res => res.json())
      .then(data => {
          alert('성공적으로 비밀번호가 변경되었습니다.');
          window.location.href = '/login';
      })
      .catch(err => console.error(err))
    }

    function callback(response) {
        const {
            imp_uid,
            success,
            merchant_uid,
            error_msg,
        } = response;

        if (success) {
            setgoNext(true);
        } else {
            setgoNext(false);
            alert("본인인증에 실패하였습니다.")
        }

    }

    const DoCertification = () => {
        let earlydata = {
            company: '플로스 컴패니',            // 회사명 또는 URL
            name: '',                           // 이름
            phone: Phone_number,                          // 전화번호
            birth: '',                          //생년원일
            gender: '',                        //성별
            min_age: '18'                        //최소 만 나이                       
        };

        const { IMP } = window;
        IMP.init('imp73280791');


        /* 4. 본인인증 창 호출하기 */
        IMP.certification(earlydata, callback);

    }
    return (
        <ThemeProvider theme={Colortheme}>
            <div>
                {goNext ? (
                    <Container>
                        <h1>
                            비밀번호 변경
                        </h1>
                        <School_content>
                            <li>※ 최소 6글자 이상 문자로 이루어진 문자열로 입력해주세요.</li>
                        </School_content>

                        <Input_password
                            placeholder="비밀번호 입력"
                            type="password"
                            required
                            value={password}
                            onChange={handlePassChange}
                        />
                        <Error_message_Password limitnum_C={limitpassword_C} limitnum={limitpassword}>
                            {passwordError}
                        </Error_message_Password>
                        <School_title>
                            비밀번호 확인
                        </School_title>
                        <Input_password
                            placeholder="비밀번호 재입력"
                            type="password"
                            required
                            value={password2}
                            onChange={handlerePassChange}
                        />
                        <Error_message limitnum={correspass}>
                            {repasswordError}
                        </Error_message>
                        <PhoneButton disabled={!canchangePW} onClick={handleChangePassword}>
                            비밀번호 변경
                        </PhoneButton>
                    </Container>
                ) :
                    <Container>
                        <h1>
                            비밀번호 찾기
                        </h1>
                        <School_content>
                            <li></li>
                        </School_content>
                        <School_number>
                            <School_title>
                                아이디
                            </School_title>
                        </School_number>
                        <Input
                            limitnum={limitnum}
                            placeholder="아이디을 입력하세요"
                            onChange={handleNumChange}
                        />
                        <Error_message limitnum={limitID}>
                            {ID_msg}
                        </Error_message>
                        <School_number>
                            <School_title>
                                휴대폰 번호
                            </School_title>
                        </School_number>

                        <Input
                            placeholder="핸드폰 번호를 입력해주세요."
                            onChange={handlePhoneChange}>
                        </Input>
                        <Error_message limitnum={limitPhone_number}>
                            {Phone_num_msg}
                        </Error_message>
                        <PhoneButton disabled={!limitPhone_number} onClick={handleCheckButton}>
                            휴대폰 인증
                        </PhoneButton>
                    </Container>
                }

            </div>
        </ThemeProvider>
    );
}

export default forgotPW;