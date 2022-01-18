import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  .scheduleBox {
    justify-content: flex-start;
    .scheduleLeft {
      height: 6rem;
    }
    .scheduleRight {
      height: 5rem;
    }
    .scheduleTitle {
      font-size: 2rem;
      font-weight: bold;
    }
    .inner {
      font-size: 1rem;
      margin-top: 5px;
      margin: 0 auto;
      width: 8rem;
      background-color: #f8ecf4;
    }
    .inner2{
      margin: 0 auto;
      width: 8rem;
      border-bottom: 4px solid rgb(198,250,226,1.0);
    }
  }
`;
const Period = (props) => {
  const EP_Result_Day = props.EP_Result_Day;
  const period = props.period;
  return (
    <Container>
      <div className="scheduleBox">
        <div className="scheduleLeft">
          <div className="scheduleTitle">신청기간</div>
          <div className="inner">{period}</div>
        </div>
        <div className="scheduleRight">
          <div className="scheduleTitle">결과안내</div>
          <div className="inner">{EP_Result_Day.substr(0, 2) + "/" + EP_Result_Day.substr(2)}</div>
          <div className="inner2">낮 12:00</div>
        </div>
      </div>
    </Container>
  );
};

export default Period;
