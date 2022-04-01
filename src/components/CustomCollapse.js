import React from 'react';
import { Collapse, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

function CustomCollapse(props) {
    const { isOpen, toggleCollapse } = props;


    return (
        <React.Fragment>
            <Link to="#" onClick={toggleCollapse} className="text-dark" >
                <CardHeader id="">
                    <div className="setting-collapse-title font-size-16 m-0">
                        {
                            props.iconClass && <i className={props.iconClass + " me-2 align-middle d-inline-block"}></i>
                        }
                        {props.title}
                        <i className={isOpen ? "mdi mdi-chevron-up accor-plus-icon setting-collapse-arrow" : "mdi mdi-chevron-right accor-plus-icon setting-collapse-arrow"}></i>
                    </div>
                    <i className={"setting-collapse-icon " + props.icon}></i>
                    <div className="font-size-12 setting-collapse-description">
                        {props.description}
                    </div>
                </CardHeader>
            </Link>

            <Collapse isOpen={isOpen}>
                <CardBody>
                    {props.children}
                </CardBody>
            </Collapse>
        </React.Fragment>
    );
}

export default CustomCollapse;