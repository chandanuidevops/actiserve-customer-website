import React from 'react'
import {Button, Header, Modal} from 'semantic-ui-react'
import siteImages from '../../Assets/Icons'
import Image from 'next/image'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import actions from '../../Stores/Auth/actions'

const LogoutAction = actions.logout

function ExitModal({open, onClose, Logout}) {
  function handleCheckout() {
    Logout()
    onClose()
  }

  return (
    <Modal size="tiny" open={open}>
      <Modal.Header>
        <h5 className="exit_modal_header">Are you sure you want to logout?</h5>
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <h4 className="exit_modal_info">
            You can view & manage your booking(s) and profile through our app.
          </h4>
          <div className="exit__app__links">
            <div className="exit__img__holder exit__img__mr">
              <Image
                src={siteImages.apppleStoreDwn.src}
                alt="Urbanserve Icon"
                layout="fill"
                objectFit="contain"
                quality={100}
              />
            </div>
            <div className="exit__img__holder">
              <Image
                src={siteImages.googleStoreDwn.src}
                alt="Urbanserve Icon"
                layout="fill"
                objectFit="contain"
                quality={100}
              />
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className="exit_action">
        <Button className="exit_cancel_btn" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button onClick={() => handleCheckout()} className="exit_logout_btn">
          Logout
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    Logout: (data) => dispatch(LogoutAction(data)),
  }
}

const withConnect = connect(null, mapDispatchToProps)

export default compose(withConnect)(ExitModal)
