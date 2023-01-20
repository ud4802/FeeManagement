import { useEffect, useState, Fragment, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faCheck,
//     faTimes,
//     faInfoCircle,
//   } from "@fortawesome/free-solid-svg-icons";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

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
		
		if (password !== confirmPassword) {
			setError("Passwords does not match")
			return;
		}
		setError("");

		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/login";

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
				<section>
					<form >
						<h2>Reset Password</h2>
						<h6>Set 8-character password.{'\n'} This password includes one uppercase letter, one lowercase letter, one number and one special character.</h6>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							
                            />
                            <br/>
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirm_password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
							required
							
                            />
						{error && <div >{error}</div>}
						{msg && <div >{msg}</div>}
						<button onClick={(e) => { handleSubmit(e) }} type="submit" >
							Submit
						</button>
					</form>
                </section>
{/* 				
			) : (
				<h1>404 Not Found</h1>
			)} */}
		</>
	);
};

export default PasswordReset;