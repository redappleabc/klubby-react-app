import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { FastField, useFormik } from 'formik';
import { Card } from "reactstrap";  
import * as Yup from 'yup';


import SimpleBar from "simplebar-react";
//Import components
import { setActiveTab } from '../../../../redux/actions';



function ProfileAccountChangeEmail(props) {

    const formik = useFormik({
        initialValues: {
            changeEmail: '',
        },
        validationSchema: Yup.object({
            changeEmail: Yup.string().required('*Required'),
        }),
        onSubmit: async values => {

        },
    });
    
    return (
        <React.Fragment>
            <div className='profile-header'>
                <div className='profile-header-btn'>
                    <button onClick={()=>{props.setActiveTab("profile")}}><i className="ri-arrow-left-s-line"></i></button>
                </div>
                <div className='profile-title'>
                    Edit Profile
                </div>
                <div className='profile-header-btn'>
                    <button><i className="ri-check-line"></i></button>
                </div>
            </div>
            <SimpleBar className='profile-main'>
              
                <div className={formik.errors.editName ? "input-con error" : "input-con"}>
                    <div className="text" >
                        New Email
                    </div>
                    
                    <div className='img-input'>
                        <span>
                            <i className="ri-mail-line"></i>
                        </span>
                        <input
                            type="text"
                            id="changeEmail"
                            name="changeEmail"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.changeEmail}
                            placeholder="example@email.com"
                        />
                    </div>
                    <div className='error-text'>{formik.errors.changeEmail}</div>
                </div>
            </SimpleBar>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {setActiveTab})(ProfileAccountChangeEmail);