import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import action
import { registerUser, apiError, registerUserSuccess} from '../../redux/actions';

import error_img from '../../assets/images/icons/error.png';
import error_img_white from '../../assets/images/icons/error_white.png';
import apollo_client from '../../apollo';
import auth_logo from '../../assets/images/auth/klubby-logo-auth.png'
import { signOut } from '../../helpers/aws';



/**
 * Register component
 * @param {*} props 
 */
const Register = (props) => {
    
    const [pwdShowState, setpwdShowState] = useState(false)
   
    const togglePwdShowState = (e) => {
        e.preventDefault();
        setpwdShowState(!pwdShowState);
    }

    let history = useHistory();
    // const [successMsg, setSuccessMsg] = useState(props.user)
    // useEffect()
    const clearError = () => {
        props.apiError("");
        props.registerUserSuccess("")
    }

    useEffect(clearError, []);
    
    useEffect(async () => {
        if (props.user !==null && props.user !== "") {
            console.log(props.user)
            await signOut()
            apollo_client.clearStore()
            history.push('/verify-register')
        }
    }, [props.user])

    // validation
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Enter proper email').required('Required'),
            password: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            //console.log(values);
            props.registerUser(values);
        },
        handleChange: values=> {
            console.log("adasd")
        }
    });


    return (
        <React.Fragment>

            <div className="account-pages pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <div className="text-center">
                                {/* <h1>Sign up</h1> */}
                                <img src={auth_logo} className='auth-logo-img'/>
                            </div>

                            {
                                        props.error && <Alert color="danger"> <img src={error_img} className="black-img" alt="klubby"/><img className='white-img' src={error_img_white} alt="klubby"/><br/>{props.error}</Alert>
                                    }
                                    {/* {
                                        props.user && <Alert variant="success">Thank You for registering with us!<br/> Please <Link to="/login" className="font-weight-medium text-primary">&nbsp;Sign&nbsp;in </Link></Alert>
                                    } */}
                                    <div className="mt-3 padding-lr-10">

                                        <Form onSubmit={formik.handleSubmit}>

                                            <div className="mb-4">
        
                                                <InputGroup className="mb-3 auth-input-con">
                                                    <span className="">
                                                       @
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        placeholder="Username"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.username}
                                                        // invalid={formik.touched.username && formik.errors.username ? true : false}
                                                    />

                                                    {formik.touched.username && formik.errors.username ? (
                                                        <div className='auth-input-error'>{formik.errors.username}</div>
                                                    ) : null}
                                                </InputGroup>
                                            </div>
                                            <div className="mb-4">
                                                <InputGroup className="mb-3 auth-input-con">
                                                    <span>
                                                        <i className="ri-mail-line"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                        // invalid={formik.touched.email && formik.errors.email ? true : false}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div className='auth-input-error'>{formik.errors.email}</div>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                           

                                            <FormGroup className="mb-4">
                                                <InputGroup className="mb-3 auth-input-con">
                                                    <span className="">
                                                        <i className="ri-lock-2-line"></i>
                                                    </span>
                                                    <input
                                                        type= {pwdShowState ? "text" : "password"}

                                                        id="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        // invalid={formik.touched.password && formik.errors.password ? true : false}
                                                    />
                                                    <Link to="#" className='password-show-btn' onClick={(e)=>{togglePwdShowState(e);}}><i className={ pwdShowState ? "ri-eye-line" : "ri-eye-off-line"}></i></Link>
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <div className='auth-input-error'>{formik.errors.password}</div>
                                                    ) : null}

                                                </InputGroup>
                                            </FormGroup>

                                            <div className="d-grid">
                                                <button className="auth-main-btn auth-main-btn-new " type="submit">Register</button>
                                            </div>
                                            <div className="text-right auth-bottom-text">
                                                <p>or<Link to="/login" className="font-weight-medium text-primary">&nbsp;Sign&nbsp;in </Link> </p>
                                            </div>
                                        </Form>
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

export default withRouter(connect(mapStateToProps, { registerUser, apiError, registerUserSuccess })(Register));