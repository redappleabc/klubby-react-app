import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Card, Button, UncontrolledDropdown, Input, Label, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";

import SimpleBar from "simplebar-react";
import ThemeSetter from '../../../theme/ThemeSetter';
//Import components
import CustomCollapse from "../../../components/CustomCollapse";

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../../assets/images/group/group3.png";
import ether_img from "../../../assets/images/post/post2.png";
import bsc_img from "../../../assets/images/post/post3.png";


function Settings(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const [isOpen9, setIsOpen9] = useState(false);
    const [isOpen10, setIsOpen10] = useState(false);

    const toggleCollapse1 = () => {
        setIsOpen1(!isOpen1);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
        setIsOpen6(false);
        setIsOpen7(false);
        setIsOpen8(false);
        setIsOpen9(false);
        setIsOpen10(false);
    };

    const toggleCollapse2 = () => {
        setIsOpen1(false);
        setIsOpen2(!isOpen2);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
        setIsOpen6(false);
        setIsOpen7(false);
        setIsOpen8(false);
        setIsOpen9(false);
        setIsOpen10(false);
    };

    const toggleCollapse3 = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(!isOpen3);
        setIsOpen4(false);
        setIsOpen5(false);
        setIsOpen6(false);
        setIsOpen7(false);
        setIsOpen8(false);
        setIsOpen9(false);
        setIsOpen10(false);
    };

    const toggleCollapse4 = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(!isOpen4);
        setIsOpen5(false);
        setIsOpen6(false);
        setIsOpen7(false);
        setIsOpen8(false);
        setIsOpen9(false);
        setIsOpen10(false);
    };
    const toggleCollapse5 = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(!isOpen5);
        setIsOpen6(false);
        setIsOpen7(false);
        setIsOpen8(false);
        setIsOpen9(false);
        setIsOpen10(false);
    };
    const toggleCollapse6 = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
        setIsOpen6(!isOpen6);
        setIsOpen7(false);
        setIsOpen8(false);
        setIsOpen9(false);
        setIsOpen10(false);
    };
    const toggleCollapse7 = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
        setIsOpen6(false);
        setIsOpen7(!isOpen7);
        setIsOpen8(false);
        setIsOpen9(false);
        setIsOpen10(false);
    };
    const toggleCollapse8 = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
        setIsOpen6(false);
        setIsOpen7(false);
        setIsOpen8(!isOpen8);
        setIsOpen9(false);
        setIsOpen10(false);
    };
    const toggleCollapse9 = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
        setIsOpen6(false);
        setIsOpen7(false);
        setIsOpen8(false);
        setIsOpen9(!isOpen9);
        setIsOpen10(false);
    };
    const toggleCollapse10 = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
        setIsOpen6(false);
        setIsOpen7(false);
        setIsOpen8(false);
        setIsOpen9(false);
        setIsOpen10(isOpen10);
    };


    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <React.Fragment>
            <div>
                <div className="px-4 py-4">
                    <h4 className="mb-0">Settings</h4>
                </div>

                {/* End profile user */}

                {/* Start User profile description */}
                <SimpleBar style={{ maxHeight: "100%" }} className="p-1 user-profile-desc">

                    <div className="text-center p-4">
                        <div className="mb-4 profile-user">
                            <img src={avatar1} className="rounded-circle avatar-lg img-thumbnail" alt="klubby" />
                            <Button type="button" color="light" className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                <i className="ri-pencil-fill"></i>
                            </Button>

                        </div>

                        <h5 className="font-size-16 mb-1 text-truncate">The Dip Daddy</h5>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline-block mb-1">
                            <DropdownToggle tag="a" className="text-muted pb-1 d-block" >
                                Available <i className="mdi mdi-chevron-down"></i>
                            </DropdownToggle>

                            <DropdownMenu>
                                <DropdownItem>Available</DropdownItem>
                                <DropdownItem>Busy</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div id="profile-setting-accordion" className="custom-accordion">
                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="View Profile"
                                description="View your public profile"
                                icon="ri-user-line"
                                isOpen={isOpen1}
                                toggleCollapse={toggleCollapse1}
                            >
                            <div className="profile-main">
                                <div className='profile-container'>
                                    <div>
                                        <i className="ri-profile-line"></i>Name   
                                    </div>
                                    <div>
                                        Rahui Gautam
                                    </div>
                                </div>
                                <div className='profile-container'>
                                    <div>
                                        <i className="ri-gift-line"></i>Birthday   
                                    </div>
                                    <div>
                                        1989.02.23
                                    </div>
                                </div>
                                <div className='profile-container'>
                                    <div>
                                        <i className="ri-women-line"></i>Gender   
                                    </div>
                                    <div>
                                        Male
                                    </div>
                                </div>
                                <div className='border-bottom'></div>
                                <div className='profile-container'>
                                    <div>
                                        <i className="ri-wifi-off-line"></i>Status   
                                    </div>
                                    <div className='status'>
                                        Online
                                    </div>
                                </div>
                                <div className='profile-container'>
                                    <div>
                                        <i className="ri-mail-line"></i>Email   
                                    </div>
                                    <div>
                                        Sample@gmail.com
                                    </div>
                                </div>
                                <div className="d-grid mt-4">
                                    <button className="auth-main-btn post-btn"><i className="ri-edit-2-line"></i>Edit profile</button>
                                </div>

                                <div className='wallet-info-container my-4'>
                                    <div id="wallet_01" className='icon-cover'>
                                        <i className="ri-clipboard-fill"></i>
                                    </div>
                                    <UncontrolledTooltip target="wallet_01" placement="top">
                                        Copy Address
                                    </UncontrolledTooltip>
                                    <div className='wallet-address'>
                                       <div> 0x1BeDfcDfC446371aaE3B633C07429C1Bf3492d16</div>
                                    </div>
                                    <div id='delete_wallet_01' className='icon-cover'>
                                        <i className="ri-delete-bin-6-fill"></i>
                                    </div>
                                    <UncontrolledTooltip target="delete_wallet_01" placement="top">
                                        Delete Address
                                    </UncontrolledTooltip>
                                </div>
                                <div className="d-grid mt-4">
                                    <button className="auth-main-btn post-btn"><i className="ri-add-line"></i>Add Wallet</button>
                                </div>
                                <div className='owned-nft-main'>
                                    <div className='header'>Owned NFT</div>
                                    <div className='nft-container mt-1 mb-3'>
                                        <div className='net-name'>
                                            <img src={ether_img} alt='klubby'/>Etherium
                                        </div>
                                        <div className='nft-imgs my-2'>
                                            <img src={avatar1} alt='klubby'/>
                                            <img src={avatar1} alt='klubby'/>
                                            <img src={avatar1} alt='klubby'/>
                                            <img src={avatar1} alt='klubby'/>
                                        </div>
                                    </div>
                                    <div className='nft-container mt-1 mb-3'>
                                        <div className='net-name'>
                                            <img src={bsc_img} alt='klubby'/>Etherium
                                        </div>
                                        <div className='nft-imgs my-2'>
                                            <img src={avatar2} alt='klubby'/>
                                            <img src={avatar2} alt='klubby'/>
                                            <img src={avatar2} alt='klubby'/>
                                            <img src={avatar2} alt='klubby'/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </CustomCollapse>
                        </Card>
                        {/* end profile card */}

                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Notifications"
                                description="See all notifications"
                                icon="ri-notification-3-line"
                                isOpen={isOpen2}
                                toggleCollapse={toggleCollapse2}
                            >

                                <div className="py-3">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">Profile photo</h5>
                                        </div>
                                        <UncontrolledDropdown className="ms-2">
                                            <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                Everyone <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>Everyone</DropdownItem>
                                                <DropdownItem>selected</DropdownItem>
                                                <DropdownItem>Nobody</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>
                                <div className="py-3 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">Last seen</h5>

                                        </div>
                                        <div className="ms-2">
                                            <div className="form-check form-switch">
                                                <Input type="checkbox" className="form-check-input" id="privacy-lastseenSwitch" defaultChecked />
                                                <Label className="form-check-label" htmlFor="privacy-lastseenSwitch"></Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-3 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">Status</h5>

                                        </div>
                                        <UncontrolledDropdown className="ms-2">
                                            <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                Everyone <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>Everyone</DropdownItem>
                                                <DropdownItem>selected</DropdownItem>
                                                <DropdownItem>Nobody</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>

                                <div className="py-3 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">Read receipts</h5>

                                        </div>
                                        <div className="ms-2">
                                            <div className="form-check form-switch">
                                                <Input type="checkbox" className="form-check-input" id="privacy-readreceiptSwitch" defaultChecked />
                                                <Label className="form-check-label" htmlFor="privacy-readreceiptSwitch"></Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-3 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">Groups</h5>

                                        </div>
                                        <UncontrolledDropdown className="ms-2">
                                            <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                Everyone <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>Everyone</DropdownItem>
                                                <DropdownItem>selected</DropdownItem>
                                                <DropdownItem>Nobody</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>
                            </CustomCollapse>
                        </Card>
                        {/* end Privacy card */}

                        <Card className="accordion-item mb-2">
                            <CustomCollapse
                                title="Edit profile"
                                description="Edit your basic information"
                                icon="ri-user-follow-line"
                                isOpen={isOpen3}
                                toggleCollapse={toggleCollapse3}
                            >

                                <div>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">Show security notification</h5>

                                        </div>
                                        <div className="ms-2 me-0">
                                            <div className="form-check form-switch">
                                                <Input type="checkbox" className="form-check-input" id="security-notificationswitch" />
                                                <Label className="form-check-label" htmlFor="security-notificationswitch"></Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CustomCollapse>
                        </Card>
                        {/* end Security card */}
        
                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Update Password"
                                description="Edit your basic information"
                                icon="ri-key-2-line"
                                isOpen={isOpen4}
                                toggleCollapse={toggleCollapse4}
                            >
               
                            </CustomCollapse>
                        </Card>
                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Admin Controls"
                                description="Control the admin information"
                                icon="ri-user-settings-line"
                                isOpen={isOpen5}
                                toggleCollapse={toggleCollapse5}
                            >

                                <div>
                                    <div className="py-3">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">FAQs</Link></h5>
                                    </div>
                                    <div className="py-3 border-top">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">Contact</Link></h5>
                                    </div>
                                    <div className="py-3 border-top">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">Terms & Privacy policy</Link></h5>
                                    </div>
                                </div>
                            </CustomCollapse>
                        </Card>

                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Group information"
                                description="group information"
                                icon="ri-group-line"
                                isOpen={isOpen6}
                                toggleCollapse={toggleCollapse6}
                            >

                                <div>
                                    <div className="py-3">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">FAQs</Link></h5>
                                    </div>
                                    <div className="py-3 border-top">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">Contact</Link></h5>
                                    </div>
                                    <div className="py-3 border-top">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">Terms & Privacy policy</Link></h5>
                                    </div>
                                </div>
                            </CustomCollapse>
                        </Card>

                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Appearance"
                                description="Settings the color, themes"
                                icon="ri-brush-2-line"
                                isOpen={isOpen7}
                                toggleCollapse={toggleCollapse7}
                            >

                                <ThemeSetter/>
                            </CustomCollapse>
                        </Card>

                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Logout"
                                description="Logout here"
                                icon="ri-logout-box-line"
                                isOpen={isOpen8}
                                toggleCollapse={toggleCollapse8}
                            >
                            </CustomCollapse>
                        </Card>
                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Delete account"
                                description="Delete this account"
                                icon="ri-delete-bin-5-line"
                                isOpen={isOpen9}
                                toggleCollapse={toggleCollapse9}
                            >
                            </CustomCollapse>
                        </Card>
                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Help, feedback"
                                description="You can get help and feedback here"
                                icon="ri-question-line"
                                isOpen={isOpen10}
                                toggleCollapse={toggleCollapse10}
                            >
                            </CustomCollapse>
                        </Card>

                        {/* end Help card */}
                    </div>
                    {/* end profile-setting-accordion */}
                </SimpleBar>
                {/* End User profile description */}
            </div>
        </React.Fragment>
    );
}

export default Settings;