import {
    CHAT_USER, ACTIVE_USER, FULL_USER, ADD_LOGGED_USER, CREATE_GROUP, ACTIVE_POST, FULL_POST, FULL_GROUP, ACTIVE_GROUP, CREATE_USER, SUBSCRIBE_DIRECT_MESSAGE
} from './constants';


//Import Images
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

import post1 from "../../assets/images/post/post1.png";
import post2 from "../../assets/images/post/post2.png";

import group1 from "../../assets/images/group/group1.png";
import group2 from "../../assets/images/group/group2.png";
import group3 from "../../assets/images/group/group3.png";
import group4 from "../../assets/images/group/group4.png";
import group5 from "../../assets/images/group/group5.png";
import group6 from "../../assets/images/group/group6.png";

// import group3 from "../../assets/images/group/group3.png";

import img6 from "../../assets/images/small/img-1.jpg";
import img4 from "../../assets/images/small/img-1.jpg";
import img7 from "../../assets/images/small/img-1.jpg";
import { createUser } from './actions';


const INIT_STATE = {
    active_user: null,
    active_post: 0,
    active_group: 0,
    newDirectMessage:null,


    users: {
        //admin is sender and user in receiver
        // "Patrick Hendricks":{
        //     id: 2, name: "Patrick Hendricks", profilePicture: avatar2, status: "online", unRead: 0, roomType: "contact", isGroup: false,
        //     messages: [
        //         { id: 1, message: "hiaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", time: "01:05", userType: "receiver", isImageMessage: false, isFileMessage: false },
        //         { id: 2, message: "hi patrick", time: "10.00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //         { id: 3, message: "how's going on your project?", time: "01:05", userType: "receiver", isImageMessage: false, isFileMessage: false },
        //         { id: 4, message: "Do you need any help?", time: "01:06", userType: "receiver", isImageMessage: false, isFileMessage: false },
        //         { id: 1111, isToday: true },
        //         { id: 5, message: "Let me know?", time: "01:06", userType: "receiver", isImageMessage: false, isFileMessage: false },
        //         { id: 6, message: "hi...Good Morning!", time: "09:05", userType: "sender", isImageMessage: false, isFileMessage: false },
        //         { id: 7, message: "image", time: "10:30", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img4 }, { image: img7 }] },
        //         { id: 8, message: "please, save this pictures to your file and give it to me after you have done with editing!", time: "10:31", userType: "receiver", isImageMessage: false, isFileMessage: false },
        //         { id: 9, message: "okay sure😄👍", time: "02:50", userType: "sender", isImageMessage: false, isFileMessage: false },
        //     ]
        // },
    },
    groups: [
        {
            gourpId: 1, name: "Ethereum Ballers", profilePicture: group1, isGroup: true, unRead: 0, description: "This is a super rad group for true ethereum ballers to hang out and talk about ethereum.", groupType: "main",  
            members: [
                // { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
                // { userId: 2, name: "Ossie Wilson", profilePicture: avatar8, role: "admin" },
                // { userId: 3, name: "Jonathan Miller", profilePicture: "Null", role: null },
                // { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
                // { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
                // { userId: 6, name: "Steve Walker", profilePicture: avatar6, role: null },
            ],
            messages: {
                "main": [
                    { id: 33, isToday: true },
                    { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
                    { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
                    { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
                ],
                "whale": [
                    { id: 33, isToday: true },
                    { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
                    { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
                ],
                "announcement": [
                    { id: 33, isToday: true },
                    { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
                    { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
                ]
            }
        },
        {
            gourpId: 2, name: "Klubby First 1000", profilePicture: group2, isGroup: true, unRead: 23, description: "This is a super rad group for true ethereum ballers to hang out and talk about ethereum.This is a super rad group for true ethereum ballers to hang out and talk about ethereum.", groupType: "main",
            members: [
                { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
                { userId: 2, name: "Ossie Wilson", profilePicture: avatar8, role: "admin" },
                { userId: 3, name: "Jonathan Miller", profilePicture: "Null", role: null },
                { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
                { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
                { userId: 6, name: "Steve Walker", profilePicture: avatar6, role: null },
            ],
            messages: {
                "main": [
                    { id: 33, isToday: true },
                    { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
                    { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
                    { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
                ],
                "whale": [
                    { id: 33, isToday: true },
                    { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
                    { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
                ],
                "announcement": [
                    { id: 33, isToday: true },
                    { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
                    { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
                ]
            }
        },
        // {
        //     gourpId: 3, name: "Kishu Inu", profilePicture: group3, isGroup: true, unRead: 0, isNew: true, desc: "I remember when this first", groupType: "main",
        //     members: [
        //         { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        //         { userId: 2, name: "Ossie Wilson", profilePicture: avatar8, role: "admin" },
        //         { userId: 3, name: "Jonathan Miller", profilePicture: "Null", role: null },
        //         { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        //         { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        //         { userId: 6, name: "Steve Walker", profilePicture: avatar6, role: null },
        //     ],
        //     messages: {
        //         "main": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
        //             { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
        //         ],
        //         "whale": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
        //         ],
        //         "announcement": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
        //         ]
        //     }
        // },
        // {
        //     gourpId: 4, name: "Bitcoin Bullies", profilePicture: group4, isGroup: true, unRead: 0, desc: "Back in 2009 I was mining BTC", groupType: "main",
        //     members: [
        //         { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        //         { userId: 2, name: "Ossie Wilson", profilePicture: avatar8, role: "admin" },
        //         { userId: 3, name: "Jonathan Miller", profilePicture: "Null", role: null },
        //         { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        //         { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        //         { userId: 6, name: "Steve Walker", profilePicture: avatar6, role: null },
        //     ],
        //     messages: {
        //         "main": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
        //             { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
        //         ],
        //         "whale": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
        //         ],
        //         "announcement": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
        //         ]
        //     }
        // },
        // {
        //     gourpId: 5, name: "CryptoPunks", profilePicture: group5, isGroup: true, unRead: 0, isNew: true, desc: "We used to be number 1 ", groupType: "main",
        //     members: [
        //         { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        //         { userId: 2, name: "Ossie Wilson", profilePicture: avatar8, role: "admin" },
        //         { userId: 3, name: "Jonathan Miller", profilePicture: "Null", role: null },
        //         { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        //         { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        //         { userId: 6, name: "Steve Walker", profilePicture: avatar6, role: null },
        //     ],
        //     messages: {
        //         "main": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
        //             { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
        //         ],
        //         "whale": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
        //         ],
        //         "announcement": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
        //         ]
        //     }
        // },
        // {
        //     gourpId: 6, name: "Bored Ape Yacht Club", profilePicture: group6, isGroup: true, unRead: 0, desc: "The most elite crypto club", groupType: "main",
        //     members: [
        //         { userId: 1, name: "Sara Muller", profilePicture: "Null", role: null },
        //         { userId: 2, name: "Ossie Wilson", profilePicture: avatar8, role: "admin" },
        //         { userId: 3, name: "Jonathan Miller", profilePicture: "Null", role: null },
        //         { userId: 4, name: "Paul Haynes", profilePicture: avatar7, role: null },
        //         { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
        //         { userId: 6, name: "Steve Walker", profilePicture: avatar6, role: null },
        //     ],
        //     messages: {
        //         "main": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
        //             { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
        //         ],
        //         "whale": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false }
        //         ],
        //         "announcement": [
        //             { id: 33, isToday: true },
        //             { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage: false, isFileMessage: false },
        //             { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage: true, isFileMessage: false, imageMessage: [{ image: img6 }] },
        //         ]
        //     }
        // },
    ],
    contacts: [
        { id: 1, name: "Albert Rodarte" },
        { id: 2, name: "Allison Etter" },
        { id: 3, name: "Craig Smiley" },
        { id: 4, name: "Daniel Clay" },
        { id: 5, name: "Doris Brown" },
        { id: 6, name: "Iris Wells" },
        { id: 7, name: "Juan Flakes" },
        { id: 8, name: "John Hall" },
        { id: 9, name: "Joy Southern" },
        { id: 10, name: "Mary Farmer" },
        { id: 11, name: "Mark Messer" },
        { id: 12, name: "Michael Hinton" },
        { id: 13, name: "Ossie Wilson" },
        { id: 14, name: "Phillis Griffin" },
        { id: 15, name: "Paul Haynes" },
        { id: 16, name: "Rocky Jackson" },
        { id: 17, name: "Sara Muller" },
        { id: 18, name: "Simon Velez" },
        { id: 19, name: "Steve Walker" },
        { id: 20, name: "Hanah Mile" },
    ],
    posts: [
        {
            id: 2, name: "Ethereum Ballers", profilePicture: post2, unRead: 0, isGroup: true, time: "2days ago", isImagepost: true, image: img4, content: "That’s what we like to see! 😎",
            upvote: 113, comment: 34, isupvote: true,
            messages: [
                { id: 1, username: "John Hall", userimg: avatar2, message: "It's too similar to nyan heroes Need to chanfe the headers i'll be home in a hour so I can look at it properly on my computer", time: "09:05", userType: "receiver", isImageMessage: false, isFileMessage: false },
                { id: 2, username: "ary Farmer", userimg: avatar3, message: "So you can start now!", time: "10:30", userType: "receiver", isFileMessage: false },
                { id: 3, username: "Rocky Jackson", userimg: avatar4, message: "yes, but first of all I need the logo image!", time: "10:31", userType: "receiver", isImageMessage: false, isFileMessage: false },
            ]
        },
        {
            id: 3, name: "Crypto Cicero", profilePicture: post1, unRead: 0, isGroup: true, time: "2days ago", isImagepost: true, image: img4, content: "Peace, Love, and Crypto Justice is what I stand for.",
            upvote: 1, comment: 9, isupvote: false,
            messages: [
                { id: 1, username: "Simon Velez", userimg: avatar4, message: "So you can start now!", time: "09:05", userType: "receiver", isImageMessage: false, isFileMessage: false },
                { id: 2, username: "Hanah Mile", userimg: avatar3, message: "So you can start now!", time: "10:30", userType: "receiver", isFileMessage: false },
                { id: 3, username: "Michael Hinton", userimg: avatar2, message: "yes, but first of all I need the logo image!", time: "10:31", userType: "receiver", isImageMessage: false, isFileMessage: false },
            ]
        },
        {
            id: 3, name: "Crypto Cicero", profilePicture: post2, unRead: 0, isGroup: true, time: "2days ago", isImagepost: true, image: img6, content: "Peace, Love, and Crypto Justice is what I stand for.",
            upvote: 1, comment: 9, isupvote: false,
            messages: [
                { id: 1, username: "Simon Velez", userimg: avatar4, message: "So you can start now!", time: "09:05", userType: "receiver", isImageMessage: false, isFileMessage: false },
                { id: 2, username: "Hanah Mile", userimg: avatar3, message: "So you can start now!", time: "10:30", userType: "receiver", isFileMessage: false },
                { id: 3, username: "Michael Hinton", userimg: avatar2, message: "yes, but first of all I need the logo image!", time: "10:31", userType: "receiver", isImageMessage: false, isFileMessage: false },
            ]
        },
    ]
};

const Chat = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHAT_USER:
            return { ...state };

        case ACTIVE_USER:
            return {
                ...state,
                active_user: action.payload
            };

        case ACTIVE_POST:
            return {
                ...state,
                active_post: action.payload
            };
        case ACTIVE_GROUP:
            return {
                ...state,
                active_group: action.payload
            };

        case FULL_USER:
            return {
                ...state,
                users: action.payload
            };
        case FULL_POST:
            return {
                ...state,
                posts: action.payload
            };
        case FULL_GROUP:
            return {
                ...state,
                groups: action.payload
            };

        // case ADD_LOGGED_USER:
        //     const newUser =  action.payload
        //     return{
        //         ...state, users : [
        //             ...state.users, newUser
        //         ]
        //     };

        case CREATE_GROUP:
            const newGroup = action.payload
            return {
                ...state, groups: [
                    ...state.groups, newGroup
                ]
            };
        case CREATE_USER:
            const newUser = action.payload
            return {
                ...state, users: [
                    ...state.users, newUser
                ]
            };
        
        case SUBSCRIBE_DIRECT_MESSAGE:
            return {... state, 
                newDirectMessage:action.payload
            }

        default: return { ...state };
    }
}

export default Chat;