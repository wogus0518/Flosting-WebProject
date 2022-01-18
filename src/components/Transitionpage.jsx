import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Transitionpage.css";
import Home_page from './Page/Home'
import Login_page from './Page/Login/Login'
import Submit_page from './Page/Submit/Submit'
import Confirm_page from './Page/Confirm'
import Account_page from './Page/Account'
import About_page from './Page/About'
import AD_page from './Page/Ad'
import History_page from './Page/History'
import Register_page from './Page/Register/Register'
import Terms_page from './Page/Register/Terms'
import Certification_page from './Page/Register/Certification'
import LastRegister_page from './Page/Register/LastRegister'
import Whereareyoufrom_page from './Page/Register/WhereAreyoufrom'
import My_page from './Page/Mypage/Mypage'
import ShowingResult from './Page/Matched/ShowingResult'
import CurrentEvent from "./Page/CurrentEvent/CurrentEvent";
import SelectResult from '../components/Page/Matched/SelectResult.js';
import MatchingList from '../components/Page/Matched/MatchingList.js';
import Forgot_page from "./Page/Forgot/forgot";
import AdminBigFoot from "./Page/Manager/AdminBigFoot.js";
import AdminOwvwO from "./Page/Manager/AdminOwvwO";
import UserSearch from "./Page/Manager/UserSearch";
import SubmitStatus from "./Page/Manager/SubmitStatus";
import CurrentSitu from "./Page/Manager/CurrentSitu";
import EPall from './Page/CurrentEvent/EPAll';
import Alarm from "./Page/Alarm";
import Admin_page from "./Page/Manager/Admin";
import EventMain from "./Page/subEvent/EventMain"
import NoticeDetail from "./Page/subEvent/NoticeDetail";
import EventDetail from "./Page/subEvent/EventDetail";
import QnaMain from '../components/Page/QNA/QnaMain.js';
import Timer from "./Page/Matched/Timer";
import Report from "../components/Page/Report";
import Plan from "../components/Page/Plan";
import UserProfile from "./Page/Matched/UserProfile";
import ProfileSelect from './Page/Register/ProfileSelect';
import MbtiSelect from './Page/Register/MbtiSelect';
import AdminCheckMoneyGiver from "./Page/Manager/AdminCheckMoneyGiver";
import DeleteNoPaid from "./Page/Manager/DeleteNoPaid";
import EventPeriod from "./Page/Manager/EventPeriod";
import Event1 from "./Page/subEvent/EventComponents/Event1";
import Event2 from "./Page/subEvent/EventComponents/Event2";
import Notice1 from "./Page/subEvent/NoticeComponents/Notice1";
import Notice2 from "./Page/subEvent/NoticeComponents/Notice2";
import MBTIstatics_page from "./Page/Statistics/MBTIstatics";
import Schoolstatics_page from "./Page/Statistics/Schoolstatics";
const Transition = (props) => {

  const [auth_regis, set_auth_regis] = useState(false);
  const [S_num, set_S_num] = useState("");
  const [U_School_num, setU_School_num] = useState("");
  const [S_name, set_S_name] = useState("");
  const [U_unique_key, setU_unique_key] = useState("");
  const [U_name, setU_name] = useState("");
  const [U_Age, setU_Age] = useState("");
  const [U_Gender, setU_Gender] = useState("");
  const [U_Phone, setU_Phone] = useState("");
  const [U_Profileurl, setU_Profileurl] = useState("");
  const [U_MBTI, setU_MBTI] = useState("");
  const [controlWhere, setcontrolWhere] = useState("");

  const [EP_School_Name, setEP_School_Name] = useState([]);
  const [EP_Num, setEP_Num] = useState('');
  const [EP_Start_Day, setEP_Start_Day] = useState('');
  const [EP_End_Day, setEP_End_Day] = useState('');
  const [EP_Result_Day, setEP_Result_Day] = useState('');
  const [EP_Region, setEP_Region] = useState('');
  const [S_Event, setS_Event] = useState("");
  const [isManager, setisManager] = useState(false); // 매니저인지 아닌지

  const user = props.User;
  const location = useLocation();

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
        <Switch location={location}>
          <Route exact path="/"><Home_page User={user} /></Route>
          <Route exact path="/currentevent"><CurrentEvent
            User={user}
            setEP_School_Name={setEP_School_Name}
            setEP_Num={setEP_Num}
            setEP_Start_Day={setEP_Start_Day}
            setEP_End_Day={setEP_End_Day}
            setEP_Result_Day={setEP_Result_Day}
            setEP_Region={setEP_Region}
          /></Route>
          <Route exact path="/currentevent/EP"><EPall
            User={user}
            EP_School_Name={EP_School_Name}
            EP_Num={EP_Num}
            EP_Start_Day={EP_Start_Day}
            EP_End_Day={EP_End_Day}
            EP_Result_Day={EP_Result_Day}
            EP_Region={EP_Region}
          /></Route>
          <Route path="/currentevent/alarm"><Alarm User={user} /></Route>
          <Route path="/login" component={Login_page} />
          <Route path="/submit"><Submit_page EP_Num={EP_Num} User={user} /></Route>
          <Route path="/confirm" component={Confirm_page} />
          <Route exact path="/subevent" component={EventMain} />
          <Route exact path="/subevent/notice1" component={Notice1} />
          <Route exact path="/subevent/notice2" component={Notice2} />
          <Route exact path="/subevent/event1" component={Event1} />
          <Route exact path="/subevent/event2" component={Event2} />
          <Route path="/account" component={Account_page} />
          <Route path="/about" component={About_page} />
          <Route path="/history" component={History_page} />
          <Route exact path="/ad" component={AD_page} />
          <Route exact path="/statistics/MBTI"><MBTIstatics_page /></Route>
          <Route exact path="/statistics/School"><Schoolstatics_page /></Route>
          <Route exact path="/admin"><Admin_page isManager={isManager} setisManager={setisManager} User={user} /></Route>
          <Route exact path="/admin/jungboo"><EventPeriod
            setEP_School_Name={setEP_School_Name}
            setEP_Num={setEP_Num}
            setEP_Start_Day={setEP_Start_Day}
            setEP_End_Day={setEP_End_Day}
            setEP_Result_Day={setEP_Result_Day}
          /></Route>
          <Route exact path="/admin/owvwo"><AdminOwvwO isManager={isManager} User={user} /></Route>
          <Route exact path="/admin/usersearch"><UserSearch isManager={isManager} User={user} /></Route>
          <Route exact path="/admin/money"><SubmitStatus isManager={isManager} User={user} /></Route>
          <Route exact path="/admin/now"><CurrentSitu isManager={isManager} User={user} /></Route>
          <Route exact path="/admin/bigfoot"><AdminBigFoot isManager={isManager} User={user} /></Route>
          <Route exact path="/admin/moneygiver"><AdminCheckMoneyGiver isManager={isManager} User={user} /></Route>
          <Route exact path="/admin/delete"><DeleteNoPaid isManager={isManager} User={user} /></Route>
          <Route path="/plan"><Plan /></Route>
          <Route path="/timer"><Timer User={user} /></Route>
          <Route exact path="/selectresult"><SelectResult User={user} /></Route>
          <Route exact path="/selectresult/:sort"><MatchingList User={user} /></Route>
          <Route exact path="/selectresult/:sort/:ongoing/:docid"><ShowingResult User={user} /></Route>
          <Route path="/userprofile/:Nick"><UserProfile User={user} /></Route>
          <Route path="/report"><Report User={user} /></Route>
          <Route path="/qna"><QnaMain User={user} /></Route>
          <Route path="/forgot"><Forgot_page /></Route>
          <Route path="/my"><My_page User={user} /></Route>
          <Route exact path="/register" render={props => (
            <Register_page
              S_num={S_num}
              setU_School_num={setU_School_num}
              set_S_num={set_S_num}
              set_S_name={set_S_name}
              set_auth_regis={set_auth_regis}
              {...props} />
          )} />
          <Route path="/register/terms" render={props => (
            <Terms_page
              auth_regis={auth_regis}
              {...props} />
          )} />
          <Route path="/register/certification" render={props => (
            <Certification_page
              auth_regis={auth_regis}
              U_Phone={U_Phone}
              setU_name={setU_name}
              setU_Age={setU_Age}
              setU_Gender={setU_Gender}
              setU_Phone={setU_Phone}
              setU_unique_key={setU_unique_key}
              {...props} />
          )} />
          <Route path="/register/profileselect" render={props => (
            <ProfileSelect
              U_unique_key={U_unique_key}
              auth_regis={auth_regis}
              U_Profileurl={U_Profileurl}
              setU_Profileurl={setU_Profileurl}
              {...props} />
          )} />
          <Route path="/register/mbtiselect" render={props => (
            <MbtiSelect
              auth_regis={auth_regis}
              U_MBTI={U_MBTI}
              setU_MBTI={setU_MBTI}
              {...props} />
          )} />
          <Route path="/register/last" render={props => (
            <LastRegister_page
              auth_regis={auth_regis}
              U_unique_key={U_unique_key}
              U_name={U_name}
              U_Age={U_Age}
              U_Gender={U_Gender}
              U_Phone={U_Phone}
              U_MBTI={U_MBTI}
              U_Profileurl={U_Profileurl}
              S_num={S_num}
              U_School_num={U_School_num}
              S_name={S_name}
              user={user}
              controlWhere={controlWhere}
              {...props} />
          )} />
          <Route path="/register/where" render={props => (
            <Whereareyoufrom_page
              auth_regis={auth_regis}
              user={user}
              controlWhere={controlWhere}
              setcontrolWhere={setcontrolWhere}
              {...props} />
          )} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;