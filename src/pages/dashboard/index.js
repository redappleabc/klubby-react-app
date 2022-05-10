import React, { useEffect, useState } from 'react';
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

import { useQuery, useSubscription } from '@apollo/client';


const Index = (props) => {

    const [conversationLoaded, setConversationLoad] = useState(false)
    useEffect(() => {
        if (!conversationLoaded) {
            apollo_client.query({
                query: getUserConversationsGQL
            }).then(async (res) => {
                console.log(res)
                if (res.data.getMe && res.data.getMe.conversations.userConversations) {
                    const _recentConversations = res.data.getMe.conversations.userConversations

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
                           

                            _recentUser.messages = res.data.getAllMessageConnections.messages;

                        }

                        props.setFullUser(_recentChatList)
                        props.activeUser(Object.keys(_recentChatList)[0]);
                    }
                    
                }
                setConversationLoad(true)

            }).catch((err) => {
                console.log(err)
            })
        }

    }, [])



    
    // apollo_client.subscribe({
    //     subscribe:subscribeToNewMessagesGQL
    // }).then((res)=>{
    //     console.log("new message")
    // })


    console.log("dashboard")
    return (
        <React.Fragment>
            {
                conversationLoaded ?
                    <>
                        <ChatLeftSidebar recentChatList={props.users} recentPostList={props.posts} />
                        <ChatMainBoard />
                    </>
                    : <Preloader />
            }

        </React.Fragment>
    );

}

const mapStateToProps = (state) => {
    const { users, posts } = state.Chat;

    return { users, posts };
};

export default connect(mapStateToProps, { setFullUser, activeUser })(Index);