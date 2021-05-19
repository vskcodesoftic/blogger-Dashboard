import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {Gatekeeper} from 'gatekeeper-client-sdk';

import Dashboard from '@pages/Dashboard';
import Profile from '@pages/profile/Profile';

import Users from '@app/pages/Users/Users';
import ProductsPage from '@app/pages/Products/ProductsPage';
import Header from './header/Header';
import Footer from './footer/Footer';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import PageLoading from '../../components/page-loading/PageLoading';
import * as ActionTypes from '../../store/actions';
import PlansPage from '../../pages/Plans/PlansPage';
import NotificationsPage from '../../pages/Notifications/NotificationPage';
import PaymentsPage from '../../pages/Payments/PaymentsPage';

const Main = ({onUserLoad}) => {
    const [appLoadingState, updateAppLoading] = useState(false);
    const [menusidebarState, updateMenusidebarState] = useState({
        isMenuSidebarCollapsed: false
    });

    const toggleMenuSidebar = () => {
        updateMenusidebarState({
            isMenuSidebarCollapsed: !menusidebarState.isMenuSidebarCollapsed
        });
    };

    useEffect(() => {
        updateAppLoading(true);
        const fetchProfile = async () => {
            try {
                const response = await Gatekeeper.getProfile();
                onUserLoad({...response});
                updateAppLoading(false);
            } catch (error) {
                updateAppLoading(false);
            }
        };
        fetchProfile();
        return () => {};
    }, [onUserLoad]);

    document.getElementById('root').classList.remove('register-page');
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');

    document.getElementById('root').className += ' sidebar-mini';

    if (menusidebarState.isMenuSidebarCollapsed) {
        document.getElementById('root').classList.add('sidebar-collapse');
        document.getElementById('root').classList.remove('sidebar-open');
    } else {
        document.getElementById('root').classList.add('sidebar-open');
        document.getElementById('root').classList.remove('sidebar-collapse');
    }

    let template;

    if (appLoadingState) {
        template = <PageLoading />;
    } else {
        template = (
            <>
                <Header toggleMenuSidebar={toggleMenuSidebar} />

                <MenuSidebar />

                <div className="content-wrapper">
                    <div className="pt-3" />
                    <section className="content">
                        <Switch>
                            <Route
                                exact
                                path="/notifications"
                                component={NotificationsPage}
                            />

                            <Route
                                exact
                                path="/payments"
                                component={PaymentsPage}
                            />

                            <Route exact path="/plans" component={PlansPage} />
                            <Route
                                exact
                                path="/products"
                                component={ProductsPage}
                            />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/users" component={Users} />
                            <Route exact path="/" component={Dashboard} />
                        </Switch>
                    </section>
                </div>
                <Footer />
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={toggleMenuSidebar}
                    onKeyDown={() => {}}
                />
            </>
        );
    }

    return <div className="wrapper">{template}</div>;
};

const mapStateToProps = (state) => ({
    user: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    onUserLoad: (user) =>
        dispatch({type: ActionTypes.LOAD_USER, currentUser: user})
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
