import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Users from "./Components/Users/Users";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header>
					<nav>
						<Link to="/login">Log In</Link>
						<Link to="/register">Register List</Link>
						<Link to="/users">User List</Link>
					</nav>
				</header>
				<div className="container">
					<Route path="/login" component={Login} />
					<Route path="/users" component={Users} />
					<Route path="/register" component={Register} />
				</div>
			</div>
		);
	}
}

export default App;
