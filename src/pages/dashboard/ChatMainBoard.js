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
                     <TabPane tabId="home" id="pills-home">
                         <UserPost recentPostList={props.recentPostList} />
                    </TabPane>
                    {/* End Home tab-pane  */}


                    {/* Start chats tab-pane  */}
                    <TabPane tabId="chat" id="pills-chat">
                        {/* chats content */}
                        <UserChat recentChatList={props.recentChatList} />
                    </TabPane>
                    {/* End chats tab-pane */}

                    {/* Start profile tab-pane */}
                    <TabPane tabId="profile" id="pills-profile">
                         <UserPost recentPostList={props.recentPostList} />
                    </TabPane>
                    {/* End profile tab-pane  */}

                    {/* Start group tab-pane */}
                    <TabPane tabId="Klubs" id="pills-klubs">
                         {/* <UserPost recentPostList={props.recentPostList} /> */}
                    </TabPane>
                    {/* End group tab-pane  */}

                    {/* Start setting tab-pane */}
                    <TabPane tabId="setting" id="pills-setting">
                         <UserPost recentPostList={props.recentPostList} />
                    </TabPane>
                    {/* End setting tab-pane  */}
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