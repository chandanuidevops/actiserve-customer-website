import React from 'react';

import Images from '../../../Assets/Icons'
import Image from 'next/image'

export default function About() {
    return (
        <>
            <section className='us__about__wrapper'>
                <div className='us__about__container'>
                    <div className='us__container'>
                    <div className='us__about__content '>
                        <div className='us__about__imgholder'>
                            <Image
                                src={Images.mockUpImage}
                                alt="Picture of the author"
                                layout="fill"
                                quality={100}
                                objectFit='contain'
                            />
                        </div>
                        <div className='us__about__body'>
                            <h3 className='us__about__header'>About UrbanServe</h3>
                            <p className='us__about__info'>
                                We are a Tech Startup that aims to provide Hassle Free on Demand Services. UrbanServe offers their clients and service providers an intuitive app that enables customers and service providers to book, execute, and monitor their services in real time, while keeping a record of all past and future services. UrbanServe makes it possible for service providers to reach jobs that are not accessible to them and to keep up with work schedules with Dairy Management. Using our app & web service you can join & register for free.
                            </p>
                        </div>

                        </div>
                
                    </div>

                </div>
            </section>
        </>
    );
}
