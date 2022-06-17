import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Link } from 'react-router-dom';

//Import Images
import logo from "../../assets/images/logo.png";
import auth_logo from '../../assets/images/auth/klubby-logo-auth.png'


const AuthIndex = () => {


    // validation

    return (
        <React.Fragment>

            <div className="account-pages pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            <div className="text-center mb-4 auth-first">
                                {/* <Link to="/" className="auth-logo mb-2 d-block"> */}
                                <img src={auth_logo} className='auth-logo-img'/>
                                {/* </Link> */}

                                {/* <h1>Klubby</h1> */}
                                {/* <p className="text-muted mb-4">Find Your Klub</p> */}

                                <Link to="login" className="d-grid mt-4 mb-4">
                                <button className="auth-main-btn auth-main-btn-new"><i className="fas fa-user"></i>Sign in</button>
                                </Link>

                                <Link to="register" className="d-grid">
                                    <button className="auth-main-btn auth-main-btn-new"><i className="fas fa-user"></i>Sign up</button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default AuthIndex;