import React from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Form, Input, Button, FormFeedback, InputGroup, Label } from 'reactstrap';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import avatar1 from "../../assets/images/users/avatar-1.jpg";

function LockScreen(props) {

    // validation
    const formik = useFormik({
        initialValues: {
            password: 'test'
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Please Enter Your Password')
        }),
        onSubmit: values => {
            console.log(values)
        },
    });

    return (
        <React.Fragment>
            <div className="account-pages pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <div className="text-center mb-4">

                            <h4>Lock screen</h4>
                            <p className="text-muted mb-4">Enter your password to unlock the screen!</p>
                            
                        </div>

                        <Card>
                            <CardBody className="p-4">
                                <div className="p-3">
                                    <div className="user-thumb text-center mb-4">
                                        <img src={avatar1} className="rounded-circle img-thumbnail avatar-lg" alt="thumbnail" />
                                        <h5 className="font-size-15 mt-3">Patricia Smith</h5>
                                    </div>
                                    <Form onSubmit={formik.handleSubmit}>

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
                                                    className="form-control form-control-lg bg-soft-light"
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
                                            <Button color="primary" block className=" waves-effect waves-light" type="submit">Unlock</Button>
                                        </div>

                                    </Form>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        </React.Fragment>
    );
}

export default LockScreen;