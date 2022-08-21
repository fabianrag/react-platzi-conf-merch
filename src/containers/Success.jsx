import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import '../styles/components/success.css'
import Map from '../components/Map'
import useGoogleAddress from '../hooks/useGoogleAddress'

const Success = () => {
    const { state } = useContext(AppContext)
    const { buyer } = state
    console.log(buyer[0].address)
    const location = useGoogleAddress(buyer[0].address)
    console.log(location)

    return (
        <div className="Success">
            <div className="Success-content">
                <h2>{`Gracias por tu compra, ${buyer[0].name}`}</h2>
                <span>Tu pedido llegará en 3 días a tu dirección:</span>
                <div className="Success-map">
                    <Map data={location} />
                </div>
            </div>
        </div>
    )
}

export default Success