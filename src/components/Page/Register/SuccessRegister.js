import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    margin: 0rem 2rem;
    

    h1{
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
`;

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
`;

const School_title = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    color: '#828282';
    font-size: 0.8rem;
    padding: 0.5rem 0rem;
    background: #FFEBF1;
    border-radius: 10px 10px 0px 0px;
    list-style: none;
    li{
        font-size: 0.7rem;
        margin: 0rem 0.5rem;
    }
`;
const Infor_content = styled.div`
list-style : none;
font-family: 'Noto Sans KR', sans-serif;
font-weight: 400;
`
const Short_content = styled.div`
    list-style : none;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    font-size: 0.8rem;
    border-radius: 0px 0px 10px 10px;
    background: white;
    padding: 0rem 0rem;
    margin : 0.4rem;
`
const Info_Container = styled.div`
    display: flex;
    flex-direction : column;
`
const Sub_Info_Container = styled.div`
    display: flex;
    flex-direction : column;
    border : 1px solid #C9C9C9;
    border-radius : 10px;
    margin: 10px 0px;
`


const SuccessRegister = (props) => {
    const {ID, Nickname, 
    School_name,
    U_unique_key,
    U_name,
    U_Age,
    U_Gender,
    U_Phone} = props
    return (
        <div>
            <Container>
                <h1>
                    ???????????? ??????
                </h1>
                <Infor_content>
                <li>{U_name}???! ??????????????? ?????????????????? ???????????????.</li>
                <li>????????? ?????????????????? ???????????????.</li>
                </Infor_content>

        <Info_Container>
            <Sub_Info_Container>
                <School_title>
                    <li>ID</li>
                </School_title>
                <Short_content>
                    {ID}
                </Short_content>
            </Sub_Info_Container>
            <Sub_Info_Container>
                <School_title>
                    <li>?????????</li>
                </School_title>
                <Short_content>
                    {Nickname}
                </Short_content>
            </Sub_Info_Container>
            <Sub_Info_Container>
                <School_title>
                <li>??????</li>
                </School_title>
                <Short_content>
                    {School_name}
                </Short_content>
            </Sub_Info_Container>
                </Info_Container>
                <NavLink to='/'>
                    <RegButton register>
                        ????????? ??????
                    </RegButton>
                </NavLink>
            </Container>
        </div>
    );
};

export default SuccessRegister;