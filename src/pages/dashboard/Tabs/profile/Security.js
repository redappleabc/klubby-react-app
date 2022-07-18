import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { FastField, useFormik } from 'formik';
import { Card } from "reactstrap";  
import * as Yup from 'yup';


import SimpleBar from "simplebar-react";
//Import components
import { setActiveTab } from '../../../../redux/actions';

//Import Images
import avatar1 from "../../../../assets/images/users/avatar-1.jpg";


function ProfileSecurity(props) {

    const [profileImage, setProfileImage] = useState(null);
    const [profileImgpreview, setProfileImgPreview] = useState(avatar1);


    const formik = useFormik({
        initialValues: {
            editName: '',
        },
        validationSchema: Yup.object({
            editName: Yup.string().required('*Required'),
        }),
        onSubmit: async values => {

        },
    });
    useEffect(() => {
        if (profileImage) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfileImgPreview(reader.result);
            };

            reader.readAsDataURL(profileImage);
        } else {
            setProfileImgPreview(avatar1);
        }
    }, [profileImage]);
    return (
        <React.Fragment>
            <div className='profile-header'>
                <div className='profile-header-btn'>
                    <button onClick={()=>{props.setActiveTab("profile")}}><i className="ri-arrow-left-s-line"></i></button>
                </div>
                <div className='profile-title abs-center'>
                    Security
                </div>
            </div>
            <SimpleBar className='profile-main'>
                <div className='account-link' onClick={()=>{props.setActiveTab("profile-change-password")}}>
                    Change Password
                </div>
                <div className='account-link'>
                    Reset Password
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

export default connect(mapStatetoProps, {setActiveTab})(ProfileSecurity);