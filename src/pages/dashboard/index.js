import React, { useEffect, useState } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import ChatMainBoard from "./ChatMainBoard";
import { useMutation } from '@apollo/client';
import { connect } from "react-redux";

import apollo_client from '../../apollo';

import getUserConversationsGQL from '../../apollo/queries/getme';
import getKlubsByKlubNameGQL from '../../apollo/queries/getKlubsByKlubName';
import getConversationMessagesGQL from '../../apollo/queries/getConversationMessages';
import subscribeToNewMessagesGQL from '../../apollo/subscriptions/subscribeToNewMessages';
import subscribeToRemovedMessagesGQL from '../../apollo/subscriptions/subscribeToRemovedMessages';
import subscribeToNewUserConversationbridgeGQL from '../../apollo/subscriptions/subscribeToNewUserConversationbridge';
import subscribeToRemovedUserConversationbridgeGQL from '../../apollo/subscriptions/subscribeToRemovedUserConversationbridge';
import subscribeToReadMessageGQL from '../../apollo/subscriptions/subscribeToReadMessage';
import subscribeToAcceptConversationGQL from '../../apollo/subscriptions/subscribeToAcceptedConversation';
import setReadGQL from '../../apollo/mutations/setRead';
import { from, useSubscription } from '@apollo/client';
import { setFullUser, activeUser, subscribeDirectMessage, setFullGroup } from '../../redux/actions';
import Preloader from '../../components/preloader';
import { useHistory } from 'react-router-dom';
import removeConversationBridge from '../../apollo/mutations/removeUserConversationBridge'
import getConverstationByIdGQL from '../../apollo/queries/getConverstationById';

const Index = (props) => {

    const [removeUserConversationBridgeApollo, {}] = useMutation(removeConversationBridge)

    const [subscriptionData, setSubscriptionData] = useState()
    const [subscriptionToRemovedMessageData, setSubscriptionToRemovedMessageData] = useState()
    const [newUserConversationBridgescriptionData, setNewUserConversationBridgescriptionData] = useState()
    const [removedUserConversationBridgescriptionData, setRemovedUserConversationBridgescriptionData] = useState()
    const [acceptSubscriptionData ,setAcceptSubscriptionData] = useState()

    const [readSubscriptionData, setReadSubscriptionData] = useState()

    const [conversationLoaded, setConversationLoad] = useState(false)

    const [windowTabFocus, setWindowTabFocus] = useState(true)


    useEffect(() => {
        window.addEventListener("focus", () => {
            setWindowTabFocus(true)
            console.log("focus")
        }, true);
        window.addEventListener("blur", () => {
            setWindowTabFocus(false)
            console.log("blur")
        }, true);
        // Specify how to clean up after this effect:
        return () => {
            window.removeEventListener("focus", () => {
                console.log("no focus")
            }, true);
            window.removeEventListener("blur", () => {
                console.log("no blur")
            }, true);
        };
    }, []);

    useEffect(() => {
        if (props.active_user && windowTabFocus && props.users[props.active_user].messages.length > 0
            && props.users[props.active_user].messages[props.users[props.active_user].messages.length - 1].sender !== props.user.username
            && props.users[props.active_user].read !== props.users[props.active_user].messages[props.users[props.active_user].messages.length - 1].id) {
            apollo_client.mutate({
                mutation: setReadGQL,
                variables: {
                    conversationId: props.users[props.active_user].conversationId,
                    username: props.user.username,
                    messageId: props.users[props.active_user].messages[props.users[props.active_user].messages.length - 1].id
                }
            }).then((res) => {

                let copyallUsers = props.users;
                copyallUsers[props.active_user].read = res.data.setRead.read;
                props.setFullUser(copyallUsers)
                console.log("set read success", res);
            }).catch((err) => {
                console.log("set read error ", err)
            })
        }

    }, [windowTabFocus])


    let history = useHistory();

    const { data, loading } = useSubscription(subscribeToNewUserConversationbridgeGQL, {
        variables: {
            username: props.user.username
        },
        onSubscriptionData: ({ client, subscriptionData }) => {
            console.log("newUserConversationBridgescriptionData")
            console.log(subscriptionData)
            setNewUserConversationBridgescriptionData(subscriptionData)
        }
    })

    const { } = useSubscription(subscribeToRemovedUserConversationbridgeGQL, {
        variables: {
            username: props.user.username
        },
        onSubscriptionData: ({ client, subscriptionData }) => {
            console.log("removeUserConversationBridgescriptionData")
            console.log(subscriptionData)
            setRemovedUserConversationBridgescriptionData(subscriptionData)
        }
    })
 

    useEffect(async () => {

        if (newUserConversationBridgescriptionData) {

            console.log( "newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge", newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge)
            let copyallUsers = props.users;
            const newUser = {}
            newUser.accepted = newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.accepted;
            newUser.username = newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.username;
            newUser.name = newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.name;
            newUser.conversationId = newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.conversationId;
            newUser.status = "online";
            newUser.profilePicture = null
            newUser.isGroup = false
            newUser.unRead = 0;
            newUser.messages = [];
            // newUser.associated = [...newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.associated]

            console.log("newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.conversationId", newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.conversationId)
            const result = await apollo_client.query({
                query: getConverstationByIdGQL,
                variables: {
                    conversationId: newUserConversationBridgescriptionData.data.subscribeToNewUserConversationBridge.conversationId
                }
            })
            console.log("getConverstationByIdGQL", result, "color: orange");

            
            newUser.creator = result.data.getConversationById.creator;

            //copyallUsers[newUser.username] = newUser;

            props.setFullUser({ ...copyallUsers, [newUser.conversationId]: newUser })

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

            observable.subscribeToMore({
                document: subscribeToReadMessageGQL,
                variables: {
                    conversationId: newUser.conversationId
                },
                updateQuery: (prev, { subscriptionData }) => {
                    setReadSubscriptionData(subscriptionData)
                    console.log('subscribeToReadMessageData - updateQuery:', subscriptionData);
                },
            })

            observable.subscribeToMore({
                document: subscribeToAcceptConversationGQL,
                variables: {
                    conversationId: newUser.conversationId
                },
                updateQuery: (prev, { subscriptionData }) => {
                    setAcceptSubscriptionData(subscriptionData)
                    console.log('subscribeToAcceptConversationGQL - updateQuery:', subscriptionData);
                },
            })
        }

    }, [newUserConversationBridgescriptionData])


    useEffect(() => {

        if (removedUserConversationBridgescriptionData) {
            let copyallUsers = { ...props.users };
            const conversationId = removedUserConversationBridgescriptionData.data.subscribeToRemovedUserConversationBridge.conversationId;
            console.log("copyallUsers", copyallUsers)
            console.log("removedUser", removedUserConversationBridgescriptionData)

            for (const userKey in copyallUsers) {
                const user = copyallUsers[userKey]
                if (user.conversationId === conversationId) {
                    delete copyallUsers[userKey];
                    console.log("props.activeuser", props.active_user)
                    console.log("userkey", userKey)
                    if (props.active_user === userKey) {
                        console.log("set props active user", null)
                        props.activeUser(null)
                    }
                    props.setFullUser(copyallUsers)
                    break;
                }
            }
        }

    }, [removedUserConversationBridgescriptionData])





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
                    for (var i = 0; i < user.messages.length; i++) {
                        if (user.messages[i].id === id) {
                            user.messages[i] = newMessage
                            break;
                        }
                    }

                } else {
                    user.messages = [...user.messages, newMessage]
                    if (sender !== props.user.username && sender !== props.active_user)
                        user.unRead += 1;
                    // if sender is active user set read.
                    if (sender === props.active_user && windowTabFocus) {
                        if (props.users[props.active_user].messages.length > 0) {
                            apollo_client.mutate({
                                mutation: setReadGQL,
                                variables: {
                                    conversationId: props.users[props.active_user].conversationId,
                                    username: props.user.username,
                                    messageId: props.users[props.active_user].messages[props.users[props.active_user].messages.length - 1].id
                                }
                            }).then((res) => {
                                let copyallUsers = props.users;
                                copyallUsers[props.active_user].read = res.data.setRead.read;
                                props.setFullUser(copyallUsers)
                                console.log("set read success", res);
                            }).catch((err) => {
                                console.log("set read error ", err)
                            })
                        }
                    }
                }
            }
        }
        props.setFullUser(copyallUsers)

        props.subscribeDirectMessage(subscriptionData.data.subscribeToNewMessage.id + (updatedAt ? updatedAt : createdAt) + " created")


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
        if (!readSubscriptionData) return;

        const conversationId = readSubscriptionData.data.subscribeToReadMessage.conversationId;
        const username = readSubscriptionData.data.subscribeToReadMessage.username
        const readMessageId = readSubscriptionData.data.subscribeToReadMessage.read
        if (username === props.user.username) return;
        let copyallUsers = { ...props.users }

        for (const userKey in copyallUsers) {
            const user = copyallUsers[userKey]
            if (user.conversationId === conversationId) {
                if (copyallUsers[userKey].otherReadMessageId === readMessageId)
                    return;
                copyallUsers[userKey].otherReadMessageId = readMessageId
            }
        }

        props.setFullUser(copyallUsers)

    }, [readSubscriptionData])




    useEffect(() => {
        if (!conversationLoaded) {
            apollo_client.query({
                query: getUserConversationsGQL
            }).then(async (res) => {
                console.log("getUserConversationsGQL", res)
                if (res.data.getMe && res.data.getMe.conversations) {
                    const _recentConversations = res.data.getMe.conversations

                    let _recentChatList = {}
                    if (_recentConversations.length > 0) {
                        for (var i = 0; i < _recentConversations.length; i++) {

                           

                            let _readIndexNumber = 0
                            let _readIndex = "";
                            if (_recentConversations[i].read) {
                                _readIndex = _recentConversations[i].read;
                                _readIndexNumber = parseInt(_recentConversations[i].read.substring(0, 13))
                            }

                            let _recentUser = {};
                            
                            
                            

                            if (_recentConversations[i].associated === null || _recentConversations[i].conversation === null)
                            {
                                // alert("dfsfsfdsf")
                                console.log("22222222222222222222222222", _recentConversations[i])

                                console.log("props.user.username", props.user.username, _recentConversations[i].conversationId)
                                removeUserConversationBridgeApollo({
                                    variables: {
                                        username: props.user.username,
                                        conversationId: _recentConversations[i].conversationId
                                    }
                                }).then((res) => {
                                    console.log("delete userconversationbridge self succeed")
                                    console.log(res)
                                })
                        
                                continue;
                            }
                            // if(_recentConversations[i].associated.length === 1){
                            //     _recentUser.username = _recentConversations[i].associated[0].username;
                            //     _recentUser.name = _recentConversations[i].name ? _recentConversations[i].name : _recentConversations[i].associated[0].username;
                            // }else if(_recentConversations[i].associated.length > 1){
                                // _recentUser.username = _recentConversations[i].associated[0].username;
                                // _recentUser.name = _recentConversations[i].name ? _recentConversations[i].name : _recentConversations[i].associated[0].username;
                            // }
                            _recentUser.accepted = _recentConversations[i].accepted;
                            _recentUser.username = _recentConversations[i].username;
                            _recentUser.name = _recentConversations[i].name;
                            _recentUser.creator = _recentConversations[i].conversation.creator;

                            _recentUser.conversationId = _recentConversations[i].conversationId
                            _recentUser.nextToken = null;
                            _recentUser.isGroup = false;
                            _recentUser.status = "online";
                            //_recentUser.profilePicture = null
                            _recentUser.unRead = 0;
                            _recentUser.read = _recentConversations[i].read
                            // _recentUser.otherReadMessageId = _recentConversations[i].associated.read
                            // _recentUser.associated = [];
                            _recentUser.associated = [..._recentConversations[i].associated]

                            if (_recentConversations[i].conversation.messages) {
                                _recentUser.nextToken = _recentConversations[i].conversation.messages.nextToken
                            }

                            if (_recentConversations[i].conversation.messages.messages) {

                                let messages = [..._recentConversations[i].conversation.messages.messages]
                                // calculate unread message count
                                for (let j = 0; j < messages.length; j++) {
                                    if (messages[j].sender === props.user.username || messages[j].id === _readIndex) {
                                        break;
                                    } else if (_readIndexNumber < parseInt(messages[j].id.substring(0, 13))) {
                                        _recentUser.unRead++
                                    }
                                }

                                // // set read status by other
                                // for (let k = 0; k < messages.length; k++) {
                                //     if (_otherReadIndexNumber > parseInt(messages[k].id.substring(0, 13)) || messages[k].id === _otherReadIndex) {
                                //         _recentUser.otherReadMessageId = messages[k]
                                //         break;
                                //     }
                                // }

                                _recentUser.messages = messages.reverse();


                            } else {
                                _recentUser.messages = []
                            }


                            _recentChatList[_recentUser.conversationId] = _recentUser

                        


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


                            observable.subscribeToMore({
                                document: subscribeToReadMessageGQL,
                                variables: {
                                    conversationId: _recentUser.conversationId
                                },
                                updateQuery: (prev, { subscriptionData }) => {
                                    setReadSubscriptionData(subscriptionData)
                                    console.log('subscribeToReadMessageData - updateQuery:', subscriptionData);
                                },
                            })

                            observable.subscribeToMore({
                                document: subscribeToAcceptConversationGQL,
                                variables: {
                                    conversationId: _recentUser.conversationId
                                },
                                updateQuery: (prev, { subscriptionData }) => {
                                    setAcceptSubscriptionData(subscriptionData)
                                    console.log('subscribeToAcceptConversationGQL - updateQuery:', subscriptionData);
                                },
                            })

                        }

                    }

                    props.activeUser(null);
                    props.setFullUser(_recentChatList)
                    console.log("setfulluser", _recentChatList)

                }
                setConversationLoad(true)
            }).catch((err) => {
                console.log(err)
                alert("unsuccessfully registered user")
                //setConversationLoad(true)
                history.push("/logout")                

            })

            apollo_client.query({
                query: getKlubsByKlubNameGQL,
                variables: {klubname : ""}
            }).then(async (res) => {
                 const klubs = [...res.data.searchKlubs];
                 props.setFullGroup(klubs);
            }).catch((err) => {
                console.log(err)
                history.push('/logout')
            })
        }

    }, [])


    useEffect(()=>{
        if (!acceptSubscriptionData) return;
        let coppyUsers = {...props.users};
        console.log("accepted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", acceptSubscriptionData.data.subscribeToAcceptConversation.conversationId)
        if (acceptSubscriptionData.data.subscribeToAcceptConversation.username === props.user.username) {
            console.log("props.users", coppyUsers)
            coppyUsers[acceptSubscriptionData.data.subscribeToAcceptConversation.conversationId].accepted = true;
        }
        else {
            alert(acceptSubscriptionData.data.subscribeToAcceptConversation.username + " accepted")
            console.log("coppyUsers[acceptSubscriptionData.data.subscribeToAcceptConversation.conversationId]", coppyUsers[acceptSubscriptionData.data.subscribeToAcceptConversation.conversationId])
            // coppyUsers[acceptSubscriptionData.data.subscribeToAcceptConversation.conversationId].associated.filter((el)=>(el.username === acceptSubscriptionData.data.subscribeToAcceptConversation.username)).accepted = true;
        }
        
        props.setFullUser(coppyUsers);
        console.log("coppyUsers", coppyUsers);

    }, [acceptSubscriptionData])


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
    const { users, posts, active_user, groups } = state.Chat;
    const { user, loading, error } = state.Auth;
    return { users, posts, user, active_user, groups };
};

export default connect(mapStateToProps, { setFullUser, activeUser, subscribeDirectMessage, setFullGroup })(Index);