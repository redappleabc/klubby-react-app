import React, { Component, useEffect, useState } from 'react';
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Dropdown, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu, CardBody, Alert, Collapse, Card, CardHeader, Modal, ModalHeader, ModalBody, Form, Label, ModalFooter, TabContent, TabPane } from "reactstrap";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import classnames from "classnames";
//simplebar
import SimpleBar from "simplebar-react";
import SelectContact from "../../../components/SelectContact";
//actions
import { setconversationNameInOpenChat, activeUser, createGroup, setFullUser, setActiveTab, setActiveChatSubTab, activeGroup } from "../../../redux/actions"
import group1 from "../../../assets/images/group/group1.png";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import { v4 as uuidv4 } from 'uuid';

import createConversationGQL from '../../../apollo/mutations/createConversation';
import createUserConversationsGQL from '../../../apollo/mutations/createUserConversations';
import removeConversationGQL from '../../../apollo/mutations/removeConversation';
import removeUserConversationBridgeGQL from '../../../apollo/mutations/removeUserConversationBridge';
import apollo_client from '../../../apollo';

import getUsersByUserNameGQL from '../../../apollo/queries/getUsersByUserName';

import { useMutation } from '@apollo/client';

import setReadGQL from '../../../apollo/mutations/setRead';
import add_icon from "../../../assets/images/icons/icon-add.svg";

//components
// import OnlineUsers from "./OnlineUsers";

const RequestChats = (props) => {
    const [searchChat, setSearchChat] = useState("")
    const [focusSearch, setFocusSearch] = useState(false)
    const [recentChatList, setRecentChatList] = useState(props.users)
    const [modalMember, setModalMember] = useState(false)
    const [modalGroup, setModalGroup] = useState(false)
    const [isOpenCollapse, setIsOpenCollapse] = useState(false)
    const [groups, setGroups] = useState(props.groups)
    const [selectedContact, setSelectedContact] = useState([])
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [groupName, setGroupName] = useState("")
    const [groupDesc, setGroupDesc] = useState("")
    const [searchedUserList, setSearchedUserList] = useState([])


    const [createConversationApollo, { }] = useMutation(createConversationGQL)
    const [createUserConversationApollo, { }] = useMutation(createUserConversationsGQL)
    const [removeConversationApollo, { }] = useMutation(removeConversationGQL)
    const [removeUserConversationBridgeApollo, { }] = useMutation(removeUserConversationBridgeGQL)

    let addNewUser = null;

    function toggleSearchFocus() {
        setFocusSearch(!focusSearch)
    }



    function toggleAddMemberModal() {
        if (!modalMember) {
            addNewUser = null
            apollo_client.query({
                query: getUsersByUserNameGQL,
                variables: { username: "" }
            }).then((res) => {
                let searchedUsers = res.data.searchUsers;

                if (searchedUsers) {
                    searchedUsers = searchedUsers.filter(({ username }) => !Object.keys(recentChatList).includes(username))
                    setSearchedUserList(searchedUsers)
                }
                // console.log(searchedUsers)
            }).catch((err) => {
                console.log(err)
            })
        }

        setModalMember(!modalMember)
    }

    function toggleCollapse() {
        setIsOpenAlert(!isOpenCollapse)
    }




    useEffect(() => {
        
        setRecentChatList(props.users)
        console.log("tab/requestchat.js", props.users)
    }, [props.users, props.newDirectMessage])






    function handleCheck(e, contactId) {
        var selected = selectedContact;
        var obj;
        if (e.target.checked) {
            obj = {
                id: contactId,
                name: e.target.value
            };
            selected.push(obj);
            setSelectedContact(selected)
        }
    }

    function handleChangeGroupName(e) {
        setGroupName(e.target.value)
    }

    function handleChangeGroupDesc(e) {
        setGroupDesc(e.target.value)
    }

    function toggleTab(tab) {
        props.setActiveTab(tab)
    }



    function searchUsersByUsername(e) {

        apollo_client.query({
            query: getUsersByUserNameGQL,
            variables: { username: e.target.value }
        }).then((res) => {
            let searchedUsers = res.data.searchUsers;
            if (searchedUsers) {
                searchedUsers = searchedUsers.filter(({ username }) => !Object.keys(recentChatList).includes(username))
                setSearchedUserList(searchedUsers)
            }
            console.log(searchedUsers)
        }).catch((err) => {
            console.log(err)
        })

    }



    function handleChange(e) {
        setSearchChat(e.target.value)
        var search = e.target.value;
        let conversation = recentChatList;
        let filteredArray = [];




        //find conversation name from array
        for (let i = 0; i < conversation.length; i++) {
            if (conversation[i].name.toLowerCase().includes(search) || conversation[i].name.toUpperCase().includes(search))
                filteredArray.push(conversation[i]);
        }

        //set filtered items to state
        setRecentChatList(filteredArray)

        //if input value is blanck then assign whole recent chatlist to array
        if (search === "") {
            setRecentChatList(props.users)

        }
    }

    function openUserChat(e, chat) {
        //e.preventDefault();

        //find index of current chat in array
        var index = chat.conversationId;


        // set activeUser 
        props.activeUser(index);


        var chatList = document.getElementById("request-chat-list");
        var clickedItem = e.target;
        var currentli = null;

        if (chatList) {
            var li = chatList.getElementsByTagName("li");
            //remove coversation user
            for (var i = 0; i < li.length; ++i) {
                if (li[i].classList.contains('active')) {
                    li[i].classList.remove('active');
                }
            }
            //find clicked coversation user
            for (var k = 0; k < li.length; ++k) {
                if (li[k].contains(clickedItem)) {
                    currentli = li[k];
                    break;
                }
            }
        }

        //activation of clicked coversation user
        if (currentli) {
            currentli.classList.add('active');
        }

        var userChat = document.getElementsByClassName("user-chat");
        if (userChat) {
            for (var i = 0; i<userChat.length; i++) userChat[i].classList.add("user-chat-show");
        }



        //removes unread badge if user clicks

        // var unread = document.getElementById("unRead" + chat.id);
        // alert(unread)
        // if (unread) {
        //     unread.style.display = "none";
        // }

        if (props.users[index].messages.length > 0
            && props.users[index].messages[props.users[index].messages.length - 1].sender !== props.user.username
            && props.users[index].read !== props.users[index].messages[props.users[index].messages.length - 1].id) {
            apollo_client.mutate({
                mutation: setReadGQL,
                variables: {
                    conversationId: props.users[index].conversationId,
                    username: props.user.username,
                    messageId: props.users[index].messages[props.users[index].messages.length - 1].id
                }
            }).then((res) => {
               
                let copyallUsers = props.users;
                copyallUsers[index].read = res.data.setRead.read;
                props.setFullUser(copyallUsers)
                console.log("set read success", res);
            }).catch((err) => {
                console.log("set read error ", err)
            })
        }
        let copyAllUsers = props.users;
        copyAllUsers[index].unRead = 0;
        props.setFullUser(copyAllUsers)
    }

    function createUserChat(e, user) {
        //e.preventDefault();
        addNewUser = user


        var chatList = document.getElementById("search-chat-list");
        var clickedItem = e.target;
        var currentli = null;

        if (chatList) {
            var li = chatList.getElementsByTagName("li");
            //remove coversation user
            for (var i = 0; i < li.length; ++i) {
                if (li[i].classList.contains('active')) {
                    li[i].classList.remove('active');
                }
            }
            //find clicked coversation user
            for (var k = 0; k < li.length; ++k) {
                if (li[k].contains(clickedItem)) {
                    currentli = li[k];
                    break;
                }
            }
        }

        //activation of clicked coversation user
        if (currentli) {
            currentli.classList.add('active');
        }



    }

    function onclickAddNewUser() {

        if (addNewUser) {
            let newConversation = {}
            createConversationApollo({
                //variables: newConversation
            }).then((res) => {
                newConversation.id = res.data.createConversation.id;
                console.log("create conversation succeed");
                createUserConversationApollo({
                    variables: { conversationId: newConversation.id, username: props.user.username, name: addNewUser.username }
                })
            }).then((res) => {
                console.log("create user conversation 1 succeed");
                createUserConversationApollo({
                    variables: { conversationId: newConversation.id, username: addNewUser.username, name: props.user.username }
                })
            }).then((res) => {
                console.log("create userconversation 2 succeed")
            }).catch((err) => {
                console.log("new conversation creation", err)

            })
        }

        toggleAddMemberModal();
    }

    function openUserGroup(e, group) {

        //e.preventDefault();

        //find index of current chat in array
        var index = props.groups.indexOf(group);

        // set activeUser 
        props.activeGroup(index);


        var groupList = document.getElementById("group-list");
        var clickedItem = e.target;
        var currentli = null;

        if (groupList) {
            var li = groupList.getElementsByTagName("li");
            //remove coversation user
            for (var i = 0; i < li.length; ++i) {
                if (li[i].classList.contains('active')) {
                    li[i].classList.remove('active');
                }
            }
            //find clicked coversation user
            for (var k = 0; k < li.length; ++k) {
                if (li[k].contains(clickedItem)) {
                    currentli = li[k];
                    break;
                }
            }
        }

        //activation of clicked coversation user
        if (currentli) {
            currentli.classList.add('active');
        }

        var userChat = document.getElementsByClassName("user-group");
        if (userChat) {
            userChat[0].classList.add("user-chat-show");
        }

        //removes unread badge if user clicks
        var unread = document.getElementById("unRead" + group.id);
        if (unread) {
            unread.style.display = "none";
        }
    }


    return (
        <React.Fragment>
            <div>
                <div className='nav-message-header'>
                    <div className='nav-header-header'>
                        
                        <div className='nav-header-title'>
                            <Link to="#" onClick={() => { props.setActiveTab("chat") }}>
                                <i className="ri-arrow-left-s-line"></i>
                            </Link>
                            Requests
                        </div>
                        
                        <UncontrolledDropdown className='header-dropdown'>
                            <DropdownToggle>
                                <div className='header-edit-btn'>
                                    <i className="ri-more-2-fill"></i>
                                </div>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem>
                                    <div>Chat Settings</div> <i className="ri-chat-3-line"></i>
                                </DropdownItem>
                                <DropdownItem>
                                    <div>Members</div> <i className="ri-group-line"></i>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        
                    </div>
                    <div className="nav-header-search-con">
                        <div className={focusSearch ? "search-box chat-search-box active" : "search-box chat-search-box"}>
                            <span>
                                <i className="ri-search-line search-icon font-size-24"></i>
                            </span>
                            <input type="text" onFocus={toggleSearchFocus} onBlur={toggleSearchFocus}  placeholder="Search..." />
                        </div>
                        {/* Search Box */}
                    </div>
                </div>

                <SimpleBar className="chat-message-list">
                    <div className='px-2'>
                        <ul className="list-unstyled chat-list chat-user-list group-list" id="request-chat-list">
                            {
                                Object.entries(recentChatList).map(([key, chat]) => {
                                    return (chat.accepted === false || chat.accepted === null) ?
                                    <li key={key} id={"conversation" + chat.conversationId} className={(key === props.active_user ? "active" : chat.unRead ? "unread" : "") + (chat.isTyping ? " typing" : "")}>
                                        <ContextMenuTrigger id={chat.conversationId}>
                                            <Link to="#" onClick={(e) => openUserChat(e, chat)} >
                                                <div className="group-list-con">
                                                    {
                                                        chat.profilePicture === null || typeof chat.profilePicture === "undefined" ?
                                                            <div className={"chat-user-img " + chat.status + ""}>
                                                                <div className="avatar-xs">
                                                                    <span className="avatar-title rounded-circle text-avatar">
                                                                        {chat.name.charAt(0)}
                                                                    </span>
                                                                </div>
                                                                {
                                                                    chat.status && <span className="user-status"></span>
                                                                }
                                                            </div>
                                                            :
                                                            <div className={"chat-user-img " + chat.status + ""}>
                                                                <img src={chat.profilePicture} className="rounded-circle avatar-xs" alt="klubby" />
                                                                {
                                                                    chat.status && <span className="user-status"></span>
                                                                }
                                                            </div>
                                                    }

                                                    {/* <div className="group-infor-con">
                                                        <h5 className="text-truncate font-size-16 mb-1">{chat.name}</h5>
                                                        <p className="chat-user-message group-description-text font-size-12 mb-0">
                                                            {
                                                                chat.isTyping ?
                                                                    <>
                                                                        typing<span className="animate-typing">
                                                                            <span className="dot ms-1"></span>
                                                                            <span className="dot ms-1"></span>
                                                                            <span className="dot ms-1"></span>
                                                                        </span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {
                                                                            chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle me-1"></i> : null
                                                                        }
                                                                        {
                                                                            chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle me-1"></i> : null
                                                                        }
                                                                        {chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].content : null}
                                                                    </>
                                                            }


                                                        </p>
                                                    </div>
                                                    <div className="font-size-11">{chat.messages && chat.messages.length > 0 ? (new Date(parseInt(chat.messages[(chat.messages).length - 1].createdAt)).toISOString().substring(0,19))  : null}</div>
                                                     */}
                                                    
                                                    <div className='group-infor-con'>
                                                        <div className="flex-1 overflow-hidden group-description">
                                                            <h5 className="text-truncate font-size-16 mb-1">{chat.name}</h5>
                                                            <p className="chat-user-message group-description-text font-size-12 mb-0">
                                                            {
                                                                chat.isTyping ?
                                                                    <>
                                                                        typing<span className="animate-typing">
                                                                            <span className="dot ms-1"></span>
                                                                            <span className="dot ms-1"></span>
                                                                            <span className="dot ms-1"></span>
                                                                        </span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        This is an example of the last message that was sent within this specific chat.
                                                                        {/* {
                                                                            chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle me-1"></i> : null
                                                                        }
                                                                        {
                                                                            chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle me-1"></i> : null
                                                                        }
                                                                        {chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].content : null} */}
                                                                    </>
                                                            }
                                                            </p>
                                                        </div>
                                                        <div className='group-information'>
                                                            <div>
                                                            {chat.messages && chat.messages.length > 0 ? (new Date(parseInt(chat.messages[(chat.messages).length - 1].createdAt)).toISOString().substring(0,19))  : null}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {chat.unRead === 0 ? null :
                                                        <div className="unread-message" id={"unRead" + chat.id}>
                                                            <span className="badge badge-soft-danger rounded-pill">{chat.messages && chat.messages.length > 0 ? chat.unRead >= 20 ? chat.unRead + "+" : chat.unRead : ""}</span>
                                                        </div>
                                                    }
                                                </div>
                                            </Link>
                                        </ContextMenuTrigger>
                                    </li>
                                    :
                                    <div key={key}></div>
                                }
                                    
                                )
                            }
                        </ul>
                    </div>
                </SimpleBar>

                {/* Start chat-message-list  */}

                {/* End chat-message-list */}
            </div>


        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user, users, groups, active_group, newDirectMessage } = state.Chat;
    const { activeChatSubTab } = state.Layout;
    const { user, loading, error } = state.Auth;
    return { active_user, users, groups, active_group, activeChatSubTab, newDirectMessage, user };
};

export default connect(mapStateToProps, { setconversationNameInOpenChat, activeUser, createGroup, setFullUser, setActiveTab, setActiveChatSubTab, activeGroup })(RequestChats);