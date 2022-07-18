import React from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";

//Import Components
import Home from "./Tabs/Home";
import Profile from "./Tabs/profile";
import Chats from "./Tabs/Chats";
import Klubs from "./Tabs/Klubs";
// import Notification from "./Tabs/Groups";
// import Contacts from "./Tabs/Contacts";
import Settings from "./Tabs/Settings";
import Post from "./Tabs/Post";
import CreateKlubs from "./Tabs/CreateKlubs";
import CreateChat from './Tabs/CreateChat';
import RequestChat from './Tabs/RequestChat';
import ProfileEdit from './Tabs/profile/Edit';
import ProfileAccount from './Tabs/profile/Account';
import ProfileAccountChangeEmail from './Tabs/profile/ChangeEmail';
import ProfileSecurity from './Tabs/profile/Security';
import ProfileAccountChangePassword from './Tabs/profile/ChangePassword';
import Help from './Tabs/profile/ProfileHelp';
import Wallet from './Tabs/profile/ProfileWallet';

function ChatLeftSidebar(props) {
    const activeTab = props.activeTab;

    return (
        <React.Fragment>
            <div className="chat-leftsidebar me-lg-2">

                <TabContent activeTab={activeTab}>
                    {/* klubs */}
                    <TabPane tabId="klub" id="pills-klub">
                        <Klubs />
                    </TabPane>
                                            
                    <TabPane tabId="create-klubs" id="pills-create-klubs">
                        <CreateKlubs />
                    </TabPane>
                     {/* chat  */}
                    <TabPane tabId="chat" id="pills-chat">
                        <Chats/>
                    </TabPane>
                   
                    <TabPane tabId="create-chat" id="pills-create-chat">
                        <CreateChat />
                    </TabPane>

                    <TabPane tabId="request-chat" id="pills-request-chat">
                        <RequestChat />
                    </TabPane>
                    {/* profile  */}
                    <TabPane tabId="profile" id="pills-profile">
                        <Profile />
                    </TabPane>

                    <TabPane tabId="profile-edit" id="pills-profile-edit">
                        <ProfileEdit />
                    </TabPane>
                    <TabPane tabId="profile-account" id="pills-profile-account">
                        <ProfileAccount />
                    </TabPane>
                    <TabPane tabId="profile-change-email" id="pills-profile-change-email">
                        <ProfileAccountChangeEmail />
                    </TabPane>
                    <TabPane tabId="profile-security" id="pills-profile-security">
                        <ProfileSecurity />
                    </TabPane>
                    <TabPane tabId="profile-change-password" id="pills-profile-change-password">
                        <ProfileAccountChangePassword />
                    </TabPane>
                    <TabPane tabId="profile-wallet" id="pills-profile-wallet">
                        <Wallet/>
                    </TabPane>
                    <TabPane tabId="profile-help" id="pills-profile-help">
                        <Help/>
                    </TabPane>

                </TabContent>

            </div>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, null)(ChatLeftSidebar);