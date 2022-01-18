import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";

const Container = styled.div`

  text-align: center;
  margin-bottom: 1rem;
  img {

    width: 100%;
    text-align: center;
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

function EventItem(props) {
  const { Img, Title, Date, Event } = props;
  const classes = useStyles();
  return (
    <Container>
      <NavContainer>
        <NavLink to={Event}>
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
                    alignItems="center"
                  >
                    <img src={Img} />
                  </Typography>
                  {Date}
                </React.Fragment>
              }
            />
          </ListItem>
        </NavLink>
      </NavContainer>
    </Container>
  );
}

export default EventItem;
