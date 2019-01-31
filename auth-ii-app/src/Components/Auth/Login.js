import React from "react";
import axios from "axios";

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "user22",
			password: "password",
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;

		axios
			.post(endpoint, this.state)
			.then(res => {
				localStorage.setItem("token", res.data.token);
			})
			.catch(err => console.error(err));
	};

	render() {
		console.log(this);
		return (
			<form className="login-form" onSubmit={this.handleSubmit}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<button type="submit">Log in</button>
			</form>
		);
	}
}

export default Login;
