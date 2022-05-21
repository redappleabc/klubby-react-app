import React, { useEffect, useState } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import ChatMainBoard from "./ChatMainBoard";

import { connect } from "react-redux";

import apollo_client from '../../apollo';

import getUserConversationsGQL from '../../apollo/queries/getUserConversations';
import getConversationMessagesGQL from '../../apollo/queries/getConversationMessages';
import subscribeToNewMessagesGQL from '../../apollo/subscriptions/subscribeToNewMessages';
import subscribeToRemovedMessagesGQL from '../../apollo/subscriptions/subscribeToRemovedMessages';
import subscribeToNewUserConversationbridge from '../../apollo/subscriptions/subscribeToNewUserConversationbridge';
import { useSubscription } from '@apollo/client';
import { setFullUser, activeUser, subscribeDirectMessage } from '../../redux/actions';
import Preloader from '../../components/preloader';
import { useHistory } from 'react-router-dom';


const Index = (props) => {

    const [subscriptionData, setSubscriptionData] = useState()
    const [subscriptionToRemovedMessageData, setSubscriptionToRemovedMessageData] = useState()
    const [newUserConversationBridgescriptionData, setNewUserConversationBridgescriptionData] = useState()

    const [conversationLoaded, setConversationLoad] = useState(false)


    let history = useHistory();

    const { data, loading } = useSubscription(subscribeToNewUserConversationbridge, {
        variables: {
            username: props.user.username
        },
        onSubscriptionData: ({ client, subscriptionData }) => {
            console.log("newUserConversationBridgescriptionData")
            console.log(subscriptionData)
            setNewUserConversationBridgescriptionData(subscriptionData)
        }
    })


    useEffect(() => {

        if (newUserConversationBridgescriptionData) {
            let copyallUsers = props.users;
            const newUser = {}
            newUser.username = newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.name;
            newUser.name = newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.name;
            newUser.conversationId = newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.conversationId;
            newUser.status = "online";
            newUser.profilePicture = null
            newUser.isGroup = false
            newUser.unRead = 0;
            newUser.messages = []
            //copyallUsers[newUser.username] = newUser;
            props.setFullUser({ ...copyallUsers, [newUser.username]: newUser })

            const observable = apollo_client.watchQuery({
                query: getConversationMessagesGQL,
                variables: {
                    conversationId: newUser.conversationId
                }
            })



            observable.subscribeToMore({
                document: subscribeToNewMessagesGQL,
                variables: {
                    conversationId: newUser.conversationId
                },
                updateQuery: (prev, { subscriptionData }) => {
                    setSubscriptionData(subscriptionData)
                    console.log('subscribeToMore - updateQuery:', subscriptionData);
                },
            })

            observable.subscribeToMore({
                document: subscribeToRemovedMessagesGQL,
                variables: {
                    conversationId: newUser.conversationId
                },
                updateQuery: (prev, { subscriptionData }) => {
                    setSubscriptionToRemovedMessageData(subscriptionData)
                    console.log('subscribeToRemovedMessage - updateQuery:', subscriptionData);
                },
            })
        }

    }, [newUserConversationBridgescriptionData])


    useEffect(() => {
        if (!subscriptionData) return

        const newMessage = subscriptionData.data.subscribeToNewMessage;
        const conversationId = subscriptionData.data.subscribeToNewMessage.conversationId;
        const sender = subscriptionData.data.subscribeToNewMessage.sender;
        const updatedAt = subscriptionData.data.subscribeToNewMessage.updatedAt;
        const createdAt = subscriptionData.data.subscribeToNewMessage.createdAt;
        const id = subscriptionData.data.subscribeToNewMessage.id;
        
        let copyallUsers = props.users;

        for (const userKey in copyallUsers) {
            const user = copyallUsers[userKey]
            if (user.conversationId === conversationId) {
                if (updatedAt) {
                    for(var i = 0; i<user.messages.length; i++){
                        if(user.messages[i].id === id){
                            user.messages[i] = newMessage
                            break;
                        }
                    }

                } else {
                    user.messages = [...user.messages, newMessage]
                    if (sender != props.user.username && sender != props.active_user)
                        user.unRead += 1;
                }
            }
        }
        props.setFullUser(copyallUsers)

        props.subscribeDirectMessage(subscriptionData.data.subscribeToNewMessage.id + (updatedAt?updatedAt:createdAt) + " created")


    }, [subscriptionData])

    useEffect(() => {
        if (!subscriptionToRemovedMessageData) return;
        const conversationId = subscriptionToRemovedMessageData.data.subscribeToRemovedMessage.conversationId;
        let copyallUsers = props.users

        for (const userKey in copyallUsers) {
            const user = copyallUsers[userKey]
            if (user.conversationId === conversationId) {
                copyallUsers[props.active_user].messages = copyallUsers[props.active_user].messages.filter(({ id }) => id !== subscriptionToRemovedMessageData.data.subscribeToRemovedMessage.id)
            }
        }

        props.setFullUser(copyallUsers)

        props.subscribeDirectMessage(subscriptionToRemovedMessageData.data.subscribeToRemovedMessage.id + " removed")

    }, [subscriptionToRemovedMessageData])



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

                            let _readIndexNumber = 0
                            let _readIndex = "";
                            if (_recentConversations[i].read) {
                                _readIndex = _recentConversations[i].read;
                                _readIndexNumber = parseInt(_recentConversations[i].read.substring(0, 13))
                            }

                            let _recentUser = {};
                            _recentUser.username = _recentConversations[i].associated;
                            _recentUser.name = _recentConversations[i].name ? _recentConversations[i].name : _recentConversations[i].associated;
                            _recentUser.conversationId = _recentConversations[i].conversationId
                            _recentUser.nextToken = null;
                            _recentUser.isGroup = false;
                            _recentUser.status = "online";
                            //_recentUser.profilePicture = null
                            _recentUser.unRead = 0;

                            if (_recentConversations[i].conversation.messages) {
                                _recentUser.nextToken = _recentConversations[i].conversation.messages.nextToken
                            }
                            if (_recentConversations[i].conversation.messages.messages) {
                                let messages = [..._recentConversations[i].conversation.messages.messages]
                                for (let j = 0; j < messages.length; j++) {
                                    if (messages[j].sender === props.user.username || messages[j].id === _readIndex) {
                                        break;
                                    } else if (_readIndexNumber < parseInt(messages[j].id.substring(0, 13))) {
                                        _recentUser.unRead++
                                    }
                                }
                                _recentUser.messages = messages.reverse();


                            } else {
                                _recentUser.messages = []
                            }


                            _recentChatList[_recentUser.username] = _recentUser


                            const observable = apollo_client.watchQuery({
                                query: getConversationMessagesGQL,
                                variables: {
                                    conversationId: _recentUser.conversationId
                                }
                            })



                            observable.subscribeToMore({
                                document: subscribeToNewMessagesGQL,
                                variables: {
                                    conversationId: _recentUser.conversationId
                                },
                                updateQuery: (prev, { subscriptionData }) => {
                                    setSubscriptionData(subscriptionData)
                                    console.log('subscribeToMore - updateQuery:', subscriptionData);
                                },
                            })



                            observable.subscribeToMore({
                                document: subscribeToRemovedMessagesGQL,
                                variables: {
                                    conversationId: _recentUser.conversationId
                                },
                                updateQuery: (prev, { subscriptionData }) => {
                                    setSubscriptionToRemovedMessageData(subscriptionData)
                                    console.log('subscribeToRemovedMessage - updateQuery:', subscriptionData);
                                },
                            })

                        }

                        props.setFullUser(_recentChatList)
                        console.log(_recentChatList)
                        //props.activeUser(Object.keys(_recentChatList)[0]);
                    }

                }
                setConversationLoad(true)
            }).catch((err) => {
                console.log(err)
                alert("unsuccessfully registered user")
                history.push("/logout")

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
    const { users, posts, active_user } = state.Chat;
    const { user, loading, error } = state.Auth;
    return { users, posts, user, active_user };
};

export default connect(mapStateToProps, { setFullUser, activeUser, subscribeDirectMessage })(Index);