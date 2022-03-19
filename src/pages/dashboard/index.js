import React, { Component } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import ChatMainBoard from "./ChatMainBoard";

import { connect } from "react-redux";


class Index extends Component {

    render() {
        return (
            <React.Fragment>
                {/* chat left sidebar */}
                <ChatLeftSidebar recentChatList={this.props.users} recentPostList={this.props.posts} />

                {/* chat main board */}
                <ChatMainBoard recentChatList={this.props.users} recentPostList={this.props.posts} />

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { users, posts } = state.Chat;
    return { users, posts };
};

export default connect(mapStateToProps, {})(Index);