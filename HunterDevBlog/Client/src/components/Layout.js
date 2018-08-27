import * as React from 'react'
import { object, func, bool } from 'prop-types'
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
import { GetCurrentUser, GetLoginDialogState, GetRegisterDialogState } from '../store/main.reducer'
import { Register, Login, Logout, ShowLoginDialog, ShowRegisterDialog } from '../store/modules/users/users.actions';

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
    user: GetCurrentUser(state),
    loginDialog: GetLoginDialogState(state),
    registerDialog: GetRegisterDialogState(state)
})

const mapDispatchToProps = {
    Login,
    Register,
    Logout,
    ShowLoginDialog,
    ShowRegisterDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class Layout extends React.PureComponent {
        static displayName = 'Layout'

        static propTypes = {
            user: object.isRequired,
            Login: func.isRequired,
            Register: func.isRequired,
            Logout: func.isRequired,
            ShowLoginDialog: func.isRequired,
            ShowRegisterDialog: func.isRequired,
            loginDialog: bool.isRequired,
            registerDialog: bool.isRequired
        }

        componentDidMount() {
            this.props.Login()
        }

        showLoginDialog = show => () => this.props.ShowLoginDialog(show)

        showRegisterDialog = show => () => this.props.ShowRegisterDialog(show)

        handleLoginClick = e => {
            if (e.ctrlKey && e.altKey && e.shiftKey)
                this.showLoginDialog(true)()
        }

        render() {
            const {
                Login,
                Register,
                Logout,
                loginDialog,
                registerDialog,
                user,
                children
            } = this.props
            return (
                <React.Fragment>
                    <Navbar
                        collapseOnSelect
                        style={navbarStyle}
                        onClick={this.handleLoginClick}
                    >
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
                                {/*<LinkContainer to="/About">
                                    <NavItem eventKey="about">
                                        {'The Author'}
                                    </NavItem>
                                </LinkContainer>*/}
                                <LinkContainer to="/Services">
                                    <NavItem eventKey="services">
                                        {'Services'}
                                    </NavItem>
                                </LinkContainer>
                                {user.Username &&
                                    <React.Fragment>
                                        {user.Administrator &&
                                            <NavDropdown
                                                id="adminMenu"
                                                eventKey="Admin"
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
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    {children(user)}

                    <LoginDialog
                        show={loginDialog}
                        onHide={this.showLoginDialog(false)}
                        showRegisterDialog={this.showRegisterDialog(true)}
                        login={Login}
                    />
                    <RegisterDialog
                        show={registerDialog}
                        onHide={this.showRegisterDialog(false)}
                        showLoginDialog={this.showLoginDialog(true)}
                        register={Register}
                    />
                </React.Fragment>
            )
        }
    }
)
