import React from 'react'
import Router, { useRouter } from 'next/router'
import Nav from '../Nav';
import MainNav from '../MainNav';

function Layout({ children }) {
    const history = useRouter();

    return (
        <div>
            <MainNav />
            {children}
            <footer className="footer-wrapper">
                <div className="footer container">
                    <div className="footer-first">
                        <div className="footer-top">
                            <div className="footer-top-logo">
                                <img src="/images/logo-dark.png" width="100%"></img>
                            </div>
                            <img className="footer-top-google" src="/images/img-google.png" alt="" />
                            <img src="/images/img-apple.png" alt="" />
                        </div>
                        <div className="footer-top-img">
                            <img src="/images/trust-badge.png" width="100%" alt="" />
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-left">
                            <div className="footer-left-top">
                                <p className="left-top-title">Data Safe</p>
                                <p className="left-top-info">
                                    Your details are kept safe and never shared.
                                </p>

                            </div>
                            <div className="footer-left-bottom">
                                <p className="left-bottom-title">Gas Safe</p>
                                <p className="left-bottom-info">
                                    Our engineers are vetted and fully qualifed.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-line">
                        <hr style={{ width: '90%', textAlign: 'center', margin: 'auto' }} />
                    </div>
                    <div className="footer-right">
                        <div className="footer-right-list">
                            <ul>
                                <li onClick={() => Router.push("/login")}>Login</li>
                                <li onClick={() => Router.push("/services/home-cleaning")}>Find Services</li>
                                <li>About</li>
                                <li>Contact</li>
                                <li>Tradespeople</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Layout;