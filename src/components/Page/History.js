import React from 'react';
import styled from 'styled-components';
import Footer from './Footer.js';
import SimpleSlider from './Slider.js';

const Container = styled.div`
text-align:center;

    .title{
        margin-top: 15px;
        font-size: 2rem;
        font-weight: bolder;
    }
    .sliderDiv{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .히스토리내용{
        div{        
            font-size: 2rem;
        }
        margin-top: 1rem;
    }
    .표{
        div{font-size: 1.5rem;}
        display: flex;
        justify-content: center;
        align-items: center;
        div{
            margin : 2rem;
        }
    }
`


const History = () => {
    return (
        <Container>
            <div className='title'>히스토리</div>
            <div className='히스토리내용'>
                <div>총 누적 2019명!!</div>
                <div className='표'>
                    <div>남자<br />939명</div>
                    <div>여자<br />1080명</div>
                </div>
            </div>
            <div className='sliderDiv'>
                <SimpleSlider />
            </div>
            <Footer />
        </Container>
    );
};

export default History;