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
import { openUserSidebar, setFullPost } from "../../../redux/actions";

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from 'react-i18next';

function UserChat(props) {

    const ref = useRef();

    const [modal, setModal] = useState(false);

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    //demo conversation messages
    //userType must be required
    const [allUsers] = useState(props.recentPostList);
    const [postMessage, setpostMessage] = useState(props.recentPostList[props.active_post].messages);

    useEffect(() => {
        setpostMessage(props.recentPostList[props.active_post].messages);
        ref.current.recalculate();
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }, [props.active_post, props.recentPostList]);

    const toggle = () => setModal(!modal);

    const addMessage = (message, type) => {
        var messageObj = null;

        let d = new Date();
        var n = d.getSeconds();

        //matches the message type is text, file or image, and create object according to it
        switch (type) {
            case "textMessage":
                messageObj = {
                    id: postMessage.length + 1,
                    message: message,
                    time: "00:" + n,
                    userType: "sender",
                    image: avatar4,
                    isFileMessage: false,
                    isImageMessage: false
                }
                break;

            case "fileMessage":
                messageObj = {
                    id: postMessage.length + 1,
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
                    id: postMessage.length + 1,
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
        setpostMessage([...postMessage, messageObj]);

        let copyallUsers = [...allUsers];
        copyallUsers[props.active_post].messages = [...postMessage, messageObj];
        copyallUsers[props.active_post].isTyping = false;
        props.setFullPost(copyallUsers);

        scrolltoBottom();
    }

    function scrolltoBottom() {
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }


    const deleteMessage = (id) => {
        let conversation = postMessage;

        var filtered = conversation.filter(function (item) {
            return item.id !== id;
        });

        setpostMessage(filtered);
    }


    return (
        <React.Fragment>
                <div className='post-chat'>
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
                                        postMessage.map((chat, key) =>
                                            chat.isToday && chat.isToday === true ? <li key={"dayTitle" + key}>
                                                <div className="chat-day-title">
                                                    <span className="title">Today</span>
                                                </div>
                                            </li> :
                                                (props.recentPostList[props.active_post].isGroup === true) ?
                                                    <li key={key} className={chat.userType === "sender" ? "right" : ""}>
                                                        <div className="conversation-list">

                                                            <div className="chat-avatar">
                                                                {chat.userType === "sender" ? <img src={avatar1} alt="Klubby" /> :
                                                                    chat.userimg === "Null" ?
                                                                        <div className="chat-user-img align-self-center me-3">
                                                                            <div className="avatar-xs">
                                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                    {chat.userName && chat.userName.charAt(0)}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        : <img src={chat.userimg} alt="Klubby" />
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
                                                                                <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                                <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                                <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                                                <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                                            </DropdownMenu>
                                                                        </UncontrolledDropdown>
                                                                    }

                                                                </div>
                                                                {
                                                                    <div className="conversation-name">{chat.userType === "sender" ? "Patricia Smith" : chat.username}</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                    :
                                                    <li key={key} className={chat.userType === "sender" ? "right" : ""}>
                                                        <div className="conversation-list">
                                                            {
                                                                //logic for display user name and profile only once, if current and last messaged sent by same receiver
                                                                postMessage[key + 1] ? postMessage[key].userType === postMessage[key + 1].userType ?

                                                                    <div className="chat-avatar">
                                                                        <div className="blank-div"></div>
                                                                    </div>
                                                                    :
                                                                    <div className="chat-avatar">
                                                                        {chat.userType === "sender" ? <img src={avatar1} alt="Klubby" /> :
                                                                            chat.userimg === "Null" ?
                                                                                <div className="chat-user-img align-self-center me-3">
                                                                                    <div className="avatar-xs">
                                                                                        <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                            {chat.username.charAt(0)}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                : <img src={chat.userimg} alt="Klubby" />
                                                                        }
                                                                    </div>
                                                                    : <div className="chat-avatar">
                                                                        {chat.userType === "sender" ? <img src={avatar1} alt="Klubby" /> :
                                                                            chat.userimg === "Null" ?
                                                                                <div className="chat-user-img align-self-center me-3">
                                                                                    <div className="avatar-xs">
                                                                                        <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                            {chat.username.charAt(0)}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                : <img src={chat.userimg} alt="Klubby" />
                                                                        }
                                                                    </div>
                                                            }


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
                                                                                <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                                <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                                <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                                                <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                                            </DropdownMenu>
                                                                        </UncontrolledDropdown>
                                                                    }

                                                                </div>
                                                                {
                                                                   chat.username
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

                        <UserProfileSidebar activeUser={props.recentPostList[props.active_post]} />

                    </div>
                </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_post } = state.Chat;
    const { userSidebar } = state.Layout;
    return { active_post, userSidebar };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar, setFullPost })(UserChat));

