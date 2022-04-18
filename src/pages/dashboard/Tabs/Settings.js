import React, { useEffect, useState } from 'react';
import {FormFeedback, Form, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Card, Button, UncontrolledDropdown, Input, Label, UncontrolledTooltip, CardHeader, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import ThemeSetter from '../../../theme/ThemeSetter';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

//Import components
import CustomCollapse from "../../../components/CustomCollapse";

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../../assets/images/group/group3.png";
import ether_img from "../../../assets/images/post/post2.png";
import bsc_img from "../../../assets/images/post/post3.png";

import {connect}  from 'react-redux';
import { withRouter } from 'react-router-dom';




import { gql, useQuery, useMutation } from '@apollo/client';
// import { array } from 'yup';




function Settings(props) {
    

    // const [walletConnect, setWalletConnect] = useState(null);
    const ModalTextSuccess = "New wallet address successfully added!";
    const ModalTextError = "Please connect new wallet address!";

    const [walletModalText, setWalletModalText] = useState("");
    const [walletsAddress, setWalletAddress] = useState([]);
    const [WalletConnectResultModal, setWalletConnectResultModal] = useState(false);
    
    const toggleWalletConnectResultModal = () => setWalletConnectResultModal(!WalletConnectResultModal)
    console.log("settings",props)
    const username = props.user.username
    // apollo
    const GET_WALLETS = gql`query getUserWallets($username:String!) {getUserWallets(username:$username)}`;

    const SET_WALLETS = gql`mutation SetWallet ($username:String!, $wallets:String!) {updateUser(username:$username, wallets:$wallets){wallets}}`;


    const { wallet_loading, wallet_error, data } = useQuery(GET_WALLETS,
        {variables:{username}});
    
    console.log((data))
    console.log(wallet_loading)
    console.log(wallet_error)
    

    /*const  [mutateFunction, { data1, loading1, error1 }] = useMutation(SET_WALLETS)
    mutateFunction({variables:{username:username,wallets:wallet_address}})
    console.log(mutateFunction)
    if(error){
        console.log(error)
    }
    console.log(data)*/

    useEffect(() => {
        const bridge = "https://bridge.walletconnect.org";
      
        const connector = new WalletConnect({bridge, qrcodeModal: QRCodeModal });
        if (connector.connected) {
            connector.killSession();
        }

      
        let wallets = ["0x1BeDfcDfC446371aaE3B633C07429C1Bf3492d16", "0x1BeDfcDfC446371aaE3B633C07429C1Bf3492d16"];
        setWalletAddress(wallets);

    }, [])


     const connect = async () => {
        // bridge url
        const bridge = "https://bridge.walletconnect.org";
        const connector = new WalletConnect({bridge, qrcodeModal: QRCodeModal });

        // console.log(connector._chainId)
        // connector._chainId = 1;
        // console.log(connector._chainId)
        if (!connector.connected) {
          await connector.createSession();
        }
        else {
            setWalletModalText(ModalTextError);
            toggleWalletConnectResultModal();
        }

        connector.on("connect", (error, payload) => {
            console.log(`connector.on("connect")`);
      
            if (error) {
              throw error;
            }
      
            const { accounts } = payload.params[0];
            console.log(accounts);
            setWalletModalText(ModalTextSuccess);
            toggleWalletConnectResultModal();
            setWalletAddress([...walletsAddress, ...accounts]);
            
          });
        
      };



    const formik = useFormik({
        initialValues: {
          full_name: "",
          email: "",
          password: "",
          confirm_password: ""
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .email("Invalid email format")
        }),
        onSubmit: values => {
          console.log(JSON.stringify(values, null, 2));
        }
    })

   
    
    const addWallet = async () => {
        await connect();
       
        // setWalletAddress([...walletsAddress])
    }

    const copyAddress = () => {

    }

    const deleteWallet = (key) => {
        console.log(key)
        let wallet = [...walletsAddress];
        wallet.splice(key, 1);
        setWalletAddress([...wallet]);
    }


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
                                {/* <div className="d-grid mt-4">
                                    <button className="auth-main-btn post-btn"><i className="ri-edit-2-line"></i>Edit profile</button>
                                </div> */}

                                {
                                    walletsAddress.map((wallet, key) => 
                                        <div key={key} className='wallet-info-container my-4'>
                                            <div id={"wallet_" + key} className='icon-cover' onClick={copyAddress}>
                                                <i className="ri-clipboard-fill"></i>
                                            </div>
                                            <UncontrolledTooltip target={"wallet_" + key} placement="top">
                                                Copy Address
                                            </UncontrolledTooltip>
                                            <div className='wallet-address'>
                                            <div>{wallet}</div>
                                            </div>
                                            <div id={'delete_wallet_' + key} className='icon-cover' onClick={(e) => deleteWallet(key)}>
                                                <i className="ri-delete-bin-6-fill"></i>
                                            </div>
                                            <UncontrolledTooltip target={'delete_wallet_' + key} placement="top">
                                                Delete Address
                                            </UncontrolledTooltip>
                                        </div>
                                    )
                                }
                                
                                <div className="d-grid mt-4">
                                    <button className="auth-main-btn post-btn" onClick={addWallet}><i className="ri-add-line"></i>Add Wallet</button>
                                </div>
                                {
                                    walletsAddress.map((wallet, key) => 
                                        <div key={key} className='owned-nft-main'>
                                            <div className='header wallet-address'>
                                                Owned NFT 
                                                <div className='address-con'>
                                                    { wallet }
                                                </div>
                                            </div>
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
                                                    <img src={bsc_img} alt='klubby'/>Binance
                                                </div>
                                                <div className='nft-imgs my-2'>
                                                    <img src={avatar2} alt='klubby'/>
                                                    <img src={avatar2} alt='klubby'/>
                                                    <img src={avatar2} alt='klubby'/>
                                                    <img src={avatar2} alt='klubby'/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            </CustomCollapse>
                        </Card>
                        {/* end profile card */}

                        
                        {/* end Privacy card */}

                        <Card className="accordion-item mb-2">
                            <CustomCollapse
                                title="Edit profile"
                                description="Edit your basic information"
                                icon="ri-user-follow-line"
                                isOpen={isOpen3}
                                toggleCollapse={toggleCollapse3}
                            >

                                <Form className='profile-edit-main' onSubmit={formik.handleSubmit}>
                                    <div className='profile-container'>
                                        <div>
                                            <i className="ri-profile-line"></i>Name   
                                        </div>
                                        <div>
                                            <input type="text" placeholder='Name'></input>
                                        </div>
                                    </div>
                                    <div className='profile-container'>
                                        <div>
                                            <i className="ri-gift-line"></i>Birthday   
                                        </div>
                                        <div>
                                            <Input
                                                type='date'
                                            />
                                        </div>
                                    </div>
                                    <div className='profile-container'>
                                        <div>
                                            <i className="ri-women-line"></i>Gender   
                                        </div>
                                        <div>
                                            <select className="form-select form-select-lg form-custom-select" aria-label="Default select example">
                                                <option value="0">Select Gender</option>
                                                <option value="1">man</option>
                                                <option value="2">woman</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='border-bottom'></div>
                                    <div className='profile-container mt-3'>
                                        <div>
                                            <i className="ri-wifi-off-line"></i>Status   
                                        </div>
                                        <div>
                                            <select className="form-select form-select-lg form-custom-select" aria-label="Default select example">
                                                <option value="0">Select Status</option>
                                                <option value="1">online</option>
                                                <option value="2">busy</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='profile-container'>
                                        <div>
                                            <i className="ri-mail-line"></i>Email   
                                        </div>
                                        <div>
                                            <Input
                                            type="text"
                                            name="email"
                                            placeholder='sample@email.com'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            invalid={formik.touched.email && formik.errors.email ? true : false}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                            ) : null}
                                        </div>
                                        
                                    </div>
                                    <div className="d-grid mt-4">
                                        <button className="auth-main-btn post-btn" type='submit'><i className="ri-check-double-line"></i>OK</button>
                                    </div>
                                </Form>

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
                                <Form className='profile-edit-main' onSubmit={formik.handleSubmit}>
                                    <div className='profile-container'>
                                        <div>
                                            Old Password     
                                        </div>
                                        <div>
                                            <input type="password" placeholder='Old Password'></input>
                                        </div>
                                    </div>
                                    <div className='border-bottom'></div>
                                    <div className='profile-container mt-3'>
                                        <div>
                                            New Password    
                                        </div>
                                        <div>
                                            <input type="password" placeholder='New Password'></input>
                                        </div>
                                    </div>
                                    <div className='profile-container'>
                                        <div>
                                            Confirm  
                                        </div>
                                        <div>
                                            <input type="password" placeholder='Confirm'></input>
                                        </div>
                                    </div>
                                    <div className="d-grid mt-4">
                                        <button className="auth-main-btn post-btn" type='submit'><i className="ri-check-double-line"></i>OK</button>
                                    </div>
                                </Form>

                            </CustomCollapse>

                        </Card>
                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Group information"
                                description="group information"
                                icon="ri-group-line"
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
                                title="Edit Group information"
                                description="Edit group information"
                                icon="ri-user-settings-line"
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
                        <Card className="shadow-none mb-2 admin-control">
                            <CustomCollapse
                                title="Admin Controls"
                                description="Control the admin information"
                                icon="ri-settings-5-line"
                                isOpen={isOpen7}
                                toggleCollapse={toggleCollapse7}
                            >
                                <div className="text-dark mb-2 " >
                                    <CardHeader id="">
                                        <div className="setting-collapse-title font-size-16 m-0">
                                            Ban Users
                                        </div>
                                        <i className="setting-collapse-icon ri-forbid-2-line"></i>
                                        <div className="font-size-12 setting-collapse-description">
                                            You can select ban user in your group
                                        </div>
                                    </CardHeader>
                                </div>
                                <div className="text-dark mb-2 " >
                                    <CardHeader id="">
                                        <div className="setting-collapse-title font-size-16 m-0">
                                            Select Admin
                                        </div>
                                        <i className="setting-collapse-icon ri-admin-line"></i>
                                        <div className="font-size-12 setting-collapse-description">
                                            You can select admin in your group
                                        </div>
                                    </CardHeader>
                                </div>
                                
                                <div className="text-dark mb-2 " >
                                    <CardHeader id="">
                                        <div className="setting-collapse-title font-size-16 m-0">
                                            Delete Group
                                        </div>
                                        <i className="setting-collapse-icon ri-delete-bin-line"></i>
                                        <div className="font-size-12 setting-collapse-description">
                                            You can delete group here
                                        </div>
                                    </CardHeader>
                                </div>

                            </CustomCollapse>
                        </Card> 
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
                            </CustomCollapse>
                        </Card>
                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Appearance"
                                description="Settings the color, themes"
                                icon="ri-brush-2-line"
                                isOpen={isOpen8}
                                toggleCollapse={toggleCollapse8}
                            >

                                <ThemeSetter/>
                            </CustomCollapse>
                        </Card>

                        <Card className="shadow-none mb-2">
                            <CustomCollapse
                                title="Help, feedback"
                                description="You can get help and feedback here"
                                icon="ri-question-line"
                                isOpen={isOpen9}
                                toggleCollapse={toggleCollapse9}
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
                            <Link to="/logout">
                                <div className="text-dark" >
                                    <CardHeader id="">
                                        <div className="setting-collapse-title font-size-16 m-0">
                                            logout
                                        </div>
                                        <i className="setting-collapse-icon ri-logout-box-line"></i>
                                        <div className="font-size-12 setting-collapse-description">
                                            Logout here
                                        </div>
                                    </CardHeader>
                                </div>
                            </Link>
                        </Card>
                        <Card className="shadow-none mb-2">
                            <div>
                                <div className="text-dark" >
                                    <CardHeader id="">
                                        <div className="setting-collapse-title font-size-16 m-0">
                                            Delete account
                                        </div>
                                        <i className="setting-collapse-icon ri-delete-bin-5-line"></i>
                                        <div className="font-size-12 setting-collapse-description">
                                            Delete this account
                                        </div>
                                    </CardHeader>
                                </div>
                            </div>
                        </Card>
                        {/* end Help card */}
                    </div>
                    {/* end profile-setting-accordion */}
                </SimpleBar>
                {/* End User profile description */}
                <Modal tabIndex="-1" isOpen={WalletConnectResultModal} toggle={toggleWalletConnectResultModal} centered>
                    <ModalBody>
                        <div className="text-center p-4">
                            <div className="avatar-lg mx-auto mb-4 voice-record-img">
                                <i className="ri-wallet-3-line"></i>
                            </div>
                            <p className="text-muted">{walletModalText}</p>

                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    console.log("ddddddddd")
    console.log(state)
    return { user, loading, error };
};
export default withRouter(connect(mapStateToProps)(Settings));