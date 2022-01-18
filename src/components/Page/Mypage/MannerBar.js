import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

const Container = styled.div`
    display: flex;
    margin-top: 20px;
`
const BackgroundBar = styled.div`
    border-radius: 0.5rem;
    background: rgb(0,0,0, 0.13);
    height: 0.8rem;
    width: 100%;

`

const NowMannerBar = styled.div`
    border-radius: 0.5rem;
    background: rgb(157,187,235, 0.8);
    height: 0.8rem;
    width: ${props => props.temperature + '%'};
`

const MannerBar = (props) => {
    const {Manner} = props
    const [open, setOpen] = useState(false);


    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <Container>
            <BackgroundBar>
                <Fade left>
                <NowMannerBar temperature = {Manner}>

                </NowMannerBar>
                </Fade>
            </BackgroundBar>
        </Container>
    );
};

export default MannerBar;