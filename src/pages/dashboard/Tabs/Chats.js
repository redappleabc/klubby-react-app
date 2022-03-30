import React, { Component } from 'react';
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, CardBody, Alert, Collapse, Card, CardHeader, Modal, ModalHeader, ModalBody, Form, Label, ModalFooter, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
//simplebar
import SimpleBar from "simplebar-react";
import SelectContact from "../../../components/SelectContact";
//actions
import { setconversationNameInOpenChat, activeUser, createGroup, setActiveTab, setActiveChatSubTab, activeGroup } from "../../../redux/actions"
import group1 from "../../../assets/images/group/group1.png";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//components
// import OnlineUsers from "./OnlineUsers";

class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchChat: "",
            recentChatList: this.props.users,
            modal: false,
            isOpenCollapse: false,
            groups: this.props.groups,
            selectedContact: [],
            isOpenAlert: false,
            message: "",
            groupName: "",
            groupDesc: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.openUserChat = this.openUserChat.bind(this);
        this.setNoticDropdown = this.setNoticDropdown.bind(this);


        this.toggle = this.toggle.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleChangeGroupName = this.handleChangeGroupName.bind(this);
        this.handleChangeGroupDesc = this.handleChangeGroupDesc.bind(this);
        this.setRecentChatList = this.setRecentChatList.bind(this);

     }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    toggleCollapse() {
        this.setState({ isOpenCollapse: !this.state.isOpenCollapse });
    }

    setRecentChatList() {
        this.setState({ recentChatList: !this.state.recentChatList });
    }


    
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                groups: this.props.groups
            });
        }
    }

    addGroup() {
        if (this.state.selectedContact.length > 2) {
            // gourpId : 5, name : "#Project-aplha", profilePicture : "Null", isGroup : true, unRead : 0, isNew : true, desc : "project related Group",
            var obj = {
                gourpId: this.state.groups.length + 1,
                name: this.state.groupName,
                profilePicture: "Null",
                isGroup: true,
                unRead: 0,
                isNew: true,
                desc: this.state.groupDesc,
                members: this.state.selectedContact,
                messages: [{ id : 33, isToday : true }, { id : 1, message: "hi 👍" }]
            }
            //call action for creating a group
           
            this.props.createGroup(obj);
            console.log(obj);
            console.log(this.state.group);
            // alert(this.props.groups.length);
            this.toggle();

        } else if (this.state.selectedContact.length === 1) {
            this.setState({ message: "Minimum 2 members required!!!", isOpenAlert: true });
        } else {
            this.setState({ message: "Please Select Members!!!", isOpenAlert: true });
        }
        setTimeout(
            function () {
                this.setState({ isOpenAlert: false });
            }
                .bind(this),
            3000
        );
    }

    handleCheck(e, contactId) {
        var selected = this.state.selectedContact;
        var obj;
        if (e.target.checked) {
            obj = {
                id: contactId,
                name: e.target.value
            };
            selected.push(obj);
            this.setState({ selectedContact: selected })
        }
    }

    handleChangeGroupName(e) {
        this.setState({ groupName: e.target.value });
    }

    handleChangeGroupDesc(e) {
        this.setState({ groupDesc: e.target.value });
    }

    toggleTab(tab) {
        this.props.setActiveTab(tab)
    }


    setNoticDropdown() {
        this.setState(prevState => ({
            notiDropdown: !prevState.notiDropdown
          }));
    }


    handleChange(e) {
        this.setState({ searchChat: e.target.value });
        var search = e.target.value;
        let conversation = this.state.recentChatList;
        let filteredArray = [];

        //find conversation name from array
        for (let i = 0; i < conversation.length; i++) {
            if (conversation[i].name.toLowerCase().includes(search) || conversation[i].name.toUpperCase().includes(search))
                filteredArray.push(conversation[i]);
        }

        //set filtered items to state
        this.setState({ recentChatList: filteredArray })

        //if input value is blanck then assign whole recent chatlist to array
        if (search === "") {
            this.setState({ recentChatList: this.props.users })
        }
    }

    openUserChat(e, chat) {
        e.preventDefault();

        //find index of current chat in array
        var index = this.props.users.indexOf(chat);

        // set activeUser 
        this.props.activeUser(index);


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
        var unread = document.getElementById("unRead" + chat.id);
        if (unread) {
            unread.style.display = "none";
        }
    }

    openUserGroup(e, group) {

        e.preventDefault();

        //find index of current chat in array
        var index = this.props.groups.indexOf(group);

        // set activeUser 
        this.props.activeGroup(index);


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

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className='nav-message-header'>
                        <div className="px-3 pt-4 leftsidebar-home-header">
                            <div>
                                <img src={avatar1} className="rounded-circle avatar-xs" alt="Klubby" />
                            </div>
                            <div className="search-box chat-search-box">
                                <InputGroup size="lg" className="mb-3 rounded-lg">
                                    <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                        <i className="ri-search-line search-icon font-size-18"></i>
                                    </span>
                                    <Input type="text" value={this.state.searchChat} onChange={(e) => this.handleChange(e)} className="form-control bg-light" placeholder="Search..." />
                                </InputGroup>
                            </div>
                            {/* Search Box */}
                            <div className='home-header-btn-container'>
                                <div className="user-chat-nav float-end">
                                    <div className="create-group">
                                        {/* Button trigger modal */}
                                        <button onClick={this.toggle} className="group-add-btn">
                                            <i className="ri-group-line me-1"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='home-header-btn'>
                                    <Dropdown nav isOpen={this.state.notiDropdown} className="nav-item btn-group dropup profile-user-dropdown" toggle={this.setNoticDropdown}>
                                        <DropdownToggle className="nav-link" tag="a">
                                            <div className='notification-cover'><i className="ri-notification-3-line"><div className='notification-badge'>2</div></i></div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => { this.toggleTab('home'); }}><img src={group1} alt="" className="profile-user rounded-circle" /> Rahui Gautam </DropdownItem>
                                            <DropdownItem onClick={() => { this.toggleTab('home'); }}><img src={group1} alt="" className="profile-user rounded-circle" /> Rahui Gautam </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className='chat-header-btn-container p-3'>
                            <button className={`chat-nav-header-btn ${classnames({ active: this.props.activeChatSubTab === 'chat-klubs' })}`} onClick={() => { this.props.setActiveChatSubTab('chat-klubs'); }} >
                                Klubs
                            </button>
                            <button className={`chat-nav-header-btn ${classnames({ active: this.props.activeChatSubTab === 'chat-chat' })}`} onClick={() => { this.props.setActiveChatSubTab('chat-chat'); }}>
                                Messages
                            </button>
                        </div>
                    </div>
                    <TabContent>
                        <TabPane tabId="chat-chat" id="pills-chat-chat" className={classnames({ active: this.props.activeChatSubTab === 'chat-chat' })}>
                               
                                <SimpleBar className="chat-message-list">
                                    <div className='px-2'>
                                        <ul className="list-unstyled chat-list chat-user-list" id="chat-list">
                                            {
                                                this.state.recentChatList.map((chat, key) =>
                                                    <li key={key} id={"conversation" + key} className={chat.unRead ? "unread" : chat.isTyping ? "typing" : key === this.props.active_user ? "active" : ""}>
                                                        <Link to="#" onClick={(e) => this.openUserChat(e, chat)}>
                                                            <div className="d-flex">
                                                                {
                                                                    chat.profilePicture === "Null" ?
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
                                                                                    {chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].message : null}
                                                                                </>
                                                                        }



                                                                    </p>
                                                                </div>
                                                                <div className="font-size-11">{chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].time : null}</div>
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
                        {/* chat tab end */}
                        {/* klub tab start */}
                        <TabPane tabId="chat-klubs" id="pills-chat-klubs" className={classnames({ active: this.props.activeChatSubTab === 'chat-klubs' })}>
                            <SimpleBar className="chat-message-list">
                                    <div className='px-2'>
                                        <ul className="list-unstyled chat-list chat-user-list" id="group-list">
                                            {
                                                this.state.groups.map((group, key) =>
                                                    <li key={key} id={"conversation" + key} className={group.unRead ? "unread" : group.isTyping ? "typing" : key === this.props.active_user ? "active" : ""}>
                                                        <Link to="#" onClick={(e) => this.openUserGroup(e, group)}>
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
                <Modal isOpen={this.state.modal} centered toggle={this.toggle}>
                    <ModalHeader tag="h5" className="modal-title font-size-14" toggle={this.toggle}>Create New Group</ModalHeader>
                    <ModalBody className="p-4">
                        <Form>
                            <div className="mb-4">
                                <Label className="form-label" htmlFor="addgroupname-input">Group Name</Label>
                                <Input type="text" className="form-control" id="addgroupname-input" value={this.state.groupName} onChange={(e) => this.handleChangeGroupName(e)} placeholder="Enter Group Name" />
                            </div>
                            <div className="mb-4">
                                <Label className="form-label">Group Members</Label>
                                <Alert isOpen={this.state.isOpenAlert} color="danger">
                                    {this.state.message}
                                </Alert>
                                <div className="mb-3">
                                    <Button color="light" size="sm" type="button" onClick={this.toggleCollapse}>
                                        Select Members
                                    </Button>
                                </div>

                                <Collapse isOpen={this.state.isOpenCollapse} id="groupmembercollapse">
                                    <Card className="border">
                                        <CardHeader>
                                            <h5 className="font-size-15 mb-0">Contacts</h5>
                                        </CardHeader>
                                        <CardBody className="p-2">
                                            <SimpleBar style={{ maxHeight: "150px" }}>
                                                {/* contacts */}
                                                <div id="addContacts">
                                                    <SelectContact handleCheck={this.handleCheck} />
                                                </div>
                                            </SimpleBar>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </div>
                            <div>
                                <Label className="form-label" htmlFor="addgroupdescription-input">Description</Label>
                                <textarea className="form-control" id="addgroupdescription-input" value={this.state.groupDesc} onChange={(e) => this.handleChangeGroupDesc(e)} rows="3" placeholder="Enter Description"></textarea>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" color="link" onClick={this.toggle}>Close</Button>
                        <Button type="button" color="primary" onClick={this.addGroup}>Create Group</Button>
                    </ModalFooter>
                </Modal>
                {/* End add group Modal */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { active_user, users, groups, active_group } = state.Chat;
    const { activeChatSubTab } = state.Layout;
    return { active_user, users,  groups, active_group, activeChatSubTab };
};

export default connect(mapStateToProps, { setconversationNameInOpenChat, activeUser, createGroup, setActiveTab, setActiveChatSubTab, activeGroup })(Chats);