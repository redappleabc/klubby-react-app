import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { FastField, useFormik } from 'formik';
import { Card } from "reactstrap";  
import * as Yup from 'yup';
import {Modal, ModalBody} from 'reactstrap';
import { UncontrolledTooltip } from 'reactstrap';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

import { withRouter } from 'react-router-dom';

import {useQuery, useMutation } from '@apollo/client';
import GET_WALLETS from '../../../../apollo/queries/getWallets'
import SET_WALLETS from '../../../../apollo/mutations/setWallets'

import SimpleBar from "simplebar-react";
//Import components
import { setActiveTab } from '../../../../redux/actions';

//Import Images
import avatar1 from "../../../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../../../assets/images/group/group3.png";
import ether_img from "../../../../assets/images/post/post2.png";
import bsc_img from "../../../../assets/images/post/post3.png";


function ProfileWallet(props) {

    const ModalTextSuccess = "New wallet address successfully added!";
    const ModalTextError = "Please connect new wallet address!";

    const [walletModalText, setWalletModalText] = useState("");
    const [walletAddress, setwalletAddress] = useState([]);
    const [walletAddressLoaded, setwalletAddressLoaded] = useState(false);
    const [WalletConnectResultModal, setWalletConnectResultModal] = useState(false);

    
    const toggleWalletConnectResultModal = () => setWalletConnectResultModal(!WalletConnectResultModal)

    let username = "";
    let email = "";
    if(props.user){
        username = props.user.username
        email = props.user.attributes.email;
    }
    

    const  [mutateWalletAddress, {}] = useMutation(SET_WALLETS)

    const { loading, error, data } = useQuery(GET_WALLETS, {variables:{username}});
    
    
    if(!walletAddressLoaded && data){
        if(data.getUserWallets == null){
            mutateWalletAddress({variables:{username:username, wallets:""}})
        }else{
            const _str_walletAddress = data.getUserWallets.wallets;
            if(_str_walletAddress !== "" && _str_walletAddress !== null){
                setwalletAddress(_str_walletAddress.split(","));
            }
            setwalletAddressLoaded(true)
        }
    }
   

    
    //mutateWalletAddress({variables:{username:username,wallets:wallet_address}})
    

    useEffect(() => {
        const bridge = "https://bridge.walletconnect.org";
      
        const connector = new WalletConnect({bridge, qrcodeModal: QRCodeModal });
        if (connector.connected) {
            connector.killSession();
        }
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
            await connector.killSession();
            await connector.createSession();
        }

        connector.on("connect", (error, payload) => {
            console.log(`connector.on("connect")`);
      
            if (error) {
              throw error;
            }
      
            const { accounts } = payload.params[0];
            console.log("accountssssssssssssssssssssssssssssssssssssssss        ", accounts);
            setWalletModalText(ModalTextSuccess);
            toggleWalletConnectResultModal();
            
            var k = 0;
            var new_accounts = [];
            for (var i = 0; i<accounts.length; i++) {
                if (walletAddress.includes(accounts[i])) continue;
                else new_accounts[k++]=accounts[i];
            }
            if (new_accounts.length === 0) {
                setWalletModalText(ModalTextError);
                toggleWalletConnectResultModal();
                return
            }
            else {
                const _walletAddress = [...walletAddress, ...new_accounts];
                setwalletAddress(_walletAddress);
                const _str_walletAddress = _walletAddress.join();
                mutateWalletAddress({variables:{username:props.user.username, wallets:_str_walletAddress}})
                // connector.killSession();
            }
            
          });
        
      };


    
    const addWallet = async () => {
        await connect();
       
        // setWalletAddress([...walletAddress])
    }

    const copyAddress = () => {

    }

    const deleteWallet = (key) => {
        console.log(key)
        let wallet = [...walletAddress];
        wallet.splice(key, 1);
        const _walletAddress = [...wallet];
        setwalletAddress(_walletAddress);
        const _str_walletAddress = _walletAddress.join();
        mutateWalletAddress({variables:{username:props.user.username, wallets:_str_walletAddress}})
    }


    const [profileImage, setProfileImage] = useState(null);
    const [profileImgpreview, setProfileImgPreview] = useState(avatar1);


    const formik = useFormik({
        initialValues: {
            editName: '',
        },
        validationSchema: Yup.object({
            editName: Yup.string().required('*Required'),
        }),
        onSubmit: async values => {

        },
    });
    useEffect(() => {
        if (profileImage) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfileImgPreview(reader.result);
            };

            reader.readAsDataURL(profileImage);
        } else {
            setProfileImgPreview(avatar1);
        }
    }, [profileImage]);

    const proccessWalletAddress = (address) => {
        return address.substr(0, 9) + "..." + address.substr(-12, 12);
    }
    return (
        <React.Fragment>
            <div className='profile-header'>
                <div className='profile-header-btn'>
                    <button onClick={()=>{props.setActiveTab("profile")}}><i className="ri-arrow-left-s-line"></i></button>
                </div>
                <div className='profile-title abs-center'>
                    Wallet
                </div>
            </div>
            <SimpleBar className='profile-main'>
                                
                <div className="wallet-btn-con">
                    <div>Wallet</div>
                    <button className="" onClick={addWallet}><i className="ri-add-line"></i></button>
                </div>
               <div>
               {
                    walletAddress.map((wallet, key) => 
                        <div key={key} className='wallet-info-container my-4'>
                            <div id={"wallet_" + key} className='icon-cover' onClick={copyAddress}>
                                <i className="ri-clipboard-line"></i>
                            </div>
                            <UncontrolledTooltip target={"wallet_" + key} placement="top">
                                Copy Address
                            </UncontrolledTooltip>
                            <div className='wallet-address'>
                            <div>{proccessWalletAddress(wallet)}</div>
                            </div>
                            <div id={'delete_wallet_' + key} className='icon-cover' onClick={(e) => deleteWallet(key)}>
                                <i className="ri-delete-bin-line"></i>
                            </div>
                            <UncontrolledTooltip target={'delete_wallet_' + key} placement="top">
                                Delete Address
                            </UncontrolledTooltip>
                        </div>
                    )
                }

                {
                    walletAddress.map((wallet, key) => 
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
            </SimpleBar>
            <Modal tabIndex="-1" isOpen={WalletConnectResultModal} toggle={toggleWalletConnectResultModal} centered>
                <ModalBody className='wallet-modal-body'>
                    <div className="text-center p-4">
                        <div className="avatar-lg mx-auto mb-4 voice-record-img">
                            <i className="ri-wallet-3-line"></i>
                        </div>
                        <p className="">{walletModalText}</p>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    const {user} = state.Auth;
    return {
        ...state.Layout,
        user
    };
};

export default connect(mapStatetoProps, {setActiveTab})(ProfileWallet);