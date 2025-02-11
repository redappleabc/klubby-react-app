// @flow
import {
	SET_ACTIVE_TAB,
	SET_CHAT_ACTIVE_SUB_TAB,
	SET_KLUBS_ACTIVE_TAB,
	OPEN_USER_PROFILE_SIDEBAR,
	CLOSE_USER_PROFILE_SIDEBAR,
	SET_CONVERSATION_NAME_IN_OPEN_CHAT,
	SET_LOGIN_PAGE
} from "./constants";

const INIT_STATE = {
	activeTab : "klub",
	userSidebar : false,
	conversationName : "Doris Brown",
	activeChatSubTab: "chat-klubs",
	activeKlubTab: "klub-home",
	loginPageState: false,
};

const Layout = (state = INIT_STATE, action) => {
	switch (action.type) {
		case SET_LOGIN_PAGE:
			return {
				...state,
				loginPageState: action.payload
			};

		case SET_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.payload
			};

		case SET_CHAT_ACTIVE_SUB_TAB:
			return {
				...state,
				activeChatSubTab: action.payload
			};
		case SET_KLUBS_ACTIVE_TAB:
			return {
				...state,
				activeKlubTab: action.payload
			};

		case OPEN_USER_PROFILE_SIDEBAR:
			return {
				...state,
				userSidebar: true
			};

		case CLOSE_USER_PROFILE_SIDEBAR:
			return {
				...state,
				userSidebar: false
			};

		case SET_CONVERSATION_NAME_IN_OPEN_CHAT:
			return {
				...state,
				conversationName: action.payload
			};
		default:
			return state;
	}
};

export default Layout;
