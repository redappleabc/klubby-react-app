import React from 'react';
import { useMutation } from '@apollo/client';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Input, Row, Col, Modal, ModalBody, UncontrolledDropdown,  } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import acceptConversationGQL from '../../../apollo/mutations/AcceptUserConversation';
import removeUserConversationBridgeGQL from '../../../apollo/mutations/removeConversation';
import inviteImg from "../../../assets/images/invite-img.png";
import apollo_client from '../../../apollo';

//import images

function RequestBoard(props) {

    const [acceptConversationApollo, { }] = useMutation(acceptConversationGQL)
    const [removeUserConversationBridgeApollo, { }] = useMutation(removeUserConversationBridgeGQL)



    const acceptConversation = (id) => {
        console.log(id)

        acceptConversationApollo({
            variables: {
                conversationId: id
            }
        }).then((res) => {
            console.log('ok')
        })
        .catch((err)=> {
            console.log("error", err)
        })
    }    
    return (
        <>
        {props.active_user?
            <div>
                <div className='chat-message-container'>
                    
                    <div className='avatar'>
                        {  
                            props.users[props.active_user].profilePicture ?
                                <div className="">
                                    <img src={props.users[props.active_user].profilePicture} className="rounded-circle avatar-xs" alt="Klubby" />
                                </div>
                                : <div className="chat-user-img align-self-center">
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle">
                                            {props.users[props.active_user].name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                            }
                    </div>
                    
                    <div className='username-time'>
                        <span className='username'>
                            Adam Smith
                        </span>
                        <span className='time'>
                            2:30 PM
                        </span>
                    </div>
                    <div className='message'>
                        This is a random message about Ethereum and why it is the best crypto of all time!
                    </div>
                    <div className='invite-img'>
                        <img src={inviteImg}/>
                    </div>
                </div>
                <div className='invite-main'>
                    <strong>Adam Smith (@asmith)</strong> has requested to chat with you
                    <div className='invite-btn-con'>
                        <button className='accept' onClick={() => {acceptConversation(props.users[props.active_user].conversationId)}}>
                            Accept
                        </button>
                        <button className='decline'>
                            Decline
                        </button>
                    </div>
                </div>
            </div>
            :
            <div></div>
        }
        </>
    );
}


const mapStateToProps = (state) => {
    const { users, active_user } = state.Chat;
    return { users, active_user };
};

export default connect(mapStateToProps, {})(RequestBoard);