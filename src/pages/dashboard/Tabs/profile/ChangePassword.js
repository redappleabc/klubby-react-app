import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { FastField, useFormik } from 'formik';
import { Card } from "reactstrap";  
import * as Yup from 'yup';


import SimpleBar from "simplebar-react";
//Import components
import { setActiveTab } from '../../../../redux/actions';



function ProfileChangePassword(props) {

    const formik = useFormik({
        initialValues: {
            currentPwd: '',
            newPwd: '',
            repeatPwd: ''
        },
        validationSchema: Yup.object({
            currentPwd: Yup.string().required('*Required'),
            newPwd: Yup.string().required('*Required'),
            repeatPwd: Yup.string().required('*Required'),
        }),
        onSubmit: async values => {

        },
    });
    
    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
                <div className='profile-header'>
                    <div className='profile-header-btn'>
                        <button onClick={()=>{props.setActiveTab("profile")}}><i className="ri-arrow-left-s-line"></i></button>
                    </div>
                    <div className='profile-title'>
                        Change Password
                    </div>
                    <div className='profile-header-btn'>
                        <button type='submit'><i className="ri-check-line"></i></button>
                    </div>
                </div>
                <SimpleBar className='profile-main'>
                
                    <div className={formik.errors.currentPwd ? "input-con error" : "input-con"}>
                        <div className="text" >
                            Current Password<span className="nec">*</span>
                        </div>
                        
                        <div className=''>
                            <input
                                type='password'
                                id="currentPwd"
                                name="currentPwd"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.currentPwd}
                                placeholder="password"
                            />
                            
                        </div>
                        <div className='error-text'>{formik.errors.currentPwd}</div>
                    </div>
                    <div className={formik.errors.newPwd ? "input-con error" : "input-con"}>
                        <div className="text" >
                            New Password*<span className="nec">*</span>
                        </div>
                        
                        <div className=''>
                            <input
                                type='password'
                                id="newPwd"
                                name="newPwd"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPwd}
                                placeholder="password"
                            />
                            
                        </div>
                        <div className='error-text'>{formik.errors.newPwd}</div>
                    </div>
                    <div className={formik.errors.repeatPwd ? "input-con error" : "input-con"}>
                        <div className="text" >
                            Repeat New Password*<span className="nec">*</span>
                        </div>
                        
                        <div className=''>
                            <input
                                type='password'
                                id="repeatPwd"
                                name="repeatPwd"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.repeatPwd}
                                placeholder="password"
                            />
                            
                        </div>
                        <div className='error-text'>{formik.errors.repeatPwd}</div>
                    </div>

                    <Link to="/forget-password" className='account-link'>
                        Forgot Password?
                    </Link>

                </SimpleBar>
            </form>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {setActiveTab})(ProfileChangePassword);