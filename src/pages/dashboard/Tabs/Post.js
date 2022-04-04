import React, { useState } from 'react';
import {Input, Label } from 'reactstrap';

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import SimpleBar from "simplebar-react";

function Post(props) {

    const [file, setfile] = useState({
        name: "",
        size: ""
    });
    
    const handleFileChange = e => {
        if (e.target.files.length !== 0) {
            setfile({
                name: e.target.files[0].name,
                size: e.target.files[0].size
            })
        }
         console.log(file);   
    }

    return (
        <React.Fragment>
            <div className="px-4 py-4">
                <h4 className="mb-0">Post</h4>
            </div>
            <SimpleBar style={{ maxHeight: "100%" }} className="post-simplebar">
                <div className='post-main'>
                        <div className='post-main-header'>
                            <div className="text-center p-4">
                                <div className="mb-4">
                                    <img src={avatar1} className="rounded-circle avatar-lg img-thumbnail" alt="klubby" />
                                </div>
                                <h5 className="font-size-16 mb-1 text-truncate">The Dip Daddy</h5>
                            </div>
                        </div>
                        {/* End profile user  */}
                        <div className='px-3 post'>
                            <div className='post-select-container'>
                                <p>Post type</p>
                                <div className='mb-4'>
                                    <select className="form-select form-select-lg form-custom-select" aria-label="Default select example">
                                        <option value='0'>Open this select Post Type</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            

                            <textarea cols="30" className='post-textarea' placeholder='Please type here ...'/>

                            <div className='post-icon-container'>
                                <div className="list-inline-item input-file">
                                    <Label className="btn btn-link text-decoration-none font-size-20 btn-lg waves-effect">
                                        <i className="ri-image-2-fill"></i>
                                        <Input onChange={(e) => handleFileChange(e)} type="file" name="fileInput" size="60" />
                                    </Label>
                                </div>
                                <div className="list-inline-item input-file">
                                    <Label className="btn btn-link text-decoration-none font-size-20 btn-lg waves-effect">
                                        <i className="ri-vidicon-fill"></i>
                                        <Input onChange={(e) => handleFileChange(e)} type="file" name="fileInput" size="60" />
                                    </Label>
                                </div>
                            </div>
                            
                            <div className="d-grid mt-3">
                                <button className="auth-main-btn post-btn" type="submit"><i className="ri-send-plane-fill"></i>Post</button>
                            </div>

                        </div>
                    
                    {/* end user-profile-desc  */}
                </div>
            </SimpleBar>
        </React.Fragment>
    );
}

export default Post;