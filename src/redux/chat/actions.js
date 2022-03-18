import {
    CHAT_USER,ACTIVE_USER,FULL_USER, ADD_LOGGED_USER, CREATE_GROUP, ACTIVE_POST, FULL_POST
} from './constants';


export const chatUser = () => ({
    type: CHAT_USER
});

export const activeUser = (userId) => ({
    type: ACTIVE_USER,
    payload : userId
});

export const activePost = (userId) => ({
    type: ACTIVE_POST,
    payload : userId
});

export const setFullUser = (fullUser) => ({
    type: FULL_USER,
    payload : fullUser
});

export const setFullPost = (fullPost) => ({
    type: FULL_POST,
    payload : fullPost
});

export const addLoggedinUser = (userData) => ({
    type: ADD_LOGGED_USER,
    payload : userData
});

export const createGroup = (groupData) => ({
    type : CREATE_GROUP,
    payload : groupData
})
