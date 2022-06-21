import ReactSlider from "react-slider";
import React, { useState } from "react";
import 'rc-slider/assets/index.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveTab } from "../../../redux/actions";
import SimpleBar from "simplebar-react";

import profile from "../../../assets/images/group/profile-img.png";

import coinmarketcap from "../../../assets/images/group/icon/coinmarketcap.png";
import coingecko from "../../../assets/images/group/icon/coingecko.png";
import dextools from "../../../assets/images/group/icon/dextools.png";
import instagram from "../../../assets/images/group/icon/instagram.png";
import reddit from "../../../assets/images/group/icon/reddit.png";
import telegram from "../../../assets/images/group/icon/telegram.png";
import twitter from "../../../assets/images/group/icon/twitter.png";
import discord from "../../../assets/images/group/icon/discord.png";



const CreateKlubs = (props) => {
    const [inputPercent, setInputPercent] = useState("0%");

    const [tokenRequirments, setTokenRequirments] = useState('eth');

    return (
        <React.Fragment>
            <div className="create-klubs-header">
                <div className="header-main">
                    <div className="header-link">
                        <Link to="#" onClick={()=>{props.setActiveTab("klub")}}>
                            <i className="ri-arrow-left-s-line"></i>
                        </Link>                
                    </div>
                    <div className="header-text">
                        Create a Klub
                    </div>
                </div>
                <div className="header-footer">
                    <div className="input-percent">
                        <div style={{width: "75%"}}>75%</div>
                    </div>
                </div>
            </div>
            <SimpleBar className="chat-message-list create-klubs-input-con">
                <div className="profile-img">
                    <label htmlFor="img-upload">
                        <img src={profile}/>
                    </label>
                    <input type="file" name="img-upload" id="img-upload" hidden/>
                    <label htmlFor="img-upload">
                        Upload a Photos<span className="nec">*</span>
                    </label>
                    <div className="input-con">
                        <div className="text" >
                            Name<span className="nec">*</span>
                        </div>
                        <input type="text" placeholder="https://website.com"/>
                    </div>
                    <div className="input-con">
                        <div className="text" >
                            Description<span className="nec">*</span>
                        </div>
                        <textarea type="text" placeholder="Description"/>
                    </div>
                    <div className="input-con">
                        <div className="text" >
                            Contract Address<span className="nec">*</span>
                        </div>
                        <input type="text" placeholder="https://website.com"/>
                    </div>
                    <div className="input-con">
                        <div className="text" >
                            Blockchain Explorer<span className="nec">*</span>
                        </div>
                        <input type="text" placeholder="https://website.com"/>
                    </div>
                    <div className="input-con">
                        <div className="text" >
                            Token Requirements<span className="nec">*</span>
                        </div>
                        <div className="button-con">
                            <button className={tokenRequirments === "eth" ? 'active':''} onClick={()=>{setTokenRequirments('eth')}}>eth</button>
                            <button className={tokenRequirments === "erc20" ? 'active':''} onClick={()=>{setTokenRequirments('erc20')}}>erc20</button>
                            <button className={tokenRequirments === "erc721" ? 'active':''} onClick={()=>{setTokenRequirments('erc721')}}>erc721</button>
                        </div>
                    </div>
                    <div className="input-con">
                        <div className="slider-text-1">
                            Main Chat<span className="slider-text-con">0.03%</span>
                        </div>
                            <div className="slider-con">
                                <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                renderThumb={(props, state) => <div {...props}></div>}
                                />
                                <span className="slider-text-con">10,000</span>
                            </div>
                    </div>
                    <div className="input-con Whale-chat-input-con">
                        <div className="slider-text-1">
                            Whale Chat<span className="slider-text-con">0.03%</span>
                        </div>
                        <div className="slider-con">
                            <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            renderThumb={(props, state) => <div {...props}></div>}
                            />
                            <span className="slider-text-con">70,000</span>
                        </div>
                    </div>
                    <div className="input-con">
                        <div className="text" >
                            Website<span className="nec">*</span>
                        </div>
                        <input type="text" placeholder="https://website.com"/>
                    </div>
                    <div className="input-con">
                        <div className="text" >
                            Social<span className="nec">*</span>
                        </div>
                        <div className="social-input-con">
                            <div className="icon">
                                <img src={coinmarketcap} />
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                        <div className="social-input-con">
                            <div className="icon">
                                <img src={coingecko} />
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                        <div className="social-input-con">
                            <div className="icon">
                                <img src={dextools} />
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                        <div className="social-input-con">
                            <div className="icon">
                                <img src={telegram} />
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                        <div className="social-input-con">
                            <div className="icon">
                                <img src={discord} />
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                        <div className="social-input-con">
                            <div className="icon">
                                <img src={twitter} />
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                        <div className="social-input-con">
                            <div className="icon">
                                <img src={reddit} />
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                        <div className="social-input-con">
                            <div className="icon">
                                <img src={instagram} />
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                    </div>
                    <div>
                        <button className="auth-main-btn auth-main-btn-new" type="submit">Create Klub</button>
                    </div>
                </div>
            </SimpleBar>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { activeTab } = state.Layout;
    return { activeTab }
}

export default connect(mapStateToProps, {setActiveTab})(CreateKlubs);