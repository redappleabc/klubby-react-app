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

//actions
import { openUserSidebar, setFullUser } from "../../../redux/actions";

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import { v4 as uuidv4 } from 'uuid';
import createMessageGQL from '../../../apollo/mutations/createMessage';

import apollo_client from '../../../apollo';
import getConversationMessagesGQL from '../../../apollo/queries/getConversationMessages';
import createUserConversationsGQL from '../../../apollo/mutations/createUserConversations';
import createConversationGQL from '../../../apollo/mutations/createConversation';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import subscribeToNewMessagesGQL from '../../../apollo/subscriptions/subscribeToNewMessages';



function UserChat(props) {


    const ref = useRef();

    const [modal, setModal] = useState(false);


    //demo conversation messages
    //userType must be required
    const [allUsers, setAllUsers] = useState(props.users);

    const [chatMessages, setchatMessages] = useState(props.active_user ? props.users[props.active_user].messages : []);

    const [createConversationApollo, { }] = useMutation(createConversationGQL)
    const [createUserConversationApollo, { }] = useMutation(createUserConversationsGQL)
    const [createMessageApollo, { }] = useMutation(createMessageGQL)

    const {
        data,
        loading,
        error,
        subscribeToMore
    } = useQuery(getConversationMessagesGQL, {
        variables: {
            conversationId: props.users[props.active_user].conversationId
        }
    });


    subscribeToMore({
        // ...
        document: subscribeToNewMessagesGQL,
        variables: {
            conversationId: props.users[props.active_user].conversationId
        },
        updateQuery: (prev, { subscriptionData }) => {
            console.log('subscribeToMore - updateQuery:', subscriptionData);
        }
    });

    // const  { data: createSubData, error: createSubError } = useSubscription(subscribeToNewMessagesGQL, {
    //     variables: {
    //         conversationId: props.users[props.active_user].conversationId
    //     }
    // })

    // console.log(createSubData)
    // console.log(createSubError)



    // const options = {
    //     query: getConversationMessagesGQL,
    //     variables: {
    //         conversationId: props.users[props.active_user].conversationId,
    //     }
    // };


    // const observable = apollo_client.watchQuery(options);

    // observable.subscribe(({ data }) => {
    //     console.log('chat-message-view: subscribe', data);
    // });

    // observable.subscribeToMore({
    //     document: subscribeToNewMessagesGQL,
    //     variables: { 'conversationId': props.users[props.active_user].conversationId },
    //     updateQuery: (prev, { subscriptionData }) => {
    //                  console.log('subscribeToMore - updateQuery:', subscriptionData);
    //         //     
    //     }
    // })




    useEffect(() => {
        console.log("userchat.js")

        setchatMessages(props.active_user ? props.users[props.active_user].messages : []);
        ref.current.recalculate();
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
        setAllUsers(props.users)
    }, [props.active_user, props.users]);

    const toggle = () => setModal(!modal);

    const addMessage = (message, type) => {
        var messageObj = null;

        let d = new Date();
        var n = d.getSeconds();

        //matches the message type is text, file or image, and create object according to it
        switch (type) {
            case "textMessage":
                messageObj = {
                    id: `${Date.now()}-${uuidv4()}`,
                    content: message,
                    createdAt: `${Date.now()}`,
                    conversationId: props.users[props.active_user].conversationId,
                    sender: props.user.username
                }
                break;

            case "fileMessage":
                messageObj = {
                    id: `${Date.now()}-${uuidv4()}`,
                    message: 'file',
                    fileMessage: message.name,
                    size: message.size,
                    createdAt: `${Date.now()}`,
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
                    id: `${Date.now()}-${uuidv4()}`,
                    message: 'image',
                    imageMessage: imageMessage,
                    size: message.size,
                    createdAt: `${Date.now()}`,
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
            apollo_client.mutate({
                mutation: createMessageGQL,
                variables: messageObj
            }).then((res) => {
                console.log("created message   ", res)
            }).catch((err) => {
                console.log("create message error   ", err)
            })
        } else {
            const newConversation = {
                createdAt: `${Date.now()}`,
                id: `${Date.now()}-${uuidv4()}`,
                name: "noname"
            }
            createConversationApollo({
                variables: newConversation
            }).then((res) => {
                console.log("create conversation succeed");
                createUserConversationApollo({
                    variables: { conversationId: newConversation.id, username: props.user.username }
                })
            }).then((res) => {
                console.log("create user conversation 1 succeed");
                createUserConversationApollo({
                    variables: { conversationId: newConversation.id, username: props.users[props.active_user].username }
                })
            }).then((res) => {
                console.log("create userconversation 2 succeed")
                const first_messageObj = {
                    id: `${Date.now()}-${uuidv4()}`,
                    content: message,
                    createdAt: `${Date.now()}`,
                    conversationId: newConversation.id,
                    sender: props.user.username,
                }
                createMessageApollo({
                    variables: first_messageObj
                })
            }).then((res) => {
                console.log("first message send succeed")
            })
                .catch((err) => { console.log(err) })

        }



        //add message object to chat    

        setchatMessages([...chatMessages, messageObj])

        let copyallUsers = allUsers;
        copyallUsers[props.active_user].messages = [...chatMessages, messageObj];
        copyallUsers[props.active_user].isTyping = false;
        console.log("copyallusers", copyallUsers)
        props.setFullUser(copyallUsers);
        scrolltoBottom();
    }




    // if(props.active_user && props.users[props.active_user].conversationId){
    //     apollo_client.query({
    //         query:getConversationMessagesGQL,
    //         variables:{
    //             conversationId:props.users[props.active_user].conversationId
    //         }
    //     }).then((res)=>{    
    //         //setchatMessages(res.data.getAllMessageConnection.messages)
    //         let copyallUsers = allUsers;
    //         const _messages = [...res.data.getAllMessageConnection.messages];

    //         copyallUsers[props.active_user].messages = _messages.reverse();
    //         props.setFullUser(copyallUsers);
    //         console.log(res)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }


    function scrolltoBottom() {
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }


    const deleteMessage = (id) => {
        let conversation = chatMessages;

        var filtered = conversation.filter(function (item) {
            return item.id !== id;
        });

        setchatMessages(filtered);
    }


    return (
        <React.Fragment>
            <div className='user-chat'>
                <div className="d-lg-flex">

                    <div className={props.userSidebar ? "w-70" : "w-100"}>

                        {/* render user head */}
                        <UserHead />

                        <SimpleBar
                            style={{ maxHeight: "100%" }}
                            ref={ref}
                            className="chat-conversation p-3 p-lg-4"
                            id="messages">
                            <ul className="list-unstyled mb-0">


                                {
                                    chatMessages.map((chat, key) =>
                                        chat.isToday && chat.isToday === true ? <li key={"dayTitle" + key}>
                                            <div className="chat-day-title">
                                                <span className="title">Today</span>
                                            </div>
                                        </li> :
                                            (props.users[props.active_user].isGroup === true) ?
                                                <li key={key} className={chat.sender === props.user.username ? "right" : ""}>
                                                    <div className="conversation-list">

                                                        <div className="chat-avatar">
                                                            {chat.sender === props.user.username ? <img src={avatar1} alt="Klubby" /> :
                                                                props.users[props.active_user].profilePicture === "Null" ?
                                                                    <div className="chat-user-img align-self-center me-3">
                                                                        <div className="avatar-xs">
                                                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                {chat.userName && chat.userName.charAt(0)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    : <img src={props.users[props.active_user].profilePicture} alt="Klubby" />
                                                            }
                                                        </div>

                                                        <div className="user-chat-content">
                                                            <div className="ctext-wrap">
                                                                <div className="ctext-wrap-content">
                                                                    {
                                                                        chat.content &&
                                                                        <p className="mb-0">
                                                                            {chat.content}
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
                                                                    {
                                                                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{(new Date(parseInt(chat.createdAt)).toISOString())}</span></p>
                                                                    }
                                                                </div>
                                                                {
                                                                    !chat.isTyping &&
                                                                    <UncontrolledDropdown className="align-self-start">
                                                                        <DropdownToggle tag="a">
                                                                            <i className="ri-more-2-fill"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem>Copy <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem>Save <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledDropdown>
                                                                }

                                                            </div>
                                                            {
                                                                <div className="conversation-name">{chat.sender === props.user.username ? "The Dip Daddy" : chat.userName}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                                :
                                                <li key={key} className={chat.sender === props.user.username ? "right" : ""}>
                                                    <div className="conversation-list">
                                                        {
                                                            //logic for display user name and profile only once, if current and last messaged sent by same receiver
                                                            chatMessages[key + 1] ? chatMessages[key].userType === chatMessages[key + 1].userType ?

                                                                <div className="chat-avatar">
                                                                    <div className="blank-div"></div>
                                                                </div>
                                                                :
                                                                <div className="chat-avatar">
                                                                    {chat.sender === props.user.username ? <img src={avatar1} alt="Klubby" /> :
                                                                        props.users[props.active_user].profilePicture === "Null" ?
                                                                            <div className="chat-user-img align-self-center me-3">
                                                                                <div className="avatar-xs">
                                                                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                        {props.users[props.active_user].name.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            : <img src={props.users[props.active_user].profilePicture} alt="Klubby" />
                                                                    }
                                                                </div>
                                                                : <div className="chat-avatar">
                                                                    {chat.sender === props.user.username ? <img src={avatar1} alt="Klubby" /> :
                                                                        props.users[props.active_user].profilePicture === "Null" ?
                                                                            <div className="chat-user-img align-self-center me-3">
                                                                                <div className="avatar-xs">
                                                                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                        {props.users[props.active_user].name.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            : <img src={props.users[props.active_user].profilePicture} alt="Klubby" />
                                                                    }
                                                                </div>
                                                        }


                                                        <div className="user-chat-content">
                                                            <div className="ctext-wrap">
                                                                <div className="ctext-wrap-content">
                                                                    {
                                                                        chat.content &&
                                                                        <p className="mb-0">
                                                                            {chat.content}
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
                                                                    {
                                                                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{(new Date(parseInt(chat.createdAt)).toISOString())}</span></p>
                                                                    }
                                                                </div>
                                                                {
                                                                    !chat.isTyping &&
                                                                    <UncontrolledDropdown className="align-self-start">
                                                                        <DropdownToggle tag="a">
                                                                            <i className="ri-more-2-fill"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem>Copy <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem>Save <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledDropdown>
                                                                }

                                                            </div>
                                                            {
                                                                chatMessages[key + 1] ? chatMessages[key].userType === chatMessages[key + 1].userType ? null : <div className="conversation-name">{chat.sender === props.user.username ? "The Dip Daddy" : props.users[props.active_user].name}</div> : <div className="conversation-name">{chat.sender === props.user.username ? "Admin" : props.users[props.active_user].name}</div>
                                                            }

                                                        </div>
                                                    </div>
                                                </li>
                                    )
                                }
                            </ul>
                        </SimpleBar>

                        <Modal backdrop="static" isOpen={modal} centered toggle={toggle}>
                            <ModalHeader toggle={toggle}>Forward to...</ModalHeader>
                            <ModalBody>
                                <CardBody className="p-2">
                                    <SimpleBar style={{ maxHeight: "200px" }}>
                                        <SelectContact handleCheck={() => { }} />
                                    </SimpleBar>
                                    <ModalFooter className="border-0">
                                        <Button color="primary">Forward</Button>
                                    </ModalFooter>
                                </CardBody>
                            </ModalBody>
                        </Modal>

                        <ChatInput onaddMessage={addMessage} />
                    </div>

                    <UserProfileSidebar activeUser={props.users[props.active_user]} />

                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user, users } = state.Chat;
    const { userSidebar } = state.Layout;
    const { user, loading, error } = state.Auth;
    return { user, active_user, userSidebar, users };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar, setFullUser })(UserChat));

