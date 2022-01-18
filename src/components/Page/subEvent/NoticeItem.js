import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { ListItem, ListItemText } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  img {
    width: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const NavContainer = styled.div`
  border: solid 2px #f4f4f4;
  border-radius: 10px;
  margin: 0.5rem;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
}));

const NoticeItem = (props) => {
  const { Title, Date, Notice } = props;
  const classes = useStyles();
  return (
    <Container>
      <NavContainer>
        <NavLink to={Notice}>
          <ListItem alignItems="flex-start" button>
            <ListItemText
              primary={Title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                  {Date}
                </React.Fragment>
              }
            />
          </ListItem>
        </NavLink>
      </NavContainer>
    </Container>
  );
};

export default NoticeItem;
