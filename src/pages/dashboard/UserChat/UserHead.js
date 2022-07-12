import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Input, Row, Col, Modal, ModalBody, UncontrolledDropdown,  } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { openUserSidebar, setFullUser } from "../../../redux/actions";

//import images

function UserHead(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);


    function closeUserChat(e) {
        e.preventDefault();
        var userChat = document.getElementsByClassName("user-chat");
        if (userChat) {
            for(var i = 0; i< userChat.length; i++) userChat[i].classList.remove("user-chat-show");
        }
    }

    function deleteMessage() {
        let allUsers = props.users;
        let copyallUsers = allUsers;
        copyallUsers[props.active_user].messages = [];

        props.setFullUser(copyallUsers);
    }

    return (
        <React.Fragment>
            <div className="p-2 p-lg-3 user-header">
                <Row className="align-items-center user-header-main">
                    <Col sm={4} xs={8}>
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none me-2 ms-0">
                                <Link to="#" onClick={(e) => closeUserChat(e)} className="user-chat-remove text-muted font-size-16 p-2">
                                    <i className="ri-arrow-left-s-line"></i></Link>
                            </div>
                            
                            {   props.active_user?
                                props.users[props.active_user].profilePicture ?
                                    <div className="me-3 ms-0">
                                        <img src={props.users[props.active_user].profilePicture} className="rounded-circle avatar-xs" alt="Klubby" />
                                    </div>
                                    : <div className="chat-user-img align-self-center me-3">
                                        <div className="avatar-xs">
                                            <span className="avatar-title rounded-circle">
                                                {props.users[props.active_user].name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>:<div></div>
                            }

                            {props.active_user?
                            <div className="flex-1 overflow-hidden">
                                <h5 className="font-size-14 mb-0 text-truncate">
                                    <Link to="#" className="text-reset user-profile-show">
                                        {props.users[props.active_user].name}
                                    </Link>
                                    {(() => {
                                        switch (props.users[props.active_user].status) {
                                            case "online":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
                                                    </>
                                                )

                                            case "away":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-warning d-inline-block ms-1"></i>
                                                    </>
                                                )

                                            case "offline":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-secondary d-inline-block ms-1"></i>
                                                    </>
                                                )

                                            default:
                                                return;
                                        }
                                    })()}

                                </h5>
                                <h6 className='text-truncate'>
                                  @ {props.users[props.active_user].name}
                                </h6>
                            </div>:<div></div>
                            }
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
                                <UncontrolledDropdown className='header-dropdown'>
                                    <DropdownToggle>
                                        <div className='header-edit-btn'>
                                            <i className="ri-more-2-fill"></i>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem>
                                            <div>Chat Settings</div> <i className="ri-chat-3-line"></i>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <div>Members</div> <i className="ri-group-line"></i>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </li>
                            

                        </ul>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    const { users, active_user } = state.Chat;
    return { ...state.Layout, users, active_user };
};

export default connect(mapStateToProps, { openUserSidebar, setFullUser })(UserHead);