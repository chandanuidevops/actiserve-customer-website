import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import actions from "../Stores/Auth/actions";
import Login from '../pages/login'
import NextNProgress from '../components/NProgress';
const { check } = actions;
function withAuth(Component) {
    const Auth = (props) => {
        const history = useRouter();
        const dispatch = useDispatch();
        const { isAuthenticated, isAuthenticating } = useSelector((state) => state?.AuthReducer)
        const reducerToken = useSelector((state) => state?.AuthReducer?.token)
        const allData = useSelector((state) => state)
        const [authFallback, setAuthFallback] = useState(false);
        useEffect(() => {
            if (reducerToken !== null) {
                setAuthFallback(true);
            } else {
                if (typeof window !== "undefined") {
                    const token = window.localStorage.getItem('token');
                    if (token !== null) {
                        dispatch(check(token, history));
                    }
                }
            }
        }, [])

        useEffect(() => {
            if (isAuthenticated && !isAuthenticating) {
                setAuthFallback(true);
            }
        }, [isAuthenticated, isAuthenticating]);

        // Login data added to props via redux-store (or use react context for example)

        return (
            authFallback ?
                <Component {...props} />
                :
                <NextNProgress/>
        )
        //     if (!isAuthenticated) {
        //         return false;
        //         // return (
        //         //     <Login />
        //         // );
        //     }

        //     // If user is logged in, return original component
        //     return (
        //         <Component {...props} />
        //     );
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;