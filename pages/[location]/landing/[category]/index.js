import React, {useState, useEffect} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Router, {useRouter} from 'next/router'
import EndOfTenacy from '../../../../components/landing/EndOfTenacy'
import MobileCarValeting from '../../../../components/landing/MobileCarValeting'
import CarpetCleaning from '../../../../components/landing/CarpetCleaning'
import BoilerService from '../../../../components/landing/BoilerService'
import GutterCleaning from '../../../../components/landing/GutterCleaning'
import InvalidAccess from '../../../../components/InvalidAccess'
import {useMediaQuery} from 'react-responsive'
/* Semantic UI */
const styles = (theme) => ({})

function Slug(props) {
  const router = useRouter()
  const routeArray = [
    'end-of-tenancy-or-deep-cleaning',
    'mobile-car-valeting',
    'carpet-and-upholstery-cleaning',
    'gutter-cleaning',
  ]
  const url = router?.query?.category
  const location = router?.query?.location

  return (
    <>
      {routeArray.indexOf(url) == 0 ? (
        <EndOfTenacy />
      ) : routeArray.indexOf(url) == 1 ? (
        <MobileCarValeting />
      ) : routeArray.indexOf(url) == 2 ? (
        <CarpetCleaning />
      ) : routeArray.indexOf(url) == 3 ? (
        <GutterCleaning />
      ) : (
        <InvalidAccess />
      )}
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(Slug))
