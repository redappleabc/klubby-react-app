import ReactSlider from "react-slider";
import React, { useRef, useState, useEffect } from "react";
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

import { Storage } from "aws-amplify"
import { v4 as uuidv4 } from 'uuid';
import { config_storage } from "../../../config_aws";
import createKlubGQL from "../../../apollo/mutations/createKlub";
import { useMutation } from '@apollo/client';
import { setFullGroup } from "../../../redux/actions";



const CreateKlubs = (props) => {
    const creatKlubPageRef = useRef();
    const [headerSmallState, setHeaderSmallState] = useState(false);
    const [mainChatSliderValue, setMainChatSliderValue] = useState(0)
    const [whaleChatSliderValue, setWhaleChatSliderValue] = useState(0)
    const [inputPercent, setInputPercent] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImgpreview, setProfileImgPreview] = useState(profile);
    const [tokenRequirments, setTokenRequirments] = useState('eth');

    const [uploading, setUploading] = useState(false)

    const [createKlubApollo, { }] = useMutation(createKlubGQL)


    const totalCount = 10000;

    useEffect(() => {
        if (profileImage) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfileImgPreview(reader.result);
            };

            reader.readAsDataURL(profileImage);
        } else {
            setProfileImgPreview(profile);
        }
    }, [profileImage]);


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
            contractAddress: '',
            blockchainExplorer: '',
            name: '',
            website: '',
            coinmarketcap: '',
            coingecko: '',
            dextools: '',
            telegram: '',
            discord: '',
            twitter: '',
            reddit: '',
            instagram: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('*Required'),
            description: Yup.string().required('*Required'),
            contractAddress: Yup.string().required('*Required'),
            blockchainExplorer: Yup.string().required('*Required'),
        }),
        onSubmit: async values => {

            let formData = {
                avatar: profileImage,
                tokenType: tokenRequirments,
                minimumAmountForMainGroup: mainChatSliderValue,
                minimumAmountForWhaleGroup: whaleChatSliderValue,
                ...formik.values
            }

            console.log(formData)
            try {
                const key = `${Date.now()}-${uuidv4()}.jpg`
                // await Storage.put(key, formData.avatar, {
                //   contentType: "image/jpg", // contentType is optional
                // });
                console.log("avarta uploading done")
                formData.avatar = { ...config_storage, key }
                formData.klubname = formData.name
                
                const res = await createKlubApollo({
                    variables: formData
                }).then((res)=>{
                    console.log("create klub success", res)
                    props.setActiveTab('klub')
                    console.log("new klubs", [{...formData}, ...props.groups])
                    props.setFullGroup([{...formData}, ...props.groups])
                })
                .catch((err)=>{
                    console.log("create klub error", err)
                })
                console.log(res)
            } catch (error) {
                console.log("Error uploading file: ", error);
                setUploading(false)
            }
            console.log(formData);
        },
    });


    useEffect(()=> {
        console.log("creatklubssssssssssssssssssssssssssssssss",props.groups)
    }, [props.groups])
    useEffect(() => {
        const calInputPercent = () => {
            let percent = 0;
            // for(let index in formik.values) {
            //     console.log(Object.keys(formik.values).length)
            //     if (formik.values[index] != "" ) percent += 100/Object.keys(formik.values).length; 
            // }
            // return percent.toFixed(0);

            let percent_flag = [0, 0, 0, 0, 0];

            if (profileImage != null) percent_flag[0] = 1;
            else percent_flag[0] = 0;
            if (formik.values.name != "") percent_flag[1] = 1;
            else percent_flag[1] = 0;
            if (formik.values.description != "") percent_flag[2] = 1;
            else percent_flag[2] = 0;
            if (formik.values.contractAddress != "") percent_flag[3] = 1;
            else percent_flag[3] = 0;
            if (formik.values.blockchainExplorer != "") percent_flag[4] = 1;
            else percent_flag[4] = 0;

            for (let i = 0; i < percent_flag.length; i++) percent += 20 * percent_flag[i];

            return percent.toFixed(0);
        }
        setInputPercent(calInputPercent());
        console.log(formik.values)
    }, [formik.values, profileImage])

    return (
        <React.Fragment>
            <div className={headerSmallState ? "create-klubs-header small-bar" : "create-klubs-header"}>
                <div className="header-main">
                    <div className="header-link">
                        <Link to="#" onClick={() => { props.setActiveTab("klub") }}>
                            <i className="ri-arrow-left-s-line"></i>
                        </Link>
                    </div>
                    <div className="header-text">
                        Create a Klub
                    </div>
                </div>
                <div className="header-footer">
                    <div className="input-percent">
                        <div style={{ width: `${inputPercent}%` }}>{inputPercent}%</div>
                    </div>
                </div>
                <div className="header-footer small">
                    <Link to="#" onClick={() => { props.setActiveTab("klub") }}>
                        <i className="ri-arrow-left-s-line"></i>
                    </Link>
                    <div className="input-percent">
                        <div style={{ width: `${inputPercent}%` }}>{inputPercent}%</div>
                    </div>
                </div>
            </div>
            <SimpleBar className={headerSmallState ? "chat-message-list create-klubs-input-con small-bar" : "chat-message-list create-klubs-input-con"}
                onScrollCapture={onScroll}
                ref={creatKlubPageRef}
            >
                <form className="create-klubs-input-main" onSubmit={formik.handleSubmit}>
                    <div className="profile-img">
                        <label htmlFor="imgUpload">
                            <img src={profileImgpreview} />
                        </label>
                        <input
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file && file.type.substr(0, 5) === "image") {
                                    setProfileImage(file);
                                } else {
                                    setProfileImage(null);
                                }
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.imgUpload}
                            type="file"
                            name="imgUpload"
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
                        <div className={formik.errors.contractAddress ? "input-con error" : "input-con"}>
                            <div className="text" >
                                Contract Address<span className="nec">*</span>
                            </div>
                            <input
                                type="text"
                                id="contractAddress"
                                name="contractAddress"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.contractAddress}
                                placeholder="0xD92B50E95faA39fADA60735432435e86eb936F0C"
                            />
                            <div className='error-text'>{formik.errors.contractAddress}</div>
                        </div>
                        <div className={formik.errors.blockchainExplorer ? "input-con error" : "input-con"}>
                            <div className="text" >
                                Blockchain Explorer<span className="nec">*</span>
                            </div>
                            <input
                                type="text"
                                id="blockchainExplorer"
                                name="blockchainExplorer"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.blockchainExplorer}
                                placeholder="https://etherscan.io"
                            />
                            <div className='error-text'>{formik.errors.blockchainExplorer}</div>
                        </div>
                        <div className="input-con">
                            <div className="text" >
                                Token Requirements<span className="nec">*</span>
                            </div>
                            <div className="button-con">
                                <button type="button" className={tokenRequirments === "eth" ? 'active' : ''} onClick={() => { setTokenRequirments('eth') }}>eth</button>
                                <button type="button" className={tokenRequirments === "erc20" ? 'active' : ''} onClick={() => { setTokenRequirments('erc20') }}>erc20</button>
                                <button type="button" className={tokenRequirments === "erc721" ? 'active' : ''} onClick={() => { setTokenRequirments('erc721') }}>erc721</button>
                            </div>
                        </div>
                        <div className="input-con">
                            <div className="slider-text-1">
                                Main Chat<span className="slider-text-con">{(100 * mainChatSliderValue / totalCount).toFixed(2)}%</span>
                            </div>
                            <div className="slider-con">
                                <ReactSlider
                                    step={.01}
                                    min={0}
                                    max={100}
                                    className="horizontal-slider"
                                    thumbClassName="example-thumb"
                                    trackClassName="example-track"
                                    value={(100 * mainChatSliderValue / totalCount).toFixed(2)}
                                    onChange={(value) => {
                                        setMainChatSliderValue((value * totalCount / 100).toFixed(0))
                                    }}
                                // renderThumb={(props, state) => <div {...props}></div>}
                                />

                                <input className="slider-text-con" type='number' value={mainChatSliderValue != 0 ? mainChatSliderValue : ""}
                                    onChange={(e) => {
                                        if (e.target.value === "") setMainChatSliderValue(0);
                                        else if (parseInt(e.target.value) > totalCount) setMainChatSliderValue(totalCount);
                                        else setMainChatSliderValue(parseInt(e.target.value));

                                    }
                                    }
                                    placeholder="0" />
                            </div>
                        </div>
                        <div className="input-con Whale-chat-input-con">
                            <div className="slider-text-1">
                                Whale Chat<span className="slider-text-con">{(100 * whaleChatSliderValue / totalCount).toFixed(2)}%</span>
                            </div>
                            <div className="slider-con">
                                <ReactSlider
                                    step={.01}
                                    min={0}
                                    max={100}
                                    className="horizontal-slider"
                                    thumbClassName="example-thumb"
                                    trackClassName="example-track"
                                    value={(100 * whaleChatSliderValue / totalCount).toFixed(2)}
                                    onChange={(value) => {
                                        setWhaleChatSliderValue((value * totalCount / 100).toFixed(0))
                                    }}
                                // renderThumb={(props, state) => <div {...props}></div>}
                                />

                                <input className="slider-text-con" type='number' value={whaleChatSliderValue != 0 ? whaleChatSliderValue : ""}
                                    onChange={(e) => {
                                        if (e.target.value === "") setWhaleChatSliderValue(0);
                                        else if (parseInt(e.target.value) > totalCount) setWhaleChatSliderValue(totalCount);
                                        else setWhaleChatSliderValue(parseInt(e.target.value));

                                    }
                                    }
                                    placeholder="0" />
                            </div>
                        </div>
                        <div className="input-con">
                            <div className="text" >
                                Website
                            </div>
                            <input
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.website}
                                id="website" name="website" placeholder="https://website.com" />
                        </div>
                        <div className="input-con">
                            <div className="text" >
                                Social
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={coinmarketcap} />
                                </div>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.coinmarketcap}
                                    id="coinmarketcap" name="coinmarketcap" placeholder="https://coinmarketcap.com" />
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={coingecko} />
                                </div>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.coingecko}
                                    id="coingecko" name="coingecko" placeholder="https://coingecko.com" />
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={dextools} />
                                </div>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dextools}
                                    id="dextools" name="dextools" placeholder="https://dextools.com" />
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={telegram} />
                                </div>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.telegram}
                                    id="telegram" name="telegram" placeholder="https://telegram.com" />
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={discord} />
                                </div>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.discord}
                                    id="discord" name="discord" placeholder="https://discord.com" />
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={twitter} />
                                </div>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.twitter}
                                    id="twitter" name="twitter" placeholder="https://twitter.com" />
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={reddit} />
                                </div>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.reddit}
                                    id="reddit" name="reddit" placeholder="https://reddit.com" />
                            </div>
                            <div className="social-input-con">
                                <div className="icon">
                                    <img src={instagram} />
                                </div>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.instagram}
                                    id="instagram" name="instagram" placeholder="https://instagram.com" />
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
    const { groups } = state.Chat;
    return { activeTab, groups }
}

export default connect(mapStateToProps, { setActiveTab, setFullGroup })(CreateKlubs);