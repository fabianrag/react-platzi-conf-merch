import React, { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js"
import '../styles/components/payment.css'
import sumTotalCart from '../utils/sumTotalCart'
import { useNavigate } from 'react-router-dom'

// This values are the props in the UI
const currency = "USD";
const style = { "layout": "vertical" };

const ButtonWrapper = ({ currency, showSpinner, handlePaymentSuccess }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const amount = sumTotalCart()

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                    });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    handlePaymentSuccess(details)
                });
            }}
        />
    </>
    );
}

const Payment = () => {
    const { state, addNewOrder } = useContext(AppContext)
    const { cart, buyer } = state
    const navigate = useNavigate()

    const handlePaymentSuccess = data => {
        if (data.status === 'COMPLETED') {
            const newOrder = {
                buyer,
                product: cart,
                payment: data
            }
            addNewOrder(newOrder)
            navigate('/checkout/success')
        }
    }

    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                {cart.map(item => (
                    <div className="Payment-item" key={item.id}>
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>${item.price}</span>
                            <span>Quantity: {item.quantity}</span>
                        </div>
                    </div>
                ))}
                <div className="Payment-button">
                    <PayPalScriptProvider
                        options={{
                            "client-id": "sb",
                            components: "buttons",
                            currency: "USD"
                        }}
                    >
                        <ButtonWrapper
                            currency={currency}
                            showSpinner={false}
                            handlePaymentSuccess={handlePaymentSuccess}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    )
}

export default Payment