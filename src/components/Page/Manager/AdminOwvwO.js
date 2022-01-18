import React, { useEffect, useState } from 'react';
import firebase from '../Register/LoginFire';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import fuzzySearch from '../Register/fuzzySearch.js';
import SelectSearch from 'react-select-search';
import { testAge } from './TestAge';
import { testUniv } from './TestUniv';

const Container = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    list-style : none;
`
const Input = styled.input`
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 3rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
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

  font-size: 15pt;
`;

function AdminOwvwO(props) {


    const { isManager } = props;
    const [ID, setID] = useState("");
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("");
    const [Manner, setManner] = useState("");
    const [Nick, setNick] = useState("");
    const [Mbti, setMbti] = useState("");
    const [Phone, setPhone] = useState("");
    const [Univ, setUniv] = useState("");
    const [Unique_key, setUnique_key] = useState("");
    const [Name, setName] = useState("");

    const [LilacAge, setLilacAge] = useState("");
    const [LilacTicket, setLilacTicket] = useState("");
    const [LilacTicketNumber, setLilacTicketNumber] = useState("");
    const [LilacUniv, setLilacUniv] = useState("");
    const [DaisyAge, setDaisyAge] = useState("");
    const [DaisyTicket, setDaisyTicket] = useState("");
    const [DaisyTicketNumber, setDaisyTicketNumber] = useState("");
    const [DaisyUniv, setDaisyUniv] = useState("");
    const [CloverAge, setCloverAge] = useState("");
    const [CloverTicket, setCloverTicket] = useState("");
    const [CloverTicketNumber, setCloverTicketNumber] = useState("");
    const [CloverUniv, setCloverUniv] = useState("");
    const db = firebase.firestore()
    const dbUser = {
        Age: "",
        Gender: "",
        Manner: "",
        Nick: "",
        Mbti: "",
        Phone: "",
        Univ: "",
        Unique_key: "",
        Name: ""
    }
    const Lilacvalue = {

        Age: "",
        Ticket: "",
        Univ: "",
        TicketNumber: ""
    }
    const Daisyvalue =
    {
        Age: "",
        Ticket: "",
        Univ: "",
        TicketNumber: ""
    }
    const Clovervalue =
    {
        Age: "",
        Ticket: "",
        Univ: "",
        TicketNumber: ""
    }

    useEffect(() => {
        setNick(Age + Gender + "-" + LilacAge + "-" + LilacUniv + "-티켓" + LilacTicketNumber);
    }, [Age, Univ, LilacAge, LilacUniv, LilacTicketNumber])

    const OnClickpush = () => {
        dbUser.Age = Age;
        dbUser.Gender = Gender;
        dbUser.Manner = "36.5";
        dbUser.Nick = Nick;
        dbUser.Mbti = "TTTT";
        dbUser.Univ = Univ;
        dbUser.Phone = "010101010";
        dbUser.Unique_key = Unique_key;
        dbUser.Name = Name;
        Lilacvalue.Age = LilacAge;
        Lilacvalue.Univ = LilacUniv;
        Lilacvalue.Ticket = true;
        Lilacvalue.TicketNumber = LilacTicketNumber;

        db.collection("Flosting_3")
            .add({
                ID: ID,
                User: dbUser,
                Lilac: Lilacvalue,
                Daisy: Daisyvalue,
                Clover: Clovervalue,
            })
            .then(() => {
                alert("신청이 완료되었습니다.");
            })
            .catch((error) => {
                alert(error.message);
            });

        setUnique_key(String(Number(Unique_key) + 1));
    }
    const handleAgeChange = (selected) => {
        setLilacAge(selected);
    }
    const handleUnivChange = (selected) => {
        setLilacUniv(selected);
    }

    const handlesetID = (e) => {
        setID(e.target.value);
    }
    const handlesetAge = (e) => {
        setAge(e.target.value);
    }
    const handlesetGender = (e) => {
        setGender(e.target.value);
    }
    const handlesetNick = (e) => {
        setNick(e.target.value);
    }
    const handlesetUniv = (e) => {
        setUniv(e.target.value);
    }
    const handlesetName = (e) => {
        setName(e.target.value);
    }
    const handlesetUnique_key = (e) => {
        setUnique_key(e.target.value);
    }

    const handleLilacTicketNumber = (e) => {
        setLilacTicketNumber(e.target.value);
    }
    if (!isManager) {
        return (<Redirect to='/' />);
    } else {
        return (
            <Container>
                <h1>애들 넣기</h1>

                <h1>신청하는 놈</h1>
                <li>ID <Input
                    placeholder="신청하는애 ID"
                    onChange={handlesetID} /></li>
                <li>Age <Input
                    placeholder="신청하는애 Age"
                    onChange={handlesetAge} /></li>
                <li>Gender <Input
                    placeholder="신청하는애 Gender"
                    onChange={handlesetGender} /></li>
                <li>Nick <Input
                    value={Age + Gender + "-" + LilacAge + "-" + LilacUniv + "-티켓" + LilacTicketNumber}
                    placeholder="신청하는애 Nick"
                    onChange={handlesetNick} /></li>
                <li>Univ <Input
                    placeholder="신청하는애 Univ"
                    onChange={handlesetUniv} /></li>
                <li>Name <Input
                    placeholder="신청하는애 이름"
                    onChange={handlesetName} /></li>
                <li>Unique_key <Input
                    value={Unique_key}
                    placeholder="신청하는애 Unique_key"
                    onChange={handlesetUnique_key} /></li>

                <h2>라일락 선택</h2>
                <SelectSearch
                    options={testAge}
                    search
                    filterOptions={fuzzySearch}
                    onChange={handleAgeChange}
                    emptyMessage="Not found"
                    placeholder="나이선택"
                />

                <SelectSearch
                    options={testUniv}
                    search
                    filterOptions={fuzzySearch}
                    onChange={handleUnivChange}
                    emptyMessage="Not found"
                    placeholder="학교선택"
                />
                <li>TicketNumber <Input
                    placeholder="티켓 수"
                    onChange={handleLilacTicketNumber} /></li>

                <Button register onClick={OnClickpush}>
                    ㄱㄱ
                </Button>

            </Container >
        )
    }
}
export default AdminOwvwO;

