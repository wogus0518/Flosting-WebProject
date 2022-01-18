import React, { Component } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import './Slider.css';

import pic_4 from '../../images/pic_4.png';
import pic_3 from '../../images/pic_3.png';
import pic_2 from '../../images/pic_2.png';
import pic_1 from '../../images/pic_1.png';



const Wrap = styled.div`
  text-align : center;

  .기간{
    font-size: 0.6rem;
  }
  .학교이름{
    font-size: 0.7rem;
  }
  img{
    align-items: center;
    width: 100%;
    height: 100%;
  }
`





export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    return (
      <div className='slider'>
        <Slider {...settings}>
          <Ch4/>
          <Ch3/>
          <Ch2/>
          <Ch1/>
        </Slider>
      </div>
    );
  }
}







function Ch1(){
  return(
    <Wrap>
      <div className='기간'>
        플로스팅 Chapter.01<br />
        2021.03.22 ~ 2021.03.27<br />
      </div>
      <img className='사진' src={pic_1} />
      <div className='학교이름'>
        강남대<br />
        단국대(죽전)
      </div>
  </Wrap>

  )
}
function Ch2(){
  return(
    <Wrap>
      <div className='기간'>
        플로스팅 Chapter.02<br />
        2021.05.12 ~ 2021.05.18<br />
      </div>
      <img className='사진' src={pic_2} />
      <div className='학교이름'>
        강남대 경희대<br />
        단국대(죽전) 경기대<br />
        을지대(성남) 가천대<br />
      </div>
  </Wrap>

  )
}
function Ch3(){
  return(
    <Wrap>
      <div className='기간'>
        플로스팅 Chapter.03<br />
        2021.05.25 ~ 2021.05.29
      </div>
      <img className='사진' src={pic_3} />
      <div className='학교이름'>
        단국대(천안)<br />
        순천향대<br />
      </div>
  </Wrap>

  )
}
function Ch4(){
  return(
    <Wrap>
      <div className='기간'>
        플로스팅 Chapter.04<br />
        2021.06.23 ~ 2021.06.27
      </div>
      <img className='사진' src={pic_4} />
      <div className='학교이름'>
        가천대(성남)<br />
        을지대(성남)<br />
        신구대<br />
      </div>
  </Wrap>

  )
}