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


function ProfileFaq(props) {

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

    useEffect(()=>{
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
        }
    }, [])
    return (
        <React.Fragment>
            <div className='profile-header'>
                <div className='profile-header-btn'>
                    <button onClick={()=>{props.setActiveTab("profile")}}><i className="ri-arrow-left-s-line"></i></button>
                </div>
                <div className='profile-title abs-center'>
                    FAQ
                </div>
            </div>
            <SimpleBar className='profile-main'>
                <button className="accordion">Lorem ipsum dolor sit amet, consectetur adipiscing elit? <i className="ri-arrow-down-s-line"></i></button>
                <div className="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <button className="accordion">Lorem ipsum dolor sit amet, consectetur adipiscing elit? <i className="ri-arrow-down-s-line"></i></button>
                <div className="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <button className="accordion">Lorem ipsum dolor sit amet, consectetur adipiscing elit? <i className="ri-arrow-down-s-line"></i></button>
                <div className="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                
                <button className="accordion">Lorem ipsum dolor sit amet, consectetur adipiscing elit? <i className="ri-arrow-down-s-line"></i></button>
                <div className="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                
                <button className="accordion">Lorem ipsum dolor sit amet, consectetur adipiscing elit? <i className="ri-arrow-down-s-line"></i></button>
                <div className="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                
                <button className="accordion">Lorem ipsum dolor sit amet, consectetur adipiscing elit? <i className="ri-arrow-down-s-line"></i></button>
                <div className="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                
                <button className="accordion">Lorem ipsum dolor sit amet, consectetur adipiscing elit? <i className="ri-arrow-down-s-line"></i></button>
                <div className="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                
                <button className="accordion">Lorem ipsum dolor sit amet, consectetur adipiscing elit? <i className="ri-arrow-down-s-line"></i></button>
                <div className="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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

export default connect(mapStatetoProps, {setActiveTab})(ProfileFaq);