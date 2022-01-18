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
const NowTemperature = styled.div`
    list-style: none;
    display :flex;
    justify-content : center;
    align-items : center;
    
`

const MannerInfo = (props) => {
    const {
        Manner,
        tier_mi2,
        tier_mi1,
        tier_zero,
        tier_plus1,
        tier_plus2,
        tier_plus3 } = props
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
                    매너온도
                </MannerBox>
                <NowTemperature>
                    <li>{Manner + '°C'} </li>
                </NowTemperature>
            </RowFlexBox>
            <Popper className={classes.paper} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Card>
                            <CardContent>
                                <Box_content>
                                    <li>매너온도는 플로스팅 이용 후 상대방으로부터 받은 후기를 종합해서 만든 매너 지표입니다.</li>
                                    <li>온도에 따른 티어를 확인해보세요!</li>
                                </Box_content>
                                <MannerTierList
                                    test={"dd"}
                                    tier_mi2={tier_mi2}
                                    tier_mi1={tier_mi1}
                                    tier_zero={tier_zero}
                                    tier_plus1={tier_plus1}
                                    tier_plus2={tier_plus2}
                                    tier_plus3={tier_plus3}>

                                </MannerTierList>
                            </CardContent>
                        </Card>
                    </Fade>
                )}
            </Popper>
            <MannerBar Manner={Manner}>

            </MannerBar>

        </MannerContainer>
    );
};

export default MannerInfo;