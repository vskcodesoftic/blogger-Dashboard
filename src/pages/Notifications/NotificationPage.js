import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import NotificationsDataTable from './NotifactionDataTable';

const NotificationsPage = () => {
    const [t] = useTranslation();
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{t('header.notifications.title')}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">{t('header.label.home')}</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    {t('views.notifications.link')}
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <NotificationsDataTable />
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotificationsPage;
