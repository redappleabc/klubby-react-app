import React, { useState } from 'react';
import { Label, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Input, Row, Col, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { openUserSidebar, setFullPost } from "../../../redux/actions";

//import images
import user from '../../../assets/images/users/avatar-4.jpg'

function UserHead(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [Videomodal, setVideoModal] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    const toggleVideoModal = () => setVideoModal(!Videomodal);

    const openUserSidebar = (e) => {
        e.preventDefault();
        props.openUserSidebar();
    }

    function closeUserChat(e) {
        e.preventDefault();
        var userChat = document.getElementsByClassName("post-chat");
        if (userChat) {
            userChat[0].classList.remove("user-chat-show");
        }
    }

    function deleteMessage() {
        let allUsers = props.posts;
        let copyallUsers = allUsers;
        copyallUsers[props.active_post].messages = [];

        props.setFullPost(copyallUsers);
    }

    return (
        <React.Fragment>
            <div className="p-2 p-lg-3 border-bottom">
                <Row className="align-items-center">
                    <Col sm={4} xs={8}>
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none me-2 ms-0">
                                <Link to="#" onClick={(e) => closeUserChat(e)} className="user-chat-remove text-muted font-size-16 p-2">
                                    <i className="ri-arrow-left-s-line"></i></Link>
                            </div>
                        </div>
                        
                    </Col>
                    <Col sm={8} xs={4} >
                        <ul className="list-inline user-chat-nav text-end mb-0">
                            
                            <li className="list-inline-item">
                                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle color="none" className="btn nav-btn " type="button">
                                        <i className="ri-search-line"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-md">
                                        <div className="search-box p-2">
                                            <Input type="text" className="form-control bg-light border-0" placeholder="Search.." />
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>

                            <li className="list-inline-item">
                                <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                                    <DropdownToggle className="btn nav-btn " color="none" type="button" >
                                        <i className="ri-more-fill"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem className="d-block d-lg-none user-profile-show" onClick={(e) => openUserSidebar(e)}>View profile <i className="ri-user-2-line float-end text-muted"></i></DropdownItem>
                                        <DropdownItem>Archive <i className="ri-archive-line float-end text-muted"></i></DropdownItem>
                                        <DropdownItem>Muted <i className="ri-volume-mute-line float-end text-muted"></i></DropdownItem>
                                        <DropdownItem onClick={(e) => deleteMessage(e)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>

                        </ul>
                    </Col>
                </Row>
            </div>

            {/* Start VideoCall Modal */}
            <Modal tabIndex="-1" isOpen={Videomodal} toggle={toggleVideoModal} centered>
                <ModalBody>
                    <div className="text-center p-4">
                        <div className="avatar-lg mx-auto mb-4">
                            <img src={user} alt="" className="img-thumbnail rounded-circle" />
                        </div>

                        <h5 className="text-truncate">Doris Brown</h5>
                        <p className="text-muted">Start Video Call</p>

                        <div className="mt-5">
                            <ul className="list-inline mb-1">
                                <li className="list-inline-item px-2 me-2 ms-0">
                                    <button type="button" className="btn btn-danger avatar-sm rounded-circle" onClick={toggleVideoModal}>
                                        <span className="avatar-title bg-transparent font-size-20">
                                            <i className="ri-close-fill"></i>
                                        </span>
                                    </button>
                                </li>
                                <li className="list-inline-item px-2">
                                    <button type="button" className="btn btn-success avatar-sm rounded-circle">
                                        <span className="avatar-title bg-transparent font-size-20">
                                            <i className="ri-vidicon-fill"></i>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    const { posts, active_post } = state.Chat;
    return { ...state.Layout, posts, active_post };
};

export default connect(mapStateToProps, { openUserSidebar, setFullPost })(UserHead);