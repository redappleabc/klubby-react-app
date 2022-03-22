import React, { useEffect } from 'react';
import { Container, Row, Col, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//redux store
import { loginUser, apiError } from '../../redux/actions';

//Import Images


/**
 * Login component
 * @param {*} props 
 */
const Login = (props) => {


    const clearError = () => {
        props.apiError("");
    }

    useEffect(clearError);

    // validation
    const formik = useFormik({
        initialValues: {
            email: 'admin@klubby.com',
            password: '123456'
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please Enter Your Username'),
            password: Yup.string().required('Please Enter Your Password')
        }),
        onSubmit: values => {
            props.loginUser(values.email, values.password, props.history);
        },
    });

    if (localStorage.getItem("authUser")) {
        return <Redirect to="/" />;
    }

    return (
        <React.Fragment>

            <div className="account-pages pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            <div className="text-center mb-4">

                                <h1>Sign in</h1>

                            </div>
                                {
                                    props.error && <Alert color="danger">{props.error}</Alert>
                                }
                                    <div className="p-3">
                                        <Form onSubmit={formik.handleSubmit}>
                                            <div className="mb-3">
                                                <Label className="form-label">Username</Label>
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <span className="input-group-text text-muted" id="basic-addon3">
                                                        <i className="ri-user-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control form-control-lg border-light bg-soft-light"
                                                        placeholder="Enter email"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                        invalid={formik.touched.email && formik.errors.email ? true : false}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                            <FormGroup className="mb-4">
                                                <div className="float-end">
                                                    <Link to="forget-password" className="text-muted font-size-13">Forgot password</Link>
                                                </div>
                                                <Label className="form-label">Password</Label>
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <span className="input-group-text text-muted">
                                                        <i className="ri-lock-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control form-control-lg border-light bg-soft-light"
                                                        placeholder="Enter Password"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        invalid={formik.touched.password && formik.errors.password ? true : false}
                                                    />
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                                    ) : null}

                                                </InputGroup>
                                            </FormGroup>

                                            <div className="form-check mb-4">
                                                <Input type="checkbox" className="form-check-input" id="remember-check" />
                                                <Label className="form-check-label" htmlFor="remember-check">Remember me</Label>
                                            </div>

                                            <div className="d-grid">
                                                <Button className="auth-main-btn" type="submit">Sign in</Button>
                                            </div>

                                        </Form>
                                    </div>
                                    <div className="mt-3 text-center">
                                     <p>No account yet? &nbsp;<Link to="/register" className="font-weight-medium text-primary">&nbsp;Sign up&nbsp;</Link>here </p>
                                </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { loginUser, apiError })(Login));