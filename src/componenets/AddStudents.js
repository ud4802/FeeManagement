import React from "react";
import axios from "../api/axios";
import { useRef, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as XLS from "xlsx";
import xlfile from "./Model.xlsx";
import { Button } from "antd/es/radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import TimerAlert from "./TimeAlert";
const EXCEL_URL = "/upload";
const loggedInUser = localStorage.getItem("auth");
// const YEAR_REGEX = /^([0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])$/;
// const YEAR_REGEX = /^20\d{2}-(?:20|21|22|23)\d{2}$/
// const YEAR_REGEX = /^(\d{4})-(\d{4})$/;
const YEAR_REGEX = /^[0-9][0-9]\d{2}-([0-9][0-9]\d{2})$/;

// import { Link } from 'react-router-dom';
function AddStudents() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState(null);
  const [sem, setSem] = useState("");
  const userRef = useRef();

  const [year, setYear] = useState("");
  const [validYear, setValidYear] = useState(true);
  const [yeatFocus, setYearFocus] = useState(false);

  useEffect(() => {
    // const inputText = event.target.value;
    // const regex = /^(\d{4})-(\d{4})$/;
    const matches = year.match(YEAR_REGEX);
    if (matches) {
      const startYear = Number(matches[0].substring(0, 4));
      const endYear = Number(matches[1]);

      if (endYear - startYear !== 4) {
        setValidYear(false);
      } else {
        setValidYear(true);
      }
    } else {
      setValidYear(false);
    }
  }, [year]);

  // const handleBlur = (e) => {
  //   const inputText = e.target.value;
  //   const YEAR_REGEX = /^([0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])$/;
  //   const isValidInput = YEAR_REGEX.test(inputText);
  //   setValidYear(isValidInput);

  // }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setError(null);
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLS.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLS.utils.sheet_to_json(ws);
        setData(data);
        console.log(data[0].MobileNo);
      };
    }
  };

  const [message, setMessage] = useState("");

  const handleUpload =  () => {
    var error = false;
    if (data) {
      data.forEach((row) => {
        if (
          !row.ID ||
          !row.RollNo ||
          !row.Name ||
          !row.Email ||
          !row.MobileNo ||
          !row.Status
        ) {
          error = true;
        }
        // else{
        // try{
        //   axios.post(EXCEL_URL,{data,sem,year});
        //   alert("file uploaded successful.");
        //   // setFile(null);
        // }catch(error){
        //   alert("Error Uploading file.");
        //   // setError("Erro Uploading File.");
        // }

        // }
      });
      if (error) {
        setError("Invalid data found in the uploaded file.");
        setSem("");
        setYear("");
        setFile(null);
      } else {
        setSuccess("All data in the uploaded file is valid.");
        // setMessage("Data Already Exist.");
        try {
          const response = axios.post(EXCEL_URL, { data, sem, year, loggedInUser });
          // console.log(response.data.exists);
          // if (response.data.exists) {
            // } else {
            setMessage("File Uploaded Successfully.");
            setFile(null);
            setSem("");
            setYear("");
          // }
          // alert("file uploaded successfully.");
        } catch (error) {
          // alert("Error Uploading file.");
          setError("Erro Uploading File.");
        }
      }
    } else {
      setError("Please upload a file first.");
    }
  };

  return (
    <>
      {loggedInUser ? (
        <>
          <h1 class="display-1">Add students</h1>
          <p className="lead">Upload XLSX file containing student details.</p>
          {/* </header> */}
          {/* </div> */}
          {/* </div> */}
          <br />
          <br />

          <section>
            <div>
              <h3>Add Students</h3>
            </div>
            <div>
              <h6>Download Formate :</h6>
              {/* <a href={xlfile} download>
                <Button>Download</Button>
             
              </a> */}
              <Link to={xlfile} target="_blank" download>
                {/* <div className="align"> */}

                <button type="button" className="btn btn-success btn-sm">
                  Download
                </button>
                {/* </div> */}
              </Link>
            </div>
            <label for="exampleInputEmail1">Semester : </label>
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              onChange={(e) => setSem(e.target.value)}
              value={sem}
            >
              <option selected>Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            <div class="form-group">
              <label for="academicyear">
                Academic Year :
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validYear ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validYear || !year ? "hide" : "invalid"}
                />
              </label>
              <br />
              <input
                type="text"
                class="form-control"
                id="academicyear"
                onChange={(e) => setYear(e.target.value)}
                // onBlur={handleBlur}
                value={year}
                required
                aria-invalid={validYear ? "false" : "true"}
                aria-describedby="yearnote"
                onFocus={() => setYearFocus(true)}
                onBlur={() => setYearFocus(false)}
                // placeholder="e.g. 2020-2024"
              />
              {/* {!validYear && <div style={{color:'red'}}>Invalid Year</div>} */}
            </div>
            <p
              id="yearnote"
              className={yeatFocus && !validYear ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <li>
                Entered Year Should be in <b>yyyy-yyyy</b> Formate only.
              </li>
              {/* <br /> */}
              <li>And difference between both years should be exactly 4.</li>
              {/* <br/> */}
              eg.,{" "}
              <span style={{ color: "green" }}>
                2020-2024,2024-2028 etc.
              </span>{" "}
              are <span style={{ color: "green" }}>valid</span>
              <br />
              but <span style={{ color: "red" }}>
                2020-2021,2020-2025 etc.
              </span>{" "}
              are <span style={{ color: "red" }}>invalid.</span>
            </p>
            {/* <br /> */}
            <br />
            <input type="file" accept=".xlsx" onChange={handleFileChange} />

            <div className="align">
              <button
                type="submit"
                onClick={handleUpload}
                class="btn btn-secondary btn-sm"
                required
                disabled={!validYear ? true : false}
              >
                Submit
              </button>
            </div>
            <br />
            <div>
              {message && (
                <TimerAlert
                  message={message}
                  variant="success"
                  duration={3000}
                />
              )}
            </div>
            <div>
              {error && (
                // <div class="alert alert-danger" role="alert">
                //     <p>
                //     {error}
                // </p>
                //   </div>
                <TimerAlert message={error} variant="success" duration={3000} />
              )}
            </div>
            <div>
              {success && (
                // <div class="alert alert-success" role="alert">
                //     <p>
                //     {success}
                // </p>
                //   </div>
                <TimerAlert
                  message={success}
                  variant="success"
                  duration={3000}
                />
              )}
            </div>
            
          </section>
        </>
      ) : (
        <Navigate replace to="/"></Navigate>
      )}
    </>
  );
}

export default AddStudents;
