import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';

class MenuComponent extends Component {

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <div className="navbar navbar-expand-md navbar-dark bg-light">
                    <div className="navbar-nav navbar-collapse justify-content-center">
                        {!isUserLoggedIn &&
                             <div>
                            <div className="text-center">
                            <h1>Hello, welcome back</h1>
                            <h5>Sign into your account here</h5>
                            </div>
                    </div>
                }
                    </div>
                        {isUserLoggedIn && <h5><Link className="nav-link text-dark" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></h5>}
                </div>
            </header>
        )
    }
}

export default withRouter(MenuComponent)