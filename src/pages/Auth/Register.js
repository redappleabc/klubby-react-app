import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, useHistory, Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import action
import { registerUser, apiError, registerUserSuccess, loginUser, loginUserSuccess} from '../../redux/actions';

import error_img from '../../assets/images/icons/error.png';
import error_img_white from '../../assets/images/icons/error_white.png';
import apollo_client from '../../apollo';
import auth_logo from '../../assets/images/auth/klubby-logo-auth.png'
import { signOut } from '../../helpers/aws';
import { isAuthenticated } from '../../helpers/aws';


/**
 * Register component
 * @param {*} props 
 */
const Register = (props) => {
    let history = useHistory();
    const [emailVal, setEmailVal] = useState("");
    const [emailValError, setEmailValError] = useState("")
    const [pwdShowState, setpwdShowState] = useState(false);
    const [loginPageShowState, setLoginPageShowState] = useState(false);
   
    let real_emailVal="";

    useEffect(()=>{
        real_emailVal = emailVal;
        console.log(real_emailVal);
    }, [emailVal])

    const emailHandleChange = (val) => {
        setEmailVal(val);
        if (validateEmail(val) === null) setEmailValError("Input valid Email");
        else setEmailValError("");
        if (val === "") {setEmailValError("Required");}
    }

    const togglePwdShowState = (e) => {
        e.preventDefault();
        setpwdShowState(!pwdShowState);
    }

    const validateEmail = (email) => {
        return String(email)
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const togglePage = () => {
        setLoginPageShowState(!loginPageShowState);
    }

    const clearError = () => {
        props.apiError("");
        props.registerUserSuccess("")
    }

    useEffect(clearError, []);
    
    useEffect(async () => {
        if (props.user !==null && props.user !== "" && !loginPageShowState) {
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
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: values => {
            console.log(values);
            if (loginPageShowState) props.loginUser(values.username, values.password, props.history); 
            else props.registerUser({username: values.username, email: emailVal, password: values.password});
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
                                                <InputGroup className={loginPageShowState ? "mb-3 auth-input-con auth-animation-1" : "mb-3 auth-input-con auth-animation-1 active"}>
                                                    <span>
                                                        <i className="ri-mail-line"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="auth_email"
                                                        name="email"
                                                        placeholder="Email"
                                                        onChange={(e) => {emailHandleChange(e.target.value)}}
                                                        value={emailVal}
                                                        // invalid={formik.touched.email && formik.errors.email ? true : false}
                                                    />
                                                    {emailValError ? (
                                                        <div className='auth-input-error'>{emailValError}</div>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                           

                                            <FormGroup className="mb-4">
                                                <InputGroup className={loginPageShowState ? "mb-3 auth-input-con auth-animation-2" : "mb-3 auth-input-con auth-animation-2 active"}>
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
                                            <div className={loginPageShowState ? 'auth-text-con mt-3 mb-3' : 'auth-text-con mt-3 mb-3 hidden'}>
                                                <div className="form-check">
                                                    <Input type="checkbox" className="form-check-input" id="remember-check" />
                                                    <Label className="form-check-label" htmlFor="remember-check">Remember me</Label>
                                                </div>
                                                <div className="float-end">
                                                    <Link to="/forget-password" className="text-muted font-size-13">Forgot password</Link>
                                                </div>
                                            </div>

                                            <div className="d-grid">
                                                <button className="auth-main-btn auth-main-btn-new " type="submit">{loginPageShowState ? "Sign In" : "Register"}</button>
                                            </div>
                                            <div className="text-right auth-bottom-text">
                                                <p>or &nbsp;&nbsp;&nbsp;<Link to="#" className="font-weight-medium text-primary" onClick={()=> {togglePage();}}>{loginPageShowState ? "Register" : "Sign In"}</Link> </p>
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

export default withRouter(connect(mapStateToProps, { registerUser, apiError, registerUserSuccess, loginUser, loginUserSuccess })(Register));