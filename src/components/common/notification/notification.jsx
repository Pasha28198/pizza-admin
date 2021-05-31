import React from 'react';

import './notification.scss';

const notification = ({message, visibility}) => {
    return (
        <div className={`status__response__container ${visibility ? '' : 'none'}`}>
            <div className='status__response'>
                <p>{message}</p>
            </div>
        </div>
    )
};

export default notification;