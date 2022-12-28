import React from 'react'
import {Header, Icon, Image, Statistic, Grid, Segment} from 'semantic-ui-react'
import SiteFooter from '../../components/SiteFooter'
import HelmetComponent from '../../components/Helmet'
import SiteNav from '../../components/SiteMain/SiteMainNavbar'
function PrivacyPolicy() {
  const isBrowser = () => typeof window !== 'undefined'

  let link = isBrowser()
    ? `${window.location.hostname}/privacy-and-cookie-policy`
    : ''

  return (
    <>
      <HelmetComponent
        title="UrbanServe | Privacy and Cookie Policy"
        description="UrbanServe provides professional carpet cleaning, gutter cleaning and a range of other services. Book online in less than 30 seconds!"
        ogUrl={isBrowser() ? link : ''}
        showDescription={true}
      />
      <SiteNav />
      <section className="us__privacy__wrapper">
        <div className="us__privacy__container site_lg_container">
          <div className="us__privacy__content">
            <h5
              className="privacy__header"
              style={{textAlign: 'center', textDecoration: 'none'}}
            >
              Privacy and Cookie Policy
            </h5>
            <p>
              Your privacy is important to us. This Privacy Policy sets out how
              we handle and treat your personal data when you visit our website
              and sign up for an account with us. The information below should
              allow you to make an informed decision and understand how your
              personal information may be used. If there is anything you do not
              understand, or wish for more information on, please do not
              hesitate to contact us with the details provided on our website.
            </p>
            <h4 className="privacy__header">Personal Information</h4>
            <p>
              We may collect personal information from you throughout the course
              of our business together and when you get in touch with us.
            </p>
            <h5 className="privacy__subheader">
              The main reasons we use your personal information are:
            </h5>
            <ol className="privacy__list">
              <li>Deliver our services</li>
              <li>Improve, develop and market new services</li>
              <li>Verify your identity</li>
              <li>Carry out requests made by you on our website.</li>
              <li>
                Investigate, settle and/or enforce agreements we have with you.
              </li>
              <li>
                Protect the rights, property or safety of us or third parties,
                including our other clients and users of the website or our
                services.
              </li>
              <li>Use as otherwise required or permitted by law</li>
            </ol>
            <h5 className="privacy__subheader">
              The personal information we collect are as follows:
            </h5>
            <ol className="privacy__list">
              <li>Name and job title</li>
              <li>Date of birth</li>
              <li>
                Contact information including the company you may work for,
                email address and social media account where appropriate.
              </li>
              <li>
                Demographic information such as your address, preferences and
                interests.
              </li>
              <li>Other information relevant to the provision of services.</li>
              <li>Payment information</li>
              <li>
                Information you provide to us to enable the engagement of our
                services.
              </li>
            </ol>
            <h4 className="privacy__header">Keeping Data Secure</h4>
            <h5 className="privacy__subheader">
              We will use organisational measures to safeguard your data such
              as:
            </h5>
            <ol className="privacy__list">
              <li>
                Access to your account is controlled by a password and a user
                name that is unique to you.
              </li>
              <li>We store your data on our secure servers.</li>
            </ol>
            <p>
              If there is any potential data breach detected or reported, we
              will investigate this without delay. Please let us know if you
              suspect your data given during the use of our website is
              corrupted.
            </p>
            <h5 className="privacy__header">Legal Basis</h5>
            <p>
              To carry out any contract we may have with you, it is necessary
              for us to collect personal data in accordance with and to engage
              our services. It is in our legitimate interests to use personal
              information in such a way to ensure we provide the services in the
              best way that we can. We have a legal obligation to use your
              personal information to comply with legal obligations placed upon
              us.
            </p>
            <h5 className="privacy__header">Retention</h5>
            <p>
              We will retain your personal information for at least 3 years from
              the date of our last interaction with you in compliance with our
              obligations under the EU General Data Protection Regulation. Where
              our services have been provided, we will keep relevant personal
              information for at least 6 years from the date of our last
              interaction in compliance with our obligations aforementioned. We
              may then destroy such files without further notice or liability
            </p>
            <h5 className="privacy__header">Cookie Policy</h5>
            <p>
              We use cookies when you visit our website to help customise your
              experience. You do not need to allow cookies to visit the website.
              If enabled, your experience on this website would be tailored and
              is necessary for certain parts of the website to work. In most
              cases, a cookie does not provide us with any of your personal
              information.
            </p>
            <p>
              For further information about this policy, please contact us at{' '}
              <a
                className="privacy__info__bold"
                href="mailto:support@urbanserve.co.uk"
              >
                support@urbanserve.co.uk
              </a>
            </p>
            <h5 className="privacy__header">What is a Cookie?</h5>
            <p>
              A cookie is a small file of letters and numbers we store on your
              browser or the hard drive of your computer when you visit certain
              parts of the website. When you visit our website, strictly
              necessary cookies will be placed however, you can always change
              your cookie settings. This can be done by clicking on the cookie
              button at the bottom of this policy.
            </p>
            <p>
              <span className="privacy__info__bold">
                First and third-party cookies:
              </span>
              Whether a cookie is ‘first’ or ‘third’ refers to the domain pacing
              the cookie. First-party cookies are those placed by us and
              third-party cookies are set by a domain other that that of the
              website being visited by the user.
            </p>
            <p>
              <span className="privacy__info__bold">Persistent cookies:</span>
              These cookies remain on a user’s device for the period of time
              specified in the cookie. These cookies will be re-activated every
              time a user visits the website.
            </p>
            <p>
              <span className="privacy__info__bold">Session cookies:</span>
              these cookies allow website operators to link the actions of a
              user during their browser session. Once the browser is closed, all
              session cookies are deleted.
            </p>
            <h5 className="privacy__header">Controlling your Cookies</h5>
            <p>
              You can choose to enable or disable cookies in your internet
              browser. By default, most internet browsers accept cookies but
              this can be changed. For further details, please see the help menu
              in your internet browser.
            </p>
            <p>
              You can switch off cookies anytime. This could lead to the loss of
              information that enables you to access our website more
              efficiently.
            </p>
            <p>
              We recommend that you ensure your internet browser is up to date
              and that you consult the help and guidance provided by the
              developer.
            </p>
            <h5 className="privacy__header">Your Consent</h5>
            <p>Strictly necessary cookies do not require your consent.</p>
            <p>
              For performance, functionality, targeting and social media
              cookies, we request your consent before placing them on your
              device. If you do not wish to give consent or wish to withdraw
              such consent, you will need to delete and block cookies through
              your browser settings.
            </p>
            <h5 className="privacy__header">Cookies we use</h5>{' '}
            <p>
              Below is a list of the cookies that we use. We have made
              reasonable efforts to ensure this list is up to date. However, if
              you find that there is a cookie used on our website that we have
              missed, please let us know.
            </p>
            <h5 className="privacy__subheader">
              The cookies used on our website can be categorised as follows:
            </h5>
            <p>
              <span className="privacy__info__bold">Strictly necessary: </span>
              These cookies allow you to navigate our website and use essential
              features like secure areas. Without these cookies, we cannot
              provide the requested services.
            </p>
            <h5 className="privacy__subheader">
              We use strictly necessary cookies to:
            </h5>
            <ol className="privacy__list">
              <li>
                Identify you as being logged in to our website and to
                authenticate you.
              </li>
              <li>
                Make sure you connect to the right service on the website when
                we make any changes to the way it works.{' '}
              </li>
              <li>For security purposes. </li>
            </ol>
            <p>
              If you refuse these cookies, there is no guarantee how the website
              will perform and its security.
            </p>
            <p>
              <span className="privacy__info__bold">Performance: </span>
              These cookies can be defined as being used to collect information
              about how you use our website such as which areas you visit and
              any errors encountered. These cookies do not collect any personal
              information.
            </p>
            <h5 className="privacy__subheader">
              We use performance cookies to:
            </h5>
            <ol className="privacy__list">
              <li>
                Perform web analytics which provide anonymous statistics on how
                our website is used.
              </li>
              <li>
                Help us to perform error management measures to improve the
                website.{' '}
              </li>
            </ol>
            <p>
              <span className="privacy__info__bold">Functional: </span>
              We use functional cookies to enable us to provide you with
              enhanced customisation and functionality.
            </p>
            <p>
              <span className="privacy__info__bold">Targeting: </span>
              Users are given the option to share our work on social networks
              such as Facebook, TikTok, NextDoor, Twitter and Instagram.
            </p>
            <h5 className="privacy__header">Your Rights</h5>
            <h5 className="privacy__subheader">
              You have the following rights in relation to your data:
            </h5>
            <ol className="privacy__list">
              <li>
                <span className="privacy__info__bold">Right to access – </span>{' '}
                the right to request copies of information we hold about you at
                any tie or that we change or delete such information. There will
                be no charge for providing your own personal information to you,
                unless it is reasonably found to be manifestly unfounded or
                excessive.
              </li>
              <li>
                {' '}
                <span className="privacy__info__bold">
                  Right to be correct -{' '}
                </span>{' '}
                the right to have your Data rectified if it is inaccurate or
                incomplete.
              </li>
              <li>
                {' '}
                <span className="privacy__info__bold">
                  Right to erase –{' '}
                </span>{' '}
                the right to request that we delete or remove your data from our
                systems. This could mean that you would have to sign up once
                again to engage our services.
              </li>
              <li>
                {' '}
                <span className="privacy__info__bold">
                  Right to restrict our use of your data –{' '}
                </span>{' '}
                the right to stop us from using your data in a particular way or
                limit such use.
              </li>
              <li>
                {' '}
                <span className="privacy__info__bold">
                  Right to data portability –{' '}
                </span>
                the right to request that transfer or copy your data.
              </li>
              <li>
                {' '}
                <span className="privacy__info__bold">
                  Right to object –{' '}
                </span>{' '}
                the right to object to our use of your data including where we
                use it for our legitimate interests.
              </li>
            </ol>
            <p>
              To make use of the rights above, please contact us at{' '}
              <a
                className="privacy__info__bold"
                href="mailto:support@urbanserve.co.uk"
              >
                support@urbanserve.co.uk
              </a>
            </p>
            <p>
              If you are not satisfied with our response, you can make a
              complaint in the UK to the Information Commissioner’s Office at{' '}
              <a className="privacy__info__bold" href="https://ico.org.uk/">
                https://ico.org.uk/.
              </a>
            </p>
            <h5 className="privacy__header">
              Changes to this Privacy and Cookie Policy
            </h5>
            <p>
              We may make changes to this Privacy Policy from time to time. We
              will update this policy to ensure we have all the correct
              information. Where it is practicable, we will notify you by email
              of any significant changes.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}

export default PrivacyPolicy
