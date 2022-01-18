import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  .안내사항_제목 {
    font-weight: bold;
    color: red;
  }
  .안내사항_내용 {
    font-size: 0.8rem;
    text-align: center;
    margin-left: 1rem;
  }
  .highlight {
    box-shadow: inset 0 -20px 0 #fbf38a;
  }
`;
const Notice = () => {
  return (
    <Container>
      <div>
        <div className="안내사항_제목">
          <span className="highlight">※당부 메세지※</span>
        </div>
        <div className="안내사항_내용">
          신청기간을 엄수해 주시기 바랍니다.
          <br />
          모든 매칭 결과는 홈페이지로 공지됩니다.
          <br />
          매칭 결과에 대한 자세한 안내는 홈 화면을 참고해주세요!
          <br />
          결과 안내에 대한 연락은 따로 드리지 않으니
          <br />
          해당일이 되었을 때, 꼭 홈페이지를 방문해 주셔야 합니다.
          <br />
          <br />
          그 외 문의가 있으신 분들은 질의 응답 페이지를 확인해 주시거나,
          <br />
          플로스팅 카카오 채널로 문의주시면 감사하겠습니다.
          <br />
        </div>
      </div>
    </Container>
  );
};

export default Notice;
