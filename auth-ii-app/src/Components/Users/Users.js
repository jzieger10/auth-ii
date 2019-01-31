import React from "react";
import axios from "axios";

class Users extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
		};
	}

	async componentDidMount() {
		const endpoint = `${process.env.REACT_APP_API_URL}/api/users`;
		console.log(endpoint);
		try {
			const response = await axios.get(endpoint);
			this.setState({ users: response.data.users });
		} catch (err) {
			console.error("There has been an error at Users CDM", err);
		}
	}

	render() {
		return (
			<div>
				<h2>User List</h2>
				<ul>
					{this.state.users.map(user => (
						<li key={user.id}>
							{user.username} | {user.departments}
						</li>
					))}
				</ul>
				<button className="logout-button">Log Out</button>
			</div>
		);
	}
}

export default Users;
