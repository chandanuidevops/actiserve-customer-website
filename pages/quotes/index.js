import React, {lazy, Suspense, useEffect, useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'

import WithAuth from '../../utils/withAuth'
import {Icon, Table} from 'semantic-ui-react'
import Router, {useRouter} from 'next/router'
import Skeleton from 'react-loading-skeleton'
import {Button} from 'semantic-ui-react'
import {
  getQuotes,
  // openQuotesAcceptModal,
} from '../../Stores/QuoteDetails/actions'

const styles = {
  table: {
    padding: '2rem',
  },
  tableHead: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    backgroundColor: 'white',
  },
  textCenter: {
    textAlign: 'center',
  },
}

export function Quotes({
  fetchQuotes,
  //  openQuotesAcceptModal
}) {
  const {isFetchingQuotes, Quotes, isAcceptModalOpen} = useSelector(
    (state) => state?.QuoteDetailsReducer,
  )

  const history = useRouter()

  useEffect(() => {
    fetchQuotes()
  }, [])

  const handleView = (id) => {
    if (id) {
      Router.push(`/quotes/${id}`)
    }
  }

  return (
      <div style={styles.table}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={styles.tableHead}>
                Quote Title
              </Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>
                Quote Description
              </Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>
                Actions
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isFetchingQuotes ? (
              <Table.Row>
                <Table.Cell colSpan="7">
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            ) : Quotes?.data?.length > 0 ? (
              Quotes?.data?.map((row, index) => (
                <>
                  <Table.Row>
                    <Table.Cell>
                      {row?.quote_title ? row?.quote_title : '~'}
                    </Table.Cell>
                    <Table.Cell>
                      {row?.quote_description ? row?.quote_description : '~'}
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => handleView(row?.id)} positive>
                        View
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </>
              ))
            ) : (
              <Table.Row>
                <Table.Cell>No Quotes Found!</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
  )
}

Quotes.propTypes = {}

const mapStateToProps = (state) => ({})

function mapDispatchToProps(dispatch) {
  return {
    fetchQuotes: (...args) => dispatch(getQuotes(...args)),
    // openQuotesAcceptModal: (...args) =>dispatch(openQuotesAcceptModal(...args)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(WithAuth(Quotes))
