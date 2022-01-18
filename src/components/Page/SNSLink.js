import React from 'react';
import styled from 'styled-components'
import{Link} from 'react-router-dom';
import kakaochannel from '../../images/kakaochannel.png';
import instaIcon_1 from '../../images/insta.png';
import instaIcon_2 from '../../images/insta_2.png';
const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 10px;


  .Wrap{
    background-color:#F7F4D9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: vartical;

    margin-bottom : 15px;
    border: 1px solid #F5EA8D;
    border-radius: 12px;
    width: 250px;
    height: 40px;

    .icon{
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .iconBox{
      display:flex;
      justify-content: center;
      align-items: center;
    }
  }

`

function SNSLink(){

    return(
        <Wrapper>
              <div className='Wrap' onClick={ ()=>{window.open('http://pf.kakao.com/_xfuvpK', '_blank')} }>
                <div className='iconBox'>
                    <img className='icon'src={kakaochannel} />
                </div>
                <div className='text'>
                  플로스팅 카카오 채널
                </div>
              </div>


              <div className='Wrap' onClick={ ()=>{window.open('https://www.instagram.com/flosting__/', '_blank')} }>
                <div className='iconBox'>
                    <img className='icon'src={instaIcon_1} />
                </div>
                <div className='text'>
                  플로스팅 인스타그램
                </div>
              </div>
        </Wrapper>
    )
}
export default SNSLink;
