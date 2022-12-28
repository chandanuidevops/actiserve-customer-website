// import classNameProp from 'class-name-prop';
import { useRouter } from 'next/router';
import React from 'react';
import { Dimmer, Loader, Image } from 'semantic-ui-react'

const DONE_DURATION = 1000;

export default function RouteIndicator() {
    const router = useRouter();

    const [loading, setLoading] = React.useState(null);
    const [timeoutId, setTimeoutId] = React.useState(null);

    const onRouteChangeStart = React.useCallback(() => {
        setLoading(true);
    }, []);

    const onRouteChangeDone = React.useCallback(() => {
        setLoading(false);
        setTimeoutId(
            setTimeout(() => {
                setTimeoutId(null);
                setLoading(null);
            }, DONE_DURATION)
        );
    }, []);

    React.useEffect(() => {
        router.events.on('routeChangeStart', onRouteChangeStart);
        router.events.on('routeChangeComplete', onRouteChangeDone);
        router.events.on('routeChangeError', onRouteChangeDone);

        return () => {
            router.events.off('routeChangeStart', onRouteChangeStart);
            router.events.off('routeChangeComplete', onRouteChangeDone);
            router.events.off('routeChangeError', onRouteChangeDone);
        };
    }, [onRouteChangeDone, onRouteChangeStart, router.events]);

    React.useEffect(
        () => () => {
            if (timeoutId) clearTimeout(timeoutId);
        },
        [timeoutId]
    );

    return (
        <>
            <div className={loading !== null && !loading ? 'spinner-wrapper spinner-dimmer' : ''}>
                {/* <div className="content">
                    {loading !== null && !loading && <img className="rotate center-screen" src='/images/BG@2x.png' width="5%"></img>}
                </div> */}
            </div>
        </>
    );
}