import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Form, Label, Input, InputGroup, } from 'reactstrap';
import SimpleBar from "simplebar-react";

import { connect } from "react-redux";

import { withTranslation } from 'react-i18next';

//use sortedContacts variable as global variable to sort contacts
let sortedContacts = [
    {
        group: "A",
        children: [{ name: "Demo" }]
    }
]

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            contacts: this.props.contacts
        }
        this.toggle = this.toggle.bind(this);
        this.sortContact = this.sortContact.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                contacts: this.props.contacts
            });
        }
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    sortContact() {
        let data = this.state.contacts.reduce((r, e) => {
            try {
                // get first letter of name of current element
                let group = e.name[0];
                // if there is no property in accumulator with this letter create it
                if (!r[group]) r[group] = { group, children: [e] }
                // if there is push current element to children array for that letter
                else r[group].children.push(e);
            } catch (error) {
                return sortedContacts;
            }
            // return accumulator
            return r;
        }, {})

        // since data at this point is an object, to get array of values
        // we use Object.values method
        let result = Object.values(data);
        this.setState({ contacts: result });
        sortedContacts = result;
        return result;
    }

    componentDidMount() {
        this.sortContact();
    }

    componentWillUnmount() {
        this.sortContact();
    }

    render() {
        const { t } = this.props;
        return (
            <React.Fragment>
                <div>
                    <div className="p-4">
                        <div className="user-chat-nav float-end">
                            <div id="add-contact">
                                {/* Button trigger modal */}
                                <Button type="button" color="link" onClick={this.toggle} className="text-decoration-none text-muted font-size-18 py-0">
                                    <i className="ri-user-add-line"></i>
                                </Button>
                            </div>
                            <UncontrolledTooltip target="add-contact" placement="bottom">
                                Add Contact
                                    </UncontrolledTooltip>
                        </div>
                        <h4 className="mb-4">Contacts</h4>

                        {/* Start Add contact Modal */}
                        <Modal isOpen={this.state.modal} centered toggle={this.toggle}>
                            <ModalHeader tag="h5" className="font-size-16" toggle={this.toggle}>
                                {t('Add Contacts')}
                            </ModalHeader>
                            <ModalBody className="p-4">
                                <Form>
                                    <div className="mb-4">
                                        <Label className="form-label" htmlFor="addcontactemail-input">{t('Email')}</Label>
                                        <Input type="email" className="form-control" id="addcontactemail-input" placeholder="Enter Email" />
                                    </div>
                                    <div>
                                        <Label className="form-label" htmlFor="addcontact-invitemessage-input">{t('Invatation Message')}</Label>
                                        <textarea className="form-control" id="addcontact-invitemessage-input" rows="3" placeholder="Enter Message"></textarea>
                                    </div>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button type="button" color="link" onClick={this.toggle}>Close</Button>
                                <Button type="button" color="primary">Invite Contact</Button>
                            </ModalFooter>
                        </Modal>
                        {/* End Add contact Modal */}

                        <div className="search-box chat-search-box">
                            <InputGroup size="lg" className="bg-light rounded-lg">
                                <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
                                    <i className="ri-search-line search-icon font-size-18"></i>
                                </Button>
                                <Input type="text" className="form-control bg-light " placeholder={t('Search users..')} />
                            </InputGroup>
                        </div>
                        {/* End search-box */}
                    </div>
                    {/* end p-4 */}

                    {/* Start contact lists */}
                    <SimpleBar style={{ maxHeight: "100%" }} id="chat-room" className="p-4 chat-message-list chat-group-list">

                        {
                            sortedContacts.map((contact, key) =>
                                <div key={key} className={key + 1 === 1 ? "" : "mt-3"}>
                                    <div className="p-3 fw-bold text-primary">
                                        {contact.group}
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        {
                                            contact.children.map((child, key) =>
                                                <li key={key} >
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-1">
                                                            <h5 className="font-size-14 m-0">{child.name}</h5>
                                                        </div>
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle tag="a" className="text-muted">
                                                                <i className="ri-more-2-fill"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-end">
                                                                <DropdownItem>{t('Share')} <i className="ri-share-line float-end text-muted"></i></DropdownItem>
                                                                <DropdownItem>{t('Block')} <i className="ri-forbid-line float-end text-muted"></i></DropdownItem>
                                                                <DropdownItem>{t('Remove')} <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            )
                        }

                    </SimpleBar>
                    {/* end contact lists */}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { contacts } = state.Chat;
    return { contacts };
};

export default connect(mapStateToProps, null)(withTranslation()(Contacts));