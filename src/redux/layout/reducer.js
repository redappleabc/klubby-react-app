// @flow
import {
	SET_ACTIVE_TAB,
	OPEN_USER_PROFILE_SIDEBAR,
	CLOSE_USER_PROFILE_SIDEBAR,
	SET_CONVERSATION_NAME_IN_OPEN_CHAT
} from "./constants";

const INIT_STATE = {
	activeTab : "home",
	userSidebar : false,
	conversationName : "Doris Brown"
};

const Layout = (state = INIT_STATE, action) => {
	switch (action.type) {
		case SET_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.payload
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
