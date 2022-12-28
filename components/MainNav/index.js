import React, { useEffect, useState } from "react";
import Drawer from 'react-modern-drawer'
import { Button } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import { Collapse } from 'react-collapse';
import { UnmountClosed } from 'react-collapse';
import { connect, useSelector } from 'react-redux'
import { getOrdersListRequest } from "../../Stores/Orders/actions";
import { compose } from "redux";
import Router, { useRouter } from 'next/router'
import { getjobsCompletedRequest } from "../../Stores/JobsCompleted/actions";
import { getVisitsRequest } from "../../Stores/OrderVisits/actions";
import actions from '../../Stores/Auth/actions';
const LogoutAction = actions.logout;

function MainNav({ fetchJobsComplted, fetchVisitsList,Logout }) {

    const history = useRouter();

    const userInfo = useSelector((state) => state?.AuthReducer?.user);
    const jobsCompleted = useSelector((state) => state?.JobsCompletedReducer?.jobsCompleted);
    const { ordersList } = useSelector(
        (state) => state?.OrdersReducer
    );

    const [isOpen, setIsOpen] = React.useState(false)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [isOpened, setisOpened] = React.useState(false)
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [isPostCodeOpen, setIsPostCodeOpen] = React.useState(false)
    const [upcomingBookings, setUpcomingBookings] = useState();
    const [completedBookings, setCompletedBookings] = useState();

    useEffect(() => {
        if (userInfo?.id && loggedIn) {
            fetchVisitsList();
            fetchJobsComplted();
        }
    }, [userInfo, loggedIn])

    useEffect(() => {
        if (ordersList) {
            let num = ordersList?.length;
            setUpcomingBookings(num);
        }
    }, [ordersList])

    useEffect(() => {
        if (jobsCompleted) {
            let num = jobsCompleted?.data?.length;
            setCompletedBookings(num);
        }
    }, [jobsCompleted])

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const togglePostCodeDrawer = () => {
        setIsPostCodeOpen((prevState) => !prevState)
    }
    const toggleMenuDrawer = () => {
        setIsMenuOpen((prevState) => !prevState)
    }
    const toggleLink = () => {
        setisOpened((prevState) => !prevState)
    }

    useEffect(() => {
        if (userInfo && userInfo?.id !== null) {
            setLoggedIn(true)
        }
    }, [userInfo])

    function handleLogout(){
        Logout();
        toggleDrawer();
        setLoggedIn(false)
    }

    return (
        <>
            <section className="main-site-wrapper">
                <div className="container">

                    <nav className="main-site-nav">
                        <div className="main-site-nav-logo" onClick={() => Router.push('/')}>
                            <img src="/images/logo.png" width="100%" alt="" />
                        </div>

                        <div className="main-site-nav-icons">
                            <img onClick={toggleDrawer} className="nav-icon-user ico-pad" src="/images/user.png" width="100%"></img>
                            <img onClick={togglePostCodeDrawer} className="nav-icon-location ico-pad" src="/images/location.png" width="100%"></img>
                            <img onClick={toggleMenuDrawer} className="nav-icon-menu" src="/images/menu.png" width="100%" />
                        </div>
                    </nav>
                </div>

            </section>

            {/* Login Navigation */}
            <Drawer open={isOpen ? isOpen : isMenuOpen} onClose={isOpen ? toggleDrawer : toggleMenuDrawer} direction='right' style={{ width: '320px' }}>
                {isOpen ? (loggedIn ? (
                    <div className="main-site-nav-login">
                        <div className="profile">
                            <img src="/images/avatar.PNG" alt="Avatar" className="avatar" />
                            <h6>{userInfo?.name ? userInfo?.name : '~'}</h6>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Divider style={{ width: '80%' }} />
                        </div>
                        <ul className="main-site-nav-login-links">
                            <li onClick={() => Router.push('/profile')}><a href="#">My Account</a></li>
                            <li><a href="#">Addresses</a></li>
                            <li onClick={toggleLink}><a>My Bookings </a>

                            </li>
                            <UnmountClosed isOpened={isOpened}>
                                <ul className="inner-login-links">
                                    <li onClick={() => Router.push('/orders')} >
                                        <a style={{display: 'flex', justifyContent: 'space-between', maxWidth: '125%'}}>Upcoming Bookings <span >{upcomingBookings}</span></a> </li>
                                    <li onClick={() => Router.push('/job-completed')}><a style={{display: 'flex', justifyContent: 'space-between', maxWidth: '125%'}}>Completed Bookings <span>{completedBookings}</span></a> </li>
                                </ul>
                            </UnmountClosed>
                            <li><a href="#">Documents</a></li>
                            <li><a href="#">Invoices</a></li>
                            <li onClick={() => Router.push('/quotes')}><a href="#">Quotes</a></li>
                            <li onClick={() => handleLogout()}><a href="#">Logout</a></li>
                        </ul>
                    </div>
                ) : (
                    <div className="login">
                        <div className="login-logo">
                            <img src="/images/logo.png"></img>
                            <h3>Login</h3>
                        </div>
                        <div className="login-fields">
                            <Button fluid className="LoginbuttonStyle">Login</Button>
                        </div>

                        <div className="login-bottom">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                )) : isMenuOpen ? (
                    <div className="main-site-nav-login">
                        <ul className="main-site-nav-login-links">
                            {!loggedIn && <li onClick={() => Router.push('/login')}>Login</li>}
                            <li onClick={() => Router.push('/profile')}>Find Services</li>
                            <li onClick={() => Router.push('/profile')}>About</li>
                            <li onClick={() => Router.push('/profile')}>Contact</li>
                            <li onClick={() => Router.push('/profile')}>Tradespeople</li>
                        </ul>
                    </div>
                ) : ''}
            </Drawer>

        </>
    )
}

const mapStateToProps = (state) => ({
    isAddModalOpen: state.OrdersReducer?.isAddModalOpen,
});

function mapDispatchToProps(dispatch) {
    return {
        fetchOrdersList: (data) => dispatch(getOrdersListRequest(data)),
        fetchJobsComplted: (...args) => dispatch(getjobsCompletedRequest(...args)),
        fetchVisitsList: (data) => dispatch(getVisitsRequest(data)),
        Logout: (data) => dispatch(LogoutAction(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)((MainNav));
