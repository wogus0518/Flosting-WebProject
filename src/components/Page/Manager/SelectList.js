import React, { useState } from 'react';

import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const RowFlexBox = styled.div`
    display : flex;
    flex-direction: row;
`
const InputNick = styled.input`
  border : 1px solid #A6A6A6;
  color: rgb(0,0,0,0.8);
  type : text;
  line-height: 2rem;
  padding-left: 10px;
  margin: 5px;
  height: 2rem;
  width: 200px;
  font-size: 0.8rem;
  border-radius: 5px;
`;
const Overlapbtn = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    border-radius: 8px;
    margin: 5px;
    border : ${props => props.overlap ? '1px solid #00AB6F' : '1px solid #A6A6A6'};
    color :  ${props => props.overlap ? '#00AB6F' : 'black'};
    width: 4rem;
    height: 2rem;
    font-size: 0.7rem;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SelectList(props) {
  const { nowCount, setnowCount } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const listArr = () => {
    const result = [];
    for (let i = 1; i < 10; i++) {
      result.push(<option value={String(i)}>{i}회차</option>)
    }
    return result;
  }

  const handleChange = (event) => {
    setnowCount(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <RowFlexBox>
        <InputNick
          placeholder="닉네임 입력"
          type="text"
          required
          value={nowCount + "회차"}
          disabled={true}
        />
        <Overlapbtn onClick={handleClickOpen}>변경</Overlapbtn>
      </RowFlexBox>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>회차 변경</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">회차 선택</InputLabel>
              <Select
                native
                value={nowCount}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                {listArr()}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
