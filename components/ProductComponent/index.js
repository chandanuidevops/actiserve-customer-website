import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect, useSelector } from 'react-redux'
import Layout from '../Layout/'
import Drawer from "react-bottom-drawer";
import { Form, Icon, Input, Grid, Button, Radio, Card, Divider, Segment, Modal, Popup, Header, Select, Image, Breadcrumb } from "semantic-ui-react";
import Router, { useRouter } from 'next/router'
import { getProductDetailsRequest, getProductQARequest } from '../../Stores/ProductDetails/actions'
import Skeleton from 'react-loading-skeleton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    Box,
    FormControl as FormControlDefault,
    makeStyles,
    withStyles,
    TextField, FormHelperText
} from '@material-ui/core';
import { addGroupRequest, getGroupRequest, } from '../../Stores/InstantQuote/actions';
import actions from '../../Stores/Auth/actions';
import { Autocomplete } from '@material-ui/lab';
import useValidator from '../../utils/useValidator';
import * as Yup from 'yup';
import { validateCustomer, validateCustomerSuccess } from '../../Stores/CustomerFlow/actions';
import { addCart } from '../../Stores/Cart/actions';
import { successAlert } from '../../Stores/Alerts/actions';
import { validateLocationRequest } from '../../Stores/GroupDetails/actions';
import Link from 'next/link'
import Badge from "@material-ui/core/Badge";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2
    },
    customBadge: {
        backgroundColor: "#0D6773",
        color: "white"
    }
});

const LoginAction = actions.CustomerLogin;
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    mainContent: theme.mainContent,
    heading: { ...theme.typography.heading, display: 'flex' },
    embedText: {
        padding: '0.125rem 0.25rem',
        border: '1px solid #495B6D',
        borderRadius: '2px',
    },
    table: {
        minWidth: 650,
        boxShadow: '0px 0px 8px 1px rgba(0, 0, 0, 0.25)',
    },
    card: {
        background: '#fff',
        boxShadow:
            '0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
        borderRadius: '0.5rem',
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: 'auto',
        flexShrink: 0,
    },
    drawerOpen: {
        width: drawerWidth,
    },
    textCapitalize: { textTransform: 'capitalize' },
    drawerPaper: {
        width: '100%',
        padding: '0 0rem',
    },
    drawerHeader: {
        ...theme.typography.heading,
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    content: {
        ...theme.mainContent,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
    },
    contentShift: {
        [theme.breakpoints.up('md')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: '24px',
        },
    },
    formControl: {
        width: '100%',
        // '&:not(:first-child)': {
        //   marginTop: '1rem',
        // },
    },
    tableCell: {
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '23px',
        color: '#000000',
    },
    JobTopButton: {
        minWidth: '128px',
        background: '#fff',
        color: '#000',
        // marginRight: '1.5rem',
        boxShadow: `0 4px 6px 0 rgb(16 25 40 / 10%)`,
        textTransform: 'capitalize',
        paddingLeft: '25px',
        paddingRight: '25px',
        fontWeight: 700,
        paddingTop: '10px',
        paddingBottom: '10px',
        borderRadius: '0px',
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: '30px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '17px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '17px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '17px',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '17px',
        },
    },
    tableheader: {
        background: '#fff',
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        [theme.breakpoints.down('lg')]: {
            overflowX: 'auto',
            overflowY: 'hidden',
        },
    },
    FilterTitle: {
        margin: '0 auto',
        padding: '1rem 0rem',
        color: 'black',
        fontSize: '24px',
        borderBottom: '1px solid lightgray',
        width: '100%',
        textAlign: 'center',
    },
    CloseIcon: {
        position: 'absolute',
        right: '-10px',
    },
    CloseIconSize: {
        fontSize: '35px',
        fill: '#000000',
    },
    FilterSectionTitle: {
        margin: '0 auto',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        color: 'white',
        fontSize: '24px',
        width: '100%',
    },
    ButtonSection: {
        // margin: '0 auto',
        padding: '1rem 0rem',
        color: 'black',
        fontSize: '18px',
        borderTop: '1px solid lightgray',
        width: '100%',
        textAlign: 'center',
    },
    SaveButton: {
        minWidth: '128px',
        color: '#fff',
        background: '#101928',
        border: '1px solid #eef0f2',
        textTransform: 'none',
        boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
        fontWeight: '700',
        lineHeight: '18px',
        padding: '8px 16px',
        minHeight: '44px',
    },
    textFieldName: {
        fontFamily: 'Mulish',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: '23px',
        color: '#666666',
    },
    Loader: {
        margin: 'auto auto',
    },
    emptyText: {
        fontFamily: 'Mulish',
        fontStyle: 'italic',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '23px',
        color: '#000000',
    },
    answerBox: {
        textAlign: 'center',
        '&:hover': {
            border: '4px solid #FCBF49',
        },
    },
    cardHeader: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '240px',
    },
    cardFooter: {
        textAlign: 'center',
        fontFamily: 'Montserrat, sans-serif',
        background: '#FCBF49',
        color: 'white',
        padding: '0.5rem',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    prevBox: {
        position: 'absolute',
        left: '-5%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    prevButton: {
        minHeight: '58px',
        width: '38px',
        background: 'white',
        border: '2px solid #2F4858',
        color: '#FCBF49',
        padding: '1rem',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
            color: 'white',
            background: '#2F4858',
        },
    },
    prevIcon: {
        width: '28px',
        position: 'absolute',
        marginLeft: '-0.2rem',
        top: '35%',
    },
    prevText: {
        display: 'block',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '16px',
        paddingLeft: ' 1.3rem',
        paddingTop: '2rem',
        marginBottom: ' 0.2rem',
    },
}));
function ProductComponent({ addGroup,
    fetchProductDetails,
    productDetails,
    isFetching,
    fetchProductQADetails,
    productQADetails,
    fetchGroup,
    groupDetails,
    isFetchingGroup,
    isSubmitting,
    validateEmail,
    isValidatingCustomer,
    validateCustomer,
    resetValidateEmail,
    CustomerLogin,
    addProductToCart,
    currentCart,
    successAlert,
    validateLocation,
    productName
}) {
    const userInfo = useSelector((state) => state?.AuthReducer?.user);
    const history = useRouter();
    const classes = useStyles();

    const {
        isLocationValid
    } = useSelector((state) => state?.groupDetailsReducer);

    const [isVisible, setIsVisible] = React.useState(false);
    const openDrawer = React.useCallback(() => setIsVisible(true), []);
    const closeDrawer = React.useCallback(() => setIsVisible(false), []);

    const [isLoginVisible, setLoginIsVisible] = React.useState(false);
    const openLoginDrawer = React.useCallback(() => setLoginIsVisible(true), []);
    const closeLoginDrawer = React.useCallback(() => setLoginIsVisible(false), []);

    const [isFormVisible, setFormIsVisible] = React.useState(false);
    const openFormDrawer = React.useCallback(() => setFormIsVisible(true), []);
    const closeFormDrawer = React.useCallback(() => setFormIsVisible(false), []);

    // Checkout Modal
    const [isCheckoutVisible, setisCheckoutVisible] = React.useState(false);
    const openCheckout = React.useCallback(() => setisCheckoutVisible(true), []);
    const closeCheckout = React.useCallback(() => setisCheckoutVisible(false), []);

    const [showPassword, setShowPassword] = React.useState(false);

    // Include/exclude items
    const [includeItems, setIncludeItems] = useState([])
    const [excludeItems, setExcludeItems] = useState([])

    // Product QA State
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [ProductQAsValues, setProductQAsValues] = useState([]);
    const [mouseEnter, setMouseEnter] = useState(false);
    const [arrowEnter, setArrowEnter] = useState(false);
    const [mouseEnterID, setMouseEnterID] = useState();
    const [isFinish, setIsFinish] = useState(false);
    const [allQAs, setAllQAs] = useState([]);
    const [progressCount, setProgressCount] = useState(0);
    const [update, setUpdate] = useState(false);

    const [cartData, setCartData] = useState([])
    const [loggedIn, setLoggedIn] = React.useState(false)

    const isBrowser = () => typeof window !== "undefined"
    useEffect(() => {
        if (userInfo && userInfo?.id !== null) {
            setLoggedIn(true)
        }
    }, [userInfo])
    useEffect(() => {
        if (currentCart?.length <= 0) {
            if (isBrowser() === true) {
                let cartItems = localStorage.getItem('cartItems');
                if (cartItems !== null && cartItems !== '') {
                    let cartArr = [];
                    let cartObj = JSON.parse(cartItems)
                    if (cartObj) {
                        cartArr.push(cartObj)
                    }
                    if (cartArr !== null) {
                        setCartData(cartArr)
                    }
                }
            }
        } else {
            let data = [];
            data.push(currentCart)
            if (data) {
                setCartData(data)
            }
        }
    }, [currentCart])

    // Product AddOn
    const [selectedAddon, setSelectedAddon] = useState([]);

    function handleMouse(ele, type) {
        if (type == 'true') {
            setMouseEnter(true);
            setMouseEnterID(ele.id);
        } else if (type == 'false') {
            setMouseEnter(false);
            setMouseEnterID('');
        }
    }

    const onSelectAnswer = (value) => {
        let tempData = JSON.parse(JSON.stringify(ProductQAsValues));
        let data = {
            question_title: currentQuestion?.question_title,
            question: currentQuestion.id,
            answer_title: value?.answer_title,
            answer: value.id,
            value: value?.value,
        };
        tempData.push(data);
        setProductQAsValues(tempData);
        if (value?.is_finished || value?.next_question == null) {
            onFinish(tempData);
            setIsFinish(true);
        } else {
            allQAs.length > 0 &&
                allQAs.map((ele) => {
                    if (value.next_question == ele.id) {
                        setCurrentQuestion(ele);
                    }
                });
        }
        let QaCount = allQAs.length;
        let tempCount = tempData.length * 100;
        setProgressCount(tempCount / QaCount);

        setUpdate(!update);
    };

    const onFinish = (data) => {
        // props.onProductQaSubmit(data);
        setMouseEnter(false);
        setMouseEnterID('');
    };

    function onChange() {
        setShowPassword(!showPassword)
    }

    function onTogglePassword() {
        setShowPassword(!showPassword)
    }

    const onPrev = () => {
        let tempData = JSON.parse(JSON.stringify(ProductQAsValues));
        if (tempData.length > 0) {
            let prevId = tempData[tempData.length - 1].question;
            allQAs.length > 0 &&
                allQAs.map((ele) => {
                    if (prevId == ele.id) {
                        setCurrentQuestion(ele);
                        tempData.pop();
                    }
                });
            setProductQAsValues(tempData);
            let QaCount = allQAs.length;
            let tempCount = tempData.length * 100;
            setProgressCount(tempCount / QaCount);
        }
    };

    useEffect(() => {
        if (productName !== null && productName !== '' && productName !== undefined) {
            fetchProductDetails({ productSlug: productName })
        }
    }, [productName])


    // Set include and exclude items
    useEffect(() => {
        if (productDetails && productDetails?.product_include_items?.length > 0) {
            let items = productDetails?.product_include_items;
            if (items) {
                let excludedItems = items?.filter((item) => item?.included === false)
                let includedItems = items?.filter((item) => item?.included === true)

                if (excludedItems) {
                    setExcludeItems(excludedItems)
                }
                if (includedItems) {
                    setIncludeItems(includedItems)
                }
            }
        }
    }, [productDetails])

    // Scroll to top on initial page load
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Fetch Product QA
    useEffect(() => {
        if (productDetails && productDetails?.id) {
            fetchProductQADetails(productDetails?.id)
        }
    }, [productDetails])

    // Set Product QA Data
    useEffect(() => {
        if (productQADetails && productQADetails.length > 0) {
            setCurrentQuestion(productQADetails[0]);
            setAllQAs(productQADetails);
            setProductQAsValues([]);
            setProgressCount(0);
        }
    }, [productQADetails]);

    function colCalculator(numberOfColumn) {
        let column = 0;
        if (numberOfColumn <= 2) {
            column = 2
        } else if (numberOfColumn <= 4) {
            column = 4
        }
        else if (numberOfColumn > 4) {
            column = 6
        }
        return column
    }

    // Reset Product QA Answers
    const handleResetProductQA = () => {
        setIsFinish(false);
        setProductQAsValues([]);
        if (productQADetails && productQADetails.length > 0) {
            setCurrentQuestion(productQADetails[0]);
            setAllQAs(productQADetails);
            setProductQAsValues([]);
            setProgressCount(0);
        }
    }

    // AddOn Add Handler
    const addonHandler = (data) => {
        let tempData = selectedAddon;
        const index = tempData.indexOf(data);
        if (index > -1) {
            tempData.splice(index, 1);
        } else {
            tempData.push(data);
        }
        setSelectedAddon(tempData);
        setUpdate(!update);
    };

    // Quote Calculator
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState(0);
    const [selectedCheck, setSelectedCheck] = useState([]);
    const [quoteQuestions, setQuoteQuestions] = useState([]);
    const [finalQuoteData, setFinalQuoteData] = useState([]);
    const [isValueNull, setIsValueNull] = useState(false);
    const [productAddedToCart, setProductAddedToCart] = useState(false);

    // 
    const [currentBasketItem, setCurrentBasketItem] = useState([]);

    useEffect(() => {
        if (history?.query?.slug) {
            let productTitle = history?.query?.slug?.[0];
            if (productTitle) fetchProductDetails({ productSlug: productTitle })
            let cleanTitle = productTitle.replace('-', " ").toUpperCase();
            if (productTitle) {
                setProduct(cleanTitle)
            }
        }
    }, [history])
    // get group data

    useEffect(() => {
        if (groupDetails?.length > 0) {
            let group = groupDetails?.[0];
            if (group?.quote_section?.length > 0) {
                let newOptions = []
                let quote_questons = group?.quote_section;

                let quote_Section = JSON.parse(JSON.stringify(quote_questons))
                quote_Section?.map((ele, i) => {
                    ele.price = 0;
                    ele.input_box = false;
                    newOptions.push(ele)
                })
                if (newOptions) {
                    setQuoteQuestions(newOptions)
                }
            }
        }
    }, [groupDetails])

    useEffect(() => {
        var total = 0;
        ProductQAsValues.forEach(item => {
            if (item?.value !== null && item?.value !== "") {
                total += parseInt(item?.value);
            } else if (item?.value === null || item?.value === "" || item?.value === "NA") {
                setIsValueNull(true)
            }
        });
        setPrice(total)
    }, [ProductQAsValues])

    useEffect(() => {
        setIsFinish(false)
    }, [])

    const [customerExists, setCustomerExists] = useState(false)

    const {
        values,
        setValues,
        getFieldProps,
        touched,
        handleBlur,
        errors,
        handleSubmit,
    } = useValidator({
        initialValues: {
            userEmail: '',
            password: ''
        },
        validationSchema: Yup.object({
            userEmail: Yup.string().email().required(),
            password: customerExists === true ? Yup.string().required() : Yup.string().nullable(),
        }),
        onSubmit,
    });

    // Submit Email to check existence
    function onSubmit() {
        if (customerExists === false && userInfo == null && values?.userEmail !== '') {
            validateEmail({ email: values?.userEmail })
        } else {
            let credentials = {
                email: values?.userEmail,
                password: values?.password
            }
            CustomerLogin(credentials, history, 'cart')
        }
    }

    useEffect(() => {
        if (validateCustomer === 'This email is not exists') {
            Router.push("/sign-up")
            resetState();
            resetValidateEmail('')
        }
    }, [validateCustomer])

    useEffect(() => {
        if (validateCustomer === 'This email is already exists') {
            setCustomerExists(true)
            resetValidateEmail('')
        }
    }, [validateCustomer])

    const resetState = () => {
        setValues({
            userEmail: ''
        })
    }

    useEffect(() => {
        if (!isVisible || !isFormVisible) {
            resetState();
            setCustomerExists(false);
        }
    }, [isVisible, isFormVisible])

    const handleCheckout = async () => {
        let product = {
            addons: await selectedAddon,
            product_qa: await ProductQAsValues,
            quote_qa: await quoteQuestions,
            quote_qa_grant_total: await price,
            product: await productDetails,
        }
        if (product) {
            setCurrentBasketItem([product])
            addProductToCart(product)
            localStorage.setItem('cartItems', JSON.stringify(product))
            successAlert('Added Product To Cart!')
            setProductAddedToCart(true)
            // Router.push("/checkout")
        }
    }
    const handleCheckoutButton = async () => {
        let product = {
            addons: await selectedAddon,
            product_qa: await ProductQAsValues,
            quote_qa: await quoteQuestions,
            quote_qa_grant_total: await price,
            product: await productDetails,
        }
        if (product) {
            setCurrentBasketItem([product])
            addProductToCart(product)
            localStorage.setItem('cartItems', JSON.stringify(product))
            localStorage.setItem('actiserve_cart_productqa_values', JSON.stringify(ProductQAsValues))
            localStorage.setItem('actiserve_cart_productqa_details', JSON.stringify(productQADetails))
            localStorage.setItem('actiserve_cart_product', JSON.stringify(productDetails))
            localStorage.setItem('actiserve_cart_addons', JSON.stringify(selectedAddon))
            setProductAddedToCart(true)
            Router.push("/summary")
        }
    }

    const handleRemoveCartItem = () => {
        localStorage.setItem('cartItems', '')
        setCartData([])
        setIsFinish(false);
        setSelectedAddon([])
        setProductQAsValues([]);
        if (productQADetails && productQADetails.length > 0) {
            setCurrentQuestion(productQADetails[0]);
            setAllQAs(productQADetails);
            setProductQAsValues([]);
            setProgressCount(0);
        }
    }

    // Validate location from slug
    useEffect(() => {
        if (history?.query?.slug?.length > 0) {
            validateLocation(history?.query?.slug?.[0]);
        }
    }, [history]);

    useEffect(() => {
        if (isLocationValid !== 404 && isLocationValid !== []) {
            if (isBrowser()) {
                let id = isLocationValid?.[0]?.uuid
                if (id) {
                    localStorage.setItem('group_id', id)
                }
            }
        }
    }, [isLocationValid])


    useEffect(() => {
        if (isFinish) {
            let product = {
                addons: selectedAddon,
                product_qa: ProductQAsValues,
                quote_qa: quoteQuestions,
                quote_qa_grant_total: price,
                product: productDetails,
            }
            if (product) {
                setCurrentBasketItem([product])
                addProductToCart(product)
                localStorage.setItem('cartItems', JSON.stringify(product))
                localStorage.setItem('actiserve_cart_productqa_values', JSON.stringify(ProductQAsValues))
                localStorage.setItem('actiserve_cart_productqa_details', JSON.stringify(productQADetails))
                localStorage.setItem('actiserve_cart_product', JSON.stringify(productDetails))
                localStorage.setItem('actiserve_cart_addons', JSON.stringify(selectedAddon))
                setProductAddedToCart(true)
            }
            Router.push("/summary")
        }
    }, [ProductQAsValues, productQADetails])

    return (
        <>

            {/* Home Ownwer Modal */}
            <div className="App">
                {/* <center>
                    <button className="open-btn" onClick={openDrawer}>
                        Home Owner
                    </button>
                </center> */}
                <Drawer
                    duration={250}
                    hideScrollbars={true}
                    onClose={closeDrawer}
                    isVisible={isVisible}
                >
                    <div style={{ minHeight: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem' }}>
                            <h3>Are you the home owner?</h3>

                            <div style={{ padding: '2rem' }}>
                                <Radio label='Yes' style={{ marginRight: '1rem' }} />
                                <Radio label='No' />
                            </div>
                        </div>

                    </div>
                </Drawer>
            </div>

            {/* Sign Up Modal */}
            <div className="App">
                {/* <center>
                    <button className="open-btn" onClick={openLoginDrawer}>
                        Login
                    </button>
                </center> */}
                <Drawer
                    duration={250}
                    hideScrollbars={true}
                    onClose={closeLoginDrawer}
                    isVisible={isLoginVisible}
                >
                    <div style={{ minHeight: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                            <Button fluid className="buttonStyle" onClick={openFormDrawer}>Login</Button>
                            <Button fluid className="OutlinedbuttonStyle">Create an account</Button>
                        </div>
                    </div>
                </Drawer>
            </div>

            {/* Password  Modal */}
            <div className="App">
                {/* <center>
                    <button className="open-btn" onClick={openFormDrawer}>
                        Login Form
                    </button>
                </center> */}
                <Drawer
                    duration={250}
                    hideScrollbars={true}
                    onClose={closeFormDrawer}
                    isVisible={isFormVisible}
                >
                    <div style={{ minHeight: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                            <form onSubmit={handleSubmit} style={{ width: '20%' }}>
                                <Form.Field className='fieldMb'>
                                    <Input
                                        className="smallInput"
                                        type={"text"}
                                        placeholder='Enter your email'
                                        fluid
                                        // onChange={(e) => setUserEmail(e.target.value)}
                                        error={!!(touched.userEmail && errors.userEmail)}
                                        touched={!!(touched.userEmail && errors.userEmail)}
                                        {...getFieldProps('userEmail')}
                                    />
                                    {touched.userEmail && errors.userEmail ? (
                                        <FormHelperText error={!!errors.userEmail}>
                                            Email is Required
                                        </FormHelperText>
                                    ) : (
                                        ''
                                    )}
                                </Form.Field>
                                {customerExists === true && <Form.Field style={{ textAlign: 'center' }}>
                                    <Input
                                        fluid
                                        style={{ marginBottom: '1rem' }}
                                        className="smallInput"
                                        type={showPassword ? "text" : "password"}
                                        placeholder='Enter your password'
                                        icon={
                                            <Icon
                                                name={showPassword ? "eye slash" : "eye"}
                                                link
                                                onClick={() => onTogglePassword()}
                                            />
                                        }
                                        error={!!(touched.password && errors.password)}
                                        touched={!!(touched.password && errors.password)}
                                        {...getFieldProps('password')}

                                    />
                                    {touched.password && errors.password ? (
                                        <FormHelperText error={!!errors.password}>
                                            Password is Required
                                        </FormHelperText>
                                    ) : (
                                        ''
                                    )}
                                </Form.Field>}
                                <Button type="submit" className="cartLogin" style={{ width: '100%' }}>Login</Button>
                            </form>
                        </div>
                    </div>
                </Drawer>
            </div>

            {/* Checkout Modal */}
            <Modal
                onClose={() => closeCheckout()}
                onOpen={() => openCheckout()}
                open={isCheckoutVisible}
                size="tiny"
            >

                <Modal.Content image>
                    <Modal.Description>
                        <p>
                            {productDetails?.title}
                        </p>
                        <p>{productDetails?.price?.toFixed(2)}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => closeCheckout()}>
                        Close
                    </Button>
                    <Button basic color='red' onClick={() => { handleRemoveCartItem(); closeCheckout() }}>
                        Remove
                    </Button>
                    <Button
                        content="Checkout"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                        onClick={() => { Router.push("/checkout"); handleCheckoutButton(); closeCheckout() }}
                    />
                </Modal.Actions>
            </Modal>

            {/* <section class="ldp-basket-wrapper" style={{ paddingTop: '70px' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer', padding: '0.5rem 0rem' }}>
                        <Popup
                            style={{ padding: '1rem' }}
                            on='click'
                            pinned position='bottom right'
                            content={
                                <div>
                                    {cartData?.length <= 0 ? (
                                        <span style={{ textAlign: 'center', fontWeight: 'bold' }}>You have no items in your shopping cart!</span>
                                    ) :
                                        <Box>
                                            <Header as='h2' icon textAlign='center'>
                                                Basket
                                            </Header>
                                            <Divider />
                                            {cartData?.map((data) => (
                                                <Card>
                                                    <Card.Content>
                                                        <Card.Header>{data?.product?.title}</Card.Header>
                                                        <Card.Description>
                                                            <strong>Total : </strong> {`£ ${productDetails?.price?.toFixed(2)}`}
                                                        </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <div className='ui two buttons'>
                                                            <Button basic color='green' onClick={() => Router.push("/checkout")}>
                                                                Checkout
                                                            </Button>
                                                            <Button basic color='red' onClick={handleRemoveCartItem}>
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </Card.Content>
                                                </Card>
                                            ))}
                                        </Box>}
                                </div>
                            }
                            trigger={<Icon size="large" name='shopping cart' />} />
                    </div>
                </div>
            </section>

            <section class="ldp-banner-wrapper"></section>
            <section class="ldp-info-wrapper">
                <div class="ldp-info container">
                    <div class="info-title">
                        <h1>{isFetching ? <Skeleton /> : productDetails?.title}</h1>
                        <p class="info-price">{isFetching ? <Skeleton /> : `£${productDetails?.price?.toFixed(2)}`}</p>
                    </div>
                    <div class="info-title-button">
                        <button>Loyalty discount</button>
                    </div>
                    <div class="info-title-text">
                        <p>
                            Book a regular domestic cleaning service and choose from a range
                            of cleaning options, designed to suit you and your home. No job is
                            too big or small as we cover everything fromm quick and easy overn
                            cleasn through to deep cleaning or end of tenancy cleaning.
                        </p>
                    </div>
                </div>
            </section>

            {(includeItems?.length > 0 || excludeItems?.length > 0) && <section className="tab-wrapper">
                <div className="container">
                    <div className="page-content">
                        <div className="tabbed">
                            <input type="radio" id="tab1" name="css-tabs" checked />
                            <input type="radio" id="tab2" name="css-tabs" />
                            <input type="radio" id="tab3" name="css-tabs" />

                            <ul className="tabs">
                                {includeItems?.length > 0 && <li className="tab">
                                    <label for="tab1">Included</label>
                                </li>}
                                {excludeItems?.length > 0 && <li className="tab">
                                    <label for="tab2">Not Included</label>
                                </li>}
                            </ul>

                            <div className="tab-content">

                                {includeItems?.length >= 0 && includeItems?.map((item) => (
                                    <ul class="inc-read-more-wrap">
                                        <li>{item?.include_item_name}</li>
                                    </ul>
                                ))}
                            </div>

                            <div className="tab-content">
                                {excludeItems?.length >= 0 && excludeItems?.map((item) => (
                                    <ul class="inc-read-more-wrap">
                                        <li>{item?.include_item_name}</li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>} */}

            {/* {productQADetails?.length > 0 && isFinish === false &&
                <section className="ldp-qa-wrapper">
                    <div className="container">
                        <Grid>
                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <div className="ins-qa-header-wrapper">
                                    <h2 className="ins-qa-header">Product QA for {productDetails?.title}</h2>
                                </div>
                            </Grid.Column>
                        </Grid>
                        <Divider />
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignContent="center"
                            alignItems="center"
                        >
                            <Card
                                elevation={0}
                                style={{
                                    width: '100%',
                                    background: '#f3f4f6',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#FCBF49',
                                        textAlign: 'center'
                                    }}
                                >
                                    <h3 className="ldp-qa-title">
                                        {currentQuestion?.question_title}
                                    </h3>
                                </div>

                                <Box className="ldp-qa-answer-container" stlye={{ position: 'relative' }}>
                                    <Box>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            <div style={{ maxWidth: '80%' }}>
                                                <Grid container columns={colCalculator(currentQuestion?.answers?.length)} style={{ justifyContent: 'center', alignContent: 'center' }}>
                                                    <Grid.Row>
                                                        {currentQuestion !== '' &&
                                                            currentQuestion?.answers &&
                                                            currentQuestion?.answers.length > 0 &&
                                                            currentQuestion?.answers.map((ele, i) => {
                                                                return (
                                                                    <Grid.Column
                                                                        mobile={16} tablet={4} computer={5}
                                                                        onClick={() => onSelectAnswer(ele)}
                                                                        onMouseOver={() => handleMouse(ele, 'true')}
                                                                        onMouseLeave={() => handleMouse(ele, 'false')}
                                                                    >
                                                                        <Segment className={`${classes.answerBox} ldp-qa-segment`}>
                                                                            <p>{ele?.answer_title}</p>
                                                                            <div
                                                                                className={classes.cardFooter}
                                                                                style={{
                                                                                    display:
                                                                                        mouseEnter && mouseEnterID === ele?.id
                                                                                            ? 'block'
                                                                                            : 'none',
                                                                                }}
                                                                            >
                                                                                Select
                                                                            </div>
                                                                        </Segment>
                                                                    </Grid.Column>
                                                                );
                                                            })}
                                                    </Grid.Row>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Box>
                                    <Box className={classes.prevBox}>
                                        {ProductQAsValues.length > 0 && (
                                            <Box
                                                variant="contained"
                                                color="primary"
                                                className={classes.prevButton}
                                                onClick={() => {
                                                    onPrev();
                                                    setArrowEnter(false);
                                                }}
                                                onMouseOver={() => setArrowEnter(true)}
                                                onMouseOut={() => setArrowEnter(false)}
                                            >
                                                <div className={classes.prevIcon}>
                                                    {' '}
                                                    {arrowEnter === true ? (
                                                        <ArrowBackIosIcon style={{ color: 'white' }} />
                                                    ) : (
                                                        <ArrowBackIosIcon style={{ color: '#1A273A' }} />
                                                    )}
                                                </div>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    </div>
                </section>} */}
            <div className="site-breadcrumb container">
                <Breadcrumb icon='right angle' className="site-breadcrumb-content">
                    <Breadcrumb.Section className="site-breadcrumb-parent">categories</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron' />
                    <Breadcrumb.Section className="site-breadcrumb-child">{productDetails?.title?.toLowerCase()}</Breadcrumb.Section>
                </Breadcrumb>
            </div>

            {productQADetails?.length > 0 && isFinish === false &&
                (
                    <>
                        {/* <section className="container" style={{ paddingBottom: '2rem' }}>
                            <Grid stackable textAlign="center">
                                <Grid.Column mobile={1} computer={1}>
                                    <div className="quote-section-divider">
                                        <div></div>
                                    </div>
                                </Grid.Column>
                            </Grid>
                        </section> */}
                        <section className="ldp-quote-wrapper">
                            <div className="ldp-quote-container container">
                                {productQADetails?.length > 0 &&
                                    <div className="ldp-quote-bar-section">
                                        <Grid className="ldp-quote-bar-grid" columns={'equal'}>
                                            {productQADetails?.map((ele, i) => (
                                                <Grid.Column className={`ldp-quote-bar-col ${i !== productQADetails?.length ? `ldp-quote-bar-col-pad` : ``}`}>
                                                    <div className="ldp-quote-bar" style={{ background: ProductQAsValues?.length >= i ? 'rgba(47, 72, 88, 0.8)' : '#E9E9E9', }}>
                                                    </div>
                                                </Grid.Column>
                                            ))}
                                        </Grid>
                                    </div>
                                }
                                <div className="ldp-quote-que-counter">
                                    <div className="ldp-quote-header">
                                        <h2 className="ldp-quote-que-count">question {ProductQAsValues?.length === 0 ? 1 : ProductQAsValues?.length + 1} of {productQADetails?.length}</h2>
                                        <h1 className="ldp-quote-que-title">{currentQuestion?.question_title}</h1>
                                    </div>
                                </div>
                                <Grid textAlign="center" stackable columns={6}>
                                    <Grid.Row textAlign="center" className="ldp-quote-row" style={{ position: 'relative' }}>
                                        {currentQuestion !== '' &&
                                            currentQuestion?.answers &&
                                            currentQuestion?.answers.length > 0 &&
                                            currentQuestion?.answers.map((ele, i) => {
                                                return (
                                                    <Grid.Column
                                                        className="ldp-quote-column"
                                                        onClick={() => onSelectAnswer(ele)}
                                                        onMouseOver={() => handleMouse(ele, 'true')}
                                                        onMouseLeave={() => handleMouse(ele, 'false')}
                                                    >
                                                        <Segment className="ldp-quote-segment">
                                                            {/* <div className="ldp-quote-image"> */}
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.answer_image}`}
                                                                alt="Urbanserve Service Icon"
                                                                width="10%"
                                                            />
                                                            {/* </div> */}
                                                            <p style={{ margin: '0' }}>{ele?.answer_title}</p>
                                                            <div className="ldp-quote-check">
                                                                <img src="/images/category-check.png" width="50%"></img>
                                                            </div>
                                                        </Segment>
                                                    </Grid.Column>
                                                );
                                            })}
                                        <Box className={`${classes.prevBox} ldp-prevBox`} >
                                            {ProductQAsValues.length > 0 && (
                                                <Box
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.prevButton}
                                                    onClick={() => {
                                                        onPrev();
                                                        setArrowEnter(false);
                                                    }}
                                                    onMouseOver={() => setArrowEnter(true)}
                                                    onMouseOut={() => setArrowEnter(false)}
                                                >
                                                    <div className={classes.prevIcon}>
                                                        {' '}
                                                        {arrowEnter === true ? (
                                                            <ArrowBackIosIcon style={{ color: 'white' }} />
                                                        ) : (
                                                            <ArrowBackIosIcon style={{ color: '#1A273A' }} />
                                                        )}
                                                    </div>
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid.Row>
                                </Grid>
                            </div>
                        </section>
                    </>
                )
            }

            {isFinish === true && <section className="container quote-section-container">
                <Grid stackable textAlign="center">
                    <Grid.Column mobile={1} computer={1}>
                        <div className="quote-section-divider">
                            <div></div>
                        </div>
                    </Grid.Column>
                </Grid>
            </section>}

            {/* {isFinish === true && productDetails?.product_addons?.length > 0 && (<section className="ldp-addon-wrapper">
                <div className="ldp-addon-container container">
                    <Grid stackable textAlign="center">
                        <Grid.Column className="ldp-addon-header" mobile={16} computer={16}>
                            <h3> Select <span className="ldp-addon-highlight">Addons</span> that suits you best</h3>
                        </Grid.Column>
                    </Grid>
                    <Grid className="ldp-addon-grid" textAlign="center" columns={colCalculator(productDetails?.product_addons?.length)}>
                        <Grid.Row>
                            {productDetails?.product_addons?.length > 0 && productDetails?.product_addons.map((ele, i) => (
                                <>
                                    <Grid.Column mobile={16} tablet={8} computer={4}>
                                        <Card
                                            style={{
                                                textAlign: 'left'
                                            }}
                                            className="ldp-addon-card"
                                        >
                                            <Card.Content className="ldp-addon-card-content">
                                                <div className="card-radio">
                                                    <Radio onClick={() => {
                                                        addonHandler(ele.id);
                                                    }} checked={selectedAddon.indexOf(ele.id) > -1 ? true : false} />
                                                </div>
                                                <div className="card-text">
                                                    <Card.Header className="card-title">{ele.title} </Card.Header>
                                                    <Card.Description className="card-price">
                                                        {`Price: £ ${ele.price}`}
                                                    </Card.Description>
                                                </div>
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                </>
                            ))}
                        </Grid.Row>
                    </Grid>
                </div>
            </section>)} */}

            {/* <Grid stackable columns="equal" textAlign="center">
                <Grid.Column className="ldp-button-section" mobile={16} computer={16}>
                    <Button className="ldp-start-btn">
                        <Icon><img src="/images/icon-repeat.png" alt="Urbanserve Repeat Icon" width="80%"></img></Icon>Start Over</Button>
                    <Button>Confirm</Button>
                    <button class="btn"><img src="/images/icon-repeat.png" alt="Urbanserve Repeat Icon" width="15%"></img> Home</button>
                </Grid.Column>
            </Grid> */}

            {/* {isFinish === true && (
                <>
                    <section className="ldp-qa-result-wrapper">
                        <div className="ldp-qa-result-info container">
                            <div className="ins-qa-result-title">
                                <h2 className="ins-qa-result-title-text">Your Preferences are set for <em><strong>{productDetails?.title}</strong></em></h2>
                            </div>
                            <div className="ldp-qa-reset">
                                <h3 className="ldp-qa-reset-title">Need changes?</h3>
                                <Button.Group>
                                    <Button onClick={() => handleResetProductQA()}>Start Over</Button>
                                    <Button.Or />
                                    <Button disabled={ProductQAsValues?.length <= 0 ? true : false} onClick={() => handleCheckoutButton()} positive>Proceed to checkout</Button>
                                </Button.Group>
                            </div>

                            {isValueNull === true && <div className="ldp-qa-null">
                                <h3 style={{ padding: '1rem 0rem' }}><i> Unfortunately we are not able to provide instant quote. You can try uploading images to get quote after our expert analyze your requirement or else we will need to arrange free visit to provide quote this text</i></h3>
                            </div>}
                        </div>
                    </section>
                </>
            )} */}

            {/* {productDetails?.product_addons?.length > 0 && (
                <section className="ldp-qa-addon-wrapper">
                    <div className="ldp-qa-addon-info container">
                        <Grid>
                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <div className="idp-qa-addon-header-wrapper">
                                    <h2 className="idp-qa-addon-header">Product Addons for {productDetails?.title}</h2>
                                </div>
                            </Grid.Column>
                        </Grid>
                        <Divider />
                        <Segment compact className="idp-qa-addon-segment">  <Icon name='info' />Select Addons that suits you best!</Segment>
                        <Grid columns={colCalculator(productDetails?.product_addons.length)}>
                            <Grid.Row>
                                {productDetails?.product_addons.length > 0 && productDetails?.product_addons.map((ele, i) => (
                                    <Grid.Column mobile={16} tablet={8} computer={4}>
                                        <Card
                                            style={{
                                                backgroundColor:
                                                    selectedAddon.indexOf(ele.id) > -1 &&
                                                    '#4ad295',
                                                color:
                                                    selectedAddon.indexOf(ele.id) > -1 && 'white',
                                            }}
                                            onClick={() => {
                                                addonHandler(ele.id);
                                            }}
                                            header={ele.title}
                                            description={`Price: £ ${ele.price}`}
                                        />
                                    </Grid.Column>
                                ))}
                            </Grid.Row>
                        </Grid>
                    </div>
                </section>
            )} */}

            <section>
                <div className="container">
                    {/* {isFinish === false && (
                        <p style={{ padding: '1rem 0rem' }}>Please Choose your preferrences before you checkout!</p>
                    )} */}
                    {/* {isFinish === true && productAddedToCart === true && ( */}
                    {/* <Button className="quoteQaButton" disabled={ProductQAsValues?.length <= 0 ? true : false} onClick={() => handleCheckout()}>Checkout</Button> */}
                    {/* )} */}
                </div>
            </section>


            {/* <section className="container ins-qt-wrapper">
                <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div className="ins-qt-title-wrapper">
                            <h2 className="ins-qt-title">{`FOR AN INSTANT QUOTE FOR YOUR ${productDetails?.title} PLEASE USE OUR PRICE CALCULATOR BELOW`}</h2>
                        </div>
                    </Grid.Column>
                </Grid>

                <Grid className="quote-grid">
                    <Grid.Column mobile={16} tablet={8} computer={7}>
                        <div className="ins-qt-quote">
                            <h4 className="ins-qt-quote-title">New Instant Quote</h4>

                            <div className="ins-qt-quote-section">
                                {quoteQuestions?.length > 0 ? quoteQuestions?.map((question, index) => (
                                    <>
                                        <Grid.Column mobile={16} tablet={16} computer={16} style={{ padding: '1rem 0rem' }}>
                                            <h4 className="ins-qt-quote-section-title">{isSubmitting || isFetchingGroup ? <Skeleton /> : question?.title}</h4>
                                        </Grid.Column>
                                        {
                                            question?.option_type === 'radio' ? (
                                                question?.quote_qa_option.map((option, i) => (
                                                    <Form.Field>
                                                        {isSubmitting || isFetchingGroup ? <Skeleton /> : <Radio
                                                            label={option?.title}
                                                            name={option?.title}
                                                            value={question?.selected}
                                                            onChange={(event, i) => handleRadio("Radio", event, i, option?.id, question?.id, index, option?.price)}
                                                            checked={question?.selected == option?.id ? true : false}
                                                        />}

                                                    </Form.Field>
                                                ))
                                            ) : question?.option_type === "select" ? (
                                                <>
                                                    {isSubmitting || isFetchingGroup ? <Skeleton /> : <Autocomplete
                                                        options={countryOptions(question?.quote_qa_option)}
                                                        renderOption={(option) => (
                                                            <Box display="flex" flexDirection="column">
                                                                <span>{`${option.text} `}</span>
                                                            </Box>
                                                        )}
                                                        style={{ width: '50%' }}
                                                        getOptionLabel={(option) => (option?.id ? `${option.text}` : "")}
                                                        onChange={(event, i) => handleDrop(event, i, index, question?.id)}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                size="small"
                                                            />
                                                        )}
                                                    />}
                                                </>
                                            ) : question?.option_type === 'checkbox' ? (
                                                question?.quote_qa_option.map((option, i) => (
                                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                                        {isSubmitting || isFetchingGroup ? <Skeleton /> : <Checkbox
                                                            label={option?.title}
                                                            onChange={(event, i) => handleCheck(event, i, index, question?.id, option?.id, option?.price)}
                                                        />}
                                                    </Grid.Column>
                                                ))
                                            ) : question?.option_type === 'number' ? (
                                                question?.quote_qa_option.map((option, i) => (
                                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                                        {isSubmitting || isFetchingGroup ? <Skeleton /> : <Input onChange={(event, i) => handleRadio("Input", event, i, option?.id, question?.id, index, option?.price)} />}
                                                    </Grid.Column>
                                                ))
                                            ) : ''
                                        }
                                    </>
                                )) : ''}
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={9}>
                        <div className="ins-qt-summary">
                            <h4 className="ins-qt-summary-title">Quote Summary</h4>
                            {quoteQuestions?.length > 0 && quoteQuestions?.map((question) => (
                                <>
                                    {isSubmitting || isFetchingGroup ? <Skeleton /> :
                                        <Grid.Column mobile={16} tablet={16} computer={16} style={{ padding: '1rem 0rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h4 className="ins-qt-question">{question?.title}</h4>
                                                <h4>£ {question?.price ? question?.price : 0}</h4>
                                            </div>
                                        </Grid.Column>}
                                </>
                            ))}
                            <hr />
                            <Grid.Column mobile={16} tablet={16} computer={16} style={{ padding: '1rem 0rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4>{isSubmitting || isFetchingGroup ? <Skeleton /> : `Your cost per clean would be`}</h4>
                                    {isSubmitting || isFetchingGroup ? <Skeleton /> : <h4>
                                        £ {price}
                                    </h4>}
                                </div>
                            </Grid.Column>
                            <Button className="quoteQaButton" onClick={() => { handleCheckout() }}>Checkout</Button>
                        </div>
                    </Grid.Column>
                </Grid>
            </section> */}

            {/* <section className="tab-wrapper" style={{ padding: '1rem' }}>
                <div className="container">
                    <Accordion title="Info" content="fsdfdf" />
                </div>
            </section> */}


            {/* <section class="ldp-include-wrapper">
                <div class="ldp-include container">

                    <div class="ldp-dropdown">
                        <h3 class="ldp-dropdown-text">Choose from :</h3>
                        <div class="ui fluid selection dropdown ldp-dropdown-field">
                            <input type="hidden" name="user" />
                            <i class="dropdown icon"></i>
                            <div class="default text">Variant Option</div>
                            <div class="menu">
                                <div class="item" data-value="jenny">
                                    <img class="ui mini avatar image" src="/images/avatar/small/jenny.jpg" />
                        Jenny Hess
                    </div>
                                <div class="item" data-value="elliot">
                                    <img class="ui mini avatar image" src="/images/avatar/small/elliot.jpg" />
                        Elliot Fu
                    </div>
                                <div class="item" data-value="stevie">
                                    <img class="ui mini avatar image" src="/images/avatar/small/stevie.jpg" />
                        Stevie Feliciano
                    </div>
                                <div class="item" data-value="christian">
                                    <img class="ui mini avatar image" src="/images/avatar/small/christian.jpg" />
                        Christian
                    </div>
                                <div class="item" data-value="matt">
                                    <img class="ui mini avatar image" src="/images/avatar/small/matt.jpg" />
                        Matt
                    </div>
                                <div class="item" data-value="justen">
                                    <img class="ui mini avatar image" src="/images/avatar/small/justen.jpg" />
                        Justen Kitsune
                    </div>
                            </div>
                        </div>
                    </div>

                    <div class="ldp-include-cards">
                        <div class="ldp-inc-card">
                            <div class="inc-card-title">
                                <h6>Included:</h6>
                            </div>
                            <div class="inc-card-list">
                                <input className="idp-inc-input"  type="checkbox" class="inc-read-more-state" id="post-2" />
                                <ul class="inc-read-more-wrap">
                                    <li>fsfds</li>
                                    <li>fsfds</li>
                                    <li>fsfds</li>
                                    <li>fsfds</li>
                                    <li class="inc-read-more-target">fsfds</li>
                                    <li class="inc-read-more-target">fsfds</li>
                                    <li class="inc-read-more-target">fsfds</li>
                                    <li class="inc-read-more-target">fsfds</li>
                                    <li class="inc-read-more-target">fsfds</li>
                                </ul>
                                <label for="post-2" class="inc-read-more-trigger"></label>
                            </div>
                            <div class="inc-card-icon">
                                <img src="./images/inc-icon.png" width="100%" alt="" />
                            </div>
                        </div>
                        <div class="ldp-ex-card">
                            <div class="ex-card-title">
                                <h6>Not Included:</h6>
                            </div>
                            <div class="ex-card-list">
                                <ul>
                                    <li>fsfds</li>
                                    <li>fsfds</li>
                                    <li>fsfds</li>
                                    <li>fsfds</li>
                                </ul>
                            </div>
                            <div class="ex-card-icon">
                                <img src="./images/ex-icon.png" width="100%" alt="" />
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="tabs-section">

                            <div class="tabs">
                                <div class="tab">
                                    <input className="tab-input" type="checkbox" id="chck2" />
                                    <label class="tab-label acc-label" for="chck2">Pricing</label>
                                    <div class="tab-content">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!
                        </div>
                                </div>
                                <div class="tab">
                                    <input className="tab-input" type="checkbox" id="chck1" />
                                    <label class="tab-label " for="chck1">More Info</label>
                                    <div class="tab-content">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!
                        </div>
                                </div>
                            </div>
                            <p class="term-text"> View Terms & Conditions </p>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* Site Footer Start */}
            <section className="site-footer-wrapper">
                <div className="site-footer-container container">
                    <Grid stackable columns={3} className="site-footer-content">
                        <Grid.Column className="site-footer-col-one">
                            <ul>
                                <li>Urbanserve</li>
                                <li>Find Services</li>
                                <li>About</li>
                                <li>Contact</li>
                                <li>Tradespeople</li>
                            </ul>
                        </Grid.Column>
                        <Grid.Column className="site-footer-col-two vertical-space" style={{ display: 'flex' }}>
                            <div>
                                <h3>Data Safe</h3>
                                <p>Your details are kept safe and never shared</p>
                            </div>
                            <div>
                                <h3>Gas Safe</h3>
                                <p>Our engineers are vetted and fully qualifed</p>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="site-footer-col-three">
                            <div>
                                <h3>Download Now</h3>
                                <div className="site-footer-app-links">
                                    <img src="/images/footer-apple-app.png" width="100%" />
                                    <img src="/images/footer-gapp.png" width="100%" />
                                </div>
                            </div>
                            <div className="site-footer-payment">
                                <img src="/images/footer-payment.png" width="100%" />
                            </div>
                        </Grid.Column>
                    </Grid>
                    <Grid textAlign="center" className="site-footer-logo">
                        <Grid.Column mobile={16}>
                            <img src="/images/logo.png" width="100%" alt="" />
                            <p className="site-footer-text">Copyright © 2010 - 2021 Urbanserve Ltd. All rights reserved.</p>
                        </Grid.Column>
                    </Grid>
                </div>
            </section>
            {/* Site Footer End */}
        </>
    )
}
const mapStateToProps = (state) => ({
    productDetails: state.ProductDetailsReducer?.productDetails,
    isFetching: state.ProductDetailsReducer?.isFetchingProductDetails,
    isFetchingProductQADetails: state.ProductDetailsReducer?.isFetchingProductQADetails,
    productQADetails: state.ProductDetailsReducer?.productQADetails,
    // Quote QA
    groupDetails: state.InstantQuoteReducer?.groupDetails,
    isFetchingGroup: state.InstantQuoteReducer?.isFetchingGroup,
    isSubmitting: state.InstantQuoteReducer?.isSubmitting,
    isValidatingCustomer: state.CustomerFlowReducer?.isValidatingCustomer,
    validateCustomer: state.CustomerFlowReducer?.validateCustomer,
    currentCart: state.CartReducer?.currentCart
});

const mapDispatchToProps = (dispatch) => {
    return {
        //Fetch list
        fetchProductList: (data) => dispatch(getProductList(data)),
        fetchPopularServiceList: (data) => dispatch(getPopularServices(data)),
        fetchServiceResultList: (data) => dispatch(getServiceResult(data)),
        fetchProductDetails: (data) => dispatch(getProductDetailsRequest(data)),
        fetchProductQADetails: (data) => dispatch(getProductQARequest(data)),
        fetchGroup: (data) => dispatch(getGroupRequest(data)),
        addGroup: (data) => dispatch(addGroupRequest(data)),
        validateEmail: (data) => dispatch(validateCustomer(data)),
        resetValidateEmail: (data) => dispatch(validateCustomerSuccess(data)),
        CustomerLogin: (...args) => dispatch(LoginAction(...args)),
        addProductToCart: (...args) => dispatch(addCart(...args)),
        successAlert: (message) => dispatch(successAlert(message)),
        validateLocation: (data) => dispatch(validateLocationRequest(data)),
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)((ProductComponent)));