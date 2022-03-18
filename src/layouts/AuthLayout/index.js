import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

//Import Components
import LeftSidebarMenu from "./LeftSidebarMenu";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.capitalizeFirstLetter.bind(this);
    }
    
    //function for capital first letter of current page pathname
    capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    componentDidMount(){
        let currentage = this.capitalizeFirstLetter(this.props.location.pathname);

        //set document title according to page path name
        document.title = currentage + " | klubby - Responsive Bootstrap 5 Admin Dashboard";
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="layout-wrapper d-lg-flex">
                    {/* left sidebar menu */}
                    <LeftSidebarMenu />
                    {/* render page content */}
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}


export default (withRouter(Index));