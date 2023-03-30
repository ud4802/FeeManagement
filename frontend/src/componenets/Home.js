import {React,useContext} from "react";
import img from "./View.png";
import img2 from "./Add.png";
import img3 from "./Verify Students.png";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav2 from "./Nav2";
import AuthContext from "../context/AuthProvider";
import { Card, Col, Row ,CardGroup} from "react-bootstrap";

function Home() {
  // const addStudents = () => {
  //   const Navigate = useNavigate();
  //   Navigate('/addstudents');
  // }
  
  const {auth} = useContext(AuthContext);

  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("auth");

  return (
    <>
      {/* <Nav2/> */}
      {auth.user ? (
        <>
        <br/>
        <br/>
        <br/>

        <div className="card-home">
        <CardGroup>
                <Card>
                  <Card.Body style={{ background: "whitesmoke" }}>
                    <img
                      src={img2}
                      alt="Image not Found"
                      hieght="150em"
                      width="150em"
                    />
                    <br/>
                    <br/>
                    <Card.Title>
                      <b>Add Students</b>
                    </Card.Title>
                    <Card.Text>
                      <ul>
                        <li>Upload .xlsx/.xls file</li>
                      </ul>
                    </Card.Text>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {/* <br /> */}
                    <Card.Link>
                      <Button
                        variant="outline-danger"
                        onClick={() => navigate("/addstudents")}
                      >
                        Go To
                      </Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              {/* </Col> */}
              {/* <Col md={3}> */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Card>
                  <Card.Body style={{ background: "whitesmoke" }}>
                    <img
                      src={img}
                      alt="Image not Found"
                      hieght="150em"
                      width="150em"
                    />
                    <br/>
                    <br/>
                    <Card.Title>
                      <b>View Students</b>
                    </Card.Title>
                    <Card.Text>
                      <ul>
                        <li>View Student Details</li>
                        <li>Edit Student Details</li>
                        <li>Send Reminder</li>
                      </ul>
                    </Card.Text>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Card.Link>
                      <Button
                        variant="outline-primary"
                        onClick={() => navigate("/viewstudents")}
                      >
                        Go To
                      </Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              {/* </Col> */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <Col md={3}> */}
                <Card>
                  <Card.Body style={{ background: "whitesmoke" }}>
                    <img
                      src={img3}
                      alt="Image not Found"
                      hieght="150em"
                      width="150em"
                      style={{ alignSelf: "center" }}
                    />
                    <br />
                    <br />
                    {/* <br /> */}

                    <Card.Title>Verify Students</Card.Title>
                    <Card.Text>
                      <ul>
                        <li>Review Response</li>
                        <li>Verify Fee Status</li>
                      </ul>
                    </Card.Text>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Card.Link>
                      <Button
                        variant="outline-warning"
                        onClick={() => navigate("/notifystudents")}
                      >
                        Go To
                      </Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              {/* </Col> */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <Col md={3}> */}
                <Card>
                  <Card.Body style={{ background: "whitesmoke" }}>
                    <img
                      src={img3}
                      alt="Image not Found"
                      hieght="150em"
                      width="150em"
                      style={{ alignSelf: "center" }}
                    />
                    <br />
                    <br />
                    {/* <br /> */}

                    <Card.Title>Global Search</Card.Title>
                    <Card.Text>
                      <ul>
                        <li>Globally Search Students</li>
                        <span style={{ color: "red" }}>
                          (Within your department only)
                        </span>
                        <li>Delete all students record of your department.</li>
                        {/* <li style={{color:"red"}}>Within your department only</li> */}
                      </ul>
                    </Card.Text>
                    <br/>
                    <br/>
                    <br/>
                    <Card.Link>
                      <Button
                        variant="outline-warning"
                        onClick={() => navigate("/globalsearch")}
                      >
                        Go To
                      </Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
                </CardGroup>
          
        </div>
        </>
      ) : (
        <Navigate replace to="/"></Navigate>
      )}
    </>
  );
}

export default Home;
