import React, { Component, useEffect, useState } from 'react';
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, CardBody, Alert, Collapse, Card, CardHeader, Modal, ModalHeader, ModalBody, Form, Label, ModalFooter, TabContent, TabPane } from "reactstrap";
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
import apollo_client from '../../../apollo';
import { create } from 'yup/lib/Reference';
import getUsersByUserNameGQL from '../../../apollo/queries/getUsersByUserName';

import setReadGQL from '../../../apollo/mutations/setRead';

//components
// import OnlineUsers from "./OnlineUsers";

const Chats = (props) => {
    const [searchChat, setSearchChat] = useState("")
    const [focusSearch, setFocusSearch] = useState(false)
    const [recentChatList, setRecentChatList] = useState(props.users)
    const [modal, setModal] = useState(false)
    const [isOpenCollapse, setIsOpenCollapse] = useState(false)
    const [groups, setGroups] = useState(props.groups)
    const [selectedContact, setSelectedContact] = useState([])
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [groupName, setGroupName] = useState("")
    const [groupDesc, setGroupDesc] = useState("")
    const [searchedUserList, setSearchedUserList] = useState([])
    const [notiDropdown, setNotiDropdown] = useState(false)


    function toggleSearchFocus() {


        setFocusSearch(!focusSearch)
        if (props.activeChatSubTab === "chat-chat") {
            props.setActiveChatSubTab('search-chat-chat');
            apollo_client.query({
                query: getUsersByUserNameGQL,
                variables: { username: "" }
            }).then((res) => {
                let searchedUsers = res.data.getAllUsers;
                if (searchedUsers)
                    setSearchedUserList(searchedUsers)
                console.log(searchedUsers)
            }).catch((err) => {
                console.log(err)
            })

        }




    }

    function toggle() {
        setModal(!modal)
    }

    function toggleCollapse() {
        setIsOpenAlert(!isOpenCollapse)
    }




    useEffect(() => {
        setGroups(props.groups)
        setRecentChatList(props.users)
        console.log("tab/chat.js", props.users)
    }, [props.users, props.newDirectMessage])




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
            toggle();

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



    function handleChange(e) {
        setSearchChat(e.target.value)
        var search = e.target.value;
        let conversation = recentChatList;
        let filteredArray = [];

        if (props.activeChatSubTab === 'search-chat-chat') {
            apollo_client.query({
                query: getUsersByUserNameGQL,
                variables: { username: search }
            }).then((res) => {
                let searchedUsers = res.data.getAllUsers;
                setSearchedUserList(searchedUsers)
                console.log(searchedUsers)
            }).catch((err) => {
                console.log(err)
            })
        }


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
        e.preventDefault();

        //find index of current chat in array
        var index = chat.name;

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
        if (props.users[index].messages.length > 0) {
            apollo_client.mutate({
                mutation: setReadGQL,
                variables: {
                    conversationId: props.users[index].conversationId,
                    username: index,
                    messageId: props.users[index].messages[props.users[index].messages.length - 1].id
                }
            }).then((res) => {
                console.log("set read success");
            }).catch((err) => {
                console.log("set read error ", err)
            })
        }
        let copyAllUsers = props.users;
        copyAllUsers[index].unRead = 0;
        props.setFullUser(copyAllUsers)
    }

    function createUserChat(e, user) {
        e.preventDefault();
        //find index of current chat in array
        var index = user.username;

        if (typeof props.users[index] === "undefined") {
            let _searchedUser = {};
            _searchedUser.username = user.username;
            _searchedUser.name = user.username;
            _searchedUser.conversationId = null
            _searchedUser.isGroup = false;
            _searchedUser.status = "online";
            _searchedUser.profilePicture = "Null"
            _searchedUser.messages = []


            props.setFullUser({ ...props.users, [_searchedUser.username]: _searchedUser })
            console.log("aaaaaaaaaaaaaaaaaaaa", props.users)
        }
        // set activeUser 

        props.activeUser(index);


        const searchedUserList = document.getElementById("chat-list");
        var clickedItem = e.target;
        var currentli = null;

        if (searchedUserList) {
            var li = searchedUserList.getElementsByTagName("li");
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

    }

    function openUserGroup(e, group) {

        e.preventDefault();

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
                    <div className="px-3 pt-4 leftsidebar-home-header">
                        <div>
                            <img src={avatar1} className="rounded-circle avatar-xs" alt="Klubby" />
                        </div>
                        <div className={focusSearch ? "search-box chat-search-box active" : "search-box chat-search-box"}>
                            <InputGroup size="lg" className="mb-3 rounded-lg">
                                <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                    <i className="ri-search-line search-icon font-size-18"></i>
                                </span>
                                <Input type="text" value={searchChat} onChange={(e) => handleChange(e)} onFocus={toggleSearchFocus} onBlur={toggleSearchFocus} className="form-control bg-light" placeholder="Search..." />
                            </InputGroup>
                        </div>
                        {/* Search Box */}
                        <div className={focusSearch ? 'home-header-btn-container hidden' : 'home-header-btn-container'}>
                            <div className="user-chat-nav float-end">
                                <div className="create-group">
                                    {/* Button trigger modal */}
                                    <button onClick={toggle} className="group-add-btn">
                                        <i className="ri-group-line me-1"></i>
                                    </button>
                                </div>
                            </div>
                            <div className='home-header-btn'>
                                <Dropdown nav isOpen={notiDropdown} className="nav-item btn-group dropup profile-user-dropdown" toggle={setNoticDropdown}>
                                    <DropdownToggle className="nav-link" tag="a">
                                        <div className='notification-cover'><i className="ri-notification-3-line"><div className='notification-badge'>2</div></i></div>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => { toggleTab('home'); }}><img src={group1} alt="" className="profile-user rounded-circle" /> Rahui Gautam </DropdownItem>
                                        <DropdownItem onClick={() => { toggleTab('home'); }}><img src={group1} alt="" className="profile-user rounded-circle" /> Rahui Gautam </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='chat-header-btn-container p-3'>
                        <button className={`chat-nav-header-btn ${classnames({ active: props.activeChatSubTab === 'chat-klubs' })}`} onClick={() => { props.setActiveChatSubTab('chat-klubs'); }} >
                            Klubs
                        </button>
                        <button className={`chat-nav-header-btn ${classnames({ active: props.activeChatSubTab === 'chat-chat' })}`} onClick={() => { props.setActiveChatSubTab('chat-chat'); }}>
                            Messages
                        </button>
                    </div>
                </div>
                <TabContent>
                    <TabPane tabId="chat-chat" id="pills-chat-chat" className={classnames({ active: props.activeChatSubTab === 'chat-chat' })}>

                        <SimpleBar className="chat-message-list">
                            <div className='px-2'>
                                <ul className="list-unstyled chat-list chat-user-list" id="chat-list">
                                    {
                                        Object.entries(recentChatList).map(([key, chat]) =>
                                            <li key={key} id={"conversation" + key} className={(key === props.active_user ? "active" : chat.unRead ? "unread" : "") + (chat.isTyping ? " typing" : "")}>
                                                <Link to="#" onClick={(e) => openUserChat(e, chat)}>
                                                    <div className="d-flex">
                                                        {
                                                            chat.profilePicture === "Null" || typeof chat.profilePicture === "undefined" ?
                                                                <div className={"chat-user-img " + chat.status + " align-self-center me-3 ms-0"}>
                                                                    <div className="avatar-xs">
                                                                        <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                            {chat.name.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                    {
                                                                        chat.status && <span className="user-status"></span>
                                                                    }
                                                                </div>
                                                                :
                                                                <div className={"chat-user-img " + chat.status + " align-self-center me-3 ms-0"}>
                                                                    <img src={chat.profilePicture} className="rounded-circle avatar-xs" alt="klubby" />
                                                                    {
                                                                        chat.status && <span className="user-status"></span>
                                                                    }
                                                                </div>
                                                        }

                                                        <div className="flex-1 overflow-hidden">
                                                            <h5 className="text-truncate font-size-15 mb-1">{chat.name}</h5>
                                                            <p className="chat-user-message text-truncate mb-0">
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
                                                        <div className="font-size-11">{chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].createdAt : null}</div>
                                                        {chat.unRead === 0 ? null :
                                                            <div className="unread-message" id={"unRead" + chat.id}>
                                                                <span className="badge badge-soft-danger rounded-pill">{chat.messages && chat.messages.length > 0 ? chat.unRead >= 20 ? chat.unRead + "+" : chat.unRead : ""}</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </SimpleBar>
                    </TabPane>
                    <TabPane tabId="search-chat-chat" id="search-pills-chat-chat" className={classnames({ active: props.activeChatSubTab === 'search-chat-chat' })}>

                        <SimpleBar className="chat-message-list">
                            <div className='px-2'>
                                <ul className="list-unstyled chat-list chat-user-list" id="chat-list">
                                    {
                                        searchedUserList.map((searchedUser, key) =>
                                            <li key={key} id={"searchedUser" + key}>
                                                <Link to="#" onClick={(e) => createUserChat(e, searchedUser)}>
                                                    <div className="d-flex">
                                                        {
                                                            typeof searchedUser.profilePicture === "undefined" || searchedUser.profilePicture === null ?
                                                                <div className={"chat-user-img " + "chat.status" + " align-self-center me-3 ms-0"}>
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
                                                                <div className={"chat-user-img " + "chat.status" + " align-self-center me-3 ms-0"}>
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
                    </TabPane>
                    {/* chat tab end */}
                    {/* klub tab start */}
                    <TabPane tabId="chat-klubs" id="pills-chat-klubs" className={classnames({ active: props.activeChatSubTab === 'chat-klubs' })}>
                        <SimpleBar className="chat-message-list">
                            <div className='px-2'>
                                <ul className="list-unstyled chat-list chat-user-list" id="group-list">
                                    {
                                        groups.map((group, key) =>
                                            <li key={key} id={"conversation" + key} className={group.unRead ? "unread" : group.isTyping ? "typing" : key === props.active_user ? "active" : ""}>
                                                <Link to="#" onClick={(e) => openUserGroup(e, group)}>
                                                    <div className="d-flex">
                                                        {
                                                            group.profilePicture === "Null" ?
                                                                <div className={"chat-user-img " + group.status + " align-self-center me-3 ms-0"}>
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
                                                                <div className={"chat-user-img " + group.status + " align-self-center me-3 ms-0"}>
                                                                    <img src={group.profilePicture} className="rounded-circle avatar-xs" alt="klubby" />
                                                                    {
                                                                        group.status && <span className="user-status"></span>
                                                                    }
                                                                </div>
                                                        }

                                                        <div className="flex-1 overflow-hidden">
                                                            <h5 className="text-truncate font-size-15 mb-1">{group.name}</h5>
                                                            <p className="chat-user-message text-truncate mb-0">
                                                                {/* {
                                                                            <>
                                                                                {
                                                                                    group.messages && (group.messages.length > 0 && group.messages[(group.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle me-1"></i> : null
                                                                                }
                                                                                {
                                                                                    group.messages && (group.messages.length > 0 && group.messages[(group.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle me-1"></i> : null
                                                                                }
                                                                                {group.messages && group.messages.length > 0 ? group.messages[(group.messages).length - 1].message : null}
                                                                            </>
                                                                        } */}
                                                                {group.desc === "" ? "none" : group.desc}



                                                            </p>
                                                        </div>
                                                        <div className="font-size-11">{group.messages && group.messages.length > 0 ? group.messages[(group.messages).length - 1].time : null}</div>
                                                        {group.unRead === 0 ? null :
                                                            <div className="unread-message" id={"unRead" + group.id}>
                                                                <span className="badge badge-soft-danger rounded-pill">{group.messages && group.messages.length > 0 ? group.unRead >= 20 ? group.unRead + "+" : group.unRead : ""}</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </SimpleBar>
                    </TabPane>
                </TabContent>
                {/* Start chat-message-list  */}

                {/* End chat-message-list */}
            </div>

            {/* Start add group Modal */}
            <Modal isOpen={modal} centered toggle={toggle}>
                <ModalHeader tag="h5" className="modal-title font-size-14" toggle={toggle}>Create New Group</ModalHeader>
                <ModalBody className="p-4">
                    <Form>
                        <div className="mb-4">
                            <Label className="form-label" htmlFor="addgroupname-input">Group Name</Label>
                            <Input type="text" className="form-control" id="addgroupname-input" value={groupName} onChange={(e) => handleChangeGroupName(e)} placeholder="Enter Group Name" />
                        </div>
                        <div className="mb-4">
                            <Label className="form-label">Group Members</Label>
                            <Alert isOpen={isOpenAlert} color="danger">
                                {message}
                            </Alert>
                            <div className="mb-3">
                                <Button color="light" size="sm" type="button" onClick={toggleCollapse}>
                                    Select Members
                                </Button>
                            </div>

                            <Collapse isOpen={isOpenCollapse} id="groupmembercollapse">
                                <Card className="border">
                                    <CardHeader>
                                        <h5 className="font-size-15 mb-0">Contacts</h5>
                                    </CardHeader>
                                    <CardBody className="p-2">
                                        <SimpleBar style={{ maxHeight: "150px" }}>
                                            {/* contacts */}
                                            <div id="addContacts">
                                                <SelectContact handleCheck={handleCheck} />
                                            </div>
                                        </SimpleBar>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>
                        <div>
                            <Label className="form-label" htmlFor="addgroupdescription-input">Description</Label>
                            <textarea className="form-control" id="addgroupdescription-input" value={groupDesc} onChange={(e) => handleChangeGroupDesc(e)} rows="3" placeholder="Enter Description"></textarea>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="link" onClick={toggle}>Close</Button>
                    <Button type="button" color="primary" onClick={addGroup}>Create Group</Button>
                </ModalFooter>
            </Modal>
            {/* End add group Modal */}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user, users, groups, active_group, newDirectMessage } = state.Chat;
    const { activeChatSubTab } = state.Layout;
    return { active_user, users, groups, active_group, activeChatSubTab, newDirectMessage };
};

export default connect(mapStateToProps, { setconversationNameInOpenChat, activeUser, createGroup, setFullUser, setActiveTab, setActiveChatSubTab, activeGroup })(Chats);