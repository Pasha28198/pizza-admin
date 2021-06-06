import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import {Redirect} from 'react-router';
import {ScrollContext} from 'react-router-scroll-4';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux**
import {Provider} from 'react-redux';
import store from './store/index';
import App from "./components/app";

// Import custom Components
import Dashboard from './components/dashboard/dashboard';
import Coupons from './components/coupons/coupons';
import Ingredients from './components/ingredients/ingredients';
import Products from './components/products/products';
import ProductsId from './components/products_id/products';
import Login from './components/login';
import Logout from './components/logout';
import Error404 from './components/error404';
import changePassword from './components/changePassword';

import PrivateRoute from './PrivateRoute';

function withLayout(WrappedComponent) {
    // ...and returns another component...
    return class extends React.Component {
        render() {
            return <App>
                <WrappedComponent></WrappedComponent>
            </App>
        }
    };
}

function Root() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Switch>
                            <PrivateRoute exact path="/" component={withLayout(Dashboard)}/>
                            <PrivateRoute exact path="/categories" component={withLayout(Coupons)}/>
                            <PrivateRoute exact path="/products" component={withLayout(Products)}/>
                            <PrivateRoute exact path="/products/:id" component={withLayout(ProductsId)}/>
                            <PrivateRoute exact path="/choise" component={withLayout(Coupons)}/>
                            <PrivateRoute exact path="/ingredients" component={withLayout(Ingredients)}/>
                            <PrivateRoute exact path="/change-password" component={withLayout(changePassword)}/>

                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/logout' component={Logout}/>
                            <Route component={Login}/>
                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root/>, document.getElementById('root'));

serviceWorker.unregister();