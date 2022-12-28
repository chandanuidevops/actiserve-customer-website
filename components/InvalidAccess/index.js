import React from 'react';
import Link from 'next/link'

export default function InvalidAccess(props) {

    const { pageAccess, title, redirectTo } = props;
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404"></div>
                    <h1 style={{ fontFamily: 'Urbanist__bold' }}>Urbanserve / {pageAccess}</h1>
                    <p>{title}</p>
                    <Link href="/">
                        <p className='notfound-back'>Back to homepage</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
