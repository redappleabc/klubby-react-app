import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

//redux store
import { logoutUser } from '../../redux/actions';

/**
 * Logouts the user
 * @param {*} props 
 */
const Logout = (props) => {
    useEffect(() => {
        props.logoutUser(props.history);
    }, [props]);

    return (<React.Fragment></React.Fragment>)
}

export default withRouter(connect(null, { logoutUser })(Logout));