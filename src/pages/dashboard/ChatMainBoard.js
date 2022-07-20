import React from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";


import UserChat from "./UserChat";
import UserGroup from "./UserKlub";
// import UserPost from "./UserPost";

function ChatMainBoard(props) {
    const activeTab = props.activeTab;
    const chatActiveTab = props.activeChatSubTab;

    return (
        <React.Fragment>
            <div className="main-chat-board w-100 chat-main-board">
                <TabContent activeTab={activeTab}>
                     {/* Start Home tab-pane */}
                     {/* <TabPane tabId="home" id="pills-home_">
                         <UserPost />
                    </TabPane> */}
                    {/* End Home tab-pane  */}

                     {/* Start Home tab-pane */}
                    <TabPane tabId="klub" id="pills-klub_">
                        <UserGroup />
                    </TabPane>
                    <TabPane tabId="create-klubs" id="pills-create-klubs_">
                        <UserGroup />
                    </TabPane>

                    <TabPane tabId="chat" id="pills-klub_">
                        <UserChat />
                    </TabPane>
                    {/* End Home tab-pane  */}

                    <TabPane tabId="request-chat" id="pills-request-chat_">
                        <UserChat />
                    </TabPane>
                    {/* End Home tab-pane  */}


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