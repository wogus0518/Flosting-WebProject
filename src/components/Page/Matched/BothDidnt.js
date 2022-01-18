import styled from 'styled-components';
import Footer from '../Footer';

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .text{
        height: 30rem;
        text-align: center;
        margin-top: 4rem;
        font-size: 1.2rem;
    }
`

const TitleWrap = styled.div`
color: white;
background-color: grey;
width: 20rem;
font-size : 2rem;
text-align : center;
margin-top: 2rem;
font-weight : bolder
`

function BothDidnt(){
    return(
        <Container>
            <Title/>
            <div className='text'>
                제한 시간 내 받으신 번호로<br/>
                연락을 하지 않아<br/>
                매칭 종료와 함께<br/>
                매너온도가 차감되셨습니다<br/>
            </div>
            <Footer/>
        </Container>
    )
}
export default BothDidnt;


function Title(){
    return(
        <TitleWrap>
            매칭 종료
        </TitleWrap>
    )
}