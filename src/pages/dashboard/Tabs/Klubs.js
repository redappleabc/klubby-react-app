import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//simplebar
import SimpleBar from "simplebar-react";
//actions
import { setconversationNameInOpenChat, activeUser, createGroup, setFullUser, setActiveTab, setActiveChatSubTab, activeGroup } from "../../../redux/actions"
import add_icon from "../../../assets/images/icons/icon-add.svg";
import { DirectiveLocation } from 'graphql';



//components
// import OnlineUsers from "./OnlineUsers";

const Chats = (props) => {
    const [focusSearch, setFocusSearch] = useState(false)
    const [groups, setGroups] = useState(props.groups)


    function toggleSearchFocus() {
        setFocusSearch(!focusSearch)
    }

    useEffect(() => {
        setGroups(props.groups)
        console.log("tab/chat.js", props.users)
    }, [props.users, props.newDirectMessage])







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
                            Klubs
                        </div>
                        <div>
                            <button className='header-add-btn' onClick={alert}><img src={add_icon}/></button>
                        </div>
                    </div>
                    <div className="nav-header-search-con">
                        <div className={focusSearch ? "search-box chat-search-box active" : "search-box chat-search-box"}>
                            <span>
                                <i className="ri-search-line search-icon font-size-24"></i>
                            </span>
                            <input type="text" onFocus={toggleSearchFocus} onBlur={toggleSearchFocus} placeholder="Search..." />
                        </div>
                        {/* Search Box */}
                    </div>
                </div>
                    {/* klub tab start */}
                <SimpleBar className="chat-message-list">
                        <ul className="list-unstyled chat-list chat-user-list" id="group-list">
                            {
                                groups.map((group, key) =>
                                    <li key={key} id={"conversation" + key} className={group.unRead ? "unread" : group.isTyping ? "typing" : key === props.active_user ? "active" : ""}>
                                        <Link to="#" onClick={(e) => openUserGroup(e, group)}>
                                            <div className="group-list-con">
                                                {
                                                    group.profilePicture === "Null" ?
                                                        <div className={"chat-user-img " + group.status}>
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                    {group.name.charAt(0)}
                                                                </span>
                                                            </div>
                                                            {
                                                                group.status && <span className="user-status"></span>
                                                            }
                                                        </div>
                                                        :
                                                        <div className={"chat-user-img " + group.status}>
                                                            <img src={group.profilePicture} className="rounded-circle avatar-xs" alt="klubby" />
                                                            {
                                                                group.status && <span className="user-status"></span>
                                                            }
                                                        </div>
                                                }

                                                <div className='group-infor-con'>
                                                    <div className="flex-1 overflow-hidden group-description">
                                                        <h5 className="text-truncate font-size-16 mb-1">{group.name}</h5>
                                                        <p className="chat-user-message group-description-text font-size-12 mb-0">
                                                            {group.description}
                                                        </p>
                                                    </div>
                                                    <div className='group-information'>
                                                        <div>
                                                            <i className="ri-group-line"></i>5,256
                                                        </div>
                                                        <div>
                                                            <span></span>
                                                                189
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                </SimpleBar>
                {/* Start chat-message-list  */}

                {/* End chat-message-list */}
            </div>
            {/* End add group Modal */}
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