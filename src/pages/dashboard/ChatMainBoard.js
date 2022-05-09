import React from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";


import UserChat from "./UserChat";
import UserGroup from "./UserGroup";
import UserPost from "./UserPost";

function ChatMainBoard(props) {
    const activeTab = props.activeTab;
    const chatActiveTab = props.activeChatSubTab;

    return (
        <React.Fragment>
            <div className="main-chat-board w-100 chat-main-board">
                <TabContent activeTab={activeTab}>
                     {/* Start Home tab-pane */}
                     <TabPane tabId="home" id="pills-home_">
                         <UserPost />
                    </TabPane>
                    {/* End Home tab-pane  */}


                    {/* Start chats tab-pane  */}
                    <TabPane tabId="chat" id="pills-chat_">
                        {/* chats content */}
                        <TabContent activeTab={chatActiveTab}>
                            <TabPane tabId= "chat-chat" id="pills-chat-chat">
                                <UserChat />
                            </TabPane>
                            <TabPane tabId= "search-chat-chat" id="pills-chat-chat">
                                <UserChat />
                            </TabPane>
                            <TabPane tabId="chat-klubs" id="pills-chat-group">
                                <UserGroup />
                            </TabPane>
                        </TabContent>
                    </TabPane>
                    {/* End chats tab-pane */}

                    {/* Start chats tab-pane  */}
                    <TabPane tabId="post" id="pills-post_">
                        {/* chats content */}
                        <UserPost />
                    </TabPane>
                    {/* End chats tab-pane */}

                    {/* Start chats tab-pane  */}
                    <TabPane tabId="settings" id="pills-setting_">
                        {/* chats content */}
                        <UserChat />
                    </TabPane>
                    {/* End chats tab-pane */}

                    
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

export default connect(mapStatetoProps, null)(ChatMainBoard);