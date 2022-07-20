import React, { useState, useEffect, useRef } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Modal, ModalHeader, ModalBody, CardBody, Button, ModalFooter } from "reactstrap";

import { connect } from "react-redux";

import SimpleBar from "simplebar-react";

import { withRouter } from 'react-router-dom';

//Import Components
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import SelectContact from "../../../components/SelectContact";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";
import RequestBoard from './RequestBoard';
//actions
import { openUserSidebar, setFullUser } from "../../../redux/actions";

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import { v4 as uuidv4 } from 'uuid';

import apollo_client from '../../../apollo';
import getConversationMessagesGQL from '../../../apollo/queries/getConversationMessages';
import createMessageGQL from '../../../apollo/mutations/createMessage';
import editMessageGQL from '../../../apollo/mutations/editMessage';
import replyMessageGQL from '../../../apollo/mutations/replyMessage';
import removeMessageGQL from '../../../apollo/mutations/removeMessage';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import subscribeToNewMessagesGQL from '../../../apollo/subscriptions/subscribeToNewMessages';

import parse from 'html-react-parser';
import RequestChat from '../Tabs/RequestChat';

function UserChat(props) {


    const ref = useRef();
    const chatInputRef = useRef(null)

    const [modal, setModal] = useState(false);

    const [chatMessages, setchatMessages] = useState([]);

    const [loadedMessagesMore, setLoadedMessagesMore] = useState(false)

    const [scrollHeight, setScrollHeight] = useState(0)


    const [createMessageApollo, { }] = useMutation(createMessageGQL)





    useEffect(() => {
        console.log("userchat.js")
        setchatMessages(props.active_user ? props.users[props.active_user].messages : []);
        ref.current.recalculate();
        setLoadedMessagesMore(true)

    }, [props.users, props.newDirectMessage, props.active_user]);

    useEffect(() => {
        setchatMessages(props.active_user ? props.users[props.active_user].messages : []);
        console.log("props.active_user", props.active_user)
        console.log("props", props)
        
        ref.current.recalculate();
        scrolltoBottom();
    }, [props.active_user])


    useEffect(() => {
        if (!loadedMessagesMore) {
            scrolltoBottom()
        } else {
            ref.current.getScrollElement().scrollTop += (ref.current.getScrollElement().scrollHeight - scrollHeight)
            setLoadedMessagesMore(false)
        }
        setScrollHeight(ref.current.getScrollElement().scrollHeight)
    }, [chatMessages])




    const toggle = () => setModal(!modal);

    const addMessage = (message, type, messageType, oriMsgId) => {
        var messageObj = null;

        let d = new Date();
        var n = d.getSeconds();

        //matches the message type is text, file or image, and create object according to it
        switch (type) {
            case "textMessage":
                messageObj = {
                    content: messageType === "edit" ? message : message.replace(/\n/g, "\\n"),
                    conversationId: props.users[props.active_user].conversationId,
                }
                if (messageType === "edit") {
                    messageObj.id = oriMsgId;
                } else if (messageType === "reply") {
                    messageObj.originalId = oriMsgId
                }
                break;

            case "fileMessage":
                messageObj = {

                    message: 'file',
                    fileMessage: message.name,
                    size: message.size,

                    userType: "sender",
                    image: avatar4,
                    isFileMessage: true,
                    isImageMessage: false
                }
                break;

            case "imageMessage":
                var imageMessage = [
                    { image: message },
                ]

                messageObj = {

                    message: 'image',
                    imageMessage: imageMessage,
                    size: message.size,

                    userType: "sender",
                    image: avatar4,
                    isImageMessage: true,
                    isFileMessage: false
                }
                break;

            default:
                break;
        }

        if (props.users[props.active_user].conversationId) {
            console.log("messageobj",messageObj)
            if (messageType === "edit") {

                apollo_client.mutate({
                    mutation: editMessageGQL,
                    variables: messageObj
                }).then((res) => {
                    console.log("edit message   ", res)
                }).catch((err) => {
                    console.log("edit message error   ", err)
                })
            } else if (messageType === "reply") {
                apollo_client.mutate({
                    mutation: replyMessageGQL,
                    variables: messageObj
                }).then((res) => {
                    console.log("reply message   ", res)
                }).catch((err) => {
                    console.log("reply message error   ", err)
                })
            }
            else {
                apollo_client.mutate({
                    mutation: createMessageGQL,
                    variables: messageObj
                }).then((res) => {
                    console.log("created message   ", res)
                }).catch((err) => {
                    console.log("create message error   ", err)
                })
            }
        }


    }



    function scrolltoBottom() {
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }


    const deleteMessage = (id) => {
        console.log(id)
        if (props.users[props.active_user].conversationId) {
            apollo_client.mutate({
                mutation: removeMessageGQL,
                variables: {
                    conversationId: props.users[props.active_user].conversationId,
                    id: id
                }
            }).then((res) => {
                //console.log(res)
                // let allUsers = props.users
                // allUsers[props.active_user].messages = allUsers[props.active_user].messages.filter(({ id }) => id !== res.data.removeMessage.id)
                // props.setFullUser(allUsers)
                // setchatMessages(allUsers[props.active_user].messages)
                console.log("delete message success")
            }).catch((err) => {
                console.log(err)
            })
        }
        // let conversation = chatMessages;

        // var filtered = conversation.filter(function (item) {
        //     return item.id !== id;
        // });

        // setchatMessages(filtered);
    }

    function editMessage(chatId, content) {
        chatInputRef.current.editMessage(chatId, content);
    }

    const handleScroll = (e) => {
        if (props.active_user && ref.current.getScrollElement().scrollTop === 0) {
            if (props.users[props.active_user].nextToken) {
                apollo_client.query({
                    query: getConversationMessagesGQL,
                    variables: {
                        conversationId: props.users[props.active_user].conversationId,
                        after: props.users[props.active_user].nextToken,
                    }
                }).then((res) => {
                    if (res.data.getAllMessageConnections) {
                        const loadedMessages = [...res.data.getAllMessageConnections.messages].reverse()
                        let allUsers = props.users
                        allUsers[props.active_user].messages = [...loadedMessages, ...allUsers[props.active_user].messages]
                        allUsers[props.active_user].nextToken = res.data.getAllMessageConnections.nextToken;
                        props.setFullUser(allUsers)
                        setLoadedMessagesMore(true)
                        setchatMessages(allUsers[props.active_user].messages)
                        console.log("load more success")
                    }
                    console.log(res)
                })
            }
        }
    }


    const replyMsg = (chatId, content) => {
        chatInputRef.current.replyMessage(chatId, content);
    }


    return (
        <React.Fragment>
            <div className='user-chat'>
                <div className="d-lg-flex">

                    <div className="w-100">

                        {/* render user head */}
                        <UserHead />
                        <SimpleBar
                            onScrollCapture={(e) => { handleScroll(e) }}
                            style={{ maxHeight: "100%" }}
                            ref={ref}
                            className="chat-conversation p-3 p-lg-4"
                            id="messages">
                            {
                                props.active_user && 
                                props.users[props.active_user].accepted === true ? 
                                <ul className="list-unstyled mb-0" >
                                    {
                                        props.active_user &&
                                        chatMessages.map((chat, key) =>
                                            chat.isToday && chat.isToday === true ?
                                                <li key={"dayTitle" + key}>
                                                    <div className="chat-day-title">
                                                        <span className="title">Today</span>
                                                    </div>
                                                </li>
                                                :
                                                <li key={key}>
                                                    <div className="chat-message-container">

                                                        <div className="avatar">
                                                            {chat.sender === props.user.username && ((typeof props.user.profilePicture === "undefined" || props.user.profilePicture === null) ?
                                                                <div className="chat-user-img align-self-center">
                                                                    <div className="avatar-xs">
                                                                        <span className="avatar-title rounded-circle">
                                                                            {chat.sender && chat.sender.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                : <img src={props.user.profilePicture} alt="Klubby" />)
                                                            }
                                                            {chat.sender !== props.user.username && ((typeof props.users[props.active_user].profilePicture === "undefined" || props.users[props.active_user].profilePicture === null) ?
                                                                <div className="chat-user-img align-self-center">
                                                                    <div className="avatar-xs">
                                                                        <span className="avatar-title rounded-circle">
                                                                            {chat.sender && chat.sender.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                : <img src={props.users[props.active_user].profilePicture} alt="Klubby" />)
                                                            }
                                                        </div>

                                                        <div className='username-time'>
                                                            <span className='username'>
                                                                {chat.sender}
                                                            </span>
                                                            <span className='time'>
                                                                {
                                                                    !chat.isTyping && <p className="chat-time mb-0">{ (! props.users[props.active_user].otherReadMessageId || parseInt(props.users[props.active_user].otherReadMessageId.substring(0,13)) ) >= parseInt(chat.id.substring(0,13))&& <i className="read-mark ri-check-double-line"></i>}<i className="ri-time-line align-middle"></i> <span className="align-middle">{(new Date(parseInt(chat.createdAt)).toISOString())}</span></p>
                                                                }   
                                                            </span>
                                                        </div>
                                                        <div className='message'>
                                                            {
                                                                chat.originalId && <div className='reply-text'>
                                                                    <div className='reply-header'>
                                                                        <span className='reply-text-sender'>{chat.originalMessage.sender}</span> 
                                                                        <span className='reply-text-date'>
                                                                        {(new Date(parseInt(chat.originalMessage.createdAt)).toISOString())}
                                                                        </span>
                                                                    </div>
                                                                    <div className='reply-text-main'>
                                                                        {parse((chat.originalMessage.content).replace(/\n/g, "<br/>"))}
                                                                    </div>
                                                                    

                                                                </div>
                                                            }
                                                            {
                                                                chat.content &&

                                                                <p className="mb-0">
                                                                    {parse(chat.content.replace(/\n/g, "<br/>"))}
                                                                </p>

                                                            }
                                                            {
                                                                chat.imageMessage &&
                                                                // image list component
                                                                <ImageList images={chat.imageMessage} />
                                                            }
                                                            {
                                                                chat.fileMessage &&
                                                                //file input component
                                                                <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                            }
                                                            {
                                                                chat.isTyping &&
                                                                <p className="mb-0">
                                                                    typing
                                                                    <span className="animate-typing">
                                                                        <span className="dot ms-1"></span>
                                                                        <span className="dot ms-1"></span>
                                                                        <span className="dot ms-1"></span>
                                                                    </span>
                                                                </p>
                                                            }

                                                            
                                                            
                                                        </div>

                                                        {
                                                            !chat.isTyping &&
                                                            <UncontrolledDropdown className="message-dropdown">
                                                                <DropdownToggle tag="a">
                                                                    <i className="ri-more-2-fill"></i>
                                                                </DropdownToggle>
                                                                <DropdownMenu>
                                                                    <DropdownItem onClick={() => { navigator.clipboard.writeText(chat.content) }}>Copy <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                    {chat.sender === props.user.username && <DropdownItem onClick={() => editMessage(chat.id, chat.content)}>Edit <i className="ri-edit-line float-end text-muted"></i></DropdownItem>}
                                                                    {/* <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem> */}
                                                                    <DropdownItem onClick={() => { replyMsg(chat.id, chat.content) }}>Reply <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                                    {chat.sender === props.user.username && <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>}
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        }
                                                       
                                                    </div>
                                                </li>

                                        )
                                    }
                                </ul>
                                :
                                <RequestBoard/>
                                }
                            
                        </SimpleBar>
                        {
                            props.active_user && 
                            props.users[props.active_user].accepted === true ? 
                            <ChatInput onaddMessage={addMessage} ref={chatInputRef} />
                            :
                            <></>
                        }
                        
                    </div>


                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user, users, newDirectMessage } = state.Chat;
    const { userSidebar } = state.Layout;
    const { user, loading, error } = state.Auth;
    return { user, active_user, userSidebar, users, newDirectMessage };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar, setFullUser })(UserChat));

