import React, { useEffect, useCallback, useState } from 'react';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import InputCode from '../../components/InputCode';
import * as Yup from 'yup';

//redux store
import { verifyCodeSuccess, apiError } from '../../redux/actions';
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
          },
        onSubmit: values => {
            // console.log(values);
            const code = values.code1 + values.code2 + values.code3 + values.code4 + values.code5 + values.code6;
            
            props.verifyCodeSuccess(props.user.user.username, code, props.history)
            // alert()
            // console.log(values);
            // props.verifyCodeSuccess();
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
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { verifyCodeSuccess, apiError })(Verify));