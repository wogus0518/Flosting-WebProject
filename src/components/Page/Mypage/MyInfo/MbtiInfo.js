import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MannerTierList from './MannerTierList';
import MannerBar from './MannerBar';


const useStyles = makeStyles((theme) => ({
    paper: {
        paddingLeft: theme.spacing(3),
        width: theme.spacing(40)
        // backgroundColor: 'primary'
    }
}));


const MannerContainer = styled.div`
    border-top: 1px solid rgb(0,0,0,0.1);
    margin-top: 20px;
    padding-top: 10px;
`
const RowFlexBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content : space-between;

`
const Box_content = styled.div`
    list-style: none;
    li{
    font-size: 0.5rem;
    }
`
const MannerBox = styled.button`
    font-size : 0.8rem;
    border : none;
    text-decoration: underline;
    width : 6rem;
    background : white;

`
const MBTIBox = styled.div`
    list-style : none;
    li{
        margin-top : 0.5rem;
        font-size: 1.5rem;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
    }

`
const MbtiInfo = (props) => {
    const {Mbti} = props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <MannerContainer>
            <RowFlexBox>
            <MannerBox onClick={handleClick} >
                MBTI
            </MannerBox>
            </RowFlexBox>
            <Popper className = {classes.paper} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Card>
                            <CardContent>
                                <Box_content>
                                    <li>MBTI는 사람의 성격을 16가지로 분류해서 나타내는 검사입니다.</li>
                                    <li>성격에 따른 MBTI테스트를 진행후 값을 입력해주세요!</li>
                                </Box_content>
                            </CardContent>
                        </Card>
                    </Fade>
                )}
            </Popper>
            <MBTIBox>
                <li>{Mbti}</li>
            </MBTIBox>

        </MannerContainer>
    );
};

export default MbtiInfo;