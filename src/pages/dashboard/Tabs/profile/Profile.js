import React, { useState } from 'react';
import { connect } from "react-redux";

import { Card } from "reactstrap";

import SimpleBar from "simplebar-react";
//Import components
import { setActiveTab } from '../../../../redux/actions';

//Import Images
import avatar1 from "../../../../assets/images/users/avatar-1.jpg";


function Profile(props) {

    return (
        <React.Fragment>
            <div className='profile-header'>
                <div className='profile-title'>
                    Profile
                </div>
                <div className='profile-header-btn'>
                    <button onClick={()=>{props.setActiveTab("profile-edit")}}><i className="ri-edit-2-line"></i></button>
                </div>
            </div>
            <SimpleBar className='profile-main'>
                <div className='profile-main-back'></div>
                <div className='profile-avatar'>
                    <img src={avatar1}/>
                    <div className='name'>
                        John Doe
                    </div>
                    <div className='username'>
                        @ jdoe1234
                    </div>
                </div>
                <div className='profile-lists'>
                    <div className='list'>
                        <div className='icon'>
                            <i className="ri-user-line"></i>
                        </div>
                        <div className='text'>
                            Account
                            <span>
                                Thing 1, thing 2, thing 3, another awesome thing
                            </span>
                        </div>
                    </div>
                    <div className='list'>
                        <div className='icon'>
                            <i className="ri-lock-line"></i>
                        </div>
                        <div className='text'>
                            Security
                            <span>
                                Thing 1, thing 2, thing 3, another awesome thing
                            </span>
                        </div>
                    </div>
                    <div className='list'>
                        <div className='icon'>
                            <i className="ri-wallet-line"></i>
                        </div>
                        <div className='text'>
                            Wallet
                            <span>
                                Thing 1, thing 2, thing 3, another awesome thing
                            </span>
                        </div>
                    </div>
                    <div className='list'>
                        <div className='icon'>
                            <i className="ri-question-line"></i>
                        </div>
                        <div className='text'>
                            Help
                            <span>
                                Thing 1, thing 2, thing 3, another awesome thing
                            </span>
                        </div>
                    </div>
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

export default connect(mapStatetoProps, {setActiveTab})(Profile);