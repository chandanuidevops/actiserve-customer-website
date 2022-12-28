import React from 'react';

import siteImages from '../../../Assets/Icons'

export default function AppButtons() {
  return (
    <>
          {/* Site Button Starts */}
          <section className="site__btn__wrapper">
        <div className="site__btn__container site_lg_container">
          <div className="site__btn__content">
            <div className="site__btn__play">

              <img
                src={siteImages.appleStore.src}
                alt="Urbanserve Image"
                width="100%"
              />
              <div className="site__btn__play__content">
                <p className="site__btn__header">Download on the</p>
                <p className="site__btn__info">App Store</p>
              </div>
              {/* <div className="site__btn__play__helper"></div> */}
            </div>
          </div>

          <div className="site__apple">
            <div className="site__btn__apple__content">
              <div className="site__btn__apple">
                <img
                  src={siteImages.playStore.src}
                  alt="Urbanserve Image"
                  width="100%"
                />
                <div className="site__btn__apple__content">
                  <p className="site__btn__apple__header">Get it on</p>
                  <p className="site__btn__apple__info">Google play</p>
                </div>
                {/* <div className="site__btn__apple__helper"></div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Site Button Ends */}
    </>
  );
}
