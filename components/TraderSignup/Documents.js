import React, {useEffect, useState} from 'react'
import {
  Box,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,

} from '@material-ui/core'
import {Button} from 'semantic-ui-react'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import {KeyboardDatePicker} from '@material-ui/pickers'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {connect} from 'react-redux'
import {compose} from 'redux'
import moment from 'moment'

import Router, {useRouter} from 'next/router'
import {Loader} from 'semantic-ui-react'
import Alerts from '../../components/Alerts'
import {errorAlert} from '../../Stores/Alerts/actions'
import {useStyles} from './styles'
import useValidator from '../../utils/useValidator'
import {
  addDocument,
  addSpecificDocument,
  getDocumentListing,
  disableAdding,
  allDocuments,
  saveFinishSignup,
} from '../../Stores/Traders/actions'
import * as Yup from 'yup'
import styled from 'styled-components'
import SiteFooter from '../../components/SiteFooter'
const AccordIcon = styled((props) => (
  <div {...props}>
    <div className="n">
      <img
        src="/site__icons/icon__accord__minus.png"
        width="20px"
        height="auto"
      />
    </div>
    <div className="y">
      <img
        src="/site__icons/icon__accord__plus.png"
        width="20px"
        height="20px"
      />
    </div>
  </div>
))`
  & > .y {
    display: block;
  }
  & > .n {
    display: none;
  }
  .Mui-expanded & > .n {
    display: flex;
  }
  .Mui-expanded & > .y {
    display: none;
  }
`

function Documents({
  addDocument,
  addSpecificDocument,
  isAddingDocument,
  documents,
  getDocuments,
  documentList,
  isFetchingDocument,
  errorAlert,
  getAllDocuments,
  disableAdding,
  isAddingSpecific,
  specificDocuments,
  isAllDocuments,
  allDocuments,
  saveFInishData,
  isFinishSignup,
  finishSignup,
}) {
  const router = useRouter()
  const id = router?.query?.traderId
  const classes = useStyles()

  const [loader, setLoader] = useState(true)

  const [selectedDocument, setSelectedDocument] = useState([])
  const [commonDocument, setCommonDocument] = useState([])
  const [uploadCommonData, setuploadCommonData] = useState([])
  const [uploadSpecificData, setuploadSpecificData] = useState([])
  const [commonSavingBtn, setCommonSavingBtn] = useState('')
  const [radioData, setRadioData] = useState([])
  const [commonError, setCommonError] = useState([])
  const [specificError, setSpecificError] = useState([])
  const [isSignUpProcessCompleted, setIsSignUpProcessCompleted] = useState(null)
  const [enabled, setEnabled] = useState(true)
  const [specificSavingBtn, setSpecificSavingBtn] = useState({
    question_id: '',
    category_id: '',
    doc_type: '',
  })

  const {
    getFieldProps,
    errors,
    setValues,
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    clearFormState,
  } = useValidator({
    initialValues: {
      trader_id: id,
    },
    onSubmit,
    validationSchema: Yup.object({}),
  })

  useEffect(() => {
    let timer1 = setTimeout(() => setLoader(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  useEffect(() => {
    if (values.trader_id) {
      getDocuments(values.trader_id)
      getAllDocuments(id)
    }
  }, [values.trader_id])

  useEffect(() => {
    if (allDocuments && allDocuments?.trader_details) {
      if (allDocuments?.trader_details?.profile_step === 4) {
        setIsSignUpProcessCompleted(true)
      } else {
        setIsSignUpProcessCompleted(false)
      }
    }
  }, [allDocuments])

  function onSubmit(val) {
    if (validateFinishSignup()) {

      const bodyFormData = new FormData()
      bodyFormData.append('is_active', true)
      bodyFormData.append('profile_step', 4)

      if (
        confirm(
          `Once you will finish signup, you cannot update any step.\nAre you sure to finish Signup process?`,
        )
      ) {
        setEnabled(false)
        saveFInishData({
          data: bodyFormData,
          trader_id: id,
        })
    
      }
    }

  }
  useEffect(() => {
    if(enabled){
      window.addEventListener("beforeunload", (ev) => 
      {  
          ev.preventDefault();
          return ev.returnValue = 'Are you sure you want to close?';
      });
    }else{
      window.removeEventListener("beforeunload", onSubmit,true);
    }


   
  }, [enabled])

  /***
   * Document saving functionality
   *
   ***/

  // upload single common document data
  const uploadFile = async (question_id, field_type) => {
    let selected = uploadCommonData
    let filteredSelected = selected.find((e) => e.question_id == question_id)
    let findId = commonDocument.find((e) => e.question_id == question_id)

    if (validateCommonInput(filteredSelected, question_id, field_type)) {
      const bodyFormData = new FormData()
      bodyFormData.append('id', findId?.id == undefined ? '' : findId?.id)
      bodyFormData.append('title', filteredSelected.title)
      bodyFormData.append('answer', filteredSelected.answer)
      bodyFormData.append(
        'registration_number',
        filteredSelected.registration_number,
      )
     
      bodyFormData.append('new_renewal_date', filteredSelected.new_renewal_date)
      bodyFormData.append('type', filteredSelected.type)
      bodyFormData.append('description', filteredSelected.description)
      bodyFormData.append('document_id', filteredSelected.document_id)
      addDocument({
        data: bodyFormData,
        trader_id: id,
      })
      setCommonSavingBtn({
        question_id: question_id,
        doc_type: filteredSelected.type,
      })
    }
  }


  const saveRadioData = (
    input,
    field_name,
    question_id,
    field_type,
    question_title,
  ) => {
    let selected = radioData
    let filteredSelected = selected.find((e) => e.question_id == question_id)
    const bodyFormData = new FormData()
    bodyFormData.append(
      'id',
      filteredSelected?.id == undefined ? '' : filteredSelected?.id,
    )
    bodyFormData.append('title', question_title)
    bodyFormData.append('answer', input)
    bodyFormData.append('registration_number', '')
    bodyFormData.append('new_renewal_date', '')
    bodyFormData.append('type', field_name)
    bodyFormData.append('description', '')
    bodyFormData.append('document_id', '')
    addDocument({
      data: bodyFormData,
      trader_id: id,
    })
  }

  useEffect(() => {
    let selected = JSON.parse(JSON.stringify(radioData))

    if (documents?.id) {
      selected = selected.map((e) => {
        if ((e.field_name = documents.type)) {
          return {
            id: documents?.id,
            type: e.type,
            title: e.title,
            answer: e.answer,
            description: e.description,
            question_id: e.question_id,
          }
        } else {
          return e
        }
      })
    }
    setRadioData(selected)
  }, [documents, uploadCommonData])

  // upload single specific document data
  const uploadSpecificFile = (question_id, category_id) => {
    let filteredSelected = uploadSpecificData.find(
      (e) =>
        e.question_id == question_id && e.type_of_category_id == category_id,
    )
    if (validateSpecificInput(filteredSelected, question_id, category_id)) {
      const bodyFormData = new FormData()
      bodyFormData.append('trader_id', filteredSelected.trader_id)
      bodyFormData.append('title', filteredSelected.title)
      bodyFormData.append('answer', filteredSelected.answer)
      bodyFormData.append('description', filteredSelected.description)
      bodyFormData.append('doc_type', filteredSelected.doc_type)
      bodyFormData.append('document_id', filteredSelected.document_id)

      addSpecificDocument({
        data: bodyFormData,
        trader_setting_id: filteredSelected.trader_setting_id,
      })
      setSpecificSavingBtn({
        question_id: question_id,
        category_id: category_id,
        doc_type: filteredSelected.doc_type,
      })
    }
  }
  /***
   * validation  functionality
   *
   ***/

  useEffect(() => {
    if (Object.keys(documentList)?.length > 0) {
      let error = []
      let error2 = []
      documentList?.types_of_document?.forEach((elem) => {
        if (elem.type == 'common') {
          elem?.name?.forEach((name) => {
            const obj = {
              question_id: name.id,
              errorName: `${name?.answer[0]?.required_answer} is required`,
              field_name: name?.answer[0]?.field_name,
              error: false,
              displayError: false,
            }
            error.push(obj)
          })
          setCommonError(error)
        }

        if (elem.type == 'specific') {
          elem?.name?.forEach((name) => {
            const obj = {
              question_id: name.id,
              errorName: `${name?.answer[0]?.required_answer} is required`,
              field_name: name?.answer[0]?.field_name,
              error: false,
              displayError: false,
              types_of_category: elem?.types_of_category,
            }
            error2.push(obj)
          })
          setSpecificError(error2)
        }
      })
    }
  }, [documentList])

  //validate input field and document for common documents

  const validateCommonInput = (v, question_id, field_type) => {
    let select = JSON.parse(JSON.stringify(commonError))

    let checkInput = false

    if (
      v == undefined ||
      (v?.registration_number == '' &&
        v?.new_renewal_date == '' &&
        v?.description == '')
    ) {
      checkInput = true
    }
    select = select.map((e) => {
      if (e.question_id == question_id && checkInput) {
        return {
          question_id: e.question_id,
          errorName: e.errorName,
          field_name: e.field_name,
          error: true,
          displayError: true,
        }
      } else {
        return {
          question_id: e.question_id,
          errorName: e.errorName,
          field_name: e.field_name,
          error: false,
          displayError: false,
        }
      }
    })

    setCommonError(select)

    return !checkInput
  }
  //validate input field and document for specific category documents
  const validateSpecificInput = (v, question_id, category_id) => {
    let select = JSON.parse(JSON.stringify(specificError))

    let checkInput = false

    if (v == undefined || v?.description == '') {
      checkInput = true
    }
    select = select.map((e) => {
      if (
        e.question_id == question_id &&
        checkInput &&
        e.types_of_category.includes(category_id)
      ) {
        return {
          question_id: e.question_id,
          errorName: e.errorName,
          field_name: e.field_name,
          error: true,
          displayError: true,
          types_of_category: e.types_of_category,
          category_id: category_id,
        }
      } else {
        return {
          question_id: e.question_id,
          errorName: e.errorName,
          field_name: e.field_name,
          error: false,
          displayError: false,
          types_of_category: e.types_of_category,
          category_id: '',
        }
      }
    })

    setSpecificError(select)

    return !checkInput
  }

  // validate finish signup
  const validateFinishSignup = () => {
    return true
  }
  /***
   * Checkbox functionality
   *
   ***/
  // set selected checkbox for common documents
  const handleChangeCommonCheck = (e, questionId) => {
    let selected = JSON.parse(JSON.stringify(commonDocument))
    const document_id = commonDocument.find((e) => e.question_id == questionId)
      ?.document_id
    if (e.target.value == '') {
      let obj = {
        question_id: questionId,
      }
      selected.push(obj)
      setCommonDocument(selected)
    } else if (document_id == undefined) {
      //unchecked if any documents has not saved
      selected = selected.filter((e) => e.question_id !== questionId)
      setCommonDocument(selected)
    }
  }

  // set selected checkbox for category documents
  const handleChangeCheck = (e, questionId, catId) => {
    let selected = JSON.parse(JSON.stringify(selectedDocument))
    const document_id = selectedDocument.find(
      (e) => e.question_id == questionId && e.type_of_category_id == catId,
    )?.document_id

    if (e.target.value == '') {
      let obj = {
        type_of_category_id: catId,
        question_id: questionId,
      }
      selected.push(obj)
      setSelectedDocument(selected)
    } else if (document_id == undefined) {
      //unchecked if any documents has not saved
      selected = selected.filter(
        (e) => e.type_of_category_id !== catId || e.question_id !== questionId,
      )
      setSelectedDocument(selected)
    }
  }

  /***
   * Creating state for common documents and category based documents functionality
   *
   ***/
  //store file field data of common documets
  const handleCommonDataFile = async (file, title, type, question_id) => {

    if(validateFileSize(file.target.files[0])){

    let selected = uploadCommonData
    let obj = {
      id: '',
      title: title,
      answer: 'Yes',
      registration_number: '',
      new_renewal_date: '',
      type: type,
      description: '',
      document_id: '',
      question_id: question_id,
      step2_data: '',
    }

  

    if (file.length !== 0) {
      obj.document_id = file.target.files[0]
      let filteredSelected = uploadCommonData.filter(
        (e) => e.question_id == question_id,
      )
      selected = selected.filter((e) => e.question_id !== question_id)
       
      if (filteredSelected?.length > 0) {
        obj.new_renewal_date = filteredSelected[0].new_renewal_date
        obj.id = filteredSelected[0].id
        obj.registration_number = filteredSelected[0].registration_number
        obj.description = filteredSelected[0].description
        obj.step2_data = ''
      }

      selected.push(obj)
   
    }

    setuploadCommonData(selected)
  }
  }
  const validateFileSize=(file)=>{
 
    if(file.size>1048576){
      errorAlert('Maximum size of document should be 1 MB')
      return false
    }else{
      return true
    }
  }
 
  //store input field data of common documets
  const handleCommonDataText = (
    input,
    field_name,
    question_id,
    field_type,
    question_title,
    doc_type,
  ) => {
    let selected = uploadCommonData
    let obj = {
      id: '',
      title: question_title,
      answer: 'Yes',
      registration_number: field_name == 'registration_number' ? input : '',
      new_renewal_date:
        field_name == 'new_renewal_date'
          ? moment(input).format('YYYY-MM-DD')
          : '',
      type: doc_type,
      description: field_name == 'description' ? input : '',
      document_id: '',
      question_id: question_id,
    }

    if (field_type == 'radio') {
      obj.answer = input
      obj.title = question_title
      obj.type = field_name
    }

    let ERRORS = JSON.parse(JSON.stringify(commonError))

    ERRORS = ERRORS.map((e) => {
      if (e.question_id == question_id && input == '') {
        return {
          question_id: e.question_id,
          errorName: e.errorName,
          field_name: e.field_name,
          error: true,
          displayError: true,
        }
      } else {
        return {
          question_id: e.question_id,
          errorName: e.errorName,
          field_name: e.field_name,
          error: false,
          displayError: false,
        }
      }
    })

    setCommonError(ERRORS)

    if (input !== '' || input !== undefined) {
      let filteredSelected = uploadCommonData.filter(
        (e) => e.question_id == question_id,
      )

      selected = selected.filter((e) => e.question_id !== question_id)

      if (filteredSelected?.length > 0) {
        obj.document_id = filteredSelected[0]?.document_id

        obj.id = filteredSelected[0]?.id
        obj.type = filteredSelected[0]?.type
        obj.title = filteredSelected[0]?.title
      }

      selected.push(obj)
    }
    setuploadCommonData(selected)
    setRadioData(selected)
  }

  //store documents file  data of category
  const handleSpecificDataFile = async (
    file,
    question,
    type,
    question_id,
    type_of_category_id,
    trader_setting_id,
  ) => {

    if(validateFileSize(file.target.files[0])){

    let selected = uploadSpecificData
    let obj = {
      trader_id: id,
      trader_setting_id: trader_setting_id,
      title: question,
      answer: 'Yes',
      description: '',
      doc_type: type,
      document_id: file.target.files[0],
      question_id: question_id,
      type_of_category_id: type_of_category_id,
    }

    if (file.length !== 0) {
      let filteredSelected = uploadSpecificData.find(
        (e) =>
          e.question_id == question_id &&
          e.type_of_category_id == type_of_category_id,
      )
      selected = selected.filter(
        (e) =>
          e.question_id !== question_id ||
          e.type_of_category_id !== type_of_category_id,
      )

      if (filteredSelected !== undefined) {
        obj.description = filteredSelected.description
      }
      selected.push(obj)
    }
    setuploadSpecificData(selected)
  }
  }

  //store input field data of category documets
  const handleSpecificDataText = (
    input,
    field_name,
    question_id,
    type_of_category_id,
    title,
    trader_setting_id,
    doc_type,
  ) => {
    let selected = uploadSpecificData
    let obj = {
      trader_id: id,
      trader_setting_id: '',
      title: title,
      answer: 'Yes',

      description:
        field_name == 'date' ? moment(input).format('YYYY-MM-DD') : input,
      doc_type: doc_type,
      document_id: '',
      question_id: question_id,
      type_of_category_id: type_of_category_id,
      trader_setting_id: trader_setting_id,
    }

    let ERRORS = JSON.parse(JSON.stringify(specificError))
    const regex = new RegExp(/^[a-zA-Z0-9]+$/)
    let checkRegex = true
    if (input !== '') {
      checkRegex = regex.test(input)
    }

    ERRORS = ERRORS.map((e) => {
      if (
        e?.question_id == question_id &&
        input == '' &&
        e?.types_of_category.includes(type_of_category_id)
      ) {
        return {
          question_id: e.question_id,
          errorName: e.errorName,
          field_name: e.field_name,
          error: true,
          displayError: true,
          types_of_category: e.types_of_category,
        }
      } else {
        return {
          question_id: e.question_id,
          errorName: e.errorName,
          field_name: e.field_name,
          error: false,
          displayError: false,
          types_of_category: e.types_of_category,
        }
      }
    })

    setSpecificError(ERRORS)

    if (input !== '' || input !== undefined) {
      let filteredSelected = uploadSpecificData.find(
        (e) =>
          e.question_id == question_id &&
          e.type_of_category_id == type_of_category_id,
      )

      selected = selected.filter(
        (e) =>
          e.question_id !== question_id ||
          e.type_of_category_id !== type_of_category_id,
      )

      if (filteredSelected !== undefined) {
        obj.doc_type = filteredSelected.doc_type
        obj.document_id = filteredSelected.document_id
      }

      selected.push(obj)
    }

    setuploadSpecificData(selected)
  }

  /***
   * update states for common and category based documents data functionality
   *
   ***/

  useEffect(() => {
    if (Object.keys(documentList)?.length > 0) {
      // document required list
      const doclist = JSON.parse(
        JSON.stringify(documentList?.types_of_document),
      )
      if (Object.keys(allDocuments?.trader_common_documents)?.length > 0) {
        //common document saved list
        const selectCommon = JSON.parse(
          JSON.stringify(allDocuments?.trader_common_documents),
        )
        let questionArr = []
        selectCommon.forEach((common) => {
          doclist.forEach(
            //document list
            (list) => {
              list?.name?.forEach(
                //question list

                (question) => {
                  //answer list
                  let typeFIlter = question?.answer?.find(
                    (doc_type) =>
                      //check for document type exists
                      doc_type?.doc_type == common?.type,
                  )
                  let is_radio = false
                  if (question?.answer?.length == 1) {
                    is_radio = true
                    typeFIlter = question?.answer?.find(
                      (radio) =>
                        //check for radio type exists
                        radio?.field_name == common?.type,
                    )
                  }

                  if (typeFIlter !== undefined) {
                    const obj = {
                      id: common.id,
                      question_id: question.id,
                      type: !is_radio
                        ? typeFIlter.doc_type
                        : typeFIlter.field_name,
                      document_id: !is_radio
                        ? common.document_id !== null
                          ? common.document_id
                          : ''
                        : '',
                      answer: common.answer,
                      title: question.question,
                      description:
                        common.description !== null ? common.description : '',
                      registration_number:
                        common.registration_number !== null
                          ? common.registration_number
                          : '',
                      new_renewal_date:
                        common.new_renewal_date !== null
                          ? common.new_renewal_date
                          : '',
                      file_name: common.document?.file_name,
                      step2_data: common?.step2_data,
                    }
                    questionArr.push(obj)
                  }
                },
              )
            },
          )
        })
        //set checkbox selected
        setRadioData(questionArr)
        setCommonDocument(questionArr)
        //set saved common data
        setuploadCommonData(questionArr)
      }

      if (Object.keys(allDocuments?.trader_category_documents)?.length > 0) {
        //category document saved list
        const selectCategory = JSON.parse(
          JSON.stringify(allDocuments?.trader_category_documents),
        )
        let questionArr = []
        selectCategory.forEach((specific) => {
          doclist.forEach(
            //document list
            (list) => {
              list?.type == 'specific' &&
                list?.types_of_category.includes(
                  specific.type_of_category_id,
                ) &&
                list?.name?.forEach(
                  //question list

                  (question) => {
                    //answer list

                    question?.answer?.forEach((ans) => {
                      specific?.documents?.forEach((saved_document) => {
                        //check for document type exists
                        let check_exists = questionArr?.some(
                          (existId) =>
                            existId?.title == saved_document.title &&
                            existId?.document_id ==
                              saved_document.document_id?.id,
                        )
                        if (
                          ans?.doc_type === saved_document?.doc_type &&
                          !check_exists
                        ) {
                          const obj = {
                            doc_type: saved_document.doc_type,
                            title: saved_document.title,
                            answer: saved_document.answer,
                            description: saved_document.description,
                            document_id:
                              saved_document.document_id !== null
                                ? saved_document.document_id?.id
                                : '',
                            question_id: question.id,
                            trader_id: id,
                            type_of_category_id: specific.type_of_category_id,
                            trader_setting_id: specific.id,
                            file_name: saved_document.document_id?.file_name,
                          }
                          questionArr.push(obj)
                        }
                      })
                    })
                  },
                )
            },
          )
        })
        //set checkbox selected
        setSelectedDocument(questionArr)
        //set saved specific data
        setuploadSpecificData(questionArr)
      }
    }
  }, [allDocuments])

  /***
   * Render image  to the DOM functionality
   *
   ***/

  useEffect(() => {
    //update common image saving data
    if (Object.keys(documents).length > 0) {
      //update document_id
      let tempCommonData = JSON.parse(JSON.stringify(uploadCommonData))

      tempCommonData = tempCommonData.map((ele) => {
        if (ele.question_id == commonSavingBtn?.question_id) {
          return {
            answer: ele.answer,
            description: ele.description,
            document_id:
              documents.document_id !== null ? documents.document_id : '',
            file_name:
              documents?.document !== null
                ? documents?.document?.file_name
                : '',
            id: ele.id,
            new_renewal_date: ele.new_renewal_date,
            question_id: ele.question_id,
            registration_number: ele.registration_number,
            title: ele.title,
            type: ele.type,
            step2_data: ele?.step2_data,
          }
        } else {
         
          if(typeof (ele?.document_id)=='object'){
            ele.document_id=''
        
          }
          return ele
        }
      })

      setuploadCommonData(tempCommonData)

      let selectedCommon = JSON.parse(JSON.stringify(commonDocument))
      selectedCommon = selectedCommon.map((e) =>
        e.question_id == commonSavingBtn?.question_id &&
        commonSavingBtn?.doc_type == documents.type
          ? {
              document_id:
                documents.document_id !== null ? documents.document_id : '',
              question_id: e.question_id,
              file_name: documents?.document?.file_name,
              id: documents.id,
            }
          : e,
      )

      setCommonDocument(selectedCommon)
    }
    //update spicific image saving data
    if (Object.keys(specificDocuments).length > 0) {
      //update document_id and file name

      let tempUploadData = JSON.parse(JSON.stringify(uploadSpecificData))

     
      tempUploadData=tempUploadData?.map((e)=>{
        if(typeof (e?.document_id)=='object'){
          e.document_id=''
          return e
        }else{
          return e
        }
      })
    

      let index = tempUploadData.findIndex(
        (ele) =>
          ele.type_of_category_id == specificSavingBtn?.category_id &&
          ele?.question_id == specificSavingBtn?.question_id,
      )
      let result = tempUploadData.find(
        (ele) =>
          ele.type_of_category_id == specificSavingBtn?.category_id &&
          ele?.question_id == specificSavingBtn?.question_id,
      )

      let modifiedData = {
        ...result,
        document_id:
          specificDocuments.documents['0']?.document_id !== null
            ? specificDocuments.documents['0']?.document_id?.id
            : '',
        file_name:
          specificDocuments.documents['0']?.document_id !== null
            ? specificDocuments.documents['0']?.document_id?.file_name
            : '',
      }

      tempUploadData.splice(index, 1, modifiedData)

      

      setuploadSpecificData(tempUploadData)

      let selectedSpecific = JSON.parse(JSON.stringify(selectedDocument))
      selectedSpecific = selectedSpecific.map((e) =>{
        if( e.question_id == specificSavingBtn.question_id &&
          e.type_of_category_id == specificDocuments?.type_of_category_id &&
          specificSavingBtn.doc_type == specificDocuments?.documents[0].doc_type){
            return {
              document_id:
                specificDocuments?.documents[0].document_id !== null
                  ? specificDocuments?.documents[0]?.document_id?.id
                  : '',
              question_id: e.question_id,
              type_of_category_id: e.type_of_category_id,
              description: specificDocuments?.documents[0].description,
              file_name:
                specificDocuments?.documents[0]?.document_id?.file_name,
            }
          }else{
           
            return e
          }
      }

        // e.question_id == specificSavingBtn.question_id &&
        // e.type_of_category_id == specificDocuments?.type_of_category_id &&
        // specificSavingBtn.doc_type == specificDocuments?.documents[0].doc_type
        //   ? {
        //       document_id:
        //         specificDocuments?.documents[0].document_id !== null
        //           ? specificDocuments?.documents[0]?.document_id?.id
        //           : '',
        //       question_id: e.question_id,
        //       type_of_category_id: e.type_of_category_id,
        //       description: specificDocuments?.documents[0].description,
        //       file_name:
        //         specificDocuments?.documents[0]?.document_id?.file_name,
        //     }
        //   :       e,
      )
      setSelectedDocument(selectedSpecific)
    }
    //reset disabled button for common upload
    if (!isAddingDocument) {
      setCommonSavingBtn('')
    }
    //reset disabled button for specific file upload
    if (!isAddingSpecific) {
      setSpecificSavingBtn({})
    }
  }, [isAddingDocument, isAddingSpecific, documents, specificDocuments])
  /***
   * Render input field values to the DOM functionality
   *
   ***/

  //return saved field value for common documets
  const findFieldValue = (question_id, field_type, category_id) => {
    if (category_id !== undefined) {
      const filterValue = uploadSpecificData.find(
        (e) =>
          e.question_id == question_id && e.type_of_category_id == category_id,
      )
      return filterValue?.description
    }
    const filterValue = uploadCommonData.find(
      (e) => e.question_id == question_id,
    )
    if (field_type == 'registration_number') {
      return filterValue?.registration_number
    }
    if (field_type == 'description') {
      return filterValue?.description
    }
    if (field_type == 'new_renewal_date') {
      return filterValue?.new_renewal_date
    }
  }

  const findBusinessRegistration = (question_id, field_type, category_id) => {
    const filterValue = uploadCommonData.find(
      (e) => e.question_id == question_id,
    )
    if (field_type == 'registration_number') {
      return filterValue?.step2_data
    }
  }

  /***
   * Page routing functionality
   *
   ***/
  // route to previous page
  const goBack = () => {
    disableAdding(false)
    Router.push(`/trader-signup/${id}/postcode`)
  }

  useEffect(() => {
    if (finishSignup?.code === 200) {
      // window.location.href = `${process.env.NEXT_PUBLIC_TRADER_PORTAL}`
      Router.push(`/thank-you`)
    }
  }, [finishSignup])

  useEffect(() => {
    validateDocumentPresent()
  }, [uploadSpecificData])

  useEffect(() => {
    validateCommonDocument()
  }, [uploadCommonData, commonDocument])

  const validateDocumentPresent = (currentFile, questionId) => {
    let isFilePresent = false
    let file = uploadSpecificData?.find(
      (ele) =>
        ele?.type_of_category_id === currentFile?.type_of_category?.id &&
        ele?.question_id === questionId,
    )
    if (file && file?.document_id) {
      isFilePresent = true
    } else if (file?.document_id === '' && file?.file_name === undefined) {
      isFilePresent = false
    }

    return isFilePresent
  }

  const fileNameGenerator = (currentFile, questionId, categoryId) => {
    let fileName = ''
    let file = uploadSpecificData?.find(
      (ele) =>
        ele?.type_of_category_id === currentFile?.type_of_category?.id &&
        ele?.question_id === questionId,
    )
    if (typeof file?.document_id === 'object') {
      fileName = file?.document_id?.name
    } else if (file && file?.file_name) {
      fileName = file?.file_name
    }

    return fileName
    if (specificSavingBtn?.question_id !== questionId) {
      return fileName
    } else {
      return ''
    }
    // return fileName
  }

  const handleRemoveFile = (currentFile, questionId) => {
    let tempUploadData = JSON.parse(JSON.stringify(uploadSpecificData))

    let index = tempUploadData.findIndex(
      (e) =>
        e.type_of_category_id == currentFile?.type_of_category?.id &&
        e?.question_id == questionId,
    )
    let result = tempUploadData.find(
      (e) =>
        e.type_of_category_id == currentFile?.type_of_category?.id &&
        e?.question_id == questionId,
    )

    let modifiedData = {
      ...result,
      document_id: '',
      file_name: '',
    }

    tempUploadData.splice(index, 1, modifiedData)

    // tempUploadData= tempUploadData.map(
    //   (ele)=>{
    //     if(ele.type_of_category_id==currentFile?.type_of_category?.id && ele?.question_id==questionId){
    //       return {
    //         answer:ele.answer,
    //         description:ele.description,
    //         doc_type:ele.doc_type,
    //         document_id:'',
    //         file_name:'',
    //         question_id:ele.question_id,
    //         title:ele.title,
    //         trader_id:ele.trader_id,
    //         trader_setting_id:ele.trader_setting_id,
    //         type_of_category_id:ele.type_of_category_id,
    //       }
    //     }else{
    //       return ele
    //     }

    //   }
    // )

    setuploadSpecificData(tempUploadData)
  }

  const validateCommonDocument = (currentDoc) => {
    let isFilePresent = false
    let file = uploadCommonData?.find(
      (ele) => ele?.question_id === currentDoc?.id,
    )
    if (file && file?.document_id !== '') {
      isFilePresent = true
    } else if (file?.document_id === '' && file?.file_name === undefined) {
      isFilePresent = false
    }

    return isFilePresent
  }

  const commonFileNameGenerator = (currentDoc) => {
    let fileName = ''
    let file = uploadCommonData?.find(
      (ele) => ele?.question_id === currentDoc?.id,
    )
    if (typeof file?.document_id === 'object') {
      fileName = file?.document_id?.name
    } else if (file && file?.file_name) {
      fileName = file?.file_name
    }

    if (commonSavingBtn?.question_id !== currentDoc?.id) {
      return fileName
    } else {
      return ''
    }
  }

  const handleCommonRemoveFile = (currentFile) => {
    let tempCommonData = JSON.parse(JSON.stringify(uploadCommonData))

    tempCommonData = tempCommonData.map((ele) => {
      if (ele.question_id == currentFile.id) {
        return {
          answer: ele.answer,
          description: ele.description,
          document_id: '',
          file_name: '',
          id: ele.id,
          new_renewal_date: ele.new_renewal_date,
          question_id: ele.question_id,
          registration_number: ele.registration_number,
          title: ele.title,
          type: ele.type,
        }
      } else {
        return ele
      }
    })
    setuploadCommonData(tempCommonData)
  }
  useEffect(() => {
    window.addEventListener("beforeunload", (ev) => 
    {  
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });
  }, [])


  return (
    <>
      {loader || isFetchingDocument || isFinishSignup ? (
        <div className={classes.content}>
          <Loader
            active
            inline="centered"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      ) : (
        <>
          {/* <Alerts /> */}
          <section className={` ${classes.container} ${classes.formMinHeight}`}>
            <div className={classes.postcodeContainer}>
              {isSignUpProcessCompleted ? (
                <div className={`${classes.cardWrap} ${classes.cardWrapLg}`}>
                  <div className={classes.cardItem}>
                    <p className={classes.completeText}>
                      Your SingUp process is successfully finished. Your account
                      will be activated soon. Please contact UrbanServe for any
                      assistance. Thanks!
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={`${classes.cardWrap} ${classes.cardWrapLg}`}>
                    <div className={classes.cardItem}>
                      <h4 className={'page_heading'}>Upload Document</h4>
                      <div className={classes.docsCard}>
                        <Grid container spacing={1}>
                          {Object.keys(documentList)?.length > 0 &&
                            documentList?.types_of_document?.map((list, i) => (
                              <>
                                {list?.type == 'common' &&
                                  list?.name?.map((ele) => (
                                    ele?.is_active &&(
                                      <>
                                      <Grid item sm={12} xs={12} key={i}>
                                        <FormGroup>
                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                checked={
                                                  commonDocument.find(
                                                    (e) =>
                                                      e.question_id == ele.id,
                                                  )?.question_id !== undefined
                                                    ? true
                                                    : false
                                                }
                                                value={
                                                  commonDocument.find(
                                                    (e) =>
                                                      e.question_id == ele.id,
                                                  )?.question_id
                                                }
                                                onChange={(v) =>
                                                  handleChangeCommonCheck(
                                                    v,
                                                    ele.id, //question id
                                                  )
                                                }
                                              />
                                            }
                                            label={ele?.question}
                                          />
                                        </FormGroup>
                                      </Grid>
                                      {commonDocument.find(
                                        (e) => e.question_id == ele.id,
                                      )?.question_id &&
                                        ele?.answer?.map((e, j) => (
                                          <>
                                            <Grid
                                              item
                                              md={
                                                e.field_type == 'radio' ? 8 : 4
                                              }
                                              sm={6}
                                              xs={
                                                e.field_type == 'file' ? 6 : 12
                                              }
                                              key={j}
                                              style={{
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                              }}
                                            >
                                              {e.field_type == 'text' && (
                                                <TextField
                                                  name={e.field_name}
                                                  id={e.field_name}
                                                  disabled={
                                                    e.doc_type ==
                                                      'business_registration' &&
                                                    findBusinessRegistration(
                                                      ele.id,
                                                      e.field_name,
                                                    ) == true
                                                      ? true
                                                      : false
                                                  }
                                                  required
                                                  size="small"
                                                  label={e.required_answer}
                                                  type={e.field_type}
                                                  fullWidth
                                                  value={findFieldValue(
                                                    ele.id,
                                                    e.field_name,
                                                  )}
                                                  onChange={(event) => {
                                                    handleCommonDataText(
                                                      event.target.value, //input data
                                                      e.field_name, //field name

                                                      ele?.id, //question id
                                                      e.field_type,
                                                      ele?.question, //question title
                                                      e.doc_type, //document type
                                                    )
                                                  }}
                                                  error={
                                                    commonError.find(
                                                      (e) =>
                                                        e.question_id ==
                                                          ele?.id &&
                                                        e.error == true,
                                                    )?.error
                                                  }
                                                  helperText={
                                                    commonError.find(
                                                      (e) =>
                                                        e.question_id ==
                                                          ele?.id &&
                                                        e.error == true,
                                                    )?.errorName
                                                  }
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                />
                                              )}
                                              {e.field_type == 'date' && (
                                                <TextField
                                                  label={e.required_answer}
                                                  type="date"
                                                  inputProps={{ min:moment().format('YYYY-MM-DD')}}
                                                  key={e.field_name}
                                                  name={e.field_name}
                                                  id={e.field_name}
                                                  error={
                                                    commonError.find(
                                                      (e) =>
                                                        e.question_id ==
                                                          ele?.id &&
                                                        e.error == true,
                                                    )?.error
                                                  }
                                                  helperText={
                                                    commonError.find(
                                                      (e) =>
                                                        e.question_id ==
                                                          ele?.id &&
                                                        e.error == true,
                                                    )?.errorName
                                                  }
                                                  onChange={(value) => {
                                                    handleCommonDataText(
                                                      value.target.value, //input data
                                                      e.field_name, //field name

                                                      ele?.id, //question id
                                                      e.field_type,
                                                      ele?.question, //question title
                                                      e.doc_type, //document type
                                                    )
                                                  }}
                                                  fullWidth
                                                  defaultValue={findFieldValue(
                                                    ele.id,
                                                    e.field_name,
                                                  )}
                                                  className={classes.textField}
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                />
                                              )}

                                              {e.field_type == 'file' && (
                                                <>
                                                  {validateCommonDocument(
                                                    ele,
                                                  ) === true &&
                                                  commonFileNameGenerator(
                                                    ele,
                                                  ) !== undefined ? (
                                                    <div
                                                      style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-end',
                                                      }}
                                                    >
                                                      <p
                                                        className={
                                                          classes.fileNameText
                                                        }
                                                        style={{
                                                          marginRight: '10px',
                                                        }}
                                                      >
                                                        {commonFileNameGenerator(
                                                          ele,
                                                        )?.substr(0, 15) +
                                                          '...'}
                                                      </p>

                                                      <img
                                                        width="16px"
                                                        height="16px"
                                                        src="/site__main__images/site__close.png"
                                                        alt="Urbanserve Icon"
                                                        onClick={() =>
                                                          handleCommonRemoveFile(
                                                            ele,
                                                          )
                                                        }
                                                        style={{
                                                          cursor: 'pointer',
                                                        }}
                                                      />
                                                    </div>
                                                  ) : (
                                                    <input
                                                      className={
                                                        classes.fileButton
                                                      }
                                                      type="file"
                                                      accept="image/*,application/pdf,application/vnd.ms-excel,application/msword"
                                                      onChange={(file) => {
                                                        handleCommonDataFile(
                                                          file, //file data
                                                          ele?.question, //question title
                                                          e.doc_type, //document type
                                                          ele?.id, //question id
                                                        )
                                                      }}
                                                    ></input>
                                                  )}
                                                </>
                                              )}
                                              {e.field_type == 'radio' && (
                                                <RadioGroup
                                                  row
                                                  aria-label="position"
                                                  name={e.field_name}
                                                  onChange={(event) => {
                                                    handleCommonDataText(
                                                      event.target.value, //input data
                                                      e.field_name, //field name

                                                      ele?.id, //question id
                                                      e.field_type,
                                                      ele?.question, //question title
                                                    )
                                                    saveRadioData(
                                                      event.target.value, //input data
                                                      e.field_name, //field name

                                                      ele?.id, //question id
                                                      e.field_type,
                                                      ele?.question, //question title
                                                    )
                                                  }}
                                                >
                                                  <FormControlLabel
                                                    value="Yes"
                                                    control={
                                                      <Radio
                                                        checked={
                                                          uploadCommonData.find(
                                                            (data) =>
                                                              data?.question_id ==
                                                              ele?.id,
                                                          )?.answer == 'Yes'
                                                        }
                                                      />
                                                    }
                                                    label="Yes"
                                                    labelPlacement="end"
                                                  />
                                                  <FormControlLabel
                                                    value="No"
                                                    control={
                                                      <Radio
                                                        checked={
                                                          uploadCommonData.find(
                                                            (data) =>
                                                              data?.question_id ==
                                                              ele?.id,
                                                          )?.answer == 'No'
                                                        }
                                                      />
                                                    }
                                                    label="No"
                                                    labelPlacement="end"
                                                  />
                                                </RadioGroup>
                                              )}
                                            </Grid>
                                          </>
                                        ))}
                                      {commonDocument.find(
                                        (e) => e.question_id == ele.id,
                                      )?.question_id &&
                                        ele?.answer[0]?.field_type !==
                                          'radio' && (
                                          <div
                                            style={{
                                              display: 'flex',
                                              gap: '20px',
                                              alignItems: 'flex-end',
                                              paddingBottom: 6,
                                              paddingLeft: '4px',
                                              paddingTop: '6px',
                                            }}
                                          >
                                            {commonDocument.find(
                                              (e) => e.question_id == ele.id,
                                            )?.file_name !== undefined && (
                                              <>
                                                <span
                                                  className={classes.wordBreak}
                                                >
                                                  {commonDocument
                                                    .find(
                                                      (e) =>
                                                        e.question_id == ele.id,
                                                    )
                                                    ?.file_name?.substr(0, 15) +
                                                    '...'}
                                                </span>
                                              </>
                                            )}

                                            <Button
                                              type="button"
                                              className={`us_btn`}
                                              onClick={() => {
                                                let type =
                                                  ele?.answer[0]?.field_type
                                                uploadFile(ele.id, type)
                                              }}
                                              disabled={
                                                commonSavingBtn?.question_id ==
                                                  ele.id && isAddingDocument
                                              }
                                            >
                                              {commonSavingBtn?.question_id ==
                                                ele.id && isAddingDocument
                                                ? 'Submitting'
                                                : 'Submit'}
                                            </Button>
                                          </div>
                                        )}






                                    </>

                                    )
                                      
                         
                                  ))}
                              </>
                            ))}
                        </Grid>
                      </div>
                      <Grid item sm={12}>
                        <div className={classes.root}>
                          {Object.keys(documentList)?.length > 0 &&
                            documentList?.category_list?.map((ele, i) => (


                              ele?.type_of_category !== null && (
                                <Accordion
                                  key={i}
                                  elevation={0}
                                  classes={{
                                    root: classes.MuiAccordionroot,
                                  }}
                                >
                                  <AccordionSummary expandIcon={<AccordIcon />}>
                                    <Typography className={classes.heading}>
                                      {ele?.type_of_category?.name
                                        ?.split('is_')
                                        .join('')
                                        .split('_')
                                        .join(' ')}
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails
                                    style={{display: 'block', width: '100%'}}
                                  >
                                    <div
                                      style={{display: 'block', width: '100%'}}
                                    >
                                      <Grid container spacing={1}>
                                        {documentList?.types_of_document?.map(
                                          (element, i) =>
                                            element.types_of_category.includes(
                                              ele.type_of_category?.id,
                                            ) &&
                                            element?.type == 'specific' &&
                                            element.name?.map((q, j) => (
                                              <>
                                                <Grid
                                                  item
                                                  sm={12}
                                                  xs={12}
                                                  key={j}
                                                >
                                                  <FormGroup>
                                                    <FormControlLabel
                                                      control={
                                                        <Checkbox
                                                          checked={
                                                            selectedDocument.find(
                                                              (e) =>
                                                                e.type_of_category_id ==
                                                                  ele
                                                                    .type_of_category
                                                                    .id &&
                                                                e.question_id ==
                                                                  q.id,
                                                            )
                                                              ?.type_of_category_id !==
                                                            undefined
                                                              ? true
                                                              : false
                                                          }
                                                          value={
                                                            selectedDocument.find(
                                                              (e) =>
                                                                e.type_of_category_id ==
                                                                  ele
                                                                    .type_of_category
                                                                    .id &&
                                                                e.question_id ==
                                                                  q.id,
                                                            )
                                                              ?.type_of_category_id
                                                          }
                                                          onChange={(v) =>
                                                            handleChangeCheck(
                                                              v,
                                                              q.id, //question id
                                                              ele
                                                                .type_of_category
                                                                .id, //category id
                                                            )
                                                          }
                                                        />
                                                      }
                                                      label={q.question}
                                                    />
                                                  </FormGroup>
                                                </Grid>
                                                {selectedDocument.find(
                                                  (e) =>
                                                    e.type_of_category_id ==
                                                      ele.type_of_category.id &&
                                                    e.question_id == q.id,
                                                )?.question_id &&
                                                  q?.answer?.map((e, k) => (
                                                    <>
                                                      <Grid
                                                        item
                                                        md={4}
                                                        sm={6}
                                                        xs={
                                                          e.field_type == 'file'
                                                            ? 6
                                                            : 12
                                                        }
                                                        key={k}
                                                        style={{
                                                          display: 'flex',
                                                          alignItems:
                                                            'flex-end',
                                                        }}
                                                      >
                                                        {e.field_type ==
                                                          'text' && (
                                                          <TextField
                                                            required
                                                            size="small"
                                                            label={
                                                              e.required_answer
                                                            }
                                                            key={e.field_name}
                                                            name={e.field_name}
                                                            id={e.field_name}
                                                            margin="normal"
                                                            type={e.field_type}
                                                            fullWidth
                                                            value={findFieldValue(
                                                              q?.id, //question id
                                                              e.field_name, //field name
                                                              ele
                                                                .type_of_category
                                                                .id, //category id
                                                            )}
                                                            onChange={(
                                                              event,
                                                            ) => {
                                                              handleSpecificDataText(
                                                                event.target
                                                                  .value, //input data
                                                                e.field_name, //field name

                                                                q?.id, //question id
                                                                ele
                                                                  .type_of_category
                                                                  .id, //category id
                                                                q?.question, //question title
                                                                ele.id, //trader setting id
                                                                e.doc_type, //document type
                                                              )
                                                            }}
                                                            error={
                                                              specificError.find(
                                                                (e) =>
                                                                  e.question_id ==
                                                                    q?.id &&
                                                                  e.error ==
                                                                    true &&
                                                                  e.types_of_category?.includes(
                                                                    ele
                                                                      .type_of_category
                                                                      .id,
                                                                  ) == true &&
                                                                  ele
                                                                    .type_of_category
                                                                    .id ==
                                                                    e?.category_id,
                                                              )?.error
                                                            }
                                                            helperText={
                                                              specificError.find(
                                                                (e) =>
                                                                  e.question_id ==
                                                                    q?.id &&
                                                                  e.error ==
                                                                    true &&
                                                                  e.types_of_category?.includes(
                                                                    ele
                                                                      .type_of_category
                                                                      .id,
                                                                  ) == true &&
                                                                  ele
                                                                    .type_of_category
                                                                    .id ==
                                                                    e?.category_id,
                                                              )?.errorName
                                                            }
                                                            InputLabelProps={{
                                                              shrink: true,
                                                            }}
                                                          />
                                                        )}

                                                        {e.field_type ==
                                                          'date' && (
                                                          <TextField
                                                            label={
                                                              e.required_answer
                                                            }
                                                            type="date"
                                                            inputProps={{ min:moment().format('YYYY-MM-DD')}}
                                                            key={e.field_name}
                                                            name={e.field_name}
                                                            id={e.field_name}
                                                            error={
                                                              specificError.find(
                                                                (e) =>
                                                                  e.question_id ==
                                                                    q?.id &&
                                                                  e.error ==
                                                                    true &&
                                                                  e.types_of_category?.includes(
                                                                    ele
                                                                      .type_of_category
                                                                      .id,
                                                                  ) == true &&
                                                                  ele
                                                                    .type_of_category
                                                                    .id ==
                                                                    e?.category_id,
                                                              )?.error
                                                            }
                                                            helperText={
                                                              specificError.find(
                                                                (e) =>
                                                                  e.question_id ==
                                                                    q?.id &&
                                                                  e.error ==
                                                                    true &&
                                                                  e.types_of_category?.includes(
                                                                    ele
                                                                      .type_of_category
                                                                      .id,
                                                                  ) == true &&
                                                                  ele
                                                                    .type_of_category
                                                                    .id ==
                                                                    e?.category_id,
                                                              )?.errorName
                                                            }
                                                            fullWidth
                                                            format={
                                                              'yyyy-MM-dd'
                                                            }
                                                            value={findFieldValue(
                                                              q?.id, //question id
                                                              e.field_name, //field name
                                                              ele
                                                                .type_of_category
                                                                .id, //category id
                                                            )}
                                                            onChange={(
                                                              value,
                                                            ) => {
                                                              handleSpecificDataText(
                                                                value.target
                                                                  .value, //input data
                                                                e.field_type, //field type

                                                                q?.id, //question id
                                                                ele
                                                                  .type_of_category
                                                                  .id, //category id
                                                                q?.question, //question title
                                                                ele.id, //trader setting id
                                                                e.doc_type, //document type
                                                              )
                                                            }}
                                                            className={
                                                              classes.textField
                                                            }
                                                            InputLabelProps={{
                                                              shrink: true,
                                                            }}
                                                          />
                                                        )}

                                                        {e.field_type ==
                                                          'file' && (
                                                          <>
                                                            <span
                                                              className={
                                                                classes.textFieldName
                                                              }
                                                            >
                                                              {/* {e.required_answer} */}
                                                            </span>

                                                            {validateDocumentPresent(
                                                              ele,
                                                              q?.id,
                                                            ) === true &&
                                                            fileNameGenerator(
                                                              ele,
                                                              q?.id,
                                                              ele
                                                                .type_of_category
                                                                .id,
                                                            ) !== undefined &&
                                                            (specificSavingBtn?.category_id !==
                                                              ele
                                                                .type_of_category
                                                                .id ||
                                                              specificSavingBtn?.question_id !==
                                                                q?.id) ? (
                                                              <div
                                                                style={{
                                                                  display:
                                                                    'flex',
                                                                  alignItems:
                                                                    'center',
                                                                  paddingBottom: 8,
                                                                }}
                                                              >
                                                                <p
                                                                  className={
                                                                    classes.fileNameText
                                                                  }
                                                                  style={{
                                                                    marginRight:
                                                                      '10px',
                                                                  }}
                                                                >
                                                                  {fileNameGenerator(
                                                                    ele,
                                                                    q?.id,
                                                                    ele
                                                                      .type_of_category
                                                                      .id,
                                                                  )?.substr(
                                                                    0,
                                                                    10,
                                                                  ) + '...'}
                                                                </p>

                                                                <img
                                                                  width="16px"
                                                                  height="16px"
                                                                  src="/site__main__images/site__close.png"
                                                                  alt="Urbanserve Icon"
                                                                  onClick={() =>
                                                                    handleRemoveFile(
                                                                      ele,
                                                                      q?.id,
                                                                    )
                                                                  }
                                                                  style={{
                                                                    cursor:
                                                                      'pointer',
                                                                  }}
                                                                />
                                                              </div>
                                                            ) : (
                                                              <input
                                                                className={
                                                                  classes.fileButton
                                                                }
                                                                accept="image/*,application/pdf,application/vnd.ms-excel,application/msword"
                                                                type="file"
                                                                onChange={(
                                                                  file,
                                                                ) => {
                                                                  handleSpecificDataFile(
                                                                    file, //file data
                                                                    q?.question, //question title
                                                                    e.doc_type, //document type
                                                                    q?.id, //question id,
                                                                    ele
                                                                      .type_of_category
                                                                      .id, //category id
                                                                    ele.id, //trader setting id
                                                                  )
                                                                }}
                                                              ></input>
                                                            )}
                                                          </>
                                                        )}
                                                      </Grid>
                                                    </>
                                                  ))}
                                                {selectedDocument.find(
                                                  (e) =>
                                                    e.type_of_category_id ==
                                                      ele.type_of_category.id &&
                                                    e.question_id == q.id,
                                                )?.question_id && (
                                                  <div
                                                    style={{
                                                      display: 'flex',
                                                      gap: '20px',
                                                      alignItems: 'flex-end',
                                                      paddingBottom: 6,
                                                      paddingLeft: '4px',
                                                      paddingTop: '6px',
                                                    }}
                                                  >
                                                    {selectedDocument.find(
                                                      (e) =>
                                                        e.type_of_category_id ==
                                                          ele.type_of_category
                                                            .id &&
                                                        e.question_id == q.id,
                                                    )?.file_name !==
                                                      undefined && (
                                                      <div>
                                                        <span
                                                          className={
                                                            classes.fileNameText
                                                          }
                                                        >
                                                          {selectedDocument
                                                            .find(
                                                              (e) =>
                                                                e.type_of_category_id ==
                                                                  ele
                                                                    .type_of_category
                                                                    .id &&
                                                                e.question_id ==
                                                                  q.id,
                                                            )
                                                            ?.file_name?.substr(
                                                              0,
                                                              10,
                                                            ) + '...'}
                                                        </span>
                                                      </div>
                                                    )}
                                                    <div>
                                                      <Button
                                                        type="button"
                                                        className={`us_btn`}
                                                        onClick={() =>
                                                          uploadSpecificFile(
                                                            q.id,
                                                            ele.type_of_category
                                                              .id,
                                                          )
                                                        }
                                                        disabled={
                                                          specificSavingBtn?.category_id ==
                                                            ele.type_of_category
                                                              .id &&
                                                          specificSavingBtn?.question_id ==
                                                            q?.id &&
                                                          isAddingSpecific
                                                        }
                                                      >
                                                        {specificSavingBtn?.category_id ==
                                                          ele.type_of_category
                                                            .id &&
                                                        specificSavingBtn?.question_id ==
                                                          q?.id &&
                                                        isAddingSpecific
                                                          ? 'Submitting'
                                                          : 'Submit'}
                                                      </Button>
                                                    </div>
                                                  </div>
                                                )}
                                              </>
                                            )),
                                        )}
                                      </Grid>
                                    </div>
                                  </AccordionDetails>
                                </Accordion>


                              )
                            ))
                            }
                        </div>
                      </Grid>
                    </div>

                    <div className={classes.bntFullContainer}>
                      <Button
                        style={{marginRight: '10px'}}
                        type="button"
                        className={`us_btn`}
                        onClick={() => {
                          goBack()
                        }}
                      >
                        <img
                          style={{marginLeft: '0px', marginRight: '7px'}}
                          className={classes.btnimg}
                          src={
                            '/site__main__images/site__chevron__left__light.png'
                          }
                        />
                        Back
                      </Button>
                      <Button type="submit" className={`us_btn`}>
                        Finish Signup
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </section>
          <div className="site__footer">
          <SiteFooter />
          </div>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  isAddingDocument: state.TraderReducer?.isAddingDocument,
  documents: state.TraderReducer?.documents,
  isFetchingDocument: state.TraderReducer?.isFetchingDocument,
  documentList: state.TraderReducer?.documentList,
  isAddingSpecific: state.TraderReducer?.isAddingSpecific,
  specificDocuments: state.TraderReducer?.specificDocuments,
  isAllDocuments: state.TraderReducer?.isAllDocuments,
  allDocuments: state.TraderReducer?.allDocuments,
  isFinishSignup: state.TraderReducer?.isFinishSignup,
  finishSignup: state.TraderReducer?.finishSignup,
})
function mapDispatchToProps(dispatch) {
  return {
    addDocument: (data) => dispatch(addDocument(data)),
    getDocuments: (data) => dispatch(getDocumentListing(data)),
    errorAlert: (data) => dispatch(errorAlert(data)),
    disableAdding: (data) => dispatch(disableAdding(data)),
    addSpecificDocument: (data) => dispatch(addSpecificDocument(data)),
    getAllDocuments: (data) => dispatch(allDocuments(data)),
    saveFInishData: (data) => dispatch(saveFinishSignup(data)),
    errorAlert: (data) => dispatch(errorAlert(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Documents)
