import React from 'react'
import {Header, Icon, Image, Statistic, Grid, Segment} from 'semantic-ui-react'
import SiteFooter from '../../components/SiteFooter'
import HelmetComponent from '../../components/Helmet'
import SiteNav from '../../components/SiteMain/SiteMainNavbar'

function Terms() {
  const isBrowser = () => typeof window !== 'undefined'

  let link = isBrowser()
    ? `${window.location.hostname}/terms-and-conditions`
    : ''
  return (
    <>
      <HelmetComponent
        title={`UrbanServe | Terms and Conditions`}
        ogTitle={`UrbanServe | Terms and Conditions`}
        description="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogDescription="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogUrl={link}
        createJsonLD={false}
      />
      <SiteNav />
      <section className="us__privacy__wrapper">
        <div className="us__privacy__container site_lg_container">
          <div className="us__privacy__content">
            <h5
              className="privacy__header"
              style={{textAlign: 'center', textDecoration: 'none'}}
            >
              URBANSERVE LTD Terms and Conditions
            </h5>
            <h5 className="privacy__subheader">Definitions</h5>
            <p>
              The following words are defined for the purposes of these Terms
              and Conditions:
            </p>
            <ul className="privacy__dot__list">
              <li>
                Trader – Professionals or professional companies who have agreed
                to carry out work for Customers introduced by UrbanServe LTD
                (‘URBANSERVE’)
              </li>
              <li>
                Customer – a person or persons who engage URBANSERVE to request
                work to be carried out.
              </li>
              <li>
                Website/App/App – The URBANSERVE platform which contains
                descriptions of work available allowing Customers to book a
                Service and Traders to respond.{' '}
              </li>
              <li>
                Service – The work which is to be carried out as per the
                corresponding description on the Website/App.{' '}
              </li>
              <li> Quote – The details and costs of a specific Service.</li>
            </ul>
            <h5 className="privacy__subheader">Terms and Conditions</h5>
            <ul className="privacy__num__list">
              <li>
                1. These Terms and Conditions apply to the provision of the
                Service detailed on the URBANSERVE Website/App and Service
                contracts
              </li>
              <li>
                2. URBANSERVE is a private company registered at Companies House
                with number 13873432 and registered office address 12 St. Helens
                Close, Leicester, LE4 0GR.
              </li>
              <li>
                3. URBANSERVE is an introductory agency and is not involved in
                the day-to-day activities of the Traders and is therefore not
                regulated by the Chartered Institute of Trading Standards.
                <ol className="privacy__child__list">
                  <li>
                    Traders shall be responsible for supplying all materials,
                    tools, manpower and anything else which may be needed in
                    order to complete a Quote.
                  </li>
                  <li>
                    Customers shall be responsible for ensuring their property
                    is fit for purpose.
                  </li>
                </ol>
              </li>
              <li>
                4. URBANSERVE may change the features of our Services from time
                to time and these terms from time to time. If a revision is
                material, we may (but are not obliged to) notify you. If you
                continue to use URBANSERVE Services after notification of any
                revisions that take effect, then you will be considered to have
                agreed to the revised terms.
              </li>
            </ul>
            <h5 className="privacy__subheader">Website/App/App</h5>
            <ul className="privacy__num__list">
              <li>
                5. The description of any Service introduced by URBANSERVE is
                clearly set out on the Website/App and further details are given
                once a Service is selected and are subject to availabiulty.
              </li>
              <li>
                6. The descriptions of the Services on the Website/App do not
                constitute a contractual offer to sell the Services. When an
                order is placed on our Website/App, URBANSERVE reserves the
                right to reject it for any reason, although we will endeavor to
                inform you of the reasoning without delay
              </li>
              <li>
                7. A contract shall be formed for the Service ordered only when
                you receive an email with your order confirmation, together with
                the Quote and shall continue for as long as the Service takes
                for completion or the contract is terminated due to a breach of
                these Terms and Conditions.
                <ul className="privacy__child__list">
                  <li>
                    a) Each party acknowledges and agrees that once the Quote
                    has been agreed and sent together with the order
                    confirmation, no party shall have a remedy in respect of any
                    statement, representation, undertaking or warranty, whether
                    in writing or oral, save as expressly set out in these Terms
                    and Conditions or the Quote.{' '}
                  </li>
                  <li>
                    b) Nothing in this clause shall limit or exclude liability
                    for fraud.
                  </li>
                </ul>
              </li>
              <li>
                8. Correct information must be provided for the Traders to fully
                understand the Service and for Customers to fully appreciate the
                scope of the Service and the effect this will have on their
                property.
                <ul className="privacy__child__list">
                  <li>
                    Any information found to be deliberately supplied, which is
                    known to be incorrect by the information supplier, shall
                    lead to prosecution for fraud.
                  </li>
                  <li>
                    URBANSERVE shall not tolerate willful misconduct in any form
                    and will review all such situations with a view to
                    commencing legal proceedings for damages due to time lost
                    and work wasted.
                  </li>
                </ul>
              </li>
              <li>
                9. The Website/App is used at the Customer’s/Trader’s own risk
                and there is no guarantee that the Website/App will work
                optimally or not be subject to downtime or removed from service
                at any point in time.
              </li>
              <li>
                10. In order to maintain high levels of response times,
                URBANSERVE may, from time to time make use of a ‘mystery
                shopper’ to gauge response times and general quality levels of
                interaction.
              </li>
              <li>
                11. No party shall attempt to contact any other party introduced
                by URBANSERVE privately in order to obtain or request work.
                <ul className="privacy__child__list">
                  <li>
                    Any party found to have solicited any other party introduced
                    by URBANSERVE shall be liable to pay the corresponding fee
                    in the annexed Fees Schedule.{' '}
                  </li>
                  <li>
                    All Services shall be agreed through the URBANSERVE
                    Website/App.{' '}
                  </li>
                </ul>
              </li>
            </ul>
            <h5 className="privacy__subheader">Cancellations and Variations</h5>
            <ul className="privacy__num__list">
              <li>
                12. Any quotation or estimate of Fees for Services with special
                requirements shall be valid for <b>14 days</b> from the Quote
                being supplied.
              </li>
              <li>
                13. Should you require a variation to the Service, which has
                already been accepted by both Trader and Customer, this may lead
                to additional charges as shown on the Fees Schedule annexed to
                these Terms and Conditions.
              </li>
              <li>
                14. A Trader may reasonably alter a Quote and the Customer will
                be informed of this without delay and have the option to accept
                or decline the amendment.{' '}
              </li>
              <li>
                15. Should either Trader or Customer cancel a Service, they may
                be liable to pay cancellation fees shown on the Fees Schedule
                annexed to these Terms and Conditions.
              </li>
              <li>
                16. Should a Service be re-scheduled by the Trader or Customer,
                they may be liable pay a fee associated with the annexed Fees
                Schedule.{' '}
              </li>
              <li>
                17. Should a Trader fail to complete a Service which they have
                accepted and has been agreed by the Customer, the Trader may be
                liable to pay a fee shown in the annexed Fees Schedule.{' '}
              </li>
              <li>
                18. All fees shown in the annexed Fees Schedule shall be applied
                to the circumstance giving rise to a fee and shall be determined
                at the reasonable discretion of URBANSERVE
                <ul className="privacy__child__list">
                  <li>
                    Any use of the Website/App is considered to be acceptance of
                    the Fees Schedule.
                  </li>
                </ul>
              </li>
              <li>
                19. None of the parties shall be entitled to assign any Quotes
                or any part of these Terms and Conditions or any service
                contracts, to any person, persons or company without prior
                written consent of all parties involved, including URBANSERVE.{' '}
              </li>
            </ul>
            <h5 className="privacy__subheader">Vetting of Traders</h5>
            <ul className="privacy__num__list">
              <li>
                20. URBANSERVE will make reasonable effort to check the identity
                and information provided by Traders. This includes visual or
                online checks of passports/identity cards to confirm identity
                and right to live and work in the UK including stated
                qualifications and training certificates where available.
              </li>
              <li>
                21. All Traders working through the Website/App shall be covered
                by public liability insurance at their own expense. Customers
                should check if their own insurance allows for Traders to work
                on their property.
              </li>
              <li>
                22. All Traders shall be subjected to DBS checks prior to
                engaging in any Services through URBANSERVE.
              </li>
              <li>
                23. Traders will be asked to provide proof of their vaccination
                status and basic information will be displayed on the
                Website/App in the form of confirmation of which stage
                vaccination the Traders have received (1st, 2nd, Booster).
              </li>
            </ul>
            <h5 className="privacy__subheader">Liability</h5>
            <ul className="privacy__num__list">
              <li>
                24. URBANSERVE shall not have any liability for losses or
                damages caused by the unavailability of service, technical
                errors or use of the Website/App outside of the intended
                purpose.
              </li>
              <li>
                25. URBANSERVE shall have no liability for any losses, injury,
                accidents, claims or damages arising from the use of the
                Website/App or it’s Traders, whether direct or indirect.
              </li>
              <li>
                26. Any breach of these Terms and Conditions or any contract
                signed upon engagement will revoke all benefits of the
                Website/App and business and possibly leading to restriction and
                legal action.
              </li>
            </ul>
            <h5 className="privacy__subheader">Disputes and Complaints</h5>
            <ul className="privacy__num__list">
              <li>
                27. URBANSERVE will do it’s best to avoid any dispute and will
                in the first instance, suggest Alternative Dispute Resolution
                procedures.
              </li>
              <li>
                28. We will deal with complaints regarding URBANSERVE’s conduct
                and Website/App and aim to fully respond to you within 10
                working days allow investigations. Please feel free to email or
                call us with details of your complaint.
              </li>
              <li>
                29. Any Complaints regarding the quality of work provided by the
                Trader shall be dealt with through the Trader's own complaints
                procedures.
                <ul className="privacy__child__list">
                  <li>
                    If the Trader's own complaints procedures does not lead to a
                    satisfactory conclusion, the Customer should file a formal
                    complaint with Trading Standards and follow their
                    procedures.
                  </li>
                </ul>
              </li>
              <li>
                30. These Terms and Conditions and any URBANSERVE Service
                contracts, is governed by the law of England and Wales.
                <a>
                  a) Each party acknowledges and irrevocably agrees that the
                  courts of England and Wales shall have exclusive jurisdiction
                  over these Terms and Conditions.
                </a>
              </li>
              <li>
                31. Disputes can be submitted to the jurisdiction of the courts
                of England and Wales.
              </li>
            </ul>
            <h5 className="privacy__subheader">
              Circumstances Beyond the Control of Any of the Parties
            </h5>
            <ul className="privacy__num__list">
              <li>
                32. In the event of any failure by a party due to something out
                of their reasonable control:
                <ul className="privacy__child__list">
                  <li>
                    The party will advise the other party as soon as reasonably
                    practicable; and
                  </li>
                  <li>
                    The party’s obligations will be suspended so far as is
                    reasonable, provided that that party will act reasonably,
                    that party will not be liable for any failure which it could
                    not have reasonably foreseen or avoided.
                  </li>
                  <li>
                    This will not affect the right to cancellation and the
                    associated fees within the annexed Fees Schedule.{' '}
                  </li>
                </ul>
              </li>
            </ul>
            <h5 className="privacy__subheader">Termination</h5>
            <ul className="privacy__num__list">
              <li>
                33. URBANSERVE may terminate any use of the Website/App or any
                Quotes, should any of the following situations materialise:
                <ul className="privacy__child__list">
                  <li>The insolvency of any party;</li>
                  <li>
                    Breaches or defaults of these Terms and Conditions or any
                    service contracts;
                  </li>
                  <li>
                    A party being involved in a dispute with another party to
                    the Quote.
                  </li>
                </ul>
              </li>
            </ul>
            <h5 className="privacy__subheader">Payments</h5>
            <ul className="privacy__num__list">
              <li>
                34. URBANSERVE shall raise send invoices for any fees applicable
                on the upcoming Friday, or the Friday given reasonable time
                constraints.
              </li>
            </ul>
            <h5 className="privacy__subheader">Privacy</h5>
            <ul className="privacy__num__list">
              <li>
                35. Your privacy is critical to URBANSERVE and we comply with
                the General Data Protection Regulation with regard to your
                personal information. Please see our Privacy Policy which can be
                found on our Website/App.
              </li>
            </ul>
            <div>
              <h5 className="privacy__subheader">Fees Schedule</h5>
              <table>
                <tr>
                  <td>
                    Customer Cancelling a Service which has been accepted by
                    Trader
                  </td>
                  <td>Upto 30% of order value</td>
                </tr>
                <tr>
                  <td>
                    Re-scheduling by Customer within two days of scheduled date
                  </td>
                  <td>100% of order value</td>
                </tr>
                <tr>
                  <td>Trader Quote Amendments</td>
                  <td>Subject to acceptance by Customer</td>
                </tr>
                <tr>
                  <td>Commission from Traders</td>
                  <td>20% of total order value</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}

export default Terms
