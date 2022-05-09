import React, { Component, useEffect, useState } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import ChatMainBoard from "./ChatMainBoard";

import { connect } from "react-redux";

import apollo_client from '../../apollo';

import getUserConversationsGQL from '../../apollo/queries/getUserConversations';
import getConversationMessagesGQL from '../../apollo/queries/getConversationMessages';
import subscribeToNewMessagesGQL from '../../apollo/subscriptions/subscribeToNewMessages';
import { setFullUser, activeUser } from '../../redux/actions';
import Preloader from '../../components/preloader';
const Index = (props) => {

    const [conversationLoaded, setConversationLoad] = useState(false)
    useEffect(()=>{
        if (!conversationLoaded) {
            apollo_client.query({
                query: getUserConversationsGQL
            }).then(async (res) => {
                if (res.data.me.conversations.userConversations) {
                    const _recentConversations = res.data.me.conversations.userConversations
    
                    if (_recentConversations.length > 0) {
                        let _recentChatList = {}
                        for (var i = 0; i < _recentConversations.length; i++) {
                            let _recentUser = {};
                            _recentUser.username = _recentConversations[i].associated;
                            _recentUser.name = _recentConversations[i].associated;
                            _recentUser.conversationId = _recentConversations[i].conversationId
                            _recentUser.isGroup = false;
                            _recentUser.status = "online";
                            _recentUser.profilePicture = "Null"
                            _recentChatList[_recentUser.username] = _recentUser
    
                            const res = await apollo_client.query({
                                query: getConversationMessagesGQL,
                                variables: {
                                    conversationId: _recentUser.conversationId
                                }
                            })
    
                            _recentUser.messages = res.data.getAllMessageConnection.messages;
    
                        }
    
                        props.setFullUser(_recentChatList)
                        props.activeUser(Object.keys(_recentChatList)[0]);
                    }
                    setConversationLoad(true)
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                }
    
            }).catch((err) => {
                console.log(err)
            })
        }

    },[])


    // apollo_client.subscribe({
    //     subscribe:subscribeToNewMessagesGQL
    // }).then((res)=>{
    //     console.log("new message")
    // })


    console.log("dashboard")
    return (
        <React.Fragment>
            {
                conversationLoaded?
                <>
                    <ChatLeftSidebar recentChatList={props.users} recentPostList={props.posts} />
                    <ChatMainBoard />
                </>
                :<Preloader />
            }

        </React.Fragment>
    );

}

const mapStateToProps = (state) => {
    const { users, posts } = state.Chat;

    return { users, posts };
};

export default connect(mapStateToProps, { setFullUser, activeUser })(Index);