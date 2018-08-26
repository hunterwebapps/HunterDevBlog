import * as React from 'react'
import { object, func } from 'prop-types'
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Image
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import header_bg from '../images/header_bg.png'
import logo from '../images/logo.png'
import './Layout.css'
import LoginDialog from './shared/LoginDialog'
import RegisterDialog from './shared/RegisterDialog'
import { GetCurrentUser } from '../store/main.reducer'
import { Register, Login, Logout } from '../store/modules/users/users.actions';

const navbarStyle = {
    backgroundImage: `url('${header_bg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    border: 'none',
    borderRadius: '0',
    fontSize: '16px',
    fontWeight: 'bold'
}

const mapStateToProps = state => ({
    user: GetCurrentUser(state)
})

const mapDispatchToProps = {
    Login,
    Register,
    Logout
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class Layout extends React.PureComponent {
        state = {
            showLogin: null,
            showAdmin: false
        }

        static displayName = 'Layout'

        static propTypes = {
            user: object.isRequired,
            Login: func.isRequired,
            Register: func.isRequired,
            Logout: func.isRequired
        }

        componentDidMount() {
            this.props.Login()
        }

        loginState = {
            LOGIN: true,
            REGISTER: false,
            NONE: null
        }

        showLogin = showLogin => () => this.setState({ showLogin })

        showAdmin = showAdmin => () => this.setState({ showAdmin })

        render() {
            const {
                Login,
                Register,
                Logout,
                user,
                children
            } = this.props
            return (
                <React.Fragment>
                    <Navbar collapseOnSelect style={navbarStyle}>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">
                                    <Image
                                        src={logo}
                                        alt="Hunter Web Apps"
                                        style={{ marginTop: '30px' }}
                                    />
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <LinkContainer to="/About">
                                    <NavItem eventKey="about">
                                        {'The Author'}
                                    </NavItem>
                                </LinkContainer>
                                {user.Username ?
                                    <React.Fragment>
                                        {user.Administrator &&
                                            <NavDropdown
                                                id="adminMenu"
                                                eventKey="Admin"
                                                onClick={this.showAdmin(true)}
                                                title="Admin"
                                            >
                                                <LinkContainer to="/Admin/Posts">
                                                    <MenuItem eventKey="postsAdmin">
                                                        {'Blog Posts'}
                                                    </MenuItem>
                                                </LinkContainer>
                                                <MenuItem eventKey="subscriptions">
                                                    {'Subscriptions'}
                                                </MenuItem>
                                            </NavDropdown>
                                        }
                                        <LinkContainer to="/Profile">
                                            <NavItem eventKey="Profile">
                                                {user.FirstName || user.Username}
                                            </NavItem>
                                        </LinkContainer>
                                        <NavItem eventKey="Logout" onClick={Logout}>
                                            {'Logout'}
                                        </NavItem>
                                    </React.Fragment>
                                    :
                                    <NavItem
                                        eventKey="Login"
                                        onClick={this.showLogin(this.loginState.LOGIN)}
                                    >
                                        {'Login/Register'}
                                    </NavItem>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    {children}

                    <LoginDialog
                        show={this.state.showLogin === this.loginState.LOGIN}
                        onHide={this.showLogin(this.loginState.NONE)}
                        showRegisterDialog={this.showLogin(this.loginState.REGISTER)}
                        login={Login}
                    />
                    <RegisterDialog
                        show={this.state.showLogin === this.loginState.REGISTER}
                        onHide={this.showLogin(this.loginState.NONE)}
                        showLoginDialog={this.showLogin(this.loginState.LOGIN)}
                        register={Register}
                    />
                </React.Fragment>
            )
        }
    }
)
