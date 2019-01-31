import React from "react";
import axios from "axios";

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "user22",
			password: "password",
			departments: "Sales",
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

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
			<form className="register-form" onSubmit={this.handleSubmit}>
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
				<label htmlFor="departments">Departments</label>
				<input
					type="departments"
					name="departments"
					value={this.state.departments}
					onChange={this.handleChange}
				/>
				<button type="submit">Register</button>
			</form>
		);
	}
}

export default Register;
