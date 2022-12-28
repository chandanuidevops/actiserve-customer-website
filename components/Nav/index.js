import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import Router, { useRouter } from 'next/router'

function Nav({ loggedIn }) {
    const history = useRouter();

    return (
        <div class="wrapper container">
            <nav>
                <input type="checkbox" id="show-menu" />
                <input type="checkbox" id="login-menu" />
                <div class="content">
                    <div class="logo" onClick={() => Router.push("/")}>
                        <img src="/images/logo.png" width="100%" alt="" />
                    </div>
                    <div>
                        {loggedIn ?
                            <>
                                <ul class="links">
                                    <div className="profile">
                                        <img src="/images/avatar.PNG" alt="Avatar" class="avatar" />
                                        <h6> John Smith</h6>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Divider style={{ width: '80%' }} />
                                    </div>
                                    <li><a href="#">My Account</a></li>
                                    <li>
                                        <a href="#" class="desktop-link">My Bookings</a>
                                        <input type="checkbox" id="show-features" />
                                        <label for="show-features" >
                                            My Bookings
                                        </label>
                                        <ul>
                                            <li >
                                                <a href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>Upcoming Bookings</span>
                                                    <span className="circle">1</span>
                                                </a>
                                            </li>
                                            <li >
                                                <a href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>Completed Bookings</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Addresses</a></li>
                                    <li><a href="#">Documents</a></li>
                                    <li><a href="#">Invoices</a></li>
                                </ul>
                            </> :
                            <>
                                <ul class="links">
                                    <li onClick={() => Router.push("/login")}><a href="#">Login</a></li>
                                    <li onClick={() => Router.push("/services/home-cleaning")}><a href="#">Find Services</a></li>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">Tradespeople</a></li>
                                </ul>
                            </>
                        }
                    </div>
                    <div class="login">
                        <div class="login-logo">
                            <img src="/images/logo.png"></img>
                            <h3>Login</h3>
                        </div>
                        <div class="login-fields">
                            <Button fluid className="LoginbuttonStyle">Login</Button>
                        </div>

                        <div className="login-bottom">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>


                </div>
                <input type="checkbox" id="login-menu" />
                <label for="login-menu" class="user-icon">
                    <img src="/images/user.png"></img>
                </label>
                <label class="location-icon mr">
                    <img src="/images/location.png"></img>
                </label>
                <input type="checkbox" id="show-menu" />
                <label for="show-menu" class="menu-icon">
                    <img src="/images/menu.png"/>
                </label>
            </nav>
        </div>
    )
}

export default Nav
