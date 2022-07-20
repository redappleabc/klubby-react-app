import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Input, Row, Col} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import { openUserSidebar, setFullGroup, setActiveKlubsTab } from "../../../redux/actions";

//import images
import klub_avatar from '../../../assets/images/group/profile-img.png'

function UserHead(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);

    // const [aciveKlubTab, setAciveKlubTab] = useState(props.activeKlubTab);
    

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    // const setAciveKlubTab = () => setAciveKlubTab(aciveKlubTab);

    const openUserSidebar = (e) => {
        e.preventDefault();
        props.openUserSidebar();
    }

    const toggleKlubTab = (tab) => {
        props.setActiveKlubsTab(tab)
    }

    function closeUserChat(e) {
        e.preventDefault();
        var userChat = document.getElementsByClassName("user-group");
        if (userChat) {
            userChat[0].classList.remove("user-chat-show");
        }
    }


    useEffect(()=> {
        console.log("props.groups[props.active_group]", props.groups[props.active_group]);
    })
    return (
        <React.Fragment>
            <div className="p-2 p-lg-3 user-header klubs-header">
                <Row className="align-items-center user-header-main">
                    <Col sm={4} xs={8}>
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none me-2 ms-0">
                                <Link to="#" onClick={(e) => closeUserChat(e)} className="user-chat-remove text-muted font-size-16 p-2">
                                    <i className="ri-arrow-left-s-line"></i></Link>
                            </div>
                            {/* {
                                props.groups[props.active_group].profilePicture === null || props.groups[props.active_group].profilePicture == "undefined" ? */}
                                    
                                <div className="chat-user-img align-self-center me-3">
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle">
                                            {props.groups[props.active_group].klubname.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                    {/* : 
                                <div className="me-3 ms-0">
                                    <img src={props.groups[props.active_group].profilePicture} className="rounded-circle avatar-xs" alt="Klubby" />
                                </div>
                            } */}

                            <div className="flex-1 overflow-hidden">
                                <h5 className="font-size-16 mb-0 text-truncate">
                                    <div className="text-reset user-profile-show">
                                        {props.groups[props.active_group].klubname}
                                    </div>
                                </h5>
                            </div>

                        </div>
                    </Col>
                    
                    <Col sm={8} xs={4} >
                        <div className='d-flex align-items-center justify-content-right'>
                            {/* <div className='klubs-header-tabs _pc d-flex align-items-center'>
                                <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: props.activeKlubTab === 'main' })}`} onClick={() => { toggleKlubTab('main'); }} >
                                    Main
                                </button>
                                <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: props.activeKlubTab === 'whale' })}`} onClick={() => { toggleKlubTab('whale'); }}>
                                    Whale
                                </button>
                                <button className={`chat-nav-header-btn klubs-header-btn ${classnames({ active: props.activeKlubTab === 'announcement' })}`} onClick={() => { toggleKlubTab('announcement');}}>
                                    Announcement
                                </button>
                            </div> */}
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

                            </ul>
                        </div>
                    </Col>
                </Row>
                <div className='klub-header-back'></div>
                <div className='klub-header-con'>
                    <img src={klub_avatar}/>
                    <span>Ethereum</span>
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