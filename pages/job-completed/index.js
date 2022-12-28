import React, { lazy, Suspense, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";

import WithAuth from '../../utils/withAuth';
import {
  Icon, Table
} from 'semantic-ui-react'

import Skeleton from 'react-loading-skeleton';
import { getVisits } from "../../Stores/VisitDetails/actions";
import { Button } from 'semantic-ui-react'
import { Chip } from '@material-ui/core';
import { getjobsCompletedRequest } from "../../Stores/JobsCompleted/actions";
import HelmetComponent from '../../components/Helmet'
const styles = {
  table: {
    padding: '2rem'
  },
  tableHead: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    backgroundColor: "white",
  },
  textCenter: {
    textAlign: 'center',
  },
  timeChip: {
    padding: '1.5rem',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    backgroundColor: '#f1f1f1',
  }
}

export function Visits({
  fetchJobsComplted
}) {

  const { isFetchingJobsCompleted, jobsCompleted } = useSelector(
    (state) => state?.JobsCompletedReducer
  );

  useEffect(() => {
    fetchJobsComplted()
  }, [])


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
      <div style={styles.table}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={styles.tableHead}>Customer</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>House No.</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>Postcode</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>Visit Details</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>Invoice</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isFetchingJobsCompleted ?
              <Table.Row>
                <Table.Cell colSpan="5"><Skeleton /></Table.Cell>
              </Table.Row>
              :
              jobsCompleted?.data?.length > 0 ?
                jobsCompleted?.data?.map((row, index) => (
                  <>
                    <Table.Row>
                      <Table.Cell>
                        {row?.order_details?.customer_details?.customer?.name !== undefined
                          ? row?.order_details?.customer_details?.customer
                            ?.name
                          : "~"}
                      </Table.Cell>
                      <Table.Cell>
                        {row?.order_details?.customer_details
                          ?.customer_address?.house_no !== undefined
                          ? row?.order_details?.customer_details
                            ?.customer_address?.house_no
                          : "~"}
                      </Table.Cell>
                      <Table.Cell>
                        {row?.order_details?.customer_details
                          ?.customer_address?.postcode !== undefined
                          ? row?.order_details?.customer_details
                            ?.customer_address?.postcode
                          : "~"}
                      </Table.Cell>
                      <Table.Cell>
                        {(row?.visit_details?.length > 0 && row?.visit_details !== null && row?.visit_details !== undefined) ? (
                          <>
                            <p><i>#{row?.visit_details?.[0]?.display_id}</i></p>
                            <p><b>Date:</b> {row?.visit_details?.[0]?.schedule_date}</p>
                          </>
                        ) : '~'}
                      </Table.Cell>
                      <Table.Cell>
                        {
                          row?.trader_staff_details !== undefined ? (
                            `${row?.trader_staff_details?.first_name} ${row?.trader_staff_details?.last_name}`
                          ) : '~'
                        }
                      </Table.Cell>
                    </Table.Row>
                  </>
                ))
                :
                <Table.Row>
                  <Table.Cell>No Completed Offers Found!</Table.Cell>
                </Table.Row>
            }
          </Table.Body>
        </Table>
      </div>
      </>
  );
}

Visits.propTypes = {};

const mapStateToProps = (state) => ({

});

function mapDispatchToProps(dispatch) {
  return {

    fetchJobsComplted: (...args) => dispatch(getjobsCompletedRequest(...args)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WithAuth(Visits));
