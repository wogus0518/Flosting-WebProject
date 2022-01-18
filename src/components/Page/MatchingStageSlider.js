import React, { Component } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import './Home.css';

import 매칭1 from '../../images/매칭1.png'
import 매칭1_2 from '../../images/매칭1_2.png'
import 매칭2 from '../../images/매칭2.png'
import 매칭3 from '../../images/매칭3.png'
import 매칭4 from '../../images/매칭4.png'
import 매칭5 from '../../images/매칭5.png'


const Wrap = styled.div`
  text-align : center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(253,239,230,1.0);
  border-radius: 40px;
  height: 40rem;
  .topText{
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .imageBox{
    display: flex;
    justify-content: center;
  }
  img{

    border-radius: 20px;
    height: 20rem;
  }
  .innerTextColunm{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}
.column{
    padding: 0.6rem;
    text-align: center;
    background-color: rgb(179,214,189,0.2);
    border-radius: 15px;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    font-size: 0.7rem;
}
.arrow{
  margin: 1rem;
  margin-top: 5rem;
  text-align: right;
}
`





export default class 참여방법Slider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (

      <div className='slider'>
        <Slider {...settings}>

          <Wrap>
            <div className='topText'>
              신청하신 회차의 결과 발표일이 되어<br />
              플로스팅에 접속하시면<br />
              새로운 '매칭결과보기' 버튼이 생성됩니다.
            </div>
            <div className='imageBox'>
              <img className='사진' src={매칭1} />
            </div>
            <div className='arrow'>
              <h4>밀어주세요👉</h4>
            </div>

          </Wrap>

          <Wrap>
            <div className='topText'>
              클로버팅/라일락팅/데이지팅 중<br />
              신청한 플로스팅을 클릭하면<br />
              매칭된 상대방의 리스트를 확인할 수 있습니다!<br />
            </div>
            <div className='imageBox'>
              <img className='사진' src={매칭1_2} />
            </div>
            <div className='arrow'>
              <h4>밀어주세요👉</h4>
            </div>

          </Wrap>

          <Wrap>
            <div className='topText'>
              매칭된 상대방을 클릭하면<br />
              매칭된 상대와 남은 매칭 시간을 <br />
              확인 할 수 있어요!<br /><br />
              제한 시간 내 아무런 응답이 없으면<br />
              내 매너온도가 차감되니 주의하세요!!
            </div>
            <div className='imageBox'>
              <img className='사진' src={매칭2} />
            </div>
            <div className='innerTextColunm'>
              <div className='column'>
                시간초과<br />
                ↓<br />
                매칭종료 및<br />
                매너온도 차감<br />
              </div>
              <div className='column'>
                선톡했어요!<br />
                ↓<br />
                매너온도 상승<br />
                매칭 단계 상승<br />
              </div>
              <div className='column'>
                거절할래요<br />
                ↓<br />
                매칭종료<br />
                매너온도 유지<br />
              </div>
            </div>
          </Wrap>

          <Wrap>
            <div className='topText'>
              매칭상대로부터 먼저 연락이 왔다면<br />
              제한 시간 내 매칭의사를 표할 수 있어요<br /><br />
              제한 시간 내 아무런 응답이 없으면<br />
              내 매너온도가 차감되니 주의하세요!!
              <br />
            </div>
            <div className='imageBox'>
              <img className='사진' src={매칭3} />
            </div>
            <div className='innerTextColunm'>
              <div className='column'>
                시간초과<br />
                ↓<br />
                매칭종료 및<br />
                매너온도 차감<br />
              </div>
              <div className='column'>
                답장했어요!<br />
                ↓<br />
                매칭 단계 상승<br />
                매칭 성공!!<br />
              </div>
              <div className='column'>
                거절할래요<br />
                ↓<br />
                매칭종료<br />
                매너온도 유지<br />
              </div>
            </div>

          </Wrap>

          <Wrap>
            <div className='topText'>
              양 쪽 모두 연락을 하게 되면 <br />
              매칭 성공화면으로 전환됩니다 <br />
            </div>
            <div className='imageBox'>
              <img className='사진' src={매칭4} />
            </div>
            <div className='topText'>
              매칭 성공이 된 분들에 한하여 진행할 <br />
              이벤트를 준비중에 있습니다 :)<br />
            </div>
            <div className='arrow'>
              거절을 하면 어떻게 되나요? →
            </div>

          </Wrap>
          <Wrap>
            <div className='topText'>
              거절의사를 표하게 되면 양측 모두<br />
              즉시 매칭 종료가 됩니다.<br />
            </div>
            <div className='imageBox'>
              <img className='사진' src={매칭5} />
            </div>
            <div className='topText'>
              플로스팅은 상대방의 부재와<br />
              거절에 의한 재매칭은 불가능합니다<br />
            </div>
          </Wrap>
        </Slider>
      </div>
    );
  }
}
