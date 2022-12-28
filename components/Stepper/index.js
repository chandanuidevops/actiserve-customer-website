import React from 'react';

/* Images */
import siteImages from '../../Assets/Icons/index';

import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'

export default function Stepper(props) {

    const { activeStep, completeStep, showAddon } = props;
    const router = useRouter()

    const maxTab = useMediaQuery({ query: '(max-width: 767px)' })
    const isTab = useMediaQuery({ query: '(min-width: 767px)' })
    const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' })


    return (
        <section>
            <div className='site__stepper'>
                <div className='steps__back' onClick={() => router.back()}>
                    <img
                        src={siteImages.backIconLight.src}
                        alt="Urbanserve Image"
                        width="100%"
                        style={{ marginRight: '3px' }}
                    />
                    <span className={showAddon && 'steps__font__sm'}>Back</span>
                </div>

                <div className='steps__container'>
                    <div className={activeStep?.includes('confirm') ? 'steps__data steps__active' : completeStep?.includes('confirm') ? 'steps__data steps__completed' : 'steps__data steps__disabled'}
                        style={{ fontSize: showAddon && maxTab ? '10px' : showAddon && isTab && !isLaptop ? '14px' : !showAddon && maxTab ? '14px' : !showAddon && isTab && !isLaptop ? '14px' : '24px' }}
                    >
                        {completeStep?.includes('confirm') ?
                            <img
                                src={siteImages.checkIconDark.src}
                                alt="Urbanserve Image"
                                width="100%"
                            /> :
                            <span className='steps__data__num'>1.</span>
                        }
                        <span>Confirm</span>
                    </div>
                    {showAddon && <div className={activeStep?.includes('addon') ? 'steps__data steps__active' : completeStep?.includes('addon') ? 'steps__data steps__completed' : 'steps__data steps__disabled'}
                        style={{ fontSize: showAddon && maxTab ? '10px' : showAddon && isTab && !isLaptop ? '14px' : !showAddon && maxTab ? '14px' : !showAddon && isTab && !isLaptop ? '14px' : '24px' }}
                    >
                        {completeStep?.includes('addon') ?
                            <img
                                src={siteImages.checkIconDark.src}
                                alt="Urbanserve Image"
                                width="100%"
                            /> :
                            <span className='steps__data__num'>2.</span>
                        }
                        <span>Addon</span>
                    </div>}
                    <div className={activeStep?.includes('book') ? 'steps__data steps__active' : completeStep?.includes('book') ? 'steps__data steps__completed' : 'steps__data steps__disabled'}
                        style={{ fontSize: showAddon && maxTab ? '10px' : showAddon && isTab && !isLaptop ? '14px' : !showAddon && maxTab ? '14px' : !showAddon && isTab && !isLaptop ? '14px' : '24px' }}>
                        {completeStep?.includes('book') ?
                            <img
                                src={siteImages.checkIconDark.src}
                                alt="Urbanserve Image"
                                width="100%"
                            /> :
                            <span className='steps__data__num'>{!showAddon ? '2.' : '3.'}</span>
                        }
                        <span>Book</span>
                    </div>
                    <div className={activeStep?.includes('pay') ? 'steps__data steps__active' : completeStep?.includes('pay') ? 'steps__data steps__completed' : 'steps__data steps__disabled'}
                        style={{ fontSize: showAddon && maxTab ? '10px' : showAddon && isTab && !isLaptop ? '14px' : !showAddon && maxTab ? '14px' : !showAddon && isTab && !isLaptop ? '14px' : '24px' }}>
                        {completeStep?.includes('pay') ?
                            <img
                                src={siteImages.checkIconDark.src}
                                alt="Urbanserve Image"
                                width="100%"
                            /> :
                            <span className='steps__data__num'>{!showAddon ? '3.' : '4.'}</span>
                        }
                        <span>Pay</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
