import React, { useState, useEffect } from "react";

const useGeoLocation = () => {

    const [getUserLocation, setGetUserLocation] = useState(false);

    useEffect(()=>{
        setGetUserLocation(false)
    },[])
    
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = (location) => {
        getUserLocation === true && setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        getUserLocation === false && setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };


    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        getUserLocation === true && navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [getUserLocation]);

    return [location, () => setGetUserLocation(true), () => setGetUserLocation(false)];
};

export default useGeoLocation;