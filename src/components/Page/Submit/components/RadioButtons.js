import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { InputLabel } from "@material-ui/core";
import "../FormikContainer.css";
import styled from "styled-components";

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  border: 1px solid rgb(242, 236, 218, 1);
  width: 20rem;
  height: 2rem;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 10px;
  color: rgb(0, 0, 0, 0.5);
  background-color: rgb(242, 236, 218, 0.8);
`;
const FormikContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  position: relative;
  margin: 0rem 1rem;
  .labelName {
    font-family: "Do Hyeon", sans-serif;
    width: 4rem;
  }
`;
const FlexrowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const RadioButtonLabel = styled.label`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      margin: 0.5rem;
      background: #eeeeee;
    }
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabel} {
      background: #E0BCC1;
      border: 1px solid #E0BCC1;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        margin: 0.5rem;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
`;

function Radiobutton(props) {
  const { controlAge, setcontrolAge, label } = props;

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setcontrolAge(value);
  };

  return (
    <FormikContainer>
      <Label>{label}</Label>
      <FlexrowDiv>
        <Item>
          <RadioButton
            id="radio"
            type="radio"
            value="20"
            checked={controlAge === "20" ? true : false}
            onChange={(event) => handleSelectChange(event)}
          />
          <RadioButtonLabel />
          <div className="labelName">20</div>
        </Item>
        <Item>
          <RadioButton
            id="radio"
            type="radio"
            value="21~23"
            checked={controlAge === "21~23" ? true : false}
            onChange={(event) => handleSelectChange(event)}
          />
          <RadioButtonLabel />
          <div className="labelName">21~23</div>
        </Item>
      </FlexrowDiv>
      <FlexrowDiv>
        <Item>
          <RadioButton
            id="radio"
            type="radio"
            value="24+"
            checked={controlAge === "24+" ? true : false}
            onChange={(event) => handleSelectChange(event)}
          />
          <RadioButtonLabel />
          <div className="labelName">24 이상</div>
        </Item>
        <Item>
          <RadioButton
            id="radio"
            type="radio"
            value="dnt_M"
            checked={controlAge === "dnt_M" ? true : false}
            onChange={(event) => handleSelectChange(event)}
          />
          <RadioButtonLabel />
          <div className="labelName">상관없음</div>
        </Item>
      </FlexrowDiv>
    </FormikContainer>
  );
}

export default Radiobutton;
