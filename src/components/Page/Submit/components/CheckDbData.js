import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import fire from "../../Register/LoginFire";
import firebase from "firebase/app";

const CheckDbData = (props) => {
  const { User, ID, EP_Num } = props;
  const [DocID, setDocID] = useState("");
  const db = fire.firestore();
  useEffect(() => {
    db.collection("Flosting_" + EP_Num)
      .where("ID", "==", ID)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            setDocID(doc.id);
          });
        }
      });
  }, []);

  const resetSubmit = () => {
    db.collection("Flosting_" + EP_Num)
      .doc(DocID)
      .delete()
      .then(() => {
        // console.log("삭제 완료");
      })
      .catch((error) => {
        console.log("Error removing document : ", error);
      });
    db.collection("회원정보")
      .where("ID", "==", ID)
      .get()
      .then((querySnapshot) => {
        let docID;

        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            docID = doc.id;
          });
        }

        let batch = db.batch();
        let updatedb = db.collection("회원정보").doc(docID);
        batch.update(updatedb, {
          My_Usage_History: firebase.firestore.FieldValue.arrayRemove(EP_Num),
        });
        batch.commit().then(() => {
          // console.log("good");
        });
      });
  };
  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"이미 신청하셨습니다!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            신청서를 수정하시기 원하면 마이페이지 - 최근신청에서
            <br />
            삭제 후 다시 신청해주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/my" style={{ textDecoration: "none" }}>
            <Button type="button" color="primary">
              이동
            </Button>
          </Link>
          {/* <Link to="/Submit/EP" style={{ textDecoration: "none" }}>
            <Button
              type="button"
              color="primary"
              onClick={resetSubmit}
              autoFocus
            >
              Agree
            </Button>
          </Link> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckDbData;
