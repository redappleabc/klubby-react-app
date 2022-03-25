import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, UncontrolledTooltip, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";

import { setActiveTab } from "../../redux/actions";

//Import Images
// import logo from "../../assets/images/logo-small.svg"
// import avatar1 from "../../assets/images/users/avatar-1.jpg";
import group1 from "../../assets/images/group/group1.png";

function LeftSidebarMenu(props) {

    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    // const [dropdownOpenMobile1, setDropdownOpenMobile1] = useState(false);
    const [dropdownOpenMobile2, setDropdownOpenMobile2] = useState(false);


    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
    // const toggleMobile1 = () => setDropdownOpenMobile1(!dropdownOpenMobile1);
    const toggleMobile2 = () => setDropdownOpenMobile2(!dropdownOpenMobile2);

    const toggleTab = tab => {
        props.setActiveTab(tab)
    }

    const activeTab = props.activeTab;

    return (
        <React.Fragment>
            <div className="side-menu flex-lg-column me-lg-1">
                {/* LOGO */}
                <div className="navbar-brand-box">
                    <Link to="/" className="logo">
                        <span className="logo-sm">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                            <g id="Group_842" data-name="Group 842" transform="translate(-11 -32)">
                                <circle id="Ellipse_32" data-name="Ellipse 32" cx="22.5" cy="22.5" r="22.5" transform="translate(11 32)" fill="#6355fa"/>
                                <g id="Group_263" data-name="Group 263" transform="translate(18.406 43.52)">
                                <path id="Path_487" data-name="Path 487" d="M441.007,1051.61l-.82,2.059-2.63,6.605a.373.373,0,0,0,.625.387l4.154-4.641a7.049,7.049,0,0,1,3.163-2.03Z" transform="translate(-426.573 -1035.352)" fill="#fff"/>
                                <path id="Path_488" data-name="Path 488" d="M298.821,814.58H286.959a9.158,9.158,0,0,0-9.159,9.159h0a9.157,9.157,0,0,0,8.83,9.151l4.951-12.435a2.224,2.224,0,0,1,3.024-1.185,2.275,2.275,0,0,1,1.08,2.9l-.357.9,7.147-3.786a2.1,2.1,0,1,1,1.966,3.713l-9.022,4.779,7.677,4.066a9.156,9.156,0,0,0,4.883-8.1h0A9.158,9.158,0,0,0,298.821,814.58Z" transform="translate(-277.8 -814.58)" fill="#fff"/>
                                </g>
                            </g>
                        </svg>
                            {/* <img src={logo} alt="logo" height="40" /> */}
                        </span>
                    </Link>
                </div>
                {/* end navbar-brand-box  */}

                {/* Start side-menu nav */}
                <div className="flex-lg-column my-auto">
                    <Nav pills className="side-menu-nav justify-content-center" role="tablist">
                        <NavItem id="Home">
                            <NavLink id="pills-home-tab" className={classnames({ active: activeTab === 'home' })} onClick={() => { toggleTab('home'); }}>
                                <i className="ri-home-4-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Home" placement="top">
                            Home
                        </UncontrolledTooltip>

                        <NavItem id="Chats">
                            <NavLink id="pills-chat-tab" className={classnames({ active: activeTab === 'chat' })} onClick={() => { toggleTab('chat'); }}>
                                <i className="ri-message-3-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Chats" placement="top">
                            Chats
                        </UncontrolledTooltip>

                        <NavItem id="Post" className='_pc'>
                            <NavLink id="pills-post-tab" className={classnames({ active: activeTab === 'post' })} onClick={() => { toggleTab('post'); }}>
                                <i className="ri-advertisement-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Post" placement="top">
                            Post
                        </UncontrolledTooltip>


                        <NavItem id="Settings" className='_pc'>
                            <NavLink id="pills-setting-tab" className={classnames({ active: activeTab === 'settings' })} onClick={() => { toggleTab('settings'); }}>
                                <i className="ri-settings-2-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Settings" placement="top">
                            Settings
                        </UncontrolledTooltip>

                        <Dropdown nav isOpen={dropdownOpenMobile2} toggle={toggleMobile2} className="profile-user-dropdown d-inline-block d-lg-none">
                            <DropdownToggle nav>
                            <i className="ri-user-3-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end dropdown-setting">
                                <DropdownItem onClick={() => { toggleTab('profile'); }}>Profile <i className="ri-profile-line float-end text-muted"></i></DropdownItem>
                                <DropdownItem onClick={() => { toggleTab('settings'); }}>Setting <i className="ri-settings-3-line float-end text-muted"></i></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="/logout">Log out <i className="ri-logout-circle-r-line float-end text-muted"></i></DropdownItem>
                            </DropdownMenu>
                        </Dropdown> 
                    </Nav>
                </div>
                {/* end side-menu nav */}

                <div className="flex-lg-column d-none d-lg-block">
                    <Nav className="side-menu-nav justify-content-center">
                        <Dropdown nav isOpen={dropdownOpen1} className="nav-item btn-group dropup profile-user-dropdown" toggle={toggle1}>
                            <DropdownToggle className="nav-link" tag="a">
                            <div className='notification-cover'><i className="ri-notification-3-line"><div className='notification-badge'>2</div></i></div>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { toggleTab('home'); }}><img src={group1} alt="" className="profile-user rounded-circle" /> Rahui Gautam </DropdownItem>
                                <DropdownItem onClick={() => { toggleTab('home'); }}><img src={group1} alt="" className="profile-user rounded-circle" /> Rahui Gautam </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown nav isOpen={dropdownOpen2} className="nav-item btn-group dropup profile-user-dropdown" toggle={toggle2}>
                            <DropdownToggle className="nav-link" tag="a">
                            <i className="ri-user-3-line"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { toggleTab('profile'); }}>Profile <i className="ri-profile-line float-end text-muted"></i></DropdownItem>
                                <DropdownItem onClick={() => { toggleTab('settings'); }}>Setting <i className="ri-settings-3-line float-end text-muted"></i></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="/logout">Log out <i className="ri-logout-circle-r-line float-end text-muted"></i></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </div>
                {/* Side menu user */}
            </div>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {
    setActiveTab
})(LeftSidebarMenu);