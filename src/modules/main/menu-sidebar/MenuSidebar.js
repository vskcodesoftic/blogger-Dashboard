import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const MenuSidebar = ({user}) => {
    const GetCurrentUser = () => {
        const C = JSON.parse(localStorage.getItem('user'));
        return C;
    };

    const {t} = useTranslation();

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-light">Blog</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={user.picture || '/img/default-profile.png'}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {GetCurrentUser().email}
                        </Link>
                    </div>
                </div>
                {/* eslint-disable no-debugger, no-console  */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>{t('menusidebar.label.dashboard')}</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/profile" exact className="nav-link">
                                <i className="nav-icon fas fa-user" />
                                <p>{t('menusidebar.label.profile')}</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/users" exact className="nav-link">
                                <i className="nav-icon fas fa-users" />
                                <p>{t('menusidebar.label.user')}</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/products" exact className="nav-link">
                                <i className="nav-icon fas fa-cart-plus" />
                                <p>{t('menusidebar.label.posts')}</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.currentUser
});

export default connect(mapStateToProps, null)(MenuSidebar);
