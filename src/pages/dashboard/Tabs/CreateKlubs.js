import ReactSlider from "react-slider";
import React, { useRef, useState } from "react";
import 'rc-slider/assets/index.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveTab } from "../../../redux/actions";
import SimpleBar from "simplebar-react";
import { useFormik } from 'formik';
import { Form } from "reactstrap";
import * as Yup from 'yup';

import profile from "../../../assets/images/group/profile-img.png";
import coinmarketcap from "../../../assets/images/group/icon/coinmarketcap.png";
import coingecko from "../../../assets/images/group/icon/coingecko.png";
import dextools from "../../../assets/images/group/icon/dextools.png";
import instagram from "../../../assets/images/group/icon/instagram.png";
import reddit from "../../../assets/images/group/icon/reddit.png";
import telegram from "../../../assets/images/group/icon/telegram.png";
import twitter from "../../../assets/images/group/icon/twitter.png";
import discord from "../../../assets/images/group/icon/discord.png";
import { useEffect } from "react";


const CreateKlubs = (props) => {
    const creatKlubPageRef = useRef();
    const [headerSmallState, setHeaderSmallState] = useState(false);
    const [mainChatSliderValue, setMainChatSliderValue] = useState(0)
    const [whaleChatSliderValue, setWhaleChatSliderValue] = useState(0)
    const [inputPercent, setInputPercent] = useState(0);

    const inputPercenFlag = [0, 0, 0, 0];

    const calInputPercent = () => {
        let percent = 0;
        for (let i =0; i<inputPercenFlag.length; i++) percent+=(100/inputPercenFlag.length)*inputPercenFlag[i];  
        return percent;
    }
    const [tokenRequirments, setTokenRequirments] = useState('eth');

    const totalCount = 10000;

    const onScroll = () => {
        if (creatKlubPageRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = creatKlubPageRef.current.getScrollElement();
        //   setInputPercent(scrollTop)
          if (scrollTop + clientHeight === scrollHeight) {
            console.log("reached bottom");
          }
          if (scrollTop < 100) {
            console.log("top")
            setHeaderSmallState(false);
          }
          else {
            setHeaderSmallState(true)
          }
        }
      };

      const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            contarctAdress: '',
            BlockchainExplorer: '',
            // imgUpload: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('*Required'),
            description: Yup.string().required('*Required'),
            contarctAdress: Yup.string().required('*Required'),
            BlockchainExplorer: Yup.string().required('*Required'),
            name: Yup.string().required('*Required'),
        }),
        onSubmit: values => {
            alert('ok');
        },
    });
    

    useEffect(()=>{
        const calInputPercent = () => {
            let percent = 0;
            for(let index in formik.values) {
                console.log(Object.keys(formik.values).length)
                if (formik.values[index] != "") percent += 100/Object.keys(formik.values).length; 
            }
            return percent;
        }
        setInputPercent(calInputPercent());
        console.log(formik.values)
    }, [formik.values])

    return (
        <React.Fragment>
            <div className={headerSmallState ? "create-klubs-header small-bar" : "create-klubs-header"}>
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
                        <div style={{width: `${inputPercent}%`}}>{inputPercent}%</div>
                    </div>
                    {/* <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    /> */}
                </div>
                <div className="header-footer small">
                        <Link to="#" onClick={()=>{props.setActiveTab("klub")}}>
                            <i className="ri-arrow-left-s-line"></i>
                        </Link>          
                    <div className="input-percent">
                        <div style={{width: `${inputPercent}%`}}>{inputPercent}%</div>
                    </div>
                        {/* <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        /> */}
                </div>
            </div>
            <SimpleBar className={headerSmallState ? "chat-message-list create-klubs-input-con small-bar" : "chat-message-list create-klubs-input-con"}  
                onScrollCapture={onScroll} 
                ref={creatKlubPageRef} 
            >
                <form className="create-klubs-input-main" onSubmit={formik.handleSubmit}>
                    <div className="profile-img">
                        <label htmlFor="imgUpload">
                            <img src={profile}/>
                        </label>
                        <input
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.name}
                            type="file"
                            // name="imgUpload" 
                            id="imgUpload" 
                            hidden
                        />
                        <label htmlFor="imgUpload">
                            Upload Photo<span className="nec">*</span>
                        </label>
                        {/* <div className='error-text'>{formik.errors.imgUpload}</div> */}
                    </div>
                    <div className="create-klubs-input-cons">
                        <div className={formik.errors.name ? "input-con error" : "input-con"}>
                            <div className="text" >
                                Name<span className="nec">*</span>
                            </div>
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder="Name"
                            />
                            <div className='error-text'>{formik.errors.name}</div>
                        </div>
                        <div className={formik.errors.description ? "input-con error" : "input-con"}>
                            <div className="text" >
                                Description<span className="nec">*</span>
                            </div>
                            <textarea 
                                type="text" 
                                id="description"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}   
                                placeholder="Description"
                            />
                              <div className='error-text'>{formik.errors.description}</div>
                        </div>
                        <div className={formik.errors.contarctAdress ? "input-con error" : "input-con"}>
                            <div className="text" >
                                Contract Address<span className="nec">*</span>
                            </div>
                            <input 
                                type="text" 
                                id="contarctAdress"
                                name="contarctAdress"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.contarctAdress}
                                placeholder="0xD92B50E95faA39fADA60735432435e86eb936F0C"
                            />
                            <div className='error-text'>{formik.errors.contarctAdress}</div>
                        </div>
                        <div className={formik.errors.BlockchainExplorer ? "input-con error" : "input-con"}>
                            <div className="text" >
                                Blockchain Explorer<span className="nec">*</span>
                            </div>
                            <input
                                type="text" 
                                id="BlockchainExplorer"
                                name="BlockchainExplorer"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.BlockchainExplorer}
                                placeholder="https://etherscan.io"
                            />
                            <div className='error-text'>{formik.errors.BlockchainExplorer}</div>
                        </div>
                        <div className="input-con">
                            <div className="text" >
                                Token Requirements<span className="nec">*</span>
                            </div>
                            <div className="button-con">
                                <button type="button" className={tokenRequirments === "eth" ? 'active':''} onClick={()=>{setTokenRequirments('eth')}}>eth</button>
                                <button type="button" className={tokenRequirments === "erc20" ? 'active':''} onClick={()=>{setTokenRequirments('erc20')}}>erc20</button>
                                <button type="button" className={tokenRequirments === "erc721" ? 'active':''} onClick={()=>{setTokenRequirments('erc721')}}>erc721</button>
                            </div>
                        </div>
                        <div className="input-con">
                            <div className="slider-text-1">
                                Main Chat<span className="slider-text-con">{(100*mainChatSliderValue/totalCount).toFixed(2)}%</span>
                            </div>
                            <div className="slider-con">
                                    <ReactSlider
                                    step={.01}
                                    min={0}
                                    max={100}
                                    className="horizontal-slider"
                                    thumbClassName="example-thumb"
                                    trackClassName="example-track"
                                    value={(100*mainChatSliderValue/totalCount).toFixed(2)}
                                    onChange={(value) => {
                                        setMainChatSliderValue((value*totalCount/100).toFixed(0))
                                    }}  
                                    // renderThumb={(props, state) => <div {...props}></div>}
                                    />
                                    
                                    <input className="slider-text-con" type='number' value={mainChatSliderValue != 0 ? mainChatSliderValue : ""}
                                     onChange={(e) => {
                                        if(e.target.value==="") setMainChatSliderValue(0); 
                                        else if (parseInt(e.target.value)>totalCount) setMainChatSliderValue(totalCount);
                                        else setMainChatSliderValue(parseInt(e.target.value));
                                        
                                        }
                                    }
                                    placeholder="0"/>
                                </div>
                        </div>
                        <div className="input-con Whale-chat-input-con">
                            <div className="slider-text-1">
                                Whale Chat<span className="slider-text-con">{(100*whaleChatSliderValue/totalCount).toFixed(2)}%</span>
                            </div>
                            <div className="slider-con">
                                    <ReactSlider
                                    step={.01}
                                    min={0}
                                    max={100}
                                    className="horizontal-slider"
                                    thumbClassName="example-thumb"
                                    trackClassName="example-track"
                                    value={(100*whaleChatSliderValue/totalCount).toFixed(2)}
                                    onChange={(value) => {
                                        setWhaleChatSliderValue((value*totalCount/100).toFixed(0))
                                    }}  
                                    // renderThumb={(props, state) => <div {...props}></div>}
                                    />
        
                                    <input className="slider-text-con" type='number' value={whaleChatSliderValue != 0 ? whaleChatSliderValue : ""}
                                     onChange={(e) => {
                                        if(e.target.value==="") setWhaleChatSliderValue(0); 
                                        else if (parseInt(e.target.value)>totalCount) setWhaleChatSliderValue(totalCount);
                                        else setWhaleChatSliderValue(parseInt(e.target.value));
                                        
                                        }
                                    }
                                    placeholder="0"/>
                                </div>
                        </div>
                        <div className="input-con">
                            <div className="text" >
                                Website
                            </div>
                            <input type="text" placeholder="https://website.com"/>
                        </div>
                        <div className="input-con">
                            <div className="text" >
                                Social
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={coinmarketcap} />
                                </div>
                                <input type="text" placeholder="https://coinmarketcap.com"/>
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={coingecko} />
                                </div>
                                <input type="text" placeholder="https://coingecko.com"/>
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={dextools} />
                                </div>
                                <input type="text" placeholder="https://dextools.com"/>
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={telegram} />
                                </div>
                                <input type="text" placeholder="https://telegram.com"/>
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={discord} />
                                </div>
                                <input type="text" placeholder="https://discord.com"/>
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={twitter} />
                                </div>
                                <input type="text" placeholder="https://twitter.com"/>
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={reddit} />
                                </div>
                                <input type="text" placeholder="https://reddit.com"/>
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={instagram} />
                                </div>
                                <input type="text" placeholder="https://instagram.com"/>
                            </div>
                        </div>
                        <div>
                            <button className="auth-main-btn auth-main-btn-new" type="submit">Create Klub</button>
                        </div>
                    </div>
                </form>
            </SimpleBar>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { activeTab } = state.Layout;
    return { activeTab }
}

export default connect(mapStateToProps, {setActiveTab})(CreateKlubs);