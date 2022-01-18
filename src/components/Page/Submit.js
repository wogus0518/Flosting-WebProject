import React, { useState } from "react";
import Select from "react-select";
import { Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
const Submit = () => {
  // 아이디 전달
  const [validated, setValidated] = useState(false);
  // const [userNicName, setUserNicName] = useState("");
  // const [userUniv, setUserUniv] = useState("");
  // const [userAge, setUserAge] = useState("");
  // const [userSex, setUserSex] = useState("");

  // 유효성 검사
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // 체크박스 toggle
  const [lilacVisible, setLilacVisible] = useState(true);
  const [daisyVisible, setDaisyVisible] = useState(true);
  const [daisyGayVisible, setDaisyGayVisible] = useState(true);

  const handleLilacVisible = (event) => {
    setLilacVisible(!lilacVisible);
  };
  const handleDaisyVisible = (event) => {
    setDaisyVisible(!daisyVisible);
  };
  const handleDaisyGayVisible = (event) => {
    setDaisyGayVisible(!daisyGayVisible);
  };

  return (
    <div>
      <Container fluid>
        <Row className="text-center">
          <h1>참가신청서</h1>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Image src="Image/Logo.png" rounded fluid />
          </Col>
          <Col></Col>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="userNicName">
            <Form.Label>닉네임을 설정해주세요!</Form.Label>
            <Form.Control type="text" placeholder="닉네임" required />
            <Form.Control.Feedback type="invalid">
              닉네임을 입력하세요
            </Form.Control.Feedback>
            <Container>
              <Row>
                <Form.Text className="text-muted">
                  - 부적절한 닉네임 설정시 신청이 취소됩니다.
                </Form.Text>
              </Row>
              <Row>
                <Form.Text className="text-muted">
                  - 부적절한 닉네임 설정시 신청이 취소됩니다.
                </Form.Text>
              </Row>
              <Row>
                <Form.Text className="text-muted">
                  - 부적절한 닉네임 설정시 신청이 취소됩니다.
                </Form.Text>
              </Row>
            </Container>
          </Form.Group>

          <Form.Group controlId="userAge" className="md-3" fluid>
            <Form.Label>본인 나이를 선택해주세요@</Form.Label>
            <Form.Control type="range" mix={20} max={30} />
          </Form.Group>

          <Form.Group controlId="matchingType">
            <Form.Label>신청할 타입은 ??</Form.Label>
            {["checkbox"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  onClick={handleLilacVisible}
                  inline
                  label="라일락"
                  name="ticket"
                  type={type}
                  id={`matchingType${type}-1`}
                ></Form.Check>
                <Form.Check
                  onClick={handleDaisyVisible}
                  inline
                  label="데이지 이성"
                  name="ticket"
                  type={type}
                  id={`matchingType${type}-2`}
                ></Form.Check>
                <Form.Check
                  onClick={handleDaisyGayVisible}
                  inline
                  label="데이지 동성"
                  name="ticket"
                  type={type}
                  id={`matchingType${type}-3`}
                ></Form.Check>
              </div>
            ))}
          </Form.Group>
          <Form.Group controlId="lilacSubmit">
            {lilacVisible ? (
              ""
            ) : (
              <Form.Group controlId="lilacOther" className="md-3" fluid>
                <Form.Label>라일락 상대방의 나이를 선택해주세요@</Form.Label>
                <Form.Control type="range" mix={20} max={30} />
                <Form.Label>라일락</Form.Label>
                <Select placeholder="0">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Select>
              </Form.Group>
            )}
          </Form.Group>
          <Form.Group controlId="lilacSubmit">
            {daisyVisible ? (
              ""
            ) : (
              <Form.Group controlId="daisyOther" className="md-3" fluid>
                <Form.Label>
                  데이지 이성 상대방의 나이를 선택해주세요@
                </Form.Label>
                <Form.Control type="range" mix={20} max={30} />
                <Form.Label>데이지 이성</Form.Label>
                <Select placeholder="0">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Select>
              </Form.Group>
            )}
          </Form.Group>
          <Form.Group controlId="lilacSubmit">
            {daisyGayVisible ? (
              ""
            ) : (
              <Form.Group controlId="daisyGayOther" className="md-3" fluid>
                <Form.Label>
                  데이지 동성 상대방의 나이를 선택해주세요@
                </Form.Label>
                <Form.Control type="range" mix={20} max={30} />
                <Form.Label>데이지 동성</Form.Label>
                <Select placeholder="0">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Select>
              </Form.Group>
            )}
          </Form.Group>
          <Form.Group controlId="finalBtn">
            <Row>
              <Col>
                <NavLink to="/">
                  <Button variant="primary">Home</Button>
                </NavLink>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Submit;
