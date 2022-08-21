import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/header.css'
import AppContext from '../context/AppContext'

const Header = () => {
    const { state, countTotal } = useContext(AppContext)
    const { cart } = state

    return (
        <div className='Header'>
            <h1 className='Header-title'>
                <Link to="/">
                    PlatziConf Merch
                </Link>
            </h1>
            <div className="Header-checkout">
                <Link to="/checkout">
                    <i className='fas fa-shopping-basket' />
                </Link>
                {cart.length > 0 &&
                    <div className='Header-alert'>{countTotal()}</div>
                }
            </div>
        </div>
    )
}

export default Header