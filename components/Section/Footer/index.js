
import Image from 'next/image'

import Images from '../../../Assets/Icons'
import Link from 'next/link'
import Router, {useRouter} from 'next/router'

export default function Footer() {

const d = new Date();
const router = useRouter()
const routePage = (e)=>{
    if(router.pathname.match('/trader-signup')){
      if(confirm('Are you sure you want to leave?')){
        router.push(e)
      }
    }else{
      router.push(e)
    }
   
  }
    return (
        <>
            <section className='us__footer__wrapper'>
                <div className='us__footer__container us__container'>

                    <div className='us__footer__content'>
                        <div>
                            <div className='us__footer__imgholder'>
                                <Link  href="javascript:void(0)" >
                                    <Image onClick={()=>routePage("/privacy-and-cookie-policy")} 
                                        src={Images.logoLight}
                                        alt="Urbanserve Image"
                                        layout="fill"
                                        objectFit='contain'
                                        quality={100}
                                    />
                                </Link>
                            </div>
                            <p className='us__footer__info'>
                                Copyright © 2010 - {d.getFullYear()} Urbanserve Ltd. All rights reserved.
                            </p>
                        </div>
                        <div className='us__footer__privacy'>
                            <Link  href="javascript:void(0)" >
                                <p className='privacy__text' onClick={()=>routePage("/privacy-and-cookie-policy")}    >Privacy and Cookie Policy</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
