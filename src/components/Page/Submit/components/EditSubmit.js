import { React, useEffect, useState } from "react";
import SNSLink from "../../SNSLink";
import Footer from "../../Footer";
import fire from "../../Register/LoginFire";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  createMuiTheme,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

const Boldtheme = createMuiTheme({
  palette: {
    primary: {
      main: "#E0BCC1",
    },
  },
  typography: {
    fontSize: 10,
    fontWeightRegular: 700,
    fontFamily: "Noto Sans KR",
  },
});

const Container = styled.div`
width:  
margin: 1rem;
  text-align: center;
  justify-content: center;
  display: flex;
  img {
    width: 10rem;
    margin: 0px auto;
  }
`;
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

function EditSubmit(props) {
  const user = props.User;
  const db = fire.firestore();
  const [ID, setID] = useState("");
  const [User, setUser] = useState("");
  const [DocID, setDocID] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editSubmit = () => {
    // db.collection("Flosting_7")
    //   .doc(DocID)
    //   .delete()
    //   .then(() => {
    //     console.log("Document successfully deleted!");
    //   })
    //   .catch((error) => {
    //     console.error("Error removing document : ", error);
    //   });
    // db.collection("Flosting_7")
    //   .where("ID,", "==", ID)
    //   .get()
    //   .then((querySnapshot) => {
    //     if (querySnapshot) {
    //       querySnapshot.forEach((doc) => {
    //         console.log("sueccess");
    //         doc.delete();
    //       });
    //     }
    //   });
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      const s_id = user.email.split("@");
      setID(s_id[0]);
      db.collection("Flosting_7")
        .where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          // console.log(querySnapshot.size);
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              setDocID(doc.id);
              setUser(doc.data().User);
            });
          } else {
            // console.log("???????????????");
          }
        });
    }
  }, [user]);

  if (!JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/login" />;
  } else {
    return (
      <ThemeProvider theme={Boldtheme}>
        <div>
          <Container></Container>
          <h1>????????? ??????</h1>
          <h3>?????? XXXXXX</h3>
          {/* <button type="button" onClick={handleClickOpen}>
            ?????? ??????
          </button> */}
          {/* <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"???????????? ?????????????????????????"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ???????????? ?????? ????????? ?????????
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                ????????????
              </Button>
              <Link to="/submit">
              <Button onClick={editSubmit} color="primary" autoFocus>
                ??????
              </Button>
              </Link>
            </DialogActions>
          </Dialog> */}
          <SNSLink />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default EditSubmit;
