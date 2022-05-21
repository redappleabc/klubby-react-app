import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, ButtonDropdown, DropdownToggle, DropdownMenu, Label, Form, Modal, ModalBody } from "reactstrap";
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import { connect } from "react-redux";

import emoji from '../../../assets/images/icons/emoji.png'


function ChatInput(props) {
    const [VoiceRecordmodal, setVoiceRecordModal] = useState(false);
    const [textMessage, settextMessage] = useState("");
    const textAreaRef = useRef(null);
    const mainInputRef = useRef(null);
    const [isOpen, setisOpen] = useState(false);
    const [file, setfile] = useState({
        name: "",
        size: ""
    });
    const [fileImage, setfileImage] = useState("")

    const toggleVoiceRecordModal = () => setVoiceRecordModal(!VoiceRecordmodal);
    const toggle = () => setisOpen(!isOpen);

    //function for text input value change
    const handleChange = e => {
        settextMessage(e.target.value)
        
    }

    //function for add emojis
    const addEmoji = e => {
        let emoji = e.native;
        settextMessage(textMessage + emoji)
    };

    //function for file input change
    const handleFileChange = e => {
        if (e.target.files.length !== 0) {
            setfile({
                name: e.target.files[0].name,
                size: e.target.files[0].size
            })

            settextMessage( e.target.files[0].name + " was selected.");
        }
            
    }

    //function for image input change
    // const handleImageChange = e => {
    //     if (e.target.files.length !== 0)
    //         setfileImage(URL.createObjectURL(e.target.files[0]))
    // }

    //function for send data to onaddMessage function(in userChat/index.js component)
    const onaddMessage = (e, textMessage) => {
        e.preventDefault();

        //if text value is not emptry then call onaddMessage function
        if (textMessage !== "") {
            
            props.onaddMessage(textMessage, "textMessage");
            settextMessage("");
        }

        //if file input value is not empty then call onaddMessage function
        if (file.name !== "") {
            
            props.onaddMessage(file, "fileMessage");
            setfile({
                name: "",
                size: ""
            })
        }

        //if image input value is not empty then call onaddMessage function
        if (fileImage !== "") {
            props.onaddMessage(fileImage, "imageMessage");
            setfileImage("")
        }
    }

    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        if (textAreaRef.current.scrollHeight > 230) {
            textAreaRef.current.classList.add('max-h');
            return;
        } 
        else textAreaRef.current.classList.remove('max-h');
        let mainInputHeight = textAreaRef.current.scrollHeight + 34;
        if (textAreaRef.current.scrollHeight != 0) mainInputRef.current.style.height = mainInputHeight + "px";
        console.log(mainInputHeight);
      };
    
    useEffect(resizeTextArea, [textMessage]);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {  
            // e.preventDefault();
            if ((e.metaKey || e.ctrlKey) && e.code === 'KeyC') {
                console.log('fire!')
            }  
        })
    })

    return (
        <React.Fragment>
            <div ref={mainInputRef} className={`p-3 p-lg-3 border-top mb-0 chat-input ${props.userSidebar === true ? "small": ""}`}>
                <Form onSubmit={(e) => onaddMessage(e, textMessage)} >
                    <div className='main-input-container'>
                        <div className='main-input'>
                            <div className='round-input'>
                                <textarea ref={textAreaRef} rows={1} value={textMessage} onChange={handleChange} className="form-control form-control-lg bg-light border-light" placeholder="Enter Message" />
                            </div>
                            <div className="list-inline-item emoji-input">
                                <ButtonDropdown className="emoji-dropdown" direction="up" isOpen={isOpen} toggle={toggle}>
                                    <DropdownToggle color="link" className="text-decoration-none font-size-20 emoji-input-dropdown">
                                        <img src={emoji} alt="klubby"/>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end emotion-dropdown">
                                        <Picker onSelect={addEmoji} />
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </div>
                            <div className="list-inline-item input-file">
                                <Label className="btn btn-link text-decoration-none font-size-20 btn-lg waves-effect">
                                    <i className="ri-file-line"></i>
                                    <Input onChange={(e) => handleFileChange(e)} type="file" name="fileInput" size="60" />
                                </Label>
                            </div>
                        </div>

                        <div className={`mic-btn ${textMessage.length >= 1 ? "" : "show"}`}>
                            <Button color="primary" onClick={toggleVoiceRecordModal} className="font-size-16 btn-lg chat-send waves-effect waves-light round-btn">
                                <i className="ri-mic-line"></i>
                            </Button>
                        </div>
                        <div className={`message-submit-btn ${textMessage.length >=1 ? "show" : ""}`}>
                            <Button type="submit" color="primary" className="font-size-16 btn-lg chat-send waves-effect waves-light round-btn">
                                <i className="ri-send-plane-2-fill"></i>
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
            {/* Audio record Modal */}
            <Modal tabIndex="-1" isOpen={VoiceRecordmodal} toggle={toggleVoiceRecordModal} centered>
                <ModalBody>
                    <div className="text-center p-4">
                        <div className="avatar-lg mx-auto mb-4 voice-record-img">
                            <i className="ri-mic-fill"></i>
                        </div>
                        <p className="text-muted">Start Audio VoiceRecord</p>

                        <div className="mt-5">
                            <ul className="list-inline mb-1">
                                <li className="list-inline-item px-2 me-2 ms-0">
                                    <button type="button" className="btn btn-danger avatar-sm rounded-circle" onClick={toggleVoiceRecordModal}>
                                        <span className="avatar-title bg-transparent font-size-20">
                                            <i className="ri-close-fill"></i>
                                        </span>
                                    </button>
                                </li>
                                <li className="list-inline-item px-2">
                                    <button type="button" className="btn btn-success avatar-sm rounded-circle">
                                        <span className="avatar-title bg-transparent font-size-20">
                                            <i className="ri-mic-line"></i>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    const { userSidebar } = state.Layout;
    return { userSidebar }
};

export default connect(mapStatetoProps)(ChatInput);