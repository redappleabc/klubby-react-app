import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import { Link } from 'react-router-dom';

//Import Images
import logo from "../../assets/images/logo.png";

const AuthIndex = () => {


    // validation

    return (
        <React.Fragment>

            <div className="account-pages pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            <div className="text-center mb-4 auth-first">
                                <Link to="/" className="auth-logo mb-2 d-block">
                                    <img src={logo} alt="" height="176" className="logo" />
                                </Link>

                                <h1>Klubby</h1>
                                <p className="text-muted mb-4">Find Your Klub</p>

                                <Link to="login" className="d-grid mb-4">
                                <Button className="auth-main-btn"><i className="fas fa-user"></i>Sign in</Button>
                                </Link>

                                <Link to="register" className="d-grid">
                                    <Button className="auth-main-btn"><i className="fas fa-user"></i>Sign up</Button>
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