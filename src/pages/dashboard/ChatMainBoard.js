import React from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";


import UserChat from "./UserChat";
import UserPost from "./UserPost";

function ChatMainBoard(props) {
    const activeTab = props.activeTab;

    return (
        <React.Fragment>
            <div className="main-chat-board w-100 chat-main-board">
                <TabContent activeTab={activeTab}>
                     {/* Start Home tab-pane */}
                     <TabPane tabId="home" id="pills-home_">
                         <UserPost recentPostList={props.recentPostList} />
                    </TabPane>
                    {/* End Home tab-pane  */}


                    {/* Start chats tab-pane  */}
                    <TabPane tabId="chat" id="pills-chat_">
                        {/* chats content */}
                        <UserChat recentChatList={props.recentChatList} />
                    </TabPane>
                    {/* End chats tab-pane */}

                    {/* Start chats tab-pane  */}
                    <TabPane tabId="post" id="pills-post_">
                        {/* chats content */}
                        <UserPost recentPostList={props.recentPostList} />
                    </TabPane>
                    {/* End chats tab-pane */}

                    {/* Start chats tab-pane  */}
                    <TabPane tabId="settings" id="pills-setting_">
                        {/* chats content */}
                        <UserChat recentChatList={props.recentChatList} />
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