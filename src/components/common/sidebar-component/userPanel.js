import React, { Fragment } from 'react';
import man from '../../../assets/images/user/user.png';
// import { Link } from 'react-router-dom';
// import { Edit } from 'react-feather';

const UserPanel = () => {
    const url= '';

    return (
        <Fragment>
            <div className="sidebar-user text-center">
                <div>
                    <img className="img-60 rounded-circle lazyloaded blur-up" src={url ? url : man} alt="#" />
                </div>
                <h6 className="mt-3 f-14">ADMIN</h6>
            </div>
        </Fragment>
    );
};

export default UserPanel;