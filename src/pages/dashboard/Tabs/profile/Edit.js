import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { FastField, useFormik } from 'formik';
import { Card } from "reactstrap";  
import * as Yup from 'yup';


import SimpleBar from "simplebar-react";
//Import components
import { setActiveTab } from '../../../../redux/actions';

//Import Images
import avatar1 from "../../../../assets/images/users/avatar-1.jpg";


function ProfileEdit(props) {

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
            console.log("profile edit", values);
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
            <form onSubmit={formik.handleSubmit}>
                <div className='profile-header'>
                    <div className='profile-header-btn'>
                        <button onClick={()=>{props.setActiveTab("profile")}}><i className="ri-arrow-left-s-line"></i></button>
                    </div>
                    <div className='profile-title'>
                        Edit Profile
                    </div>
                    <div className='profile-header-btn'>
                        <button type='submit'><i className="ri-check-line"></i></button>
                    </div>
                </div>
                <SimpleBar className='profile-main'>
                    <div className="profile-avatar">
                        <label htmlFor="changeAvatar">
                            <img src={profileImgpreview} />
                        </label>
                        <br/>
                        <input
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file && file.type.substr(0, 5) === "image") {
                                    setProfileImage(file);
                                } else {
                                    setProfileImage(null);
                                }
                            }}
                            type="file"
                            name="changeAvatar"
                            id="changeAvatar"
                            hidden
                        />
                        <label htmlFor="changeAvatar">
                            Change Photo<span className="nec">*</span>
                        </label>
                        {/* <div className='error-text'>{formik.errors.imgUpload}</div> */}
                    </div>
                    <div className={formik.errors.editName ? "input-con error" : "input-con"}>
                        <div className="text" >
                            Name<span className="nec">*</span>
                        </div>
                        <input
                            type="text"
                            id="editName"
                            name="editName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.editName}
                            placeholder="Name"
                        />
                        <div className='error-text'>{formik.errors.editName}</div>
                    </div>
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

export default connect(mapStatetoProps, {setActiveTab})(ProfileEdit);