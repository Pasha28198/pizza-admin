import React, { Fragment } from 'react';
import sad from '../assets/images/other-images/sad.png';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <Fragment>
            <div className="page-wrapper text-center pt-6">
                {/* <!-- error-404 start--> */}
                <div className="error-wrapper">
                    <div className="container"><img className="img-100" src={sad} alt="" />
                        <div className="error-heading">
                            <h2 className="headline font-danger">{"404"}</h2>
                        </div>
                        <div className="col-md-8 offset-md-2">
                            <p className="sub-content">{"The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."}</p>
                        </div>
                        <div><Link to='/' className="btn btn-danger-gradien"> Back to home page</Link></div>
                    </div>
                </div>
                {/* <!-- error-404 end--> */}
            </div>
        </Fragment>
    );
};

export default Error404;