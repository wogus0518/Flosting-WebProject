import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import fire from '../Register/LoginFire'

const Container = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 3rem;
  padding-left: 10px;
  margin: 5px;
  height: 3rem;
  width: 290px;
  font-size: 1rem;
  border: 2px solid #E0BCC1;
  border-radius: 5px;
`;

const Button = styled.button`
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
  font-size: 15pt;
`;

const Error_message = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    margin-left : 0.2rem;
    font-size: 0.8rem;
    color: #EF0C00;
`
const Loginbar = () => {

    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [limitID, setlimitID] = useState(false);
    const [limitpassword, setlimitpassword] = useState(false);
    const [canlogin, setcanlogin] = useState(true);

    useEffect(() => {
        cangoNext();
    }, [limitID])
    useEffect(() => {
        cangoNext();
    }, [limitpassword])

    const clearErrors = () => {
        setEmailError('');
    }

    const cangoNext = () => {
        if (limitID && limitpassword)
            setcanlogin(false);
        else
            setcanlogin(true);
    }
    const handleLogin = () => {
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError("가입된 ID가 아니네요!");
                        break;
                    case "auth/wrong-password":
                        setEmailError("비밀번호가 틀렸어요!");
                        break;
                }
            });
    };

    const handlesetPassword = (e) => {
        setPassword(e.target.value);
        if ((e.target.value).length > 0) {
            setlimitpassword(true);
        } else {
            setlimitpassword(false);
        }
    }

    const handlesetID = (e) => {
        let pattern = /[^|a-z|0-9|]/gi; // 숫자,문자만 입력 되게
        e.target.value = e.target.value.replace(pattern, '');

        setEmail(e.target.value + "@flosting.com");
        if ((e.target.value).length > 0) {
            setlimitID(true);
        } else {
            setlimitID(false);
        }
    }
    return (
        <Container>
            <Input
                placeholder="아이디"
                onChange={handlesetID}
            />
            <Input
                type="password"
                required
                placeholder="비밀번호"
                onChange={handlesetPassword}
            />
            <Error_message>
                {emailError}
            </Error_message>
            <Button register onClick={handleLogin} disabled={canlogin}>
                로그인
            </Button>
        </Container>
    )
}

export default Loginbar;