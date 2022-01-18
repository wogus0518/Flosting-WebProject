import React, {Component} from 'react';
import styled from 'styled-components';
import{NavLink} from 'react-router-dom';


const Wrapper = styled.div`
`;
const Container = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const FlostingTitle = styled.div`
    font-family: 'Lobster', cursive;
    font-size: 40px;
    border: 1.5px solid;
    padding: 5px;
    margin: 5px;
    margin-bottom: 4.0rem;
`;
const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  padding: 10px 15px;
  margin: 5px;
  border: ${props => {
    if (props.register) return 'none';
    else if(props.login) return '1px solid #E0BCC1';
  }};
  border-radius: 5px;
  height: 3rem;
  width: 300px;
  background-color: ${props => {
    if (props.register) return '#E0BCC1';
    else if(props.login) return '#FFFFFF';
  }};
  color: ${props => {
    if (props.register) return '#FFFFFF';
    else if(props.login) return '#828282';
  }};
  font-size: 15pt;
`;
const Input = styled.input.attrs(props => ({
    type: "text",
  }))`
  line-height: 3rem;
  padding-left: 10px;
  margin: 5px;
  height: 3rem;
  width: 290px;
  font-size: 1rem;
  border: 2px solid #E0BCC1;
  border-radius: 5px;
`;

const Loginbar = () => {
    return (
        <Container>
            <Input placeholder="학번" />
            <Input placeholder="비밀번호" />
            <Button register>
                로그인
            </Button>
        </Container>
    )
}

class Login extends Component{

    state = {
        currentPage : null
        
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    render(){

        return (
            <Wrapper>
                <Container>
                    <FlostingTitle>
                        Flosting
                    </FlostingTitle>
                    {this.state.currentPage === null ? (
                        <Container>
                            <Button login onClick={() => this.handlePageChange(false)}>
                                로그인
                            </Button>
                            <NavLink to="/register">
                                <Button register>
                                    회원가입
                                </Button>
                            </NavLink>
                        </Container>
                    ) : (
                        <Loginbar />
                    )
                    }
                </Container>
            </Wrapper>
        );
    }
}
export default Login;