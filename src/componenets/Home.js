import React from "react";
import img from "./View.png";
import img2 from "./Add.png";
import img3 from "./alert.png";
// import AddStudents from "./AddStudents";
import { Navigate, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import{ browserHistory } from 'react-router';
import Button from "react-bootstrap/Button";
import Nav2 from "./Nav2";
import { Card, Col, Row } from "react-bootstrap";

function Home() {
  // const addStudents = () => {
  //   const Navigate = useNavigate();
  //   Navigate('/addstudents');
  // }
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("auth");

  return (
    <>
      {/* <Nav2/> */}
      {loggedInUser ? (
        <>
        <h1 class="display-1">Welcome....!</h1>
        <br/>
        <br/>
        <br/>
        <br/>

        <div>
          {/* <Nav2/> */}
          {/* <section2>
          <h1>Welcome Back Admin..!</h1>
          <br />
          <br />
         <div className="parent">
          <div className="child">
            <Button
              variant="outline-dark"
              onClick={() => navigate("/home/addstudents")}
            >
              Add Students{" "}
              <span>
                <img
                  src={img2}
                  alt="ErroImage"
                  width="50em"
                  height="50em"
                ></img>
              </span>
            </Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            
            <Button
              variant="outline-dark"
              onClick={() => navigate("/home/viewstudents")}
            >
              View Students{" "}
              <span>
                <img src={img} alt="ErroImage" width="50em" height="50em"></img>
              </span>
            </Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Button
              variant="outline-dark"
              onClick={() => navigate("/home/notifystudents")}
            >
              Notify Students{" "}
              <span>
                <img src={img3} alt="ErroImage" width="70em" height="50em"></img>
              </span>
            </Button>
            
          </div>
          </div> 
        </section2> */}
          {/* <div class="card" style={{ width: "18rem" }}>
            <img src={img} class="card-img-top" alt="Image not Found." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <span>
            <div class="card" style={{ width: "18rem" }}>
              <img src={img2} class="card-img-top" alt="Image not Found." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </span> */}
          
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body style={{background:"whitesmoke"}}>
                  {/* <Card.Img
                    src={img2}
                    alt="Image not found"
                    hieght="50em"
                    width="50em"
                  ></Card.Img> */}
                  <img src={img2} alt="Image not Found" hieght="150em" width="150em"/>
                  <Card.Title><b>Add Students</b></Card.Title>
                  <Card.Text>
                    {/* Upload Excel FIle containing Student details. */}
                    <ul>
                    <li>Upload .xlsx/.xls file</li>
                    </ul>
                  </Card.Text>
                  <Card.Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => navigate("/home/addstudents")}
                    >Go To</Button>
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body style={{background:"whitesmoke"}}>
                  {/* <Card.Img
                    src={img}
                    alt="Image not found"
                    hieght="50em"
                    width="50em"
                  ></Card.Img> */}
                  <img src={img} alt="Image not Found" hieght="150em" width="150em"/>
                  <Card.Title><b>View Students</b></Card.Title>
                  <Card.Text>
                    {/* View Student details edit them accordingly and
                    send reminder regarding their fees payment. */}
                    <ul>
                    <li>View Student Details</li>
                    <li>Edit Student Details</li>
                    <li>Send Reminder</li>
                    </ul>
                  </Card.Text>
                  <Card.Link>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate("/home/viewstudents")}
                    >Go To</Button>
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body style={{background:"whitesmoke"}}>
                  {/* <Card.Img
                    src={img3}
                    alt="Image not found"
                    hieght="50em"
                    width="50em"
                  ></Card.Img> */}
                  <img src={img3} alt="Image not Found" hieght="150em" width="150em" style={{alignSelf:"center"}}/>
                  <Card.Title>Verify Students</Card.Title>
                  <Card.Text>
                    {/* <p>Review the response, sent by the student and verify their
                    fee status.</p> */}
                    <ul>
                   <li>Review Response</li>
                   <li>Verify Fee Status</li>
                   </ul>
                  </Card.Text>
                  <Card.Link>
                    <Button
                      variant="outline-warning"
                      onClick={() => navigate("/home/notifystudents")}
                    >Go To</Button>
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        </>
      ) : (
        <Navigate replace to="/"></Navigate>
      )}
    </>
  );
}

export default Home;
