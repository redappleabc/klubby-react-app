import React from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";

//Import Components
import Home from "./Tabs/Home";
import Profile from "./Tabs/Profile";
import Chats from "./Tabs/Chats";
import Klubs from "./Tabs/Klubs";
// import Notification from "./Tabs/Groups";
// import Contacts from "./Tabs/Contacts";
import Settings from "./Tabs/Settings";
import Post from "./Tabs/Post";

function ChatLeftSidebar(props) {
    const activeTab = props.activeTab;

    return (
        <React.Fragment>
            <div className="chat-leftsidebar me-lg-2">

                <TabContent activeTab={activeTab}>
                     {/* Start Home tab-pane */}
                     <TabPane tabId="home" id="pills-home">
                         <Home />
                    </TabPane>

                    
                    {/* End Profile tab-pane  */}

                    {/* Start Profile tab-pane */}
                    <TabPane tabId="profile" id="pills-user">
                        {/* profile content  */}
                        <Profile />
                    </TabPane>
                    {/* End Profile tab-pane  */}

                    {/* Start chats tab-pane  */}
                    <TabPane tabId="chat" id="pills-chat">
                        {/* chats content */}
                        <Chats/>
                    </TabPane>
                    {/* End chats tab-pane */}

                    {/* Start groups tab-pane */}
                    <TabPane tabId="klub" id="pills-klub">
                        {/* Groups content */}
                        <Klubs />
                    </TabPane>
                    {/* End groups tab-pane */}

                    {/* Start settings tab-pane */}
                    <TabPane tabId="settings" id="pills-setting">
                        {/* Settings content */}
                        <Settings />
                    </TabPane>
                    {/* End settings tab-pane */}

                    {/* Start settings tab-pane */}
                    <TabPane tabId="post" id="pills-post">
                        {/* Settings content */}
                        <Post />
                    </TabPane>
                    {/* End settings tab-pane */}

                </TabContent>
                {/* end tab content */}

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