import React, { Component, useState, useEffect } from 'react'

import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import fire from '../Register/LoginFire';

const Colortheme = createMuiTheme({
    palette: {
        primary: {
            main: '#E0BCC1'
        }
    },
    typography: {
        fontSize: 10,
        fontWeightRegular: 700,
        fontFamily: "Noto Sans KR"
    }

})

const Container = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;

    h1{
        font-size: 1.5rem;
    }
`;

const MySetting = (props) => {

    return (
        <ThemeProvider theme={Colortheme}>
            <Container>
                <h1>
                    내 정보변경
                </h1>

            </Container>
        </ThemeProvider>
    );
}

export default MySetting;