import React from 'react';
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";

import { setActiveTab } from "../../redux/actions";
import avatar2 from "../../assets/images/users/avatar-1.jpg";

import klubs_icon from "../../assets/images/icons/klubs.png";
import klubs_icon_active from "../../assets/images/icons/klubs-active.png";

import chat_icon from "../../assets/images/icons/chat.png";
import chat_icon_active from "../../assets/images/icons/chat.png";


function LeftSidebarMenu(props) {

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
                        </span>
                    </Link>
                </div>
                {/* end navbar-brand-box  */}

                {/* Start side-menu nav */}
                <div className="flex-lg-column my-auto">
                    <Nav pills className="side-menu-nav justify-content-center" role="tablist">
                       
                        <NavItem id="Klubs">
                            <NavLink id="pills-Klubs-tab" className={classnames({ active: activeTab === 'chat' })} onClick={() => { toggleTab('chat'); }}>
                                <div>
                                    <img className='no-select' src={klubs_icon}/>
                                    <img className='select' src={klubs_icon_active}/>
                                </div>
                            </NavLink>
                        </NavItem>

                        <NavItem id="Chats">
                            <NavLink id="pills-chat-tab" className={classnames({ active: activeTab === 'chat' })} onClick={() => { toggleTab('chat'); }}>
                                <div>
                                    <img className='no-select' src={chat_icon}/>
                                    <img className='select' src={chat_icon_active}/>
                                </div>
                            </NavLink>
                        </NavItem>
        

                        <NavItem id="Settings">
                            <NavLink id="pills-setting-tab" className={classnames({ active: activeTab === 'settings' })} onClick={() => { toggleTab('settings'); }}>
                                <div>
                                    <img src={avatar2} className="profile-img"/>
                                    <span>Profile</span>
                                </div>
                            </NavLink>
                        </NavItem>
                        
                    </Nav>
                </div>
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