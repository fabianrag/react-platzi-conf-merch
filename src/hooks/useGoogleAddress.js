import { useState, useEffect } from 'react'
import axios from 'axios'

const useGoogleAddress = address => {
    const [map, setMap] = useState({ lat: 0, lng: 0 })
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyATVMMlkc-WS9eNuKKheqf_F7Sc2UeyPdc`

    useEffect(() => {
        async function getLocation() {
            const { data } = await axios.get(API)
            setMap(data.results[0].geometry.location)
        }
        getLocation()
    }, [])

    return map
}

export default useGoogleAddress