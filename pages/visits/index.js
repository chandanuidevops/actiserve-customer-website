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
  fetchVisits
}) {

  const { isFetchingVisits, visitDetails } = useSelector(
    (state) => state?.VisitDetailsReducer
  );

  useEffect(() => {
    fetchVisits()
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
              <Table.HeaderCell style={styles.tableHead}>Reference Number</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>Visit Schedule</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>Visit Type</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>Status</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>Trader Detail</Table.HeaderCell>
              <Table.HeaderCell style={styles.tableHead}>Staff Detail</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isFetchingVisits ?
              <Table.Row>
                <Table.Cell colSpan="7"><Skeleton /></Table.Cell>
              </Table.Row>
              :
              visitDetails?.data?.length > 0 ?
                visitDetails?.data?.map((row, index) => (
                  <>
                    <Table.Row>
                      <Table.Cell>
                        {
                          row?.reference_number
                        }
                      </Table.Cell>
                      <Table.Cell>
                        {row?.visit_details !== null ? (
                          <>
                            <Chip style={styles.timeChip} label={<>
                              <span>{row?.visit_details?.schedule_date}</span>
                              <p>{row?.visit_details?.start_from_time} - {row?.visit_details?.end_at_time}</p>
                            </>} />
                          </>) : '~'}
                      </Table.Cell>
                      <Table.Cell>
                        {row?.visit_type ? row?.visit_type : '~'}
                      </Table.Cell>
                      <Table.Cell>
                        {row?.status ? row?.status : '~'}
                      </Table.Cell>
                      <Table.Cell>
                        {"~"}
                      </Table.Cell>
                      <Table.Cell>
                        {
                          row?.trader_staff_details !== null ? (
                            `${row?.trader_staff_details?.first_name} ${row?.trader_staff_details?.last_name}`
                          ) : '~'
                        }
                      </Table.Cell>
                    </Table.Row>
                  </>
                ))
                :
                <Table.Row>
                  <Table.Cell>No Visits Found!</Table.Cell>
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

    fetchVisits: (...args) => dispatch(getVisits(...args)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WithAuth(Visits));
