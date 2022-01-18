import React from "react";
import "../FormikContainer.css";
import styled from "styled-components";

import fuzzySearch from '../../Register/fuzzySearch';
import { ticketOptions } from './Options/TicketOptions';
import SelectSearch from 'react-select-search';

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  border: 1px solid rgb(242,236,218, 1);
  width : 20rem;
  height : 2rem;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 10px;
  color: rgb(0,0,0, 0.5);
  background-color: rgb(242,236,218, 0.8);

`;
const FormikContainer = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: flex-start;
  margin : 0rem 0rem 1rem 0rem;
`
function Select(props) {
  const { controlTicket, setcontrolTicket, label } = props;

  const handleUnivChange = (selected) => {
    setcontrolTicket(selected);
  }

  return (
    <FormikContainer>
      <Label>{label}</Label>
      <SelectSearch
        options={ticketOptions}
        value={controlTicket}
        search
        filterOptions={fuzzySearch}
        onChange={handleUnivChange}
        emptyMessage="Not found"
        placeholder="티켓 선택"
      />

    </FormikContainer>
  );
}

export default Select;
