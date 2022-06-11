import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, useHistory, Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import action
import { registerUser, apiError, registerUserSuccess, loginUser, loginUserSuccess, setLoginPage} from '../../redux/actions';

import error_img from '../../assets/images/icons/error.png';
import error_img_white from '../../assets/images/icons/error_white.png';
import apollo_client from '../../apollo';
// import auth_logo from '../../assets/images/auth/klubby-logo-auth.png'
import auth_logo from '../../assets/images/klubby_logo_big.svg'
import { signOut } from '../../helpers/aws';
import { isAuthenticated } from '../../helpers/aws';
import Preloader from '../../components/preloader';

/**
 * Register component
 * @param {*} props 
 */
const Register = (props) => {
    let history = useHistory();
    const [emailVal, setEmailVal] = useState("");
    const [emailValError, setEmailValError] = useState("")
    const [pwdShowState, setpwdShowState] = useState(false);

    
    

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
        props.setLoginPage(!props.loginPageState);
    }

    const clearError = () => {
        props.apiError("");
        props.registerUserSuccess("");
    }

    useEffect(clearError, []);
    
    useEffect(async () => {
        if (props.user !==null && props.user !== "" && !props.loginPageState) {
            
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
        
            if (props.loginPageState) props.loginUser(values.username, values.password, props.history); 
            else {
                emailHandleChange(emailVal);
                if (validateEmail != null) props.registerUser({username: values.username, email: emailVal, password: values.password});
            }
            },
        handleChange: values=> {
            console.log("adasd")
        }
    });


    if(process.env.REACT_APP_DEFAULTAUTH === "aws"){
        isAuthenticated().then((user)=>{
            if(user){
                //return <Redirect to="/" />;
                props.loginUserSuccess(user)
                history.push("/dashboard")
            }
        }).catch((error=>{
            
        }))
    }
    else if (localStorage.getItem("authUser")) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <React.Fragment>
        {   props.loading ? <Preloader/>:
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
                                                <InputGroup className={props.loginPageState ? "mb-3 auth-input-con auth-animation-1" : "mb-3 auth-input-con auth-animation-1 active"}>
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
                                                <InputGroup className={props.loginPageState ? "mb-3 auth-input-con auth-animation-2" : "mb-3 auth-input-con auth-animation-2 active"}>
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
                                            <div className={props.loginPageState ? 'auth-text-con remember-me' : 'auth-text-con remember-me hidden'}>
                                                <div className="form-check">
                                                    <Input type="checkbox" className="form-check-input" id="remember-check" />
                                                    <Label className="form-check-label font-size-15" htmlFor="remember-check">Remember me</Label>
                                                </div>
                                                <div className="float-end">
                                                    <Link to="/forget-password" className="text-muted font-size-15">Forgot password</Link>
                                                </div>
                                            </div>

                                            <div className="d-grid">
                                                <button className="auth-main-btn auth-main-btn-new " type="submit" onClick={()=>{emailHandleChange(emailVal);}}>{props.loginPageState ? "Sign In" : "Register"}</button>
                                            </div>
                                            <div className="text-right auth-bottom-text">
                                                <p>or &nbsp;&nbsp;&nbsp;<Link to="#" className="font-weight-medium text-primary" onClick={()=> {togglePage();}}>{props.loginPageState ? "Register" : "Sign In"}</Link> </p>
                                            </div>
                                        </Form>
                                    </div>

                            
                        </Col>
                    </Row>
                </Container>
            </div>
         }
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error,  } = state.Auth;
    const {loginPageState} = state.Layout;
    return { user, loading, error, loginPageState };
};

export default withRouter(connect(mapStateToProps, { registerUser, apiError, registerUserSuccess, loginUser, loginUserSuccess, setLoginPage })(Register));