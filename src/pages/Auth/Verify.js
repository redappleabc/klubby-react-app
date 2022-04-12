import React, { useEffect, useCallback, useState } from 'react';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import InputCode from '../../components/InputCode';
import * as Yup from 'yup';

//redux store
import { loginUser, apiError } from '../../redux/actions';
import error_img from '../../assets/images/icons/error.png';
import error_img_white from '../../assets/images/icons/error_white.png';

//Import Images


/**
 * Login component
 * @param {*} props 
 */
const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const clearError= useCallback(() => { props.apiError("");}, [])
    useEffect(()=>{
        clearError();
    }, [clearError])

    // validation
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
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

                                <h1>Please input the verify code</h1>

                            </div>
                                    <div className="p-3">
                                        <Form onSubmit={formik.handleSubmit}>
                                            <div className="mb-3">
                                               
                                                <div className="mb-3 rounded-3 verify-input-group">
                                                    <InputCode
                                                        length={6}
                                                        loading={loading}
                                                        onComplete={code => {
                                                        setLoading(true);
                                                        setTimeout(() => setLoading(false), 10000);
                                                        }}
                                                    />
 
                                                </div>
                                            </div>
                           
                                          <div className="d-grid">
                                                <button className="auth-main-btn" type="submit">Confirm</button>
                                            </div>

                                        </Form>
                                    </div>
                                    <div className="mt-3 text-center">
                                     <p>No recieved? &nbsp;<Link to="#" className="font-weight-medium text-primary">&nbsp;Resend&nbsp;</Link></p>
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