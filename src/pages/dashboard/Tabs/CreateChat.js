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
import checked from "../../../assets/images/icons/checked.png";
import no_checked from "../../../assets/images/icons/no-checked.png";




//components
// import OnlineUsers from "./OnlineUsers";

const CreateChats = (props) => {

    const [selectedMembers, setSelectedMembers] = useState([]);

    const [focusSearch, setFocusSearch] = useState(false)
    const [searchedUserList, setSearchedUserList] = useState([])

    const [createConversationApollo, { }] = useMutation(createConversationGQL)
    const [createUserConversationApollo, { }] = useMutation(createUserConversationsGQL)

    const delSelectedMember = (memberId) => {
        console.log(memberId);
        selectedMembers.splice(selectedMembers.indexOf(memberId), 1);
        setSelectedMembers([...selectedMembers]);
        // console.log("ddddddddddddddddddddd", selectedMembers[parseInt(index)]);

        if (memberId) document.getElementById(memberId).classList.remove("active");
    }

    let addNewUser = null;

    function toggleSearchFocus() {
        setFocusSearch(!focusSearch)
    }


    useEffect(() => {
        addNewUser = null
        apollo_client.query({
            query: getUsersByUserNameGQL,
            variables: { username: "" }
        }).then((res) => {
            let searchedUsers = res.data.searchUsers;

            if (searchedUsers) {
                // searchedUsers = searchedUsers.filter(({ username }) => !Object.keys(props.users).includes(username))
                setSearchedUserList(searchedUsers)
            }
            console.log("searched userqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",searchedUsers)
        }).catch((err) => {
            console.log(err)
        })
    }, [props.users])



    function searchUsersByUsername(e) {

        apollo_client.query({
            query: getUsersByUserNameGQL,
            variables: { username: e.target.value }
        }).then((res) => {
            let searchedUsers = res.data.searchUsers;
            if (searchedUsers) {
                // searchedUsers = searchedUsers.filter(({ username }) => !Object.keys(props.users).includes(username))
                setSearchedUserList(searchedUsers)
            }
            console.log(searchedUsers)
        }).catch((err) => {
            console.log(err)
        })

    }




    function createUserChat(e, user) {
        //e.preventDefault();
        addNewUser = user


        var chatList = document.getElementById("search-chat-list");
        var clickedItem = e.target;
        var currentli = null;

        if (chatList) {
            var li = chatList.getElementsByTagName("li");
            for (var k = 0; k < li.length; ++k) {
                if (li[k].contains(clickedItem)) {
                    currentli = li[k];
                    break;
                }
            }

        }

        if (currentli.classList.contains("active")) {
            console.log("acitve")
            currentli.classList.remove('active');
            selectedMembers.splice(selectedMembers.indexOf(currentli.id), 1);
        }
        else {
            selectedMembers.push(currentli.id);
            currentli.classList.add('active');
        }
        setSelectedMembers([...selectedMembers]);

    }

    function onclickAddNewUser() {

        if (selectedMembers.length !== 0) {


            let newConversation = {}
            createConversationApollo({
                //variables: newConversation
            }).then((res) => {
                newConversation.id = res.data.createConversation.id;
                console.log("create conversation succeed");
                console.log("props.user.username", props.user.username)
                createUserConversationApollo({
                    variables: { accepted: true, conversationId: newConversation.id, username: props.user.username, name: selectedMembers.join(",") }
                })
            }).then((res) => {
                console.log("create user conversation 1 succeed");
                for (let i = 0; i < selectedMembers.length; i++) {
                    let temp = [...selectedMembers];
                    temp[i] = props.user.username;
                    createUserConversationApollo({
                        variables: { accepted: false, conversationId: newConversation.id, username: selectedMembers[i], name: temp.join(",") }
                    })
                }
            }).then((res) => {
                console.log("create userconversation 2 succeed")
                props.setActiveTab("chat")
            }).catch((err) => {
                console.log("new conversation creation", err)

            })

            setSelectedMembers([]);
            
            // props.setFullUser(...props.users, {accepted: true, conversationId: newConversation.id, username: props.user.username, name: selectedMembers.join(",") } ])

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
                            New Chat
                        </div>
                        <div>
                            <button className="add-chat-btn" onClick={() => { onclickAddNewUser() }} >Chat</button>
                        </div>

                    </div>
                    <div className='selected-member-main'>
                        <div>
                            To:
                        </div>
                        <div className='selected-members-cover'>
                            {
                                selectedMembers.length === 0 ? <div className='text'>Nobody selected</div>
                                    :
                                    <div className='selected-members'>
                                        {
                                            selectedMembers.map((member, key) =>
                                                <span className='selected-member-item' key={key}>
                                                    {member}
                                                    <span onClick={() => { delSelectedMember(member) }}><i className="ri-close-fill"></i></span>
                                                </span>
                                            )
                                        }
                                    </div>
                            }

                        </div>
                    </div>
                    <div className="nav-header-search-con">
                        <div className={focusSearch ? "search-box chat-search-box active" : "search-box chat-search-box"}>
                            <span>
                                <i className="ri-search-line search-icon font-size-24"></i>
                            </span>
                            <input type="text" onFocus={toggleSearchFocus} onBlur={toggleSearchFocus} onChange={(e) => { searchUsersByUsername(e) }} placeholder="Search..." />
                        </div>
                        {/* Search Box */}
                    </div>
                </div>

                <SimpleBar className="create-chat-message">
                    <div className=''>
                        <ul className="list-unstyled chat-list" id="search-chat-list">
                            {
                                searchedUserList.map((searchedUser, key) =>
                                    <li key={key} id={searchedUser.username} className={selectedMembers.includes(searchedUser.username) ? "searched-user-list active" : "searched-user-list"}>
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

                                                <div className="flex-1 overflow-hidden chat-list-text">
                                                    <h5 className="text-truncate font-size-15 mb-1">{searchedUser.username}</h5>
                                                    <h6 className="text-truncate font-size-15 mb-1">@ {searchedUser.username}</h6>
                                                </div>
                                                <div className='check'>
                                                    <img className='no-checked' src={no_checked} />
                                                    <img className='checked' src={checked} />
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