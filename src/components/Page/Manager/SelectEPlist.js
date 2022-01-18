import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
  '1회차-건국대학교 서울캠퍼스, 세종대학교-Lilac',
  '1회차-건국대학교 서울캠퍼스, 세종대학교-Daisy',
  '1회차-건국대학교 서울캠퍼스, 세종대학교-Clover',
  '2회차-단국대학교 죽전캠퍼스, 단국대학교 천안캠퍼스-Lilac',
  '2회차-단국대학교 죽전캠퍼스, 단국대학교 천안캠퍼스-Daisy',
  '2회차-단국대학교 죽전캠퍼스, 단국대학교 천안캠퍼스-Clover',
];

const ITEM_HEIGHT = 48;

export default function SelectEPlist() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            margin: 0,
            padding: 0
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === '1회차-건국대학교 서울캠퍼스, 세종대학교-Lilac'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
