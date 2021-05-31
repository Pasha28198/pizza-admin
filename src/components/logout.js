import React from 'react';
import { withRouter, Redirect } from "react-router";

const Logout = ({history}) => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('profileImage');
	return <Redirect to="/login" />
}

export default withRouter(Logout);