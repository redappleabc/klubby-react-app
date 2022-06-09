import React, { useEffect, useCallback, useState } from 'react';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import InputCode from '../../components/InputCode';
import * as Yup from 'yup';

//redux store
import { forgetPasswordSuccess, apiError } from '../../redux/actions';
import error_img from '../../assets/images/icons/error.png';
import error_img_white from '../../assets/images/icons/error_white.png';

//Import Images


/**
 * Login component
 * @param {*} props 
 */
const Verify = (props) => {
    const [loading, setLoading] = useState(false);
    const clearError= useCallback(() => { props.apiError("");}, [])

    const [pwdShowState, setpwdShowState] = useState(false)
   
    const togglePwdShowState = (e) => {
        e.preventDefault();
        setpwdShowState(!pwdShowState);
    }
    useEffect(()=>{
        clearError();
    }, [clearError])

    // validation
    const formik = useFormik({
        initialValues: {
            code1: "",
            code2: "",
            code3: "",
            code4: "",
            code5: "",
            code6: "",
            password:""
          },
        onSubmit: values => {
            console.log(values);
            const code = values.code1 + values.code2 + values.code3 + values.code4 + values.code5 + values.code6;
            console.log(props.username)
            props.forgetPasswordSuccess(props.username, code, values.password, props.history)

        },
    });

    return (
        <React.Fragment>
            <div className="account-pages pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            <div className="text-center mb-4 auth-header-text">

                                <h1>Please input verify code</h1>
                            </div>
                                    {
                                        props.error && <Alert color="danger"> <img src={error_img} className="black-img" alt="klubby"/><img className='white-img' src={error_img_white} alt="klubby"/><br/>{props.error}</Alert>
                                    }
                                    <div className="p-3">
                                        <Form onSubmit={formik.handleSubmit}>
                                            <div className="mb-3">
                                               
                                                <div className="mb-3 rounded-3 verify-input-group">
                                                    <InputCode
                                                        length={6}
                                                        loading={loading}
                                                        formik={formik}
                                                        onComplete={code => {
                                                        setLoading(true);
                                                        setTimeout(() => setLoading(false), 100);
                                                        }}
                                                    />
 
                                                </div>
                                            </div>
                                            <FormGroup className="mb-4">
                                                {/* <Label className="form-label">Password</Label> */}
                                                <InputGroup className="mb-3 auth-input-con">
                                                    <span className="">
                                                        <i className="ri-lock-2-line"></i>
                                                    </span>
                                                    <input
                                                        type= {pwdShowState ? "text" : "password"}
                                                        id="password"
                                                        name="password"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Password"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        // invalid={formik.touched.password && formik.errors.password ? true : false}
                                                    />
                                                    <Link className='password-show-btn' onClick={(e)=>{togglePwdShowState(e);}}><i className={ pwdShowState ? "ri-eye-line" : "ri-eye-off-line"}></i></Link>
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                                    ) : null}

                                                </InputGroup>
                                            </FormGroup>
                           
                                          <div className="d-grid">
                                                <button className="auth-main-btn auth-main-btn-new" type="submit">Confirm</button>
                                            </div>

                                        </Form>
                                    </div>
                                    <div className="mt-3 text-center">
                                     {/* <p>No recieved? &nbsp;<Link to="#" className="font-weight-medium text-primary">&nbsp;Resend&nbsp;</Link></p> */}
                                </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error, username } = state.Auth;
    return { user, loading, error, username };
};

export default withRouter(connect(mapStateToProps, { forgetPasswordSuccess, apiError })(Verify));