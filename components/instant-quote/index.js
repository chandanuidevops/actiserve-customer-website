import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { compose } from "redux";
import { useRouter } from 'next/router'
import { Grid, Image, Dropdown, Radio, Form, Checkbox, Input, Select, Button } from 'semantic-ui-react'
import { Autocomplete } from '@material-ui/lab';
import { getProductDetailsRequest } from '../../Stores/ProductDetails/actions'
import {
    getProductList,
    getPopularServices,
    getServiceResult,
} from "../../Stores/Services/actions";
import { getGroupRequest, addGroupRequest } from '../../Stores/InstantQuote/actions';
import { ka } from 'date-fns/locale';
import {
    TextField,
    Box,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Nav from '../Nav';
import MainNav from '../MainNav';
import Layout from '../Layout';

function InstantQuote({ fetchProductDetails, productDetails, fetchGroup, groupDetails, isFetchingGroup, addGroup, isSubmitting }) {
    const userInfo = useSelector((state) => state?.AuthReducer?.user);

    const history = useRouter();
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState(0);
    const [selectedCheck, setSelectedCheck] = useState([]);
    const [quoteQuestions, setQuoteQuestions] = useState([]);

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
        fetchGroup({ id: '93f67c4a-fb1f-4356-81dc-bf4657865199' })
    }, [])

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

    function handleRadio(answerType, event, i, option, question, index, price) {
        let quoteSection = JSON.parse(JSON.stringify(quoteQuestions))
        if (answerType === 'Radio') {
            quoteSection?.map((ele, i) => {
                ele.selected = index === i ? option : ele.selected
                ele.price = index === i ? parseInt(price) : ele.price
                ele.question_id = index === i ? question : ele.question_id
            })
            if (quoteSection) {
                setQuoteQuestions(quoteSection)
            }
        } else if (answerType === 'Select') {
            quoteSection?.map((ele, k) => {
                ele.selected = index === k ? i?.value : ele.selected
                ele.price = index === k ? parseInt(price) : ele.price
                ele.question_id = index === k ? question : ele.question_id
            })
            if (quoteSection) {
                setQuoteQuestions(quoteSection)
            }
        } else if (answerType === 'Input') {
            quoteSection?.map((ele, k) => {
                let finalPrice = i?.value * price
                ele.inputBox = index === k ? i?.value : ele.selectBox
                ele.price = index === k ? parseInt(finalPrice) : ele.price
                ele.original_price = index === k ? parseInt(price) : ele.original_price
                ele.selected = index === k ? option : ele.selected
                ele.question_id = index === k ? question : ele.question_id
                ele.input_box = index === k ? true : ''
            })
            if (quoteSection) {
                setQuoteQuestions(quoteSection)
            }
        }
    }

    function handleCheck(event, i, index, questionID, optionID, price) {
        let quoteSection = JSON.parse(JSON.stringify(quoteQuestions))
        let FinalPrice = 0 + price;
        quoteSection?.map((ele, k) => {

            if (i?.checked === true && k === index) {
                let elePrice = parseInt(ele?.price ? ele?.price : 0);
                let checkBoxID = ele?.checkBoxId ? ele?.checkBoxId : [];
                if (optionID) {
                    checkBoxID?.includes(optionID) === false && checkBoxID.push(optionID)
                }
                let SumPrice = elePrice !== undefined || elePrice !== undefined ? parseInt(elePrice) + parseInt(price) : 0 + parseInt(price);
                ele.price = index === k ? SumPrice : ''
                ele.selected = index === k ? checkBoxID : ''
                ele.check_box = index === k ? true : ''
            } else if (i?.checked === false && k === index) {
                let elePrice = parseInt(ele?.price ? ele?.price : 0);
                let checkBoxID = ele?.checkBoxId ? ele?.checkBoxId : [];
                if (optionID) {
                    checkBoxID?.includes(optionID) === true && checkBoxID.pop(optionID)
                }
                let SumPrice = elePrice !== undefined || elePrice !== undefined ? parseInt(elePrice) - parseInt(price) : 0 - parseInt(price);
                ele.price = index === k ? SumPrice : ''
                ele.selected = index === k ? checkBoxID : ''
                ele.check_box = index === k ? true : ''
            }

        })
        if (quoteSection) {
            setQuoteQuestions(quoteSection)
        }

        // Selected Quote
        if (i?.checked === true) {
            let dataArray = selectedCheck;
            let data = {
                option_price: parseInt(price),
                section_id: questionID,
                option_id: optionID,
            }
            if (data) {
                dataArray.push(data)
            }
            if (dataArray) {
                setSelectedCheck(dataArray)
            }
        }
        if (i?.checked === false) {
            let dataArray = selectedCheck;
            let filterArray = dataArray?.filter(ele => ele.option_id !== optionID)
            if (filterArray) {
                setSelectedCheck(filterArray)
            }
        }
    }

    function handleDrop(event, i, index, questionID, optionID, price) {
        let quoteSection = JSON.parse(JSON.stringify(quoteQuestions))
        quoteSection?.map((ele, k) => {
            ele.selected = index === k ? i?.value : ele.selected
            ele.price = index === k ? parseInt(i?.price) : parseInt(ele.price)
            ele.question_id = index === k ? questionID : ele.question_id
        })
        if (quoteSection) {
            setQuoteQuestions(quoteSection)
        }
        if (quoteSection) {
            setQuoteQuestions(quoteSection)
        }
    }

    function countryOptions(options) {
        let data = JSON.parse(JSON.stringify(options))
        if (data.length > 0) {
            let newOptions = []
            data.map(async (item) => {
                item.value = await item.id;
                item.text = await item.title;
                await newOptions.push(item)
            })
            return newOptions;
        }
    }

    // Calculate Final Quote Amount
    useEffect(() => {
        var total = 0;
        quoteQuestions.forEach(item => {
            total += item?.price;
        });
        setPrice(total)
    }, [quoteQuestions])

    const handleSubmit = () => {
        let qupteQuestionArray = JSON.parse(JSON.stringify(quoteQuestions))
        if (qupteQuestionArray.length > 0) {
            let quote_section = []
            qupteQuestionArray?.map((ele, i) => {
                if (ele?.selected !== undefined && ele?.question_id !== undefined && ele?.check_box !== true) {
                    let data = {
                        option_id: ele?.selected,
                        option_price: ele.price,
                        section_id: ele.question_id
                    }
                    if (data) {
                        quote_section.push(data)
                    }
                }
            })

            if (quote_section && selectedCheck) {
                let finalQuoteArray = quote_section.concat(selectedCheck)

                let finalQuoteData = {
                    group_id: quoteQuestions[0]?.group_id,
                    customer_id: userInfo?.id,
                    quote_section: finalQuoteArray,
                    grand_total: price
                }

                if (finalQuoteData) {
                    addGroup({ data: finalQuoteData })
                }
            }

        }

    }

    return (
        <>
            {/* <MainNav/> */}
            <section className="container ins-qt-wrapper">
                <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div className="ins-qt-title-wrapper">
                            <h2 className="ins-qt-title">{`FOR AN INSTANT QUOTE FOR YOUR ${product} PLEASE USE OUR PRICE CALCULATOR BELOW`}</h2>
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
                                                        // value={filterValues.customer_id}
                                                        onChange={(event, i) => handleDrop(event, i, index, question?.id)}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                size="small"
                                                            // className={classes.filterFieldContainer}
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

                            {userInfo?.id === null ? <Button className="OutlinedbuttonStyle">Create an account</Button> : <Button className="OutlinedbuttonStyle" onClick={() => handleSubmit()}>Submit</Button>}
                        </div>
                    </Grid.Column>
                </Grid>
            </section>
        </>
    )
}

const mapStateToProps = (state) => ({
    groupDetails: state.InstantQuoteReducer?.groupDetails,
    isFetchingGroup: state.InstantQuoteReducer?.isFetchingGroup,
    isSubmitting: state.InstantQuoteReducer?.isSubmitting,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductDetails: (data) => dispatch(getProductDetailsRequest(data)),
        fetchGroup: (data) => dispatch(getGroupRequest(data)),
        addGroup: (data) => dispatch(addGroupRequest(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)((InstantQuote));
