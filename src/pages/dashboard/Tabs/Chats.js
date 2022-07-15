import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

//simplebar
import SimpleBar from "simplebar-react";
//actions
import { setconversationNameInOpenChat, activeUser, createGroup, setFullUser, setActiveTab, setActiveChatSubTab, activeGroup } from "../../../redux/actions"
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

const Chats = (props) => {
    const [focusSearch, setFocusSearch] = useState(false)
    const [searchedUserList, setSearchedUserList] = useState([])

    const [recentChatList, setRecentChatList] = useState(props.users);
    const [request, setRequest] = useState(0);

    const [removeConversationApollo, { }] = useMutation(removeConversationGQL)
    const [removeUserConversationBridgeApollo, { }] = useMutation(removeUserConversationBridgeGQL)


    
    function toggleSearchFocus() {
        setFocusSearch(!focusSearch)
    }


    useEffect(()=> {
        setRequest(Object.values(recentChatList).filter((item)=> (item.accepted === false || item.accepted === null)).length)
    }, [recentChatList])

    useEffect(() => {
        setRecentChatList(props.users)
        searchUsersByUsername("");
        console.log("tab/chat.js", props.users)
    }, [props.users, props.newDirectMessage])


    function searchUsersByUsername(key) {

        apollo_client.query({
            query: getUsersByUserNameGQL,
            variables: { username: key }
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


    function openUserChat(e, chat) {
        //e.preventDefault();

        //find index of current chat in array
        var index = chat.conversationId;


        // set activeUser 
        props.activeUser(index);


        var chatList = document.getElementById("chat-list");
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
            userChat[0].classList.add("user-chat-show");
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


    const deleteConversation = (e, conversationId) => {
        //e.preventDefault()
        console.log("props.user.username", props.user.username)
        removeUserConversationBridgeApollo({
            variables: {
                username: props.user.username,
                conversationId: conversationId
            }
        }).then((res) => {
            console.log("delete userconversationbridge self succeed")
            console.log(res)
        })

        console.log(conversationId)
    }


    return (
        <React.Fragment>
            <div>
            <div className='nav-message-header'>
                    <div className='nav-header-header'>
                        <div className='nav-header-title'>
                            Chat
                        </div>
                        
                        <div>
                            {
                                request > 0 ? 
                                <span className='nav-header-link' onClick={()=>{props.setActiveTab("request-chat")}}>
                                    {`${request} Request`} 
                                </span>
                                :
                                <></>
                            }
                            <button className='header-add-btn' onClick={()=>{props.setActiveTab("create-chat")}}><img src={add_icon}/></button>
                        </div>

                    </div>
                    <div className="nav-header-search-con">
                        <div className={focusSearch ? "search-box chat-search-box active" : "search-box chat-search-box"}>
                            <span>
                                <i className="ri-search-line search-icon font-size-24"></i>
                            </span>
                            <input type="text" onFocus={toggleSearchFocus} onBlur={toggleSearchFocus} onChange={(e) => { searchUsersByUsername(e.target.value) }} placeholder="Search..." />
                        </div>
                        {/* Search Box */}
                    </div>
                </div>

                <SimpleBar className="chat-message-list">
                    <div className='px-2'>
                        <ul className="list-unstyled chat-list chat-user-list group-list" id="chat-list">
                            {
                                Object.entries(recentChatList).map(([key, chat]) =>
                                    {
                                        return chat.accepted === true ? 
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
                                            <ContextMenu className="con-context-menu" id={chat.conversationId}>
                                                <MenuItem onClick={(e) => { deleteConversation(e, chat.conversationId) }}>
                                                    <div className="con-context-item">
                                                        Delete Conversation<i className="ri-delete-bin-line float-end text-muted"></i>
                                                    </div>

                                                </MenuItem>
                                            </ContextMenu>
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

export default connect(mapStateToProps, { setconversationNameInOpenChat, activeUser, createGroup, setFullUser, setActiveTab, setActiveChatSubTab, activeGroup })(Chats);