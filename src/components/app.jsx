import React, {Fragment} from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import RightSidebar from './common/right-sidebar';
import Footer from './common/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './common/loader';


const AppLayout = ({children}) => {
        return (
            <Fragment>
                <Loader />
                <div className="page-wrapper">
                    <div className="page-body-wrapper">
                        <Header />
                        <Sidebar />
                        <RightSidebar />
                        <div className="page-body">
                            {children}
                        </div>
                        <Footer />
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        );
}

export default AppLayout;