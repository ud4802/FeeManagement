import { useState } from "react";
import axios from "axios";
// import styles from "./styles.module.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:8080/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
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
        <section>
            
			<form onSubmit={handleSubmit}>
				<h3>Forgot Password :</h3>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					
				/>
				{error && <div >{error}</div>}
				{msg && <div >{msg}</div>}
				<button type="submit" >
					Submit
				</button>
			</form>
        </section>
		
	);
};

export default ForgotPassword;