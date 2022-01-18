import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MannerTierList from './MannerTierList';
import tier_mi1 from '../../../images/tier_mi1.png';
import tier_zero from '../../../images/tier_zero.png';
import tier_plus1 from '../../../images/tier_plus1.png';

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
    align-items: flex-end;
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
const NowTemperature = styled.div`
    list-style: none;
    display :flex;
    align-items : center;
    justify-content : flex-end;
    width: 100%
`
const TierBox = styled.div`
    margin-top: 10px;
    width : 6rem;
    height : 6rem;
    border : 1px solid rgb(0,0,0,0.1);
        img{
            width : 6rem;
            height : 6rem;
        }
`
const TierNameBox = styled.div`
    display:flex;
    justify-content : center;
    align-items : center;
    margin-top: 10px;
    width : 6rem;
    height : 3rem;
`

const Tiermessage = styled.div`
    margin-top: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${props => props.fontsize};
    display: flex;
    align-items: center;
    color : rgb(0, 0, 0, 0.7);
    a{
        color : rgb(0, 0, 0, 0.9);
        font-weight : 700;
        font-size: ${props => props.fontsize};
    }
`;

const MannerInfo = (props) => {
    const {Manner, NextTier} = props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <MannerContainer>
            <MannerBox onClick={handleClick} >
                티어
            </MannerBox>
            <Popper className = {classes.paper} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Card>
                            <CardContent>
                                <Box_content>
                                    <li>매너온도에 따라 티어가 변경됩니다!</li>
                                </Box_content>
                            </CardContent>
                        </Card>
                    </Fade>
                )}
            </Popper>
        <RowFlexBox>
        <TierBox>
            <img src={tier_zero} />
        </TierBox>
        <TierNameBox>
            씨앗
        </TierNameBox>
        </RowFlexBox>
        <Tiermessage fontsize={'0.8rem'}>
            다음승급까지&nbsp; <a>{NextTier}°C</a> &nbsp;남았습니다.
        </Tiermessage>
        </MannerContainer>
    );
};

export default MannerInfo;