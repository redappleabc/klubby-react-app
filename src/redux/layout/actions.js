import {
	SET_ACTIVE_TAB,
	SET_CHAT_ACTIVE_SUB_TAB,
	SET_KLUBS_ACTIVE_TAB,
	OPEN_USER_PROFILE_SIDEBAR,
	CLOSE_USER_PROFILE_SIDEBAR,
	SET_CONVERSATION_NAME_IN_OPEN_CHAT,
	SET_LOGIN_PAGE
} from "./constants";

export const setLoginPage = (state) => ({
	type: SET_LOGIN_PAGE,
	payload: state
});

export const setActiveTab = (tabId) => ({
	type: SET_ACTIVE_TAB,
	payload: tabId
});

export const setActiveChatSubTab = (chatSubtabId) => ({
	type: SET_CHAT_ACTIVE_SUB_TAB,
	payload: chatSubtabId
});

export const setActiveKlubsTab = (KlubId) => ({
	type: SET_KLUBS_ACTIVE_TAB,
	payload: KlubId
});

export const openUserSidebar = () => ({
	type: OPEN_USER_PROFILE_SIDEBAR
});

export const closeUserSidebar = () => ({
	type: CLOSE_USER_PROFILE_SIDEBAR
});

export const setconversationNameInOpenChat = (conversationName) => ({
	type: SET_CONVERSATION_NAME_IN_OPEN_CHAT,
	payload: conversationName
});
