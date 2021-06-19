import React, { useState } from 'react';
import logo from '../assets/images/logo.jpg';
import { withRouter, Redirect } from "react-router";
import Notification from './common/notification/notification';
import axios from '../request/request';

const Logins = ({history}) => {
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const setParameters = (field, event) => {
        if (field === 'email') {
            setEmail(event.target.value)
        } else if (field === 'password') {
            setPassword(event.target.value)
        }
        setMessage(null);
    }

    const loginAuth = () => {
        if (!email ||  !password) {
            setMessage('You must provide your email and password');
        } else {
            setMessage('Authenticating ...');

            axios({
              method: 'post',
              url: `/auth/login`,
              data: { username: email, password }
            }).then(response => {
                console.log(response.data);
                // if (response.data.user.role !== 'admin') {
                //     setMessage("Oops! Only admin can access this page.");
                // } else {
                localStorage.setItem('accessToken', response.data.access_token);

                setMessage("Authentication successful");
                history.push(`/?token=${response.data.token}`);
                // }
                
                setTimeout(() => {
                  setMessage(null);
                }, 3000);
            }).catch(error => {
                setMessage("Oops! Error occured. Try again.");

                setTimeout(() => {
                  setMessage(null);
                }, 3000);
            });
        }

    }

    return (
        <div>
            <div className="page-wrapper">
                <div className="container-fluid p-0">

                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="text-center"><img width="70px" src={logo} alt="" /></div>
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h4>LOGIN</h4>
                                                    <h6>{"Enter your email and password"} </h6>
                                                </div>
                                                <form className="theme-form">
                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0">Email address</label>
                                                        <input className="form-control" type="email" required={true} 
                                                            onChange={(event) => setParameters("email", event)}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Password</label>
                                                        <input className="form-control" type="password" required={true}  
                                                            onChange={(event) => setParameters("password", event)}/>
                                                    </div>
                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button className="btn btn-primary btn-block" type="button"  onClick={() => loginAuth()} >Login</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Notification message={message} visibility={message} />
        </div>
    );
};

export default withRouter(Logins);