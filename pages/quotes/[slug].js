import React, { useEffect, useState } from 'react'
import MainNav from '../../components/MainNav'
import HelmetComponent from '../../components/Helmet'
import { Header, Icon, Grid, Card, Segment, Accordion, Message, Button, Divider, Form, Input, Radio, Checkbox, Table, TextArea, Select, Modal, Loader } from 'semantic-ui-react'
import useValidator from "../../utils/useValidator";
import Router, { useRouter } from 'next/router'
import { getSingleQuote, saveQuote } from '../../Stores/QuoteDetails/actions';
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import * as Yup from 'yup';
import {
    Box,
    FormControl as FormControlDefault,
    makeStyles,
    withStyles,
    TextField, FormHelperText
} from '@material-ui/core';
const styles = {
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    sliderLable: {
        marginRight: '0.6rem',
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardToggle: {
        paddingRight: '0.6rem'
    },
    flexDiv: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export const SingleQuote = ({ fetchCurrentQuote, saveQuote }) => {
    const isBrowser = () => typeof window !== "undefined"
    const history = useRouter();

    const { SingleQuote, isFetchingSingleQuotes } = useSelector(
        (state) => state?.QuoteDetailsReducer
    );

    const token = useSelector(
        (state) => state?.AuthReducer?.token
    );

    // Set Current Quote
    const [currentQuote, setCurrentQuote] = useState([]);

    // Parts
    const [selectedParts, setSelectedParts] = useState([]);
    const [partDetails, setPartDetails] = useState([]);
    const [selectedPartsPrice, setSelectedPartsPrice] = useState(0);
    const [finalParts, setFinalParts] = useState([]);

    // Slug from url
    const [quoteID, setQuoteID] = useState('');

    // Total Price
    const [totalPriceArray, setTotalPriceArray] = useState([]);
    const [quoteTotal, setQuotetotal] = useState(0);
    const [recurringDetails, setRecurringDetails] = useState([]);


    const [submitType, setSubmitType] = useState('');

    const [isAccepted, setIsAccepted] = useState(false);
    const [isRejected, setIsRejected] = useState(false);


    //
    const [selectedRecurring, setSelectedRecurring] = useState({});

    const [selectedRecurringPrice, setSelectedRecurringPrice] = useState(0);

    // Get Data from localStorage
    useEffect(() => {
        if (isBrowser() === true) {
            let currentQuoteData = localStorage.getItem('current_quote');
            if (currentQuoteData !== null && currentQuoteData !== "") {
                let currentQuoteArr = JSON.parse(currentQuoteData);
                if (currentQuoteArr) {
                    setCurrentQuote(currentQuoteArr)
                }
            }
        }
    }, [])

    // 
    useEffect(() => {
        if (selectedRecurring !== {}) {
            let price = parseInt(selectedRecurring?.recurring_price);
            if (price) {
                setSelectedRecurringPrice(price);
            }
        }
    }, [selectedRecurring])

    useEffect(() => {
        let total = [currentQuote?.labour_rate];
        if (selectedParts) {
            selectedParts?.map((price) => {
                let data = price?.parts_price;
                if (data) {
                    total.push(data)
                }
                if (total) {
                    setTotalPriceArray(total)
                }
            })
        }
    }, [selectedPartsPrice])

    useEffect(() => {
        let labourRate = currentQuote?.labour_rate !== null ? currentQuote?.labour_rate : 0;
        if (currentQuote?.labour_rate >= 0 && currentQuote?.labour_rate !== null) {
            setQuotetotal(currentQuote?.labour_rate);
        } else if (currentQuote?.labour_rate == null) {
            setQuotetotal(0);
        }
        let QuotePrice = selectedPartsPrice + labourRate;
        if (QuotePrice) {
            setQuotetotal(QuotePrice)
        }
    }, [selectedPartsPrice, currentQuote])

    useEffect(() => {
        let total = currentQuote?.labour_rate !== null ? currentQuote?.labour_rate : 0;
        if (selectedRecurringPrice) {
            total = total + selectedRecurringPrice + selectedPartsPrice;
            setQuotetotal(total)
        }
    }, [selectedRecurringPrice])


    // Handle Parts Add
    const handlePartsAdd = (e, checked, part) => {
        console.log("handlePartsAdd>>", e, checked, part)
        let isSelected = checked?.checked;
        let incomingPart = part;

        if (isSelected === true) {
            setSelectedParts([...selectedParts, incomingPart])
        } else {
            let selectedPartsData = selectedParts;
            let filterParts = selectedPartsData?.filter(part => part.id !== incomingPart?.id)
            if (filterParts) {
                setSelectedParts(filterParts)
            }
        }
    }

    useEffect(() => {
        console.log("quoteTotal", quoteTotal)
        console.log("selectedPArts>", selectedParts)

    }, [quoteTotal, selectedParts])

    // Calculate selected parts total price
    useEffect(() => {
        var total = 0;
        selectedParts.forEach(item => {
            total += item?.parts_price;
        });
        setSelectedPartsPrice(total)
    }, [selectedParts])

    // Slug from url
    useEffect(() => {
        if (history && history?.query?.slug !== '') {
            setQuoteID(history?.query?.slug)
        }
    }, [history])

    useEffect(() => {
        if (quoteID !== null & quoteID !== undefined && quoteID !== '') {
            fetchCurrentQuote(quoteID)
        }
    }, [quoteID])

    useEffect(() => {
        if (SingleQuote !== null & SingleQuote !== undefined && SingleQuote !== {}) {
            setCurrentQuote(SingleQuote)
        }
    }, [SingleQuote])

    useEffect(() => {
        if (currentQuote !== null & currentQuote !== undefined && currentQuote !== {}) {
            if (currentQuote?.recurring_details !== '' && currentQuote?.recurring_details !== null && currentQuote?.recurring_details !== undefined) {
                let recurringData = currentQuote?.recurring_details;
                if (recurringData) {
                    setRecurringDetails(recurringData)
                }
            }
        }
    }, [currentQuote])

    // useEffect(() => {
    //     if (currentQuote !== null & currentQuote !== undefined && currentQuote !== {}) {
    //         if (currentQuote?.recurring_details !== '' && currentQuote?.recurring_details !== null && currentQuote?.recurring_details !== undefined) {
    //             let recurringData = currentQuote?.recurring_details;
    //             if (recurringData) {
    //                 let accepted_data = recurringData?.filter(ele => ele.is_accepted === true);
    //                 console.log("accepted_data>>", accepted_data)
    //                 if (accepted_data?.length > 0) {
    //                     setValues({
    //                         ...values,
    //                         recurring_selection: accepted_data?.[0]
    //                     })
    //                 }
    //             }
    //         }
    //     }
    // }, [currentQuote])

    useEffect(() => {
        if (currentQuote !== null & currentQuote !== undefined && currentQuote !== {}) {
            if (currentQuote?.parts !== '' && currentQuote?.parts !== null && currentQuote?.parts !== undefined) {
                let parts = JSON.parse(JSON.stringify(currentQuote?.parts))
                parts?.map((part) => {
                    part.is_accepted = false
                })
                if (parts) {
                    setPartDetails(parts)
                }
            }
        }
    }, [currentQuote])

    const {
        getFieldProps,
        errors,
        setValues,
        handleSubmit,
        handleBlur,
        handleChange,
        touched,
        values,
    } = useValidator({
        initialValues: {
            recurring_selection: '',
            parts_selection: ''
        },
        onSubmit,
        validationSchema: Yup.object({
            recurring_selection: currentQuote?.is_recurring === true ? Yup.string().required() : Yup.string().nullable(),
            parts_selection: currentQuote?.is_parts === true ? Yup.string().required() : Yup.string().nullable(),
        }),
    });

    const {
        getFieldProps: rejectgetFieldProps,
        errors: rejecterrors,
        setValues: rejectsetValues,
        handleSubmit: rejecthandleSubmit,
        handleBlur: rejecthandleBlur,
        handleChange: rejecthandleChange,
        touched: rejecttouched,
        values: rejectvalues,
    } = useValidator({
        initialValues: {
        },
        onSubmit: rejectOnSubmit,
        validationSchema: Yup.object({
        }),
    });

    useEffect(() => {
        let part_details = JSON.parse(JSON.stringify(partDetails))
        part_details?.map((part) => {
            selectedParts?.map((ele, k) => {
                if (ele.id === part.id) {
                    part.is_accepted = true;
                } else {
                    part.is_accepted = false;
                }
            })
        })
        if (part_details) {
            setFinalParts(part_details)
            setValues({
                ...values,
                parts_selection: part_details
            })
        }
    }, [selectedParts])

    useEffect(() => {
        if (selectedRecurring !== {}) {
            let recurring_details = JSON.parse(JSON.stringify(recurringDetails))
            recurring_details?.map((ele, k) => {
                if (selectedRecurring?.recurring_min_period === ele?.recurring_min_period) {
                    ele.is_accepted = true;
                } else {
                    ele.is_accepted = false;
                }
            })
            setRecurringDetails(recurring_details)
            setValues({
                ...values,
                recurring_selection: recurring_details
            })
        }
    }, [selectedRecurring])

    function onSubmit(values, type) {
        let data = {
            status: 'accepted',
            is_accepted_by_customer: '',
            recurring_details: '',
            recurring: recurringDetails,
            is_recurring: currentQuote?.is_recurring,
            is_parts: currentQuote?.is_parts,
            parts: finalParts,
            total: quoteTotal,
        }
        if (data) {
            saveQuote({ data, id: quoteID, type: 'accept' })
            setSubmitType('')
            Router.push("/quotes")
        }
    }

    function rejectOnSubmit() {
        let data = {
            status: 'rejected',
            is_accepted_by_customer: '',
            recurring_details: '',
            recurring: currentQuote?.recurring_details,
            is_recurring: currentQuote?.is_recurring,
            is_parts: currentQuote?.parts_required,
            parts: partDetails,
            total: 0,
        }
        if (data) {
            saveQuote({ data, id: quoteID, type: 'reject' })
            setSubmitType('')
            Router.push("/quotes")
        }
    }

    console.log("recurring_details>>", currentQuote?.recurring_details)

    useEffect(() => {
        setSubmitType('')
        // if (token) {
        //     localStorage.setItem("token", token);
        // }
    }, [])

    useEffect(() => {
        if (currentQuote !== null & currentQuote !== undefined && currentQuote !== {}) {
            if (currentQuote?.status === 'rejected') {
                setIsRejected(true);
                setIsAccepted(false);
            } else if (currentQuote?.status === 'accepted') {
                setIsRejected(false);
                setIsAccepted(true);
            }
        }
    }, [currentQuote])

    useEffect(() => {
        if (isAccepted === true && isRejected === false) {
            let accepted_recurring = currentQuote?.recurring_details?.filter((ele) => ele.is_accepted === true);
            if (accepted_recurring?.length > 0) {
                setSelectedRecurring(accepted_recurring?.[0])
            }
        }
    }, [isAccepted])


    return (
        <>
        
        <HelmetComponent
      title="UrbanServe - About Us"
      description="Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs"
      ogTitle=""
      ogType="urbanserve company"
      ogUrl=""
      ogImage=""
      ogDescription=""
    />
        <div>
            <MainNav />
            <section className="quote-section-wrapper">
                <div className="container quote-section-container">
                    <form onSubmit={submitType == 'accept' ? handleSubmit : rejecthandleSubmit}>
                        <Message>
                            <Message.Header>Quote Details</Message.Header>
                        </Message>
                        <h3>
                            {currentQuote?.quote_title ? currentQuote?.quote_title : 'Quote Title'}
                        </h3>
                        <h5 style={{ padding: '0.5rem 0rem' }}>
                            {currentQuote?.quote_description ? currentQuote?.quote_description : 'Quote Description'}
                        </h5>

                        {(currentQuote?.is_recurring === true && recurringDetails?.length > 0) && (
                            <Message>
                                <Message.Header>Recurring Details</Message.Header>
                                <p>Select the recurring period that suits you best!</p>
                            </Message>
                        )}
                        {currentQuote?.is_recurring === true && recurringDetails?.length > 0 && (
                            recurringDetails?.map((ele) => (
                                <Card >
                                    <Card.Content fluid>
                                        <div style={styles.cardContent}>
                                            {isRejected === false && (<div style={styles.cardToggle}>
                                                <Radio disabled={isAccepted ?? true} checked={selectedRecurring?.recurring_period === ele?.recurring_period} onChange={() => setSelectedRecurring(ele)} />
                                            </div>)}
                                            <div>
                                                <Card.Header>
                                                    <div style={styles.flexDiv}>
                                                        <h4>Recurring Period: {ele?.recurring_period}</h4>
                                                    </div>
                                                </Card.Header>
                                                <Card.Description>
                                                    <div style={styles.flexDiv}>
                                                        <h4>Minimum Period: {ele?.recurring_min_period}</h4>
                                                    </div>
                                                    <div style={styles.flexDiv}>
                                                        <h4>Recurring Price: {`£ ${ele?.recurring_price}`}</h4>
                                                    </div>
                                                </Card.Description>
                                            </div>
                                        </div>
                                    </Card.Content>
                                </Card>

                            ))
                        )}
                        {currentQuote?.is_recurring === true && touched.recurring_selection && errors.recurring_selection ? (
                            <FormHelperText error={!!errors.recurring_selection}>
                                Recurring is Required
                            </FormHelperText>
                        ) : (
                            ''
                        )}
                        {(currentQuote?.is_parts === true && currentQuote?.parts?.length > 0) && (
                            <Message>
                                <Message.Header>Parts Details</Message.Header>
                                <p>Select parts that suits best!</p>
                            </Message>
                        )}
                        {currentQuote?.is_parts === true && (
                            currentQuote?.parts?.length > 0 && currentQuote?.parts?.map((part) => (
                                <Card >
                                    <Card.Content fluid>
                                        <div style={styles.cardContent}>
                                            <div style={styles.cardToggle}>
                                                <Checkbox onChange={(e, checked) => handlePartsAdd(e, checked, part)} />
                                            </div>
                                            <div>
                                                <Card.Header>{part?.parts_name.toUpperCase()}</Card.Header>
                                                <Card.Description>
                                                    <Card.Meta>{`£ ${part?.parts_price}`}</Card.Meta>
                                                </Card.Description>
                                            </div>
                                        </div>
                                    </Card.Content>
                                </Card>
                            ))
                        )}
                        {currentQuote?.is_parts === true && touched.parts_selection && errors.parts_selection ? (
                            <FormHelperText error={!!errors.parts_selection}>
                                Parts is Required
                            </FormHelperText>
                        ) : (
                            ''
                        )}

                        {/* Recurring & part not selected, display labour rate as Price */}
                        {(currentQuote?.is_parts === false && currentQuote?.is_recurring === false) && (
                            <Message style={{ width: '30%' }}>
                                <Message.Header>Labour Rate Details</Message.Header>
                                <p>{`£ ${currentQuote?.labour_rate !== null ? currentQuote?.labour_rate : 0}`}</p>
                            </Message>
                        )}
                        <Message style={{ width: '30%' }}>
                            <Message.Header>Total Quote Price</Message.Header>
                            <p>£ {isAccepted || isRejected ? currentQuote?.total : quoteTotal}</p>
                        </Message>

                        {isAccepted === true ? (
                            <Message style={{ width: '30%' }}>
                                <Message.Header>Quote Status</Message.Header>
                                <p>Accepted</p>
                            </Message>
                        ) : isRejected === true ? (
                            <Message style={{ width: '30%' }}>
                                <Message.Header>Quote Status</Message.Header>
                                <p>Rejected</p>
                            </Message>
                        ) : ''}
                        {
                            !isAccepted && !isRejected && (
                                <>
                                    <Button onClick={() => { setSubmitType('accept') }} positive>Accept</Button>
                                    <Button onClick={() => { setSubmitType('reject') }} negative>Reject</Button>
                                </>
                            )
                        }

                        <Button content='Back to Quotes' onClick={() => Router.push("/quotes")} icon='arrow left' labelPosition='left' />
                    </form>
                </div>
            </section>
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({

});

function mapDispatchToProps(dispatch) {
    return {
        fetchCurrentQuote: (...args) => dispatch(getSingleQuote(...args)),
        saveQuote: (...args) => dispatch(saveQuote(...args))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)((SingleQuote));