import React from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import { useEffect, useState } from "react";
import fire from "../Register/LoginFire";
import PaymentPage from "./Payment"
import { Redirect } from 'react-router-dom';

function Submit(props) {
  const dbUser = [
    {
      Age: "",
      Gender: "",
      Manner: "",
      Nick: "",
      Mbti: "",
      Phone: "",
      Univ: "",
    },
  ];

  const [ID, setID] = useState("");

  const [User, setUser] = useState(dbUser);
  const [Payment, setPayment] = useState(false);
  //Lilac 나이, 학교, 티켓
  const [lilac_Age, setlilac_Age] = useState('20');
  const [lilac_Univ, setlilac_Univ] = useState('myUniv')
  const [lilac_Ticket, setlilac_Ticket] = useState("1");
  const [lilac_Ticket_FT, setlilac_Ticket_FT] = useState(false);
  //Daisy, 나이, 학교, 티켓
  const [daisy_Age, setdaisy_Age] = useState('20');
  const [daisy_Univ, setdaisy_Univ] = useState('myUniv')
  const [daisy_Ticket, setdaisy_Ticket] = useState("1");
  const [daisy_Ticket_FT, setdaisy_Ticket_FT] = useState(false);
  //Clover, 나이, 학교, 티켓
  const [clover_Age, setclover_Age] = useState('20');
  const [clover_Univ, setclover_Univ] = useState('myUniv')
  const [clover_Ticket, setclover_Ticket] = useState("1");
  const [clover_Ticket_FT, setclover_Ticket_FT] = useState(false);

  const db = fire.firestore();
  const user = props.User
  const EP_Num = props.EP_Num;

  useEffect(() => {
    if (user) {
      const s_id = user.email.split("@");
      setID(s_id[0]);
      db.collection("회원정보")
        .where("ID", "==", s_id[0])
        .get()
        .then((querySnapshot) => {
          // console.log(querySnapshot.size);
          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              setUser(doc.data().User);
            });
          } else {
            // console.log("데이터없어");
          }
        });
    }
  }, [user]);

  if (!JSON.parse(localStorage.getItem('user'))) { return (<Redirect to='/login' />); }
  else if (EP_Num == "") {
    return (<Redirect to='/currentevent' />);
  }
  else if (!Payment) {
    return (
      <div>
        <EnrollmentForm
          EP_Num={EP_Num} User={User} ID={ID}
          setPayment={setPayment}
          lilac_Age={lilac_Age} setlilac_Age={setlilac_Age}
          lilac_Univ={lilac_Univ} setlilac_Univ={setlilac_Univ}
          lilac_Ticket={lilac_Ticket} setlilac_Ticket={setlilac_Ticket}
          lilac_Ticket_FT={lilac_Ticket_FT} setlilac_Ticket_FT={setlilac_Ticket_FT}
          daisy_Age={daisy_Age} setdaisy_Age={setdaisy_Age}
          daisy_Univ={daisy_Univ} setdaisy_Univ={setdaisy_Univ}
          daisy_Ticket={daisy_Ticket} setdaisy_Ticket={setdaisy_Ticket}
          daisy_Ticket_FT={daisy_Ticket_FT} setdaisy_Ticket_FT={setdaisy_Ticket_FT}
          clover_Age={clover_Age} setclover_Age={setclover_Age}
          clover_Univ={clover_Univ} setclover_Univ={setclover_Univ}
          clover_Ticket={clover_Ticket} setclover_Ticket={setclover_Ticket}
          clover_Ticket_FT={clover_Ticket_FT} setclover_Ticket_FT={setclover_Ticket_FT}
        />
      </div>
    );
  } else {
    return (
      <PaymentPage
        EP_Num={EP_Num} User={User} ID={ID}
        setPayment={setPayment}
        lilac_Age={lilac_Age} setlilac_Age={setlilac_Age}
        lilac_Univ={lilac_Univ} setlilac_Univ={setlilac_Univ}
        lilac_Ticket={lilac_Ticket} setlilac_Ticket={setlilac_Ticket}
        lilac_Ticket_FT={lilac_Ticket_FT} setlilac_Ticket_FT={setlilac_Ticket_FT}
        daisy_Age={daisy_Age} setdaisy_Age={setdaisy_Age}
        daisy_Univ={daisy_Univ} setdaisy_Univ={setdaisy_Univ}
        daisy_Ticket={daisy_Ticket} setdaisy_Ticket={setdaisy_Ticket}
        daisy_Ticket_FT={daisy_Ticket_FT} setdaisy_Ticket_FT={setdaisy_Ticket_FT}
        clover_Age={clover_Age} setclover_Age={setclover_Age}
        clover_Univ={clover_Univ} setclover_Univ={setclover_Univ}
        clover_Ticket={clover_Ticket} setclover_Ticket={setclover_Ticket}
        clover_Ticket_FT={clover_Ticket_FT} setclover_Ticket_FT={setclover_Ticket_FT} />
    )
  }
}

export default Submit;
