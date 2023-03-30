import Button from "react-bootstrap/esm/Button";
import {React,useContext,useEffect} from "react";
import img from "./AdminLogin.png";
import img2 from "./CoordinatorLogin.png";
import { Navigate, useNavigate } from "react-router";
import { Card, Col, Row } from "react-bootstrap";
import AuthContext from "../context/AuthProvider";

function LoginOption() {
  const navigate = useNavigate();
  const {setAuth,setAdmin} = useContext(AuthContext);
  // console.log(at);


  useEffect(() => {
    localStorage.clear();
    setAuth({});
    setAdmin(false);
  }, []);



  return (
    <>
      {/* <div className="main-option">
        <section className="option_1">
          <div >
            <Button
              variant="outline-dark"
              onClick={() => navigate("/adminLogin")}
            >
              Login as Admin{" "}
              
            </Button>
            <img src={img} hieght="70em" width="70em"></img>
          </div>
        </section>
          <br/>
        
        &nbsp;&nbsp;&nbsp;&nbsp;
        <section className="option_1">
          &nbsp; &nbsp; &nbsp; &nbsp;
         
          <div >
            <Button variant="outline-dark" onClick={() => navigate("/login")}>
              Login as Fee Co-ordinator{" "}
        
            </Button>
            <img src={img2} height="75em" width="75em"></img>
          </div>
        </section>
      </div> */}
      <div style={{ background: "white" }}>
      <h1 class="display-3" >
        <b>Welcome to the Fee Management System</b>
      </h1>
      {/* <p className="lead"> */}
      <marquee direction="left" >
        Upload Excel file containing stuent details, sned reminder to them
        regarding to their fess and review the response sent by the students and
        accordingly update fee status.
      {/* </p> */}
      </marquee>
      </div>
      <br/>
      <h1 class="display-5">Login As a ...</h1>
      <br />
      {/* <br />
      <br />
      <br /> */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <img
                src={img}
                alt="Image not found."
                height="150em"
                width="150em"
              />
              <Card.Title>Administrator</Card.Title>
              <Card.Link>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/adminLogin")}
                >
                  Login
                </Button>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <img
                src={img2}
                alt="Image not found."
                height="150em"
                width="150em"
              />
              <Card.Title>Co-ordinator</Card.Title>
              <Card.Link>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default LoginOption;
