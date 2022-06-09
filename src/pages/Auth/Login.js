import React, { useEffect,useCallback, useState } from 'react';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//redux store
import { loginUser, apiError, loginUserSuccess } from '../../redux/actions';
import error_img from '../../assets/images/icons/error.png';
import error_img_white from '../../assets/images/icons/error_white.png';
import { isAuthenticated } from '../../helpers/aws';
import Preloader from '../../components/preloader';
import auth_logo from '../../assets/images/auth/klubby-logo-auth.png'


//Import Images


/**
 * Login component
 * @param {*} props 
 */
const Login = (props) => {
    let history = useHistory();
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
                        <Col md={8} lg={6} xl={5} >
                            <div className="text-center">
                                <img src={auth_logo} className='auth-logo-img'/>
                                {/* <h1>Sign in</h1> */}
                            </div>
                                    {
                                        props.error && <Alert color="danger"> <img src={error_img} className="black-img" alt="klubby"/><img className='white-img' src={error_img_white} alt="klubby"/><br/>{props.error}</Alert>
                                    }
                                    <div className="mt-4 padding-lr-10">
                                        <Form onSubmit={formik.handleSubmit}>
                                            <div className="mb-3">
                                                {/* <Label className="form-label">Username</Label> */}
                                                <InputGroup className="mb-3 auth-input-con">
                                                    <span id="basic-addon3">
                                                        @
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className=" "
                                                        placeholder="Username"
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
                                                        className=" "
                                                        placeholder="Password"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        // invalid={formik.touched.password && formik.errors.password ? true : false}
                                                    />
                                                    <button className='password-show-btn' onClick={(e)=>{togglePwdShowState(e);}}><i className={ pwdShowState ? "ri-eye-line" : "ri-eye-off-line"}></i></button>
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <div className='auth-input-error'>{formik.errors.password}</div>
                                                    ) : null}

                                                </InputGroup>
                                            </FormGroup>

                                            <div className='auth-text-con mt-3 mb-3'>
                                                <div className="form-check">
                                                    <Input type="checkbox" className="form-check-input" id="remember-check" />
                                                    <Label className="form-check-label" htmlFor="remember-check">Remember me</Label>
                                                </div>
                                                <div className="float-end">
                                                    <Link to="forget-password" className="text-muted font-size-13">Forgot password</Link>
                                                </div>
                                            </div>
                                            <div className="d-grid">
                                                <button className="auth-main-btn auth-main-btn-new" type="submit">Sign in</button>
                                            </div>

                                        </Form>
                                    </div>
                                    <div className="auth-bottom-text">
                                     <p>or &nbsp;<Link to="/register" className="font-weight-medium text-primary">&nbsp;Sign up&nbsp;</Link>here </p>
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
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { loginUser, apiError, loginUserSuccess })(Login));