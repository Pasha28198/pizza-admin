import React, { Fragment } from 'react';
import man from '../../../assets/images/user/user.png';
import { LogOut } from 'react-feather';


const UserMenu = () => {
    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" />
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    <li><a href="/logout" ><LogOut /> {"Log out"}</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default UserMenu;