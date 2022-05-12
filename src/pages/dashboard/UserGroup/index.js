import React, { useState, useEffect, useRef } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Modal, ModalHeader, ModalBody, CardBody, Button, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import SimpleBar from "simplebar-react";
import { TabContent, TabPane } from "reactstrap";
import { withRouter } from 'react-router-dom';

//Import Components
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import SelectContact from "../../../components/SelectContact";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";

//actions
import { openUserSidebar, setFullGroup } from "../../../redux/actions";

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";


function UserGroup(props) {

    const ref = useRef();

    const [modal, setModal] = useState(false);


    //demo conversation messages
    //userType must be required
    const [allGroups] = useState(props.groups);
    const [chatMessages, setchatMessages] = useState(props.groups[props.active_group].messages);

    useEffect(() => {

        setchatMessages(props.groups[props.active_group].messages);
        ref.current.recalculate();
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }, [props.active_group, props.groups]);

    const toggle = () => setModal(!modal);

    const addMessage = (message, type) => {
        var messageObj = null;

        let d = new Date();
        var n = d.getSeconds();

        //matches the message type is text, file or image, and create object according to it
        switch (type) {
            case "textMessage":
                messageObj = {
                    id: chatMessages[props.activeKlubTab].length + 1,
                    message: message,
                    time: "00:" + n,
                    userType: "sender",
                    image: avatar4,
                    isFileMessage: false,
                    isImageMessage: false,
                }
                break;

            case "fileMessage":
                messageObj = {
                    id: chatMessages[props.activeKlubTab].length + 1,
                    message: 'file',
                    fileMessage: message.name,
                    size: message.size,
                    time: "00:" + n,
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
                    id: chatMessages[props.activeKlubTab].length + 1,
                    message: 'image',
                    imageMessage: imageMessage,
                    size: message.size,
                    time: "00:" + n,
                    userType: "sender",
                    image: avatar4,
                    isImageMessage: true,
                    isFileMessage: false
                }
                break;

            default:
                break;
        }

        //add message object to chat      
        
        chatMessages[props.activeKlubTab] = [...chatMessages[props.activeKlubTab], messageObj];
          
        setchatMessages(chatMessages);

        console.log(chatMessages);
        let copyallGroups = [...allGroups];
        copyallGroups[props.active_group].messages = chatMessages;
        props.setFullGroup(copyallGroups);

        scrolltoBottom();
    }

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
                <div className='user-group'>
                    <div className="d-lg-flex">

                        <div className={props.groupsidebar ? "w-70" : "w-100"}>

                            {/* render user head */}
                            <UserHead />

                            <SimpleBar
                                style={{ maxHeight: "100%" }}
                                ref={ref}
                                className="chat-conversation p-3 p-lg-4 klubs-con"
                                id="messages">
                                <TabContent activeTab={props.activeKlubTab}>
                                    {
                                        Object.keys(chatMessages).map((type, _key) => 
                                        <TabPane key={_key} tabId={type} id={"klubs_" + type}>  
                                            <ul className="list-unstyled mb-0">
                                                {
                                                    chatMessages[type].map((chat, key) =>
                                                        chat.isToday && chat.isToday === true ? <li key={"dayTitle" + key}>
                                                            <div className="chat-day-title">
                                                                <span className="title">Today</span>
                                                            </div>
                                                        </li> :

                                                        <li key={key} className={chat.userType === "sender" ? "right" : ""}>
                                                            <div className="conversation-list">

                                                                <div className="chat-avatar">
                                                                    {chat.userType === "sender" ? <img src={avatar1} alt="Klubby" /> :
                                                                        props.groups[props.active_group].profilePicture === "Null" ?
                                                                            <div className="chat-user-img align-self-center me-3">
                                                                                <div className="avatar-xs">
                                                                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                        {chat.userName && chat.userName.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            : <img src={props.groups[props.active_group].profilePicture} alt="Klubby" />
                                                                    }
                                                                </div>

                                                                <div className="user-chat-content">
                                                                    <div className="ctext-wrap">
                                                                        <div className="ctext-wrap-content">
                                                                            {
                                                                                chat.message &&
                                                                                <p className="mb-0">
                                                                                    {chat.message}
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
                                                                                !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
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
                                                                        <div className="conversation-name">{chat.userType === "sender" ? "The Dip Daddy" : chat.userName}</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </TabPane>
                                        )
                                        
                                    }
                                </TabContent>
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

                        <UserProfileSidebar activeUser={props.groups[props.active_group]} />

                    </div>                   
                </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_group, groups } = state.Chat;
    const { userSidebar, activeKlubTab } = state.Layout;
    return { active_group, userSidebar, groups, activeKlubTab };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar, setFullGroup })(UserGroup));

