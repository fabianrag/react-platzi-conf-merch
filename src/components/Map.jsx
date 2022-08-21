import React, { useState, useCallback } from 'react'
import { Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const mapStyles = {
    width: '100%',
    height: "50vh"
}

const Map = ({ data }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyATVMMlkc-WS9eNuKKheqf_F7Sc2UeyPdc"
    })

    const [map, setMap] = useState(null)

    const defaultCenter = {
        lat: data.lat,
        lng: data.lng
    }

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(defaultCenter);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapStyles}
            center={defaultCenter}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={defaultCenter} />
        </GoogleMap>
    ) : <></>
}

export default Map