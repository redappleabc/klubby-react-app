import React from 'react';
import { useMutation } from '@apollo/client';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Input, Row, Col, Modal, ModalBody, UncontrolledDropdown,  } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import acceptConversationGQL from '../../../apollo/mutations/AcceptUserConversation';
import removeUserConversationBridgeGQL from '../../../apollo/mutations/removeUserConversationBridge';

import inviteImg from "../../../assets/images/invite-img.png";
import apollo_client from '../../../apollo';
import { activeUser, setActiveTab } from '../../../redux/actions';
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
            props.setActiveTab("chat")
            props.activeUser(id)
            // closeUserChat();
            // activeUser(id);
            console.log(props.users);
        })
        .catch((err) => {
            console.log("error", err)
        })
    }    

    function closeUserChat() {
        var userChat = document.getElementsByClassName("user-chat");
        if (userChat) {
            for(var i = 0; i< userChat.length; i++) userChat[i].classList.remove("user-chat-show");
        }
    }

    const deleteConversation = () => {
        //e.preventDefault()
        removeUserConversationBridgeApollo({
            variables: {
                username: props.user.username,
                conversationId: props.users[props.active_user].conversationId
            }
        }).then((res) => {
            closeUserChat();
            props.setActiveTab("chat")
            console.log("delete userconversationbridge self succeed", res,  props.users[props.active_user].conversationId, props.users[props.active_user])
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
                            {props.users[props.active_user].creator}
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
                        <button className='accept' onClick={() => {acceptConversation(props.active_user)}}>
                            Accept
                        </button>
                        <button className='decline' onClick={() => {deleteConversation()}}>
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
    const { users, active_user} = state.Chat;
    const {user} = state.Auth;
    return { users, active_user, user };
};

export default connect(mapStateToProps, {setActiveTab, activeUser})(RequestBoard);