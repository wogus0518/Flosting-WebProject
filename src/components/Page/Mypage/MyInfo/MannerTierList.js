import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import fire from "../../Register/LoginFire";

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(3),
    },
    CList: {
        padding: 0,
        margin: 0
    }
}));

const TierContent = styled.div`
    display: flex;
    flex-direction : row;

`
const Tiermessage = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${props => props.fontsize};
    margin-left: 10px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TierImg = styled.div`
    img{
        width: 30px;
        height: 30px;
    }
`;

const FlexRow = styled.div`
    width: 15rem;
    display : flex;
    justify-content : space-between;
`

const MannerTierList = (props) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {
        tier_mi2,
        tier_mi1, 
        tier_zero,
        tier_plus1,
        tier_plus2,
        tier_plus3
    } = props;
    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <List className={classes.CList}>
            <ListItem className={classes.CList} button onClick={handleClick}>
                <ListItemText primary="티어 보기" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_mi2} />
                            </TierImg>
                            <FlexRow>
                                <Tiermessage fontsize={'0.8rem'}>
                                    썩은 씨앗
                                </Tiermessage>
                                <Tiermessage fontsize={'0.6rem'}>
                                    10°C ~ 20°C
                                </Tiermessage>
                            </FlexRow>
                        </TierContent>
                    </ListItem>
                    <ListItem button className={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_mi1} />
                            </TierImg>
                            <FlexRow>
                                <Tiermessage fontsize={'0.8rem'}>
                                    깨진 씨앗
                                </Tiermessage>
                                <Tiermessage fontsize={'0.6rem'}>
                                    20°C ~ 30°C
                                </Tiermessage>
                            </FlexRow>
                        </TierContent>
                    </ListItem>
                    <ListItem button className={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_zero} />
                            </TierImg>
                            <FlexRow>
                                <Tiermessage fontsize={'0.8rem'}>
                                    씨앗
                                </Tiermessage>
                                <Tiermessage fontsize={'0.6rem'}>
                                    30°C ~ 40°C
                                </Tiermessage>
                            </FlexRow>
                        </TierContent>
                    </ListItem>
                    <ListItem button className={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_plus1} />
                            </TierImg>
                            <FlexRow>
                                <Tiermessage fontsize={'0.8rem'}>
                                    새싹
                                </Tiermessage>
                                <Tiermessage fontsize={'0.6rem'}>
                                    40°C ~ 50°C
                                </Tiermessage>
                            </FlexRow>
                        </TierContent>
                    </ListItem>
                    <ListItem button className={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_plus2} />
                            </TierImg>
                            <FlexRow>
                                <Tiermessage fontsize={'0.8rem'}>
                                    꽃봉오리
                                </Tiermessage>
                                <Tiermessage fontsize={'0.6rem'}>
                                    50°C ~ 60°C
                                </Tiermessage>
                            </FlexRow>
                        </TierContent>
                    </ListItem>
                    <ListItem button className={classes.CList}>
                        <TierContent>
                            <TierImg>
                                <img src={tier_plus3} />
                            </TierImg>
                            <FlexRow>
                                <Tiermessage fontsize={'0.8rem'}>
                                    데이지
                                </Tiermessage>
                                <Tiermessage fontsize={'0.6rem'}>
                                    60°C ~ 70°C
                                </Tiermessage>
                            </FlexRow>
                        </TierContent>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default MannerTierList;