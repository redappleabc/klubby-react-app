import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Input, Row, Col} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import { openUserSidebar, setFullGroup, setActiveKlubsTab } from "../../../redux/actions";

//import images
import user from '../../../assets/images/users/avatar-4.jpg'

function UserHead(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);

    const [aciveKlubTab, setAciveKlubTab] = useState(props.activeKlubTab);
    

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    // const setAciveKlubTab = () => setAciveKlubTab(aciveKlubTab);

    const openUserSidebar = (e) => {
        e.preventDefault();
        props.openUserSidebar();
        alert(props.activeklubTab);
    }

    function closeUserChat(e) {
        e.preventDefault();
        var userChat = document.getElementsByClassName("user-group");
        if (userChat) {
            userChat[0].classList.remove("user-chat-show");
        }
    }

    function deleteMessage() {
        let allUsers = props.groups;
        let copyallUsers = allUsers;
        copyallUsers[props.active_group].messages = [];

        props.setFullUser(copyallUsers);
    }

    return (
        <React.Fragment>
            <div className="p-2 p-lg-3 border-bottom user-header klubs-header">
                <Row className="align-items-center user-header-main">
                    <Col sm={4} xs={8}>
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none me-2 ms-0">
                                <Link to="#" onClick={(e) => closeUserChat(e)} className="user-chat-remove text-muted font-size-16 p-2">
                                    <i className="ri-arrow-left-s-line"></i></Link>
                            </div>
                            {
                                props.groups[props.active_group].profilePicture !== "Null" ?
                                    <div className="me-3 ms-0">
                                        <img src={props.groups[props.active_group].profilePicture} className="rounded-circle avatar-xs" alt="Klubby" />
                                    </div>
                                    : <div className="chat-user-img align-self-center me-3">
                                        <div className="avatar-xs">
                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                {props.groups[props.active_group].name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                            }

                            <div className="flex-1 overflow-hidden">
                                <h5 className="font-size-16 mb-0 text-truncate">
                                    <Link to="#" onClick={(e) => openUserSidebar(e)} className="text-reset user-profile-show">
                                        {props.groups[props.active_group].name}
                                    </Link>
                                </h5>
                            </div>

                        </div>
                    </Col>
                    
                    <Col sm={8} xs={4} >
                        <div className='d-flex align-items-center justify-content-right'>
                            <div className='klubs-header-tabs _pc d-flex align-items-center'>
                                <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: aciveKlubTab === 'main' })}`} onClick={() => { setAciveKlubTab('main'); }} >
                                    Main
                                </button>
                                <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: aciveKlubTab === 'whale' })}`} onClick={() => { setAciveKlubTab('whale'); }}>
                                    Whale
                                </button>
                                <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: aciveKlubTab === 'announcement' })}`} onClick={() => { setAciveKlubTab('announcement'); }}>
                                    Announcement
                                </button>
                            </div>
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

                                <li className="list-inline-item d-none d-lg-inline-block">
                                    <Button type="button" color="none" onClick={(e) => openUserSidebar(e)} className="nav-btn user-profile-show">
                                        <i className="ri-user-2-line"></i>
                                    </Button>
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
                        </div>
                    </Col>

                </Row>
                <div className='klubs-header-tabs _sp d-flex align-items-center'>
                    <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: aciveKlubTab === 'main' })}`} onClick={() => { setAciveKlubTab('main'); }} >
                        Main
                    </button>
                    <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: aciveKlubTab === 'whale' })}`} onClick={() => { setAciveKlubTab('whale'); }}>
                        Whale
                    </button>
                    <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: aciveKlubTab === 'announcement' })}`} onClick={() => { setAciveKlubTab('announcement'); }}>
                        Announcement
                    </button>
                </div>
            </div>

        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    const { groups, active_group } = state.Chat;
    const { activeKlubTab } = state.Layout;
    return { ...state.Layout, groups, active_group, activeKlubTab };
};

export default connect(mapStateToProps, { openUserSidebar, setFullGroup, setActiveKlubsTab })(UserHead);