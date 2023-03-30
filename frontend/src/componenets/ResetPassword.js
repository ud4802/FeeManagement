import { useEffect, useState, Fragment, useReducer } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faCheck,
//     faTimes,
//     faInfoCircle,
//   } from "@fortawesome/free-solid-svg-icons";

// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `http://localhost:3500/password-reset/${param.id}/${param.token}`;

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== matchPwd) {
      setError("Passwords does not match");
      return;
    }
    setError("");

    try {
      const { data } = await axios.post(url, { pwd });
      setMsg(data.message);
      setError("");
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <>
      {/* {validUrl ? ( */}
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
      <section>
        {/* <form >
						<div className="form-group">
						<h2>Reset Password</h2>
						
						<input
							type="password"
							placeholder="Password"
							className="form-control"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							
                            />
                            <br/>
						<input
							type="password"
							className="form-control"
							placeholder="Confirm Password"
							name="confirm_password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
							required
							
                            />
						{error && <div >{error}</div>}
						{msg && <div >{msg}</div>}
						
						<div className="align">
          <Button variant="outline-dark" onClick={(e) => { handleSubmit(e) }}>Reset</Button>
        </div>
						</div>
					</form> */}
        <div className="form-group">
          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            placeholder="Enter Password"
          />
        </div>

        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <br />
        <div className="form-group">
          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            className="form-control"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            placeholder="Confirm Password"
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        </div>
        {error && <div >{error}</div>}
						{msg && <div >{msg}</div>}
						
						<div className="align">
          <Button variant="outline-dark" onClick={(e) => { handleSubmit(e) }}>Reset</Button>
        </div>
						{/* </div> */}
      </section>
      {/* 				
			) : (
				<h1>404 Not Found</h1>
			)} */}
    </>
  );
};

export default PasswordReset;
