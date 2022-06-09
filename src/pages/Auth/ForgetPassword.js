import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

//Import formik validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import actions and helpers
import { forgetPassword, apiError } from '../../redux/actions';



/**
 * Forget Password component
 * @param {*} props 
 */
const ForgetPassword = (props) => {
 

    const {apiError} = props;

    useEffect( () => {
        
        apiError("");
    } , []);

    
    // validation
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            props.forgetPassword(values.username, props.history);
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
                        <Col md={8} lg={6} xl={5}>
                            <div className="text-center mb-4">
                                <h1>Reset Password</h1>
                            </div>
                                    <div className="p-3">
                                        {
                                            props.error && <Alert variant="danger">{props.error}</Alert>
                                        }
                                        {
                                            props.passwordResetStatus ? <Alert className="text-center mb-4">{props.passwordResetStatus}</Alert>
                                                : <Alert className="text-center mb-4">Enter your Username and instructions will be sent to you</Alert>
                                        }
                                        <Form onSubmit={formik.handleSubmit}>

                                            <FormGroup className="mb-4">
                                                {/* <Label className="form-label">Username</Label> */}
                                                <InputGroup className="mb-3 auth-input-con">
                                                    <span className="">
                                                        <i className="ri-mail-line"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        className=""
                                                        placeholder="Username"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.username}
                                                        // invalid={formik.touched.username && formik.errors.username ? true : false}
                                                    />
                                                    {formik.touched.username && formik.errors.username ? (
                                                        <div  className='auth-input-error'>{formik.errors.username}</div>
                                                    ) : null}
                                                </InputGroup>
                                            </FormGroup>

                                            <div className="d-grid">
                                                <button className="auth-main-btn auth-main-btn-new" type="submit">Reset</button>
                                            </div>

                                        </Form>
                                    </div>

                            <div className="mt-3 text-center">
                                <p>Remember It ? <Link to="login" className="font-weight-medium text-primary">Sign in</Link> </p>
                                
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error, passwordResetStatus } = state.Auth;
    return { user, loading, error, passwordResetStatus };
};

export default connect(mapStateToProps, { forgetPassword, apiError })(ForgetPassword);