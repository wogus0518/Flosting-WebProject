import React, { Component } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import './Home.css';

import 방법1 from '../../images/방법1.png';
import 방법2 from '../../images/방법2.png';
import 방법3 from '../../images/방법3.png';
import 방법4 from '../../images/방법4.png';
import 방법5 from '../../images/방법5.png';

const Wrap = styled.div`
  margin-top : 20px;
  text-align : center;

  h3{
    text-align : center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  img{
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 0 1rem 0;
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
            <h3>
              STEP 1
            </h3>
            <img className='사진' src={방법1} />
            <h4>밀어주세요👉</h4>
          </Wrap>

          <Wrap>
            <h3>
              STEP 2
            </h3>
            <img className='사진' src={방법2} />
            <h4>밀어주세요👉</h4>
          </Wrap>

          <Wrap>
            <h3>
              STEP 3
            </h3>
            <img className='사진' src={방법3} />
            <h4>밀어주세요👉</h4>
          </Wrap>

          <Wrap>
            <h3>
              STEP 4
            </h3>
            <img className='사진' src={방법4} />
            <h4>밀어주세요👉</h4>
          </Wrap>

          <Wrap>
            <h3>
              STEP 5
            </h3>
            <img className='사진' src={방법5} />
          </Wrap>
        </Slider>
      </div>
    );
  }
}