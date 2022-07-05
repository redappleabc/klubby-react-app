import React, { Component, useEffect, useState } from 'react';
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, CardBody, Alert, Collapse, Card, CardHeader, Modal, ModalHeader, ModalBody, Form, Label, ModalFooter, TabContent, TabPane } from "reactstrap";

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

const CreateChats = (props) => {
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
    const [notiDropdown, setNotiDropdown] = useState(false)


    const [createConversationApollo, { }] = useMutation(createConversationGQL)
    const [createUserConversationApollo, { }] = useMutation(createUserConversationsGQL)
    const [removeConversationApollo, { }] = useMutation(removeConversationGQL)
    const [removeUserConversationBridgeApollo, { }] = useMutation(removeUserConversationBridgeGQL)

    let addNewUser = null;

    function toggleSearchFocus() {
        setFocusSearch(!focusSearch)
    }


    function toggleAddGroupModal() {
        setModalGroup(!modalGroup)
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
    }, [])


    function addGroup() {
        if (selectedContact.length > 2) {
            // gourpId : 5, name : "#Project-aplha", profilePicture : "Null", isGroup : true, unRead : 0, isNew : true, desc : "project related Group",
            var obj = {
                gourpId: `${Date.now()}-${uuidv4()}`,
                name: groupName,
                profilePicture: "Null",
                isGroup: true,
                unRead: 0,
                isNew: true,
                desc: groupDesc,
                members: selectedContact,
                messages: { "main": [{}], "whale": [{}], "announcement": [{}] }
            }
            //call action for creating a group
            const newGroup = {
                createdAt: `${Date.now()}`,
                id: obj.gourpId,
                name: obj.name
            }
            console.log(newGroup)
            apollo_client.mutate({
                mutation: createConversationGQL,
                variables: newGroup
            }).then((res) => { console.log(res) })
                .catch((err) => { console.log(err) })
            props.createGroup(obj);
            console.log(obj);
            console.log(groups);
            toggleAddGroupModal();

        } else if (selectedContact.length === 1) {
            setMessage("Minimum 2 members required!!!")
            setIsOpenAlert(true)
        } else {
            setMessage("Please Select Members!!!")
            setIsOpenAlert(true)
        }
        setTimeout(
            function () {
                setIsOpenAlert(false)
            }
                .bind(this),
            3000
        );
    }

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


    function setNoticDropdown() {
        setNotiDropdown(!notiDropdown)
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


    const deleteConversation = (e, conversationId, username) => {
        //e.preventDefault()
        removeUserConversationBridgeApollo({
            variables: {
                username: props.user.username,
                conversationId: conversationId
            }
        }).then((res) => {
            console.log("delete userconversationbridge self succeed")
            removeUserConversationBridgeApollo({
                variables: {
                    username: username,
                    conversationId: conversationId
                }
            })
        }).then((res) => {
            console.log("delete userconversationbridge other succeed")
            removeConversationApollo({
                variables: {
                    conversationId: conversationId
                }
            })
        }).then((res) => {
            console.log("delete conversation succeed")
        }).catch((res) => {
            console.log("error delete conversation", res);
        })

        console.log(conversationId)
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
                            New Chat
                        </div>
                        <div>
                            <buttonn className="add-chat-btn">Chat</buttonn>
                        </div>
                    </div>
                    <div className="nav-header-search-con">
                        <div className={focusSearch ? "search-box chat-search-box active" : "search-box chat-search-box"}>
                            <span>
                                <i className="ri-search-line search-icon font-size-24"></i>
                            </span>
                            <input type="text" onFocus={toggleSearchFocus} onBlur={toggleSearchFocus} onChange={(e)=>{searchUsersByUsername(e)}} placeholder="Search..." />
                        </div>
                        {/* Search Box */}
                    </div>
                </div>

                <SimpleBar className="">
                    <div className=''>
                        <ul className="list-unstyled chat-list" id="search-chat-list">
                            {
                                searchedUserList.map((searchedUser, key) =>
                                    <li key={key} id={"searchedUser" + key}>
                                        <Link to="#" onClick={(e) => { createUserChat(e, searchedUser) }}>
                                            <div className="d-flex align-items-center">
                                                {
                                                    typeof searchedUser.profilePicture === "undefined" || searchedUser.profilePicture === null ?
                                                        <div className={"chat-user-img " + "chat.status" + ""}>
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                    {searchedUser.username.charAt(0)}
                                                                </span>
                                                            </div>
                                                            {/* {
                                                                        chat.status && <span className="user-status"></span>
                                                                    } */}
                                                        </div>
                                                        :
                                                        <div className={"chat-user-img " + "chat.status" + ""}>
                                                            <img src={avatar1} className="rounded-circle avatar-xs" alt="klubby" />
                                                            {/* {
                                                                        chat.status && <span className="user-status"></span>
                                                                    } */}
                                                        </div>
                                                }

                                                <div className="flex-1 overflow-hidden">
                                                    <h5 className="text-truncate font-size-15 mb-1">{searchedUser.username}</h5>

                                                </div>
                                            </div>

                                        </Link>
                                    </li>
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

export default connect(mapStateToProps, { setconversationNameInOpenChat, activeUser, createGroup, setFullUser, setActiveTab, setActiveChatSubTab, activeGroup })(CreateChats);