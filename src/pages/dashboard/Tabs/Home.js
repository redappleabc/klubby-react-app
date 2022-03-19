import React, { Component } from 'react';
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//simplebar
import SimpleBar from "simplebar-react";

//actions
import { setconversationNameInOpenChat, activePost } from "../../../redux/actions"

//components
// import OnlineUsers from "./OnlineUsers";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchChat: "",
            recentPostList: this.props.recentPostList
        }

        this.handleChange = this.handleChange.bind(this);
        this.openPostChat = this.openPostChat.bind(this);
    }

    componentDidMount() {
        var li = document.getElementById("conversation" + this.props.active_post);
        if (li) {
            li.classList.add("active");
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                recentPostList: this.props.recentPostList
            });
        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.recentPostList !== nextProps.recentPostList) {
            this.setState({
                recentPostList: nextProps.recentPostList,
            });
        }
    }

    handleChange(e) {
        this.setState({ searchChat: e.target.value });
        var search = e.target.value;
        let conversation = this.state.recentPostList;
        let filteredArray = [];

        //find conversation name from array
        for (let i = 0; i < conversation.length; i++) {
            if (conversation[i].name.toLowerCase().includes(search) || conversation[i].name.toUpperCase().includes(search))
                filteredArray.push(conversation[i]);
        }

        //set filtered items to state
        this.setState({ recentPostList: filteredArray })

        //if input value is blanck then assign whole recent chatlist to array
        if (search === "") this.setState({ recentPostList: this.props.recentPostList })
    }

    openPostChat(e, chat) {

        e.preventDefault();

        //find index of current chat in array
        var index = this.props.recentPostList.indexOf(chat);


        // set activeUser 
        this.props.activePost(index);

        var chatList = document.getElementById("chat-list-post");
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

        var userChat = document.getElementsByClassName("post-chat");
        if (userChat) {
            userChat[0].classList.add("user-chat-show");
        }

        //removes unread badge if user clicks
        var unread = document.getElementById("unRead" + chat.id);
        if (unread) {
            unread.style.display = "none";
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="px-4 pt-4">
                        <h4 className="mb-4">Home</h4>
                        <div className="search-box chat-search-box">
                            <InputGroup size="lg" className="mb-3 rounded-lg">
                                <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                    <i className="ri-search-line search-icon font-size-18"></i>
                                </span>
                                <Input type="text" value={this.state.searchChat} onChange={(e) => this.handleChange(e)} className="form-control bg-light" placeholder="Search messages or users" />
                            </InputGroup>
                        </div>
                        {/* Search Box */}
                    </div>

                    {/* Start chat-message-list  */}
                    <div className="px-2">
                        {/* <h5 className="mb-3 px-3 font-size-16">Recent</h5> */}
                       <div className="_chat-message-list">
                            <SimpleBar style={{ maxHeight: "100%" }} className="chat-message-list">
                                <ul className="list-unstyled chat-list chat-user-list" id="chat-list-post">
                                    {
                                        this.state.recentPostList.map((chat, key) =>
                                            <li key={key} id={"conversation" + key} className={chat.unRead ? "unread" : chat.isTyping ? "typing" : key === this.props.active_post ? "active" : ""}>
                                                <Link to="#" onClick={(e) => this.openPostChat(e, chat)}>
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
                                                            <p className="chat-user-message mb-0 font-size-11">
                                                                <i className="ri-time-line"></i> {chat.time}
                                                            </p>
                                                        </div>
                                                        <div className="font-size-12">{chat.upvote + " upvotes"}<br></br>{chat.comment + " comments"}</div>
                                                        {/* {chat.unRead === 0 ? null :
                                                            <div className="unread-message" id={"unRead" + chat.id}>
                                                                <span className="badge badge-soft-danger rounded-pill">{chat.messages && chat.messages.length > 0 ? chat.unRead >= 20 ? chat.unRead + "+" : chat.unRead : ""}</span>
                                                            </div>
                                                        } */}
                                                        
                                                    </div>
                                                    <div className='font-size-15 mb-3 mt-3' >
                                                        {chat.content}
                                                    </div>
                                                    <div className='nav-post-img'>
                                                        <img src={chat.image}/>
                                                    </div>
                                                    <div className='nav-upvote text-center'>
                                                    {
                                                        chat.isupvote === true ?
                                                            <div className='nav-upvote-mark font-size-17 mt-3 mb-4'>
                                                                You already upvoted this post <i c="ri-checkbox-circle-line"></i>
                                                            </div>:
                                                        <></>
                
                                                    }
                                                    </div>
                                                </Link> 
                                                
                                            </li>
                                        )
                                    }
                                </ul>
                            </SimpleBar>
                        </div>

                    </div>
                    {/* End chat-message-list */}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { active_post } = state.Chat;
    return { active_post };
};

export default connect(mapStateToProps, { setconversationNameInOpenChat, activePost })(Home);