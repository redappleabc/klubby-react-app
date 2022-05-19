import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, FormGroup, Alert, Form, Input, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import action
import { registerUser, apiError, registerUserSuccess } from '../../redux/actions';

import error_img from '../../assets/images/icons/error.png';
import error_img_white from '../../assets/images/icons/error_white.png';



/**
 * Register component
 * @param {*} props 
 */
const Register = (props) => {
    
    let history = useHistory();
    // const [successMsg, setSuccessMsg] = useState(props.user)
    // useEffect()
    const clearError = () => {
        props.apiError("");
        props.registerUserSuccess("")
    }

    useEffect(clearError, []);
    
    useEffect(() => {
        if (props.user !==null && props.user !== "") {
            console.log(props.user)
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
                            <div className="text-center mb-4">
                                <h1>Sign up</h1>

                            </div>

                            {
                                        props.error && <Alert color="danger"> <img src={error_img} className="black-img" alt="klubby"/><img className='white-img' src={error_img_white} alt="klubby"/><br/>{props.error}</Alert>
                                    }
                                    {/* {
                                        props.user && <Alert variant="success">Thank You for registering with us!<br/> Please <Link to="/login" className="font-weight-medium text-primary">&nbsp;Sign&nbsp;in </Link></Alert>
                                    } */}
                                    <div className="p-3">

                                        <Form onSubmit={formik.handleSubmit}>

                                            <div className="mb-3">
                                                <Label className="form-label">Email</Label>
                                                <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                    <span className="input-group-text text-muted">
                                                        <i className="ri-mail-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Enter Email"
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

                                            <div className="mb-3">
                                                <Label className="form-label">Username</Label>
                                                <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                    <span className="input-group-text border-light text-muted">
                                                        <i className="ri-user-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Enter Username"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.username}
                                                        invalid={formik.touched.username && formik.errors.username ? true : false}
                                                    />
                                                    {formik.touched.username && formik.errors.username ? (
                                                        <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                            <FormGroup className="mb-4">
                                                <Label className="form-label">Password</Label>
                                                <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                    <span className="input-group-text border-light text-muted">
                                                        <i className="ri-lock-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control form-control-lg bg-soft-light border-light"
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

                                            <div className="d-grid">
                                                <button className="auth-main-btn" type="submit">Sign up</button>
                                            </div>

                                        </Form>
                                    </div>

                            <div className="mt-3 text-center">
                                <p>Already have an account <Link to="/login" className="font-weight-medium text-primary">&nbsp;Sign&nbsp;in </Link> </p>
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